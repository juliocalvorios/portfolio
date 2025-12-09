'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 * Interactive demo of the Matrix hack easter egg from The Impossible Form
 * Shows the green rain animation and simulated "hacking" progress
 */
export function MatrixHackDemo() {
  const canvasRef = useRef(null)
  const [isHacking, setIsHacking] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const animationRef = useRef(null)

  // Matrix rain effect
  useEffect(() => {
    if (!isHacking || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width = canvas.offsetWidth
    const height = canvas.height = canvas.offsetHeight

    const columns = Math.floor(width / 14)
    const drops = new Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = '#0F0'
      ctx.font = '14px monospace'

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillText(char, i * 14, drops[i] * 14)

        if (drops[i] * 14 > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHacking])

  // Progress simulation
  useEffect(() => {
    if (!isHacking) return

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsHacking(false)
            setCompleted(true)
          }, 500)
          return 100
        }
        return prev + Math.random() * 5 + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isHacking])

  const handleHack = useCallback(() => {
    setIsHacking(true)
    setProgress(0)
    setCompleted(false)
  }, [])

  const handleReset = () => {
    setIsHacking(false)
    setProgress(0)
    setCompleted(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const getStatusText = () => {
    if (progress < 20) return 'Initializing bypass...'
    if (progress < 40) return 'Decrypting form defenses...'
    if (progress < 60) return 'Overriding button flee response...'
    if (progress < 80) return 'Disabling checkbox timer...'
    if (progress < 100) return 'Finalizing hack...'
    return 'ACCESS GRANTED'
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Demo container */}
      <div
        className="relative w-full max-w-md h-[300px] overflow-hidden rounded-lg"
        style={{
          backgroundColor: '#000',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
        }}
      >
        {/* Matrix rain canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: isHacking ? 1 : 0.3 }}
        />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <AnimatePresence mode="wait">
            {!isHacking && !completed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="text-[#0F0] font-mono text-sm mb-4 opacity-70">
                  Secret bypass detected...
                </p>
                <button
                  onClick={handleHack}
                  className="px-6 py-3 bg-transparent border-2 border-[#0F0] text-[#0F0] font-mono text-sm hover:bg-[#0F0] hover:text-black transition-colors"
                >
                  C:\&gt;_ INITIATE HACK
                </button>
              </motion.div>
            )}

            {isHacking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center w-full max-w-xs"
              >
                {/* Status text */}
                <motion.p
                  key={getStatusText()}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#0F0] font-mono text-xs mb-4"
                >
                  {getStatusText()}
                </motion.p>

                {/* Progress bar */}
                <div
                  className="h-4 w-full border border-[#0F0] mb-2"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: '#0F0' }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                <p className="text-[#0F0] font-mono text-xs">
                  {Math.min(Math.round(progress), 100)}%
                </p>

                {/* Glitch text */}
                <motion.p
                  className="text-[#0F0] font-mono text-[10px] mt-4 opacity-50"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    x: [0, -2, 2, 0]
                  }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                >
                  {'>>>'} BYPASSING FORM DEFENSES {'<<<'}
                </motion.p>
              </motion.div>
            )}

            {completed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.p
                  className="text-[#0F0] font-mono text-2xl font-bold mb-2"
                  animate={{
                    textShadow: [
                      '0 0 10px #0F0',
                      '0 0 20px #0F0',
                      '0 0 10px #0F0'
                    ]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  HACKED
                </motion.p>
                <p className="text-[#0F0] font-mono text-xs mb-4 opacity-70">
                  All form defenses bypassed.
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-1 text-[#0F0] font-mono text-[10px] opacity-50"
                >
                  <p>✓ Button flee disabled</p>
                  <p>✓ Checkbox timer frozen</p>
                  <p>✓ Password requirements cleared</p>
                  <p>✓ Form auto-submitted</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)'
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!isHacking && (
          <button
            onClick={handleHack}
            className="px-4 py-1 text-[11px] text-black"
            style={{
              fontFamily: 'Tahoma, sans-serif',
              backgroundColor: '#c0c0c0',
              boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
            }}
          >
            {completed ? 'Hack Again' : 'Start Hack'}
          </button>
        )}
        {(completed || isHacking) && (
          <button
            onClick={handleReset}
            className="px-4 py-1 text-[11px] text-black"
            style={{
              fontFamily: 'Tahoma, sans-serif',
              backgroundColor: '#c0c0c0',
              boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
            }}
          >
            Reset
          </button>
        )}
      </div>

      <p className="text-xs text-neutral-500 italic">
        The secret hack mode bypasses all form defenses with a Matrix-style animation.
      </p>
    </div>
  )
}

export default MatrixHackDemo
