'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

const KEY_YEARS = [1763, 1791, 1841, 1867, 1868, 1922, 1957, 1965, 2025]

const HISTORICAL_EVENTS = {
  1763: { title: 'Treaty of Paris', flagImpact: 'Union Jack becomes flag of British North America' },
  1791: { title: 'Upper Canada Created', flagImpact: 'Upper Canada established as British colony' },
  1867: { title: 'Confederation', flagImpact: 'Ontario becomes a province; Red Ensign emerges' },
  1868: { title: 'Arms Granted', flagImpact: "Shield: St. George's Cross + three golden maple leaves" },
  1922: { title: 'New Coat of Arms', flagImpact: 'Red Ensign updated with new shield design' },
  1965: { title: 'Ontario Flag Adopted', flagImpact: 'Current flag raised May 21, 1965' },
  2025: { title: 'Present Day', flagImpact: 'The flag as it flies today' }
}

function getFlagForYear(year) {
  if (year < 1868) return { era: year < 1791 ? 'Pre-1791' : year < 1867 ? '1791–1867' : '1867', src: '/flags/union-jack.svg', redColor: '#C8102E' }
  if (year < 1922) return { era: '1868–1921', src: '/flags/canada-1868-1921.svg', redColor: '#CE1126' }
  if (year < 1965) return { era: '1922–1964', src: '/flags/canada-1921-1957.svg', redColor: '#CE1126' }
  return { era: '1965–present', src: '/flags/ontario.svg', redColor: '#C8102E' }
}

/**
 * Collage-style layout - All elements in a vintage control panel
 * Two-column grid: Flag+Switches | Controls+Timeline
 */
