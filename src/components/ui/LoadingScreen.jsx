import { useState, useMemo } from 'react'
import { Howl } from 'howler'

/**
 * Loading Screen Component
 * Click to enter with letter scatter animation effect
 */

// Generate random scatter values for each letter
const generateScatterValues = (text) => {
  return text.split('').map((char, i) => ({
    char,
    // Random direction and distance for scatter effect
    x: (Math.random() - 0.5) * 400,  // -200 to 200px
    y: (Math.random() - 0.5) * 300,  // -150 to 150px
    rotation: (Math.random() - 0.5) * 180, // -90 to 90 degrees
    scale: Math.random() * 0.5, // 0 to 0.5 (shrink while scattering)
    delay: i * 0.02, // Stagger each letter slightly
  }))
}

function LoadingScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false)

  // Pre-generate scatter values so they stay consistent
  const titleLetters = useMemo(() => generateScatterValues('THE JULIO CALVO TIMES'), [])

  const handleEnter = () => {
    // Play click sound to unlock audio and give feedback
    const clickSound = new Howl({
      src: ['https://cdn.jsdelivr.net/gh/stepanosada/audio/Click.mp3'],
      volume: 0.6,
      onload: () => {
        clickSound.play()
      },
      onplay: () => {
        // Start exit animation
        setIsExiting(true)
        // Complete after animation
        setTimeout(() => {
          onComplete?.()
        }, 800) // Increased to allow scatter animation
      },
      onloaderror: () => {
        // If sound fails, still proceed
        setIsExiting(true)
        setTimeout(() => {
          onComplete?.()
        }, 800)
      },
      onplayerror: () => {
        // If play fails, still proceed
        setIsExiting(true)
        setTimeout(() => {
          onComplete?.()
        }, 800)
      }
    })

    // If already cached, play immediately
    if (clickSound.state() === 'loaded') {
      clickSound.play()
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-paper flex items-center justify-center cursor-pointer transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleEnter}
      style={{ transitionDelay: isExiting ? '0.4s' : '0s' }}
    >
      <div className="grain-overlay" aria-hidden="true" />

      <div className="text-center px-4 sm:px-6 relative z-10 max-w-lg mx-auto">
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-3 sm:mb-4 flex justify-center flex-wrap"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900,
          }}
        >
          {titleLetters.map((letter, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-700 ease-out"
              style={{
                transform: isExiting
                  ? `translate(${letter.x}px, ${letter.y}px) rotate(${letter.rotation}deg) scale(${letter.scale})`
                  : 'translate(0, 0) rotate(0deg) scale(1)',
                opacity: isExiting ? 0 : 1,
                transitionDelay: `${letter.delay}s`,
                // Preserve spaces
                whiteSpace: letter.char === ' ' ? 'pre' : 'normal',
                minWidth: letter.char === ' ' ? '0.25em' : 'auto',
              }}
            >
              {letter.char}
            </span>
          ))}
        </h1>

        <p
          className={`text-sm sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-neutral-500 uppercase transition-all duration-500 min-h-[44px] flex items-center justify-center ${
            isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 animate-pulse'
          }`}
        >
          Tap to enter
        </p>

        <div
          className={`mt-6 sm:mt-8 flex items-center justify-center gap-2 transition-all duration-500 ${
            isExiting ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
          style={{ transitionDelay: isExiting ? '0.1s' : '0s' }}
        >
          <span className="text-neutral-300">&#9830;</span>
          <span className="text-neutral-300">&#9830;</span>
          <span className="text-neutral-300">&#9830;</span>
        </div>

        <p
          className={`mt-6 sm:mt-8 text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest text-neutral-400 italic flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-500 ${
            isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{ transitionDelay: isExiting ? '0.15s' : '0s' }}
        >
          Better with headphones
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
          </svg>
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen
