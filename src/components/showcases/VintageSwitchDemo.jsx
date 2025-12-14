'use client'

import { useState } from 'react'

/**
 * Interactive demo of vintage toggle switches from Ontario Flag Time Machine
 * Shows Union Jack and Shield toggles with LED indicators
 */
export function VintageSwitchDemo() {
  const [unionJackOn, setUnionJackOn] = useState(true)
  const [shieldOn, setShieldOn] = useState(true)

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Panel background */}
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

        {/* Title plate */}
        <div className="flex justify-center mb-6">
          <div className="
            px-4 py-1.5
            bg-gradient-to-b from-[#2a2520] to-[#1a1510]
            border border-[#3a3530]
            text-[10px] sm:text-xs tracking-[0.2em] text-[#d4c4b0]
            font-mono uppercase
            shadow-inner
          ">
            Element Controls
          </div>
        </div>

        {/* Switches container */}
        <div className="flex gap-8 sm:gap-12 justify-center">
          <VintageSwitch
            label="Union Jack"
            isOn={unionJackOn}
            onToggle={setUnionJackOn}
          />
          <VintageSwitch
            label="Shield"
            isOn={shieldOn}
            onToggle={setShieldOn}
          />
        </div>

        {/* Status display */}
        <div className="mt-6 flex justify-center">
          <div className="
            px-4 py-2
            bg-gradient-to-b from-[#0a0805] to-[#151210]
            border border-[#3a3025]
            rounded
            shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]
          ">
            <p className="text-[10px] sm:text-xs font-mono text-[#ff6b35] tracking-wider">
              {unionJackOn && shieldOn && 'FULL FLAG DISPLAY'}
              {unionJackOn && !shieldOn && 'CANTON ONLY'}
              {!unionJackOn && shieldOn && 'SHIELD ONLY'}
              {!unionJackOn && !shieldOn && 'MINIMAL MODE'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive hint */}
      <p className="text-xs text-neutral-500 italic">
        Click the switches to toggle flag elements
      </p>
    </div>
  )
}

/**
 * Individual vintage switch component
 */
function VintageSwitch({ label, isOn, onToggle }) {
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    onToggle(!isOn)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Label plate */}
      <div className="relative">
        <div className="
          px-3 py-1
          bg-gradient-to-b from-[#2a2520] to-[#1a1510]
          border border-[#3a3530]
          text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-[#d4c4b0]
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
        className="relative cursor-pointer select-none"
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
      >
        {/* Bakelite housing */}
        <div className="
          w-14 h-20 sm:w-16 sm:h-24
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
            <span className={`text-[7px] sm:text-[8px] font-mono transition-colors ${isOn ? 'text-green-400' : 'text-[#7a7570]'}`}>
              ON
            </span>
            <span className={`text-[7px] sm:text-[8px] font-mono transition-colors ${!isOn ? 'text-red-400' : 'text-[#7a7570]'}`}>
              OFF
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VintageSwitchDemo