export function OntarioFlagCollageDemo() {
  const [currentYear, setCurrentYear] = useState(1965)
  const [isDragging, setIsDragging] = useState(false)
  const [showUnionJack, setShowUnionJack] = useState(true)
  const [showShield, setShowShield] = useState(true)
  const trackRef = useRef(null)

  const minYear = 1763
  const maxYear = 2025
  const flagInfo = getFlagForYear(currentYear)
  const currentEvent = HISTORICAL_EVENTS[currentYear]
  const canToggle = currentYear >= 1868

  const yearToPercent = (year) => ((year - minYear) / (maxYear - minYear)) * 100

  const percentToYear = useCallback((percent) => {
    const rawYear = minYear + (percent / 100) * (maxYear - minYear)
    let closest = KEY_YEARS[0], minDiff = Math.abs(rawYear - KEY_YEARS[0])
    for (const y of KEY_YEARS) {
      const diff = Math.abs(rawYear - y)
      if (diff < minDiff) { minDiff = diff; closest = y }
    }
    return minDiff <= 8 ? closest : Math.round(rawYear)
  }, [])

  const handleMove = useCallback((clientX) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setCurrentYear(percentToYear(percent))
  }, [percentToYear])

  const handleMouseDown = (e) => { e.preventDefault(); setIsDragging(true); handleMove(e.clientX) }
  const handleTouchStart = (e) => { setIsDragging(true); handleMove(e.touches[0].clientX) }

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e) => handleMove(e.clientX || e.touches?.[0]?.clientX)
    const onEnd = () => setIsDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onEnd)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onEnd)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [isDragging, handleMove])

  const importantYears = [1763, 1867, 1922, 1965, 2025]

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      {/* ============================================ */}
      {/* MAIN PANEL - Vintage control panel background */}
      {/* ============================================ */}
      <div className="
        relative
        bg-gradient-to-b from-[#1a1815] via-[#0f0e0c] to-[#1a1815]
        border border-[#3a3530]
        rounded-lg
        p-4 sm:p-6 lg:p-8
        shadow-[inset_0_2px_8px_rgba(0,0,0,0.5),0_4px_12px_rgba(0,0,0,0.3)]
      ">
        {/* Corner screws */}
        <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm">
          <div className="absolute inset-0.5 border-t border-[#5a4a35] rotate-45" />
        </div>
        <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm">
          <div className="absolute inset-0.5 border-t border-[#5a4a35] rotate-45" />
        </div>
        <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm">
          <div className="absolute inset-0.5 border-t border-[#5a4a35] rotate-45" />
        </div>
        <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm">
          <div className="absolute inset-0.5 border-t border-[#5a4a35] rotate-45" />
        </div>

        {/* ============================================ */}
        {/* TWO COLUMN LAYOUT */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* LEFT COLUMN: Flag + Switches */}
          <div className="flex flex-col items-center gap-6">
            {/* Flag Display */}
            <div
              className="relative overflow-hidden"
              style={{ border: '2px solid #3a3025', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)' }}
            >
              <div className="w-64 sm:w-72 aspect-[2/1]">
                <img
                  src={flagInfo.src}
                  alt={`Flag for era ${flagInfo.era}`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay to hide Union Jack */}
                {canToggle && !showUnionJack && (
                  <div
                    className="absolute top-0 left-0 w-1/2 h-1/2 transition-opacity duration-500"
                    style={{ backgroundColor: flagInfo.redColor }}
                  />
                )}
                {/* Overlay to hide Shield */}
                {canToggle && !showShield && (
                  <div
                    className="absolute transition-opacity duration-500"
                    style={{
                      backgroundColor: flagInfo.redColor,
                      top: '12%',
                      right: '8%',
                      width: '30%',
                      height: '76%'
                    }}
                  />
                )}
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[9px] sm:text-[10px] text-white/80 font-mono tracking-wide">
                {flagInfo.era}
              </div>
            </div>

            {/* Switches */}
            <div className="flex justify-center gap-8 sm:gap-10">
              <VintageSwitch
                label="UNION JACK"
                isOn={showUnionJack}
                onToggle={() => canToggle && setShowUnionJack(!showUnionJack)}
                disabled={!canToggle}
              />
              <VintageSwitch
                label="SHIELD"
                isOn={showShield}
                onToggle={() => canToggle && setShowShield(!showShield)}
                disabled={!canToggle}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Nixie + Event + Timeline */}
          <div className="flex flex-col gap-4">
            {/* Nixie Tube Display */}
            <div className="flex justify-center">
              <div className="
                relative px-6 sm:px-8 py-3 sm:py-4
                bg-gradient-to-b from-[#0a0805] to-[#151210]
                border-2 border-[#3a3025]
                rounded-sm
                shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_4px_8px_rgba(0,0,0,0.4)]
              ">
                <div className="absolute inset-2 bg-gradient-to-b from-[#1a1510]/50 to-transparent rounded-sm" />
                <div className="relative flex items-baseline gap-1">
                  {String(currentYear).split('').map((digit, i) => (
                    <span
                      key={i}
                      className="text-4xl sm:text-5xl font-mono font-bold text-[#ff6b35] drop-shadow-[0_0_10px_rgba(255,107,53,0.8)] transition-all duration-150"
                      style={{ textShadow: '0 0 20px rgba(255,107,53,0.6), 0 0 40px rgba(255,107,53,0.4)' }}
                    >
                      {digit}
                    </span>
                  ))}
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#b5a5a0] font-mono">TEMPORAL POSITION</span>
                </div>
              </div>
            </div>

            {/* Event Display */}
            <div className="h-14 sm:h-16 flex items-center justify-center mt-2">
              {currentEvent ? (
                <div className="text-center animate-fade-in">
                  <p className="text-sm text-[#c9a86c] font-serif">{currentEvent.title}</p>
                  <p className="text-xs text-[#b5a5a0] mt-1">{currentEvent.flagImpact}</p>
                </div>
              ) : (
                <p className="text-xs text-[#a5a0a0] italic">Move lever to a key year...</p>
              )}
            </div>

            {/* Timeline / Dial Lever */}
            <div className="relative px-2">
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
                  {/* Notches */}
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

                  {/* Dial wheel */}
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
                      <div className="
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-3 h-3 sm:w-4 sm:h-4 rounded-full
                        bg-gradient-to-b from-[#0a0805] to-[#1a1510]
                        border border-[#3a3025]
                        shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]
                      " />
                      <div className="
                        absolute top-0.5 sm:top-1 left-1/2 -translate-x-1/2
                        w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full
                        bg-[#ff6b35]
                        shadow-[0_0_6px_rgba(255,107,53,0.8)]
                      " />
                    </div>
                  </div>
                </div>
              </div>

              {/* Year labels */}
              <div className="relative h-6 mt-1">
                {importantYears.map(year => (
                  <button
                    key={year}
                    onClick={() => setCurrentYear(year)}
                    className={`
                      absolute -translate-x-1/2
                      text-[9px] sm:text-[10px] font-mono
                      transition-all duration-300
                      hover:text-[#c9a86c]
                      ${year === currentYear ? 'text-[#c9a86c] scale-110' : 'text-[#b5a5a0]'}
                    `}
                    style={{ left: `calc(${yearToPercent(year)}% + 8px)` }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#2a2520]">
          <p className="text-[9px] sm:text-xs text-[#7a7570] italic text-center">
            Drag, click, toggle. 260 years of history, 73 tests behind it.
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// VintageSwitch - Classic vertical slider switch
// ============================================
function VintageSwitch({ label, isOn, onToggle, disabled = false }) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Label plate */}
      <div className="relative">
        <div className="
          px-2 sm:px-3 py-1
          bg-gradient-to-b from-[#2a2520] to-[#1a1510]
          border border-[#3a3530]
          text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-[#d4c4b0]
          font-mono uppercase
          shadow-inner
        ">
          {label}
        </div>
        {/* Screws */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm" />
      </div>

      {/* Switch housing */}
      <div
        className={`relative ${disabled ? 'opacity-50' : 'cursor-pointer'}`}
        onClick={() => !disabled && onToggle()}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        <div className="
          w-12 h-20 sm:w-16 sm:h-24
          bg-gradient-to-b from-[#1a1510] via-[#252015] to-[#1a1510]
          border-2 border-[#3a3025]
          rounded-sm
          shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.3)]
        ">
          {/* Status indicator lights */}
          <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
            <div className={`
              w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full
              transition-all duration-300
              ${isOn
                ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]'
                : 'bg-[#2a2520]'
              }
            `} />
            <div className={`
              w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full
              transition-all duration-300
              ${!isOn
                ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                : 'bg-[#2a2520]'
              }
            `} />
          </div>

          {/* Switch track */}
          <div className="
            absolute top-6 sm:top-8 left-1/2 -translate-x-1/2
            w-5 h-10 sm:w-6 sm:h-12
            bg-gradient-to-b from-[#0a0805] to-[#151210]
            rounded-full
            border border-[#3a3025]
            shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]
          ">
            {/* Switch lever */}
            <div
              className={`
                absolute left-1/2 -translate-x-1/2
                w-4 h-5 sm:w-5 sm:h-6
                bg-gradient-to-b from-[#d4b896] via-[#c9a86c] to-[#8b7355]
                rounded-sm
                border border-[#a08050]
                shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                transition-all duration-150 ease-out
                ${isOn ? 'top-0.5 sm:top-1' : 'top-4 sm:top-5'}
                ${isPressed ? 'scale-95' : 'scale-100'}
              `}
            >
              {/* Grip lines */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-0.5">
                <div className="w-2.5 sm:w-3 h-px bg-[#8b7355]" />
                <div className="w-2.5 sm:w-3 h-px bg-[#8b7355]" />
                <div className="w-2.5 sm:w-3 h-px bg-[#8b7355]" />
              </div>
            </div>
          </div>

          {/* ON/OFF labels */}
          <div className="absolute bottom-0.5 sm:bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className={`text-[6px] sm:text-[8px] font-mono transition-colors ${isOn ? 'text-green-400' : 'text-[#7a7570]'}`}>
              ON
            </span>
            <span className={`text-[6px] sm:text-[8px] font-mono transition-colors ${!isOn ? 'text-red-400' : 'text-[#7a7570]'}`}>
              OFF
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OntarioFlagCollageDemo
