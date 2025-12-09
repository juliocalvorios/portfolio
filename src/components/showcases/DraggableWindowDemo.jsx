'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * Interactive demo showcasing draggable Windows 95 windows from The Impossible Form
 * Two windows that can be dragged around, demonstrating the desktop simulation
 */
export function DraggableWindowDemo() {
  const containerRef = useRef(null)
  const [window1Pos, setWindow1Pos] = useState({ x: 20, y: 20 })
  const [window2Pos, setWindow2Pos] = useState({ x: 120, y: 80 })
  const [activeWindow, setActiveWindow] = useState(2)
  const [dragging, setDragging] = useState(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  const handleMouseDown = useCallback((windowId, e) => {
    if (e.target.closest('button')) return

    setActiveWindow(windowId)
    setDragging(windowId)

    const rect = e.currentTarget.getBoundingClientRect()
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!dragging || !containerRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const windowWidth = 200
    const windowHeight = 150

    const newX = Math.max(0, Math.min(
      e.clientX - container.left - dragOffset.current.x,
      container.width - windowWidth
    ))
    const newY = Math.max(0, Math.min(
      e.clientY - container.top - dragOffset.current.y,
      container.height - windowHeight
    ))

    if (dragging === 1) {
      setWindow1Pos({ x: newX, y: newY })
    } else {
      setWindow2Pos({ x: newX, y: newY })
    }
  }, [dragging])

  const handleMouseUp = useCallback(() => {
    setDragging(null)
  }, [])

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [dragging, handleMouseMove, handleMouseUp])

  const handleReset = () => {
    setWindow1Pos({ x: 20, y: 20 })
    setWindow2Pos({ x: 120, y: 80 })
    setActiveWindow(2)
  }

  const Win95Window = ({ id, title, position, isActive, children }) => (
    <motion.div
      className="absolute w-[200px]"
      style={{
        left: position.x,
        top: position.y,
        zIndex: isActive ? 10 : 1,
        backgroundColor: '#c0c0c0',
        boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
      }}
      onMouseDown={(e) => handleMouseDown(id, e)}
    >
      {/* Title Bar */}
      <div
        className="h-[18px] px-[3px] py-[3px] flex items-center justify-between cursor-move select-none"
        style={{
          background: isActive
            ? 'linear-gradient(90deg, #000080, #1084d0)'
            : 'linear-gradient(90deg, #808080, #a0a0a0)'
        }}
      >
        <span
          className="text-[11px] font-bold"
          style={{
            fontFamily: 'Tahoma, sans-serif',
            color: isActive ? 'white' : '#c0c0c0'
          }}
        >
          {title}
        </span>
        <div className="flex gap-[2px]">
          <button
            className="w-[16px] h-[14px] bg-[#c0c0c0] flex items-center justify-center"
            style={{
              boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
            }}
          >
            <div className="w-[6px] h-[2px] bg-black mt-[6px]" />
          </button>
          <button
            className="w-[16px] h-[14px] bg-[#c0c0c0] flex items-center justify-center text-black font-bold text-[12px] leading-none"
            style={{
              boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-2">
        {children}
      </div>
    </motion.div>
  )

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Demo container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-xl h-[300px] overflow-hidden"
        style={{
          background: '#008080',
          boxShadow: 'inset 0 0 0 2px #006060'
        }}
      >
        {/* Windows */}
        <Win95Window
          id={1}
          title="Form Window"
          position={window1Pos}
          isActive={activeWindow === 1}
        >
          <div
            className="bg-white p-2"
            style={{
              boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080'
            }}
          >
            <p className="text-[10px] text-black" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Main form window with all the impossible fields...
            </p>
          </div>
        </Win95Window>

        <Win95Window
          id={2}
          title="Stats Panel"
          position={window2Pos}
          isActive={activeWindow === 2}
        >
          <div
            className="bg-white p-2"
            style={{
              boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080'
            }}
          >
            <p className="text-[10px] text-black mb-1" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Frustration: 42%
            </p>
            <p className="text-[10px] text-black" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Failed clicks: 7
            </p>
          </div>
        </Win95Window>

        {/* Taskbar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[28px] flex items-center px-1 gap-1"
          style={{
            backgroundColor: '#c0c0c0',
            boxShadow: 'inset 0 1px 0 #fff'
          }}
        >
          <button
            className="h-[22px] px-2 flex items-center gap-1"
            style={{
              backgroundColor: '#c0c0c0',
              boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <rect x="0" y="0" width="7" height="7" fill="#FF0000" />
              <rect x="8" y="0" width="7" height="7" fill="#00FF00" />
              <rect x="0" y="8" width="7" height="7" fill="#0000FF" />
              <rect x="8" y="8" width="7" height="7" fill="#FFFF00" />
            </svg>
            <span className="text-[11px] font-bold text-black" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Start
            </span>
          </button>

          <div className="h-full w-px bg-[#808080]" />

          <button
            onClick={() => setActiveWindow(1)}
            className="h-[22px] px-2 text-[11px] text-black truncate max-w-[100px]"
            style={{
              fontFamily: 'Tahoma, sans-serif',
              backgroundColor: '#c0c0c0',
              boxShadow: activeWindow === 1
                ? 'inset 1px 1px 0 #0a0a0a, inset -1px -1px 0 #ffffff'
                : 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
            }}
          >
            Form Window
          </button>

          <button
            onClick={() => setActiveWindow(2)}
            className="h-[22px] px-2 text-[11px] text-black truncate max-w-[100px]"
            style={{
              fontFamily: 'Tahoma, sans-serif',
              backgroundColor: '#c0c0c0',
              boxShadow: activeWindow === 2
                ? 'inset 1px 1px 0 #0a0a0a, inset -1px -1px 0 #ffffff'
                : 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
            }}
          >
            Stats Panel
          </button>
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={handleReset}
        className="px-4 py-1 text-[11px] text-black"
        style={{
          fontFamily: 'Tahoma, sans-serif',
          backgroundColor: '#c0c0c0',
          boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
        }}
      >
        Reset Windows
      </button>

      <p className="text-xs text-neutral-500 italic">
        Drag the windows by their title bars. Click to bring a window to front.
      </p>
    </div>
  )
}

export default DraggableWindowDemo
