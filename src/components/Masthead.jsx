import { useState, useEffect } from 'react'
import Ornament from './ui/Ornament'
import { SoundToggle, useSounds } from './ui/SoundManager'

const sections = [
  { id: 'front', label: 'Front Page' },
  { id: 'works', label: 'The Works' },
  { id: 'about', label: 'The Author' },
  { id: 'contact', label: 'Classifieds' },
]

// Title text for letter-by-letter animation
const TITLE_TEXT = 'THE JULIO CALVO TIMES'
const SUBTITLE_TEXT = '"All the Code That\'s Fit to Ship"'

function Masthead({ activeSection, onSectionChange }) {
  const { playClick, playHover } = useSounds()
  const [isVisible, setIsVisible] = useState(false)
  const now = new Date()

  // Trigger entrance animation on mount
  useEffect(() => {
    // Small delay to ensure smooth animation after page load
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Format date: TUESDAY, NOVEMBER 25, 2025
  const today = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase()

  // Calculate volume and issue number based on date
  // Volume = years since 2024 (starting at 1)
  // Issue = days since Jan 1, 2024
  const startDate = new Date('2024-01-01')
  const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24))
  const volume = now.getFullYear() - 2023 // Vol. I in 2024, Vol. II in 2025, etc.
  const issueNumber = daysSinceStart + 1

  // Convert volume to Roman numerals
  const toRoman = (num) => {
    const romanNumerals = [
      ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
      ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
      ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
    ]
    let result = ''
    for (const [letter, value] of romanNumerals) {
      while (num >= value) {
        result += letter
        num -= value
      }
    }
    return result
  }

  const volumeRoman = toRoman(volume)

  return (
    <header className="px-3 sm:px-6 md:px-8 pt-3 sm:pt-6 pb-3 sm:pb-4 border-b-2 border-neutral-600">
      {/* Top meta line */}
      <div className="flex justify-between items-center text-[8px] sm:text-[10px] tracking-wider sm:tracking-widest text-neutral-500 mb-2 sm:mb-4">
        <span className="hidden sm:inline">VOL. {volumeRoman} · NO. {issueNumber.toLocaleString()}</span>
        <span className="sm:hidden text-[7px]">VOL. {volumeRoman}</span>
        <span className="hidden lg:inline absolute left-1/2 -translate-x-1/2">LATE EDITION</span>
        <div className="flex items-start gap-2 sm:gap-4">
          <span className="text-right text-[7px] sm:text-[10px] mt-2">
            <span className="hidden md:inline">TORONTO, </span>
            {today}
          </span>
          <SoundToggle />
        </div>
      </div>

      {/* Top ornament */}
      <Ornament />

      {/* Main title - NYT Style - Click to go HOME */}
      <div className="text-center py-3 sm:py-6 parallax-element overflow-hidden" data-speed="0.08">
        <h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance px-1 sm:px-0 cursor-pointer hover:opacity-70 transition-opacity duration-200 flex justify-center flex-wrap"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: '0.01em',
            fontWeight: 900,
            lineHeight: '1.1',
          }}
          onClick={() => { playClick(); onSectionChange('front') }}
          onMouseEnter={playHover}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSectionChange('front')}
        >
          {TITLE_TEXT.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                // Printing press "stamp" effect - scales down from large with a quick snap
                transform: isVisible
                  ? 'scale(1) translateY(0)'
                  : 'scale(2.5) translateY(-10px)',
                opacity: isVisible ? 1 : 0,
                transition: 'transform 0.15s cubic-bezier(0.32, 0, 0.67, 0), opacity 0.1s ease-out',
                transitionDelay: `${i * 0.04}s`,
                whiteSpace: char === ' ' ? 'pre' : 'normal',
                minWidth: char === ' ' ? '0.25em' : 'auto',
                // Slight blur when "unstamped" for ink effect
                filter: isVisible ? 'blur(0px)' : 'blur(2px)',
              }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p
          className="text-[8px] sm:text-[10px] md:text-xs tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 mt-1 sm:mt-3 uppercase flex justify-center flex-wrap"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {SUBTITLE_TEXT.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                // Typewriter effect - appears with slight vertical movement
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(-3px)',
                transition: 'opacity 0.05s ease-out, transform 0.1s ease-out',
                // Subtitle starts after title finishes stamping
                transitionDelay: `${0.9 + i * 0.025}s`,
                whiteSpace: char === ' ' ? 'pre' : 'normal',
                minWidth: char === ' ' ? '0.2em' : 'auto',
              }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>

      {/* Bottom ornament */}
      <Ornament />

      {/* Navigation */}
      <nav className="flex justify-center flex-wrap gap-1 sm:gap-3 md:gap-6 mt-3 sm:mt-4 pt-3 border-t border-neutral-200">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => { playClick(); onSectionChange(section.id) }}
            onMouseEnter={playHover}
            className={`relative text-[9px] sm:text-[10px] md:text-xs tracking-wider sm:tracking-widest px-2 sm:px-3 py-2 sm:py-2 min-h-[44px] flex items-center transition-colors duration-200 group ${
              activeSection === section.id
                ? 'text-neutral-900 font-bold'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            {section.label.toUpperCase()}
            {/* Animated underline */}
            <span
              className={`absolute bottom-1 left-1/2 h-[2px] bg-neutral-900 transition-all duration-300 ease-out ${
                activeSection === section.id
                  ? 'w-[calc(100%-16px)] -translate-x-1/2'
                  : 'w-0 -translate-x-1/2 group-hover:w-[calc(100%-16px)]'
              }`}
            />
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Masthead
