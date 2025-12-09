'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const MAX_FLEE_COUNT = 5

/**
 * Interactive demo of the fleeing submit button from The Impossible Form
 * The button dodges away from cursor hover, surrendering after enough attempts
 */
export function FleeingButtonDemo() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [fleeCount, setFleeCount] = useState(0)
  const [isShaking, setIsShaking] = useState(false)
  const [hasClicked, setHasClicked] = useState(false)
  const buttonRef = useRef(null)
  const containerRef = useRef(null)

  const shouldFlee = fleeCount < MAX_FLEE_COUNT

  const handleMouseEnter = useCallback(() => {
    if (!shouldFlee || !buttonRef.current || !containerRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const button = buttonRef.current.getBoundingClientRect()

    // Calculate available space
    const maxX = (container.width - button.width) / 2 - 10
    const maxY = (container.height - button.height) / 2 - 10

    // Always flee to opposite side with some randomness
    let newX, newY

    if (Math.abs(position.x) < 10) {
      // If near center, pick a random direction
      newX = (Math.random() > 0.5 ? 1 : -1) * (maxX * 0.5 + Math.random() * maxX * 0.5)
    } else {
      // Flee to opposite side
      newX = position.x > 0
        ? -(maxX * 0.3 + Math.random() * maxX * 0.7)
        : (maxX * 0.3 + Math.random() * maxX * 0.7)
    }

    newY = (Math.random() - 0.5) * maxY * 1.5

    // Clamp values
    newX = Math.max(-maxX, Math.min(maxX, newX))
    newY = Math.max(-maxY, Math.min(maxY, newY))

    setPosition({ x: newX, y: newY })
    setFleeCount(prev => prev + 1)

    if (fleeCount >= MAX_FLEE_COUNT - 2) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
    }
  }, [shouldFlee, position, fleeCount])

  const handleClick = useCallback(() => {
    setHasClicked(true)
    setTimeout(() => setHasClicked(false), 2000)
  }, [])

  const handleReset = () => {
    setFleeCount(0)
    setPosition({ x: 0, y: 0 })
    setHasClicked(false)
  }

  const isSurrendered = fleeCount >= MAX_FLEE_COUNT

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Windows 95 style panel */}
      <div
        className="w-full max-w-md bg-[#c0c0c0] p-1"
        style={{
          boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
        }}
      >
        {/* Title bar */}
        <div
          className="h-[18px] px-[2px] py-[2px] flex items-center justify-between mb-2"
          style={{ background: 'linear-gradient(90deg, #000080, #1084d0)' }}
        >
          <span className="text-white text-[11px] font-bold px-1" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            Fleeing Button Demo
          </span>
        </div>

        {/* Content area */}
        <div
          ref={containerRef}
          className="relative bg-white h-40 flex items-center justify-center overflow-hidden"
          style={{
            boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080, inset -2px -2px 0 #c0c0c0, inset 2px 2px 0 #0a0a0a'
          }}
        >
          <motion.button
            ref={buttonRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            animate={{
              x: shouldFlee ? position.x : 0,
              y: shouldFlee ? position.y : 0,
              scale: isShaking ? 1.05 : 1,
            }}
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 20 },
              y: { type: 'spring', stiffness: 300, damping: 20 },
              scale: { type: 'spring', stiffness: 400, damping: 10 },
            }}
            className="px-6 py-2 text-[11px] text-black"
            style={{
              fontFamily: 'Tahoma, sans-serif',
              backgroundColor: '#c0c0c0',
              boxShadow: isSurrendered
                ? 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf, 0 0 0 2px #008000'
                : 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
            }}
          >
            {hasClicked ? (
              isSurrendered ? '✓ Submitted!' : 'Missed!'
            ) : isSurrendered ? (
              <span className="flex items-center gap-2">
                <span>Fine, submit</span>
                <span className="text-[9px] opacity-75">(I give up)</span>
              </span>
            ) : (
              'Submit Form'
            )}
          </motion.button>

          {/* Taunt messages */}
          {shouldFlee && fleeCount > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-2 text-[10px] text-[#808080]"
              style={{ fontFamily: 'Tahoma, sans-serif' }}
            >
              {fleeCount === 1 && "Too slow!"}
              {fleeCount === 2 && "Can't catch me!"}
              {fleeCount === 3 && "Getting tired yet?"}
              {fleeCount === 4 && "Okay, okay... one more try"}
            </motion.p>
          )}
        </div>

        {/* Status bar */}
        <div className="flex justify-between items-center mt-2 gap-1">
          <div
            className="flex-1 px-2 py-[2px]"
            style={{
              boxShadow: 'inset -1px -1px 0 #ffffff, inset 1px 1px 0 #808080'
            }}
          >
            <span className="text-[11px] text-black" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Flee attempts: {fleeCount}/{MAX_FLEE_COUNT}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-[2px] text-[11px] text-black"
            style={{
              fontFamily: 'Tahoma, sans-serif',
              backgroundColor: '#c0c0c0',
              boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <p className="text-xs text-neutral-500 italic">
        Hover over the button to watch it flee. After {MAX_FLEE_COUNT} attempts it surrenders.
      </p>
    </div>
  )
}

export default FleeingButtonDemo
