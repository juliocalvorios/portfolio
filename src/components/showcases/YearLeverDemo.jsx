'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

const KEY_YEARS = [1763, 1791, 1867, 1868, 1921, 1922, 1957, 1965, 2025]
const MIN_YEAR = 1763
const MAX_YEAR = 2025

/**
 * Interactive Year Lever demo from Ontario Flag Time Machine
 * Dial/rotary phone style wheel that slides along a track
 */
export function YearLeverDemo() {
  const [currentYear, setCurrentYear] = useState(1965)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef(null)

  // Convert year to percentage position
  const yearToPercent = (year) => {
    return ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100
  }

  // Convert percentage to year, snapping to notches
  const percentToYear = useCallback((percent) => {
    const rawYear = MIN_YEAR + (percent / 100) * (MAX_YEAR - MIN_YEAR)

    // Find closest notch
    let closestYear = KEY_YEARS[0]
    let minDiff = Math.abs(rawYear - KEY_YEARS[0])

    for (const notchYear of KEY_YEARS) {
      const diff = Math.abs(rawYear - notchYear)
      if (diff < minDiff) {
        minDiff = diff
        closestYear = notchYear
      }
    }

    // Snap if within 8 years of a notch
    if (minDiff <= 8) {
      return closestYear
    }

    return Math.round(rawYear)
  }, [])

  const handleMove = useCallback((clientX) => {
    if (!trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    const newYear = percentToYear(percent)

    if (newYear !== currentYear) {
      setCurrentYear(newYear)
    }
  }, [percentToYear, currentYear])

  const handleStart = useCallback((clientX) => {
    setIsDragging(true)
    handleMove(clientX)
  }, [handleMove])

  const handleEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault()
    handleStart(e.clientX)
  }

  // Touch events
  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    handleStart(touch.clientX)
  }

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleMove(e.clientX)
      const handleTouchMove = (e) => handleMove(e.touches[0].clientX)

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleEnd)
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
      window.addEventListener('touchend', handleEnd)
      window.addEventListener('touchcancel', handleEnd)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleEnd)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleEnd)
        window.removeEventListener('touchcancel', handleEnd)
      }
    }
  }, [isDragging, handleMove, handleEnd])

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Main panel */}
      <div className="
        relative w-full max-w-md
        bg-gradient-to-b from-[#1a1815] via-[#0f0e0c] to-[#1a1815]
        border border-[#3a3530]
        rounded-lg
        p-6
        shadow-[inset_0_2px_8px_rgba(0,0,0,0.5),0_4px_12px_rgba(0,0,0,0.3)]
      ">
        {/* Corner screws */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm">
          <div className="absolute inset-0.5 border-t border-[#5a4a35] rotate-45" />
        </div>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm">
          <div className="absolute inset-0.5 border-t border-[#5a4a35] rotate-45" />
        </div>
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm">
          <div className="absolute inset-0.5 border-t border-[#5a4a35] rotate-45" />
        </div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm">
          <div className="absolute inset-0.5 border-t border-[#5a4a35] rotate-45" />
        </div>

        {/* Year display */}
        <div className="flex justify-center mb-6">
          <div className="
            px-6 py-3
            bg-gradient-to-b from-[#0a0805] to-[#151210]
            border-2 border-[#3a3025]
            rounded-sm
            shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]
          ">
            <span
              className="text-3xl sm:text-4xl font-mono font-bold text-[#ff6b35]"
              style={{
                textShadow: '0 0 20px rgba(255,107,53,0.8), 0 0 40px rgba(255,107,53,0.5)'
              }}
            >
              {currentYear}
            </span>
          </div>
        </div>

        {/* Dial track - Rotary phone style */}
        <div className="relative px-4">
          <div className="
            relative h-6
            bg-gradient-to-b from-[#1a1510] to-[#252015]
            border-2 border-[#3a3025]
            rounded-full
            shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]
          ">
            <div
              ref={trackRef}
              className="
                absolute top-1/2 -translate-y-1/2 left-4 right-4
                h-4
                bg-gradient-to-b from-[#0a0805] to-[#151210]
                rounded-full
                shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]
                cursor-pointer
              "
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {/* Dial holes/notches */}
              {KEY_YEARS.map(year => (
                <div
                  key={year}
                  className={`
                    absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                    w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full
                    ${year === currentYear
                      ? 'bg-[#c9a86c] shadow-[0_0_6px_rgba(201,168,108,0.6)]'
                      : 'bg-[#2a2520] border border-[#3a3530]'}
                    transition-all duration-300
                  `}
                  style={{ left: `${yearToPercent(year)}%` }}
                />
              ))}

              {/* Dial finger wheel */}
              <div
                className={`
                  absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                  w-8 h-8 sm:w-10 sm:h-10
                  ${isDragging ? 'scale-110' : 'scale-100'}
                `}
                style={{
                  left: `${yearToPercent(currentYear)}%`,
                  transition: isDragging ? 'transform 0.1s ease-out' : 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease-out'
                }}
              >
                <div className="
                  w-full h-full rounded-full
                  bg-gradient-to-br from-[#d4b896] via-[#c9a86c] to-[#8b7355]
                  border-2 border-[#a08050]
                  shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_2px_0_rgba(255,255,255,0.3)]
                  cursor-grab active:cursor-grabbing
                ">
                  {/* Center hole */}
                  <div className="
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-3 h-3 sm:w-4 sm:h-4 rounded-full
                    bg-gradient-to-b from-[#0a0805] to-[#1a1510]
                    border border-[#3a3025]
                    shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]
                  " />
                  {/* Finger stop indicator */}
                  <div className="
                    absolute top-1 left-1/2 -translate-x-1/2
                    w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full
                    bg-[#ff6b35]
                    shadow-[0_0_6px_rgba(255,107,53,0.8)]
                  " />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Year labels */}
        <div className="relative h-6 mt-3 mx-4">
          {[1763, 1867, 1965, 2025].map(year => (
            <button
              key={year}
              onClick={() => setCurrentYear(year)}
              className={`
                absolute -translate-x-1/2
                text-[9px] sm:text-[10px] font-mono
                transition-all duration-300
                hover:text-[#c9a86c]
                ${year === currentYear
                  ? 'text-[#c9a86c] scale-110'
                  : 'text-[#b5a5a0]'
                }
              `}
              style={{ left: `${yearToPercent(year)}%` }}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive hint */}
      <p className="text-xs text-neutral-500 italic text-center">
        Drag the dial or click year labels to navigate through history
      </p>
    </div>
  )
}

export default YearLeverDemo
