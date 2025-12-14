'use client'

import { useState, useEffect, useCallback } from 'react'

// Key historical years for Ontario flag
const KEY_YEARS = [1763, 1791, 1867, 1868, 1921, 1922, 1957, 1965, 2025]

const HISTORICAL_EVENTS = {
  1763: { title: 'Treaty of Paris', description: 'New France ceded to Britain' },
  1791: { title: 'Constitutional Act', description: 'Upper Canada established' },
  1867: { title: 'Confederation', description: 'Province of Ontario created' },
  1868: { title: 'First Ontario Flag', description: 'Canadian Red Ensign adopted' },
  1921: { title: 'New Coat of Arms', description: 'Canadian shield updated' },
  1922: { title: 'Ensign Updated', description: 'New coat of arms on flag' },
  1957: { title: 'Red Maple Leaves', description: 'Ensign design modified' },
  1965: { title: 'Ontario Flag Adopted', description: 'Current provincial flag' },
  2025: { title: 'Present Day', description: 'Ontario today' }
}

/**
 * Interactive Nixie Tube year display demo from Ontario Flag Time Machine
 * Shows glowing orange digits with historical context
 */
export function NixieTubeDemo() {
  const [year, setYear] = useState(1965)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedEvent, setDisplayedEvent] = useState(HISTORICAL_EVENTS[1965])

  // Find closest key year for event display - only update when NOT animating
  const closestKeyYear = KEY_YEARS.reduce((prev, curr) =>
    Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
  )
  const currentEvent = Math.abs(closestKeyYear - year) <= 5 ? HISTORICAL_EVENTS[closestKeyYear] : null

  // Animate to a specific year
  const animateToYear = useCallback((targetYear) => {
    setIsAnimating(true)
    setDisplayedEvent(null) // Hide event during animation
    const startYear = year
    const diff = targetYear - startYear
    const steps = Math.min(Math.abs(diff), 30)
    const stepSize = diff / steps
    let step = 0

    const interval = setInterval(() => {
      step++
      if (step >= steps) {
        setYear(targetYear)
        setIsAnimating(false)
        // Show event only after animation completes
        const closest = KEY_YEARS.reduce((prev, curr) =>
          Math.abs(curr - targetYear) < Math.abs(prev - targetYear) ? curr : prev
        )
        if (Math.abs(closest - targetYear) <= 5) {
          setDisplayedEvent(HISTORICAL_EVENTS[closest])
        }
        clearInterval(interval)
      } else {
        setYear(Math.round(startYear + stepSize * step))
      }
    }, 30)
  }, [year])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setYear(y => Math.min(2025, y + (e.shiftKey ? 10 : 1)))
      } else if (e.key === 'ArrowLeft') {
        setYear(y => Math.max(1763, y - (e.shiftKey ? 10 : 1)))
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        // Jump to next/prev key year
        const currentIndex = KEY_YEARS.findIndex(y => y >= year)
        const nextIndex = e.key === 'ArrowUp'
          ? Math.min(KEY_YEARS.length - 1, currentIndex + 1)
          : Math.max(0, currentIndex - 1)
        animateToYear(KEY_YEARS[nextIndex])
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [year, animateToYear])

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Main display panel */}
      <div className="
        relative
        bg-gradient-to-b from-[#1a1815] via-[#0f0e0c] to-[#1a1815]
        border border-[#3a3530]
        rounded-lg
        p-6 sm:p-8
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

        {/* Nixie tube display */}
        <div className="
          relative px-6 sm:px-8 py-4 sm:py-5
          bg-gradient-to-b from-[#0a0805] to-[#151210]
          border-2 border-[#3a3025]
          rounded-sm
          shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_4px_8px_rgba(0,0,0,0.4)]
        ">
          {/* Glass tube effect */}
          <div className="absolute inset-2 bg-gradient-to-b from-[#1a1510]/50 to-transparent rounded-sm pointer-events-none" />

          {/* Year digits */}
          <div className="relative flex items-baseline justify-center gap-0.5 sm:gap-1">
            {String(year).split('').map((digit, i) => (
              <div key={i} className="relative">
                {/* Tube container */}
                <div className="
                  w-10 h-14 sm:w-14 sm:h-20
                  bg-gradient-to-b from-[#0a0805] to-[#0f0c08]
                  rounded-sm
                  border border-[#2a2520]
                  flex items-center justify-center
                  shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]
                ">
                  <span
                    className={`
                      text-4xl sm:text-5xl font-mono font-bold
                      text-[#ff6b35]
                      transition-all duration-100
                      ${isAnimating ? 'opacity-80' : 'opacity-100'}
                    `}
                    style={{
                      textShadow: '0 0 20px rgba(255,107,53,0.8), 0 0 40px rgba(255,107,53,0.5), 0 0 60px rgba(255,107,53,0.3)',
                      filter: 'blur(0.3px)'
                    }}
                  >
                    {digit}
                  </span>
                </div>
                {/* Tube base */}
                <div className="
                  absolute -bottom-1 left-1/2 -translate-x-1/2
                  w-6 sm:w-8 h-1.5
                  bg-gradient-to-b from-[#3a3025] to-[#252015]
                  rounded-b-sm
                " />
              </div>
            ))}
          </div>

          {/* Label */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-[#b5a5a0] font-mono uppercase">
              Temporal Position
            </span>
          </div>
        </div>

        {/* Event display */}
        <div className="mt-8 h-12 flex items-center justify-center">
          {displayedEvent && !isAnimating ? (
            <div className="text-center">
              <p className="text-xs sm:text-sm text-[#c9a86c] font-serif">{displayedEvent.title}</p>
              <p className="text-[10px] sm:text-xs text-[#b5a5a0] mt-0.5">{displayedEvent.description}</p>
            </div>
          ) : isAnimating ? (
            <p className="text-[10px] sm:text-xs text-[#a5a0a0]/50 italic">Traveling through time...</p>
          ) : (
            <p className="text-[10px] sm:text-xs text-[#a5a0a0]/50 italic">Navigate to a key year...</p>
          )}
        </div>

        {/* Era buttons */}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {KEY_YEARS.map(keyYear => (
            <button
              key={keyYear}
              onClick={() => animateToYear(keyYear)}
              className={`
                px-2 py-1 sm:px-3 sm:py-1.5
                text-[9px] sm:text-[10px] font-mono
                rounded-sm
                border
                transition-all duration-200
                ${year === keyYear || (Math.abs(year - keyYear) <= 5 && currentEvent)
                  ? 'bg-[#c9a86c]/20 border-[#c9a86c] text-[#c9a86c]'
                  : 'bg-[#1a1510] border-[#3a3025] text-[#b5a5a0] hover:border-[#5a5045] hover:text-[#c9a86c]'
                }
              `}
            >
              {keyYear}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive hint */}
      <p className="text-xs text-neutral-500 italic text-center">
        Click year buttons or use arrow keys to navigate
      </p>
    </div>
  )
}

export default NixieTubeDemo
