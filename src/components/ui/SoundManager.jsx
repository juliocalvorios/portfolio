import { useEffect, useRef, useState, useCallback, createContext, useContext } from 'react'
import { Howl, Howler } from 'howler'

// The Julio Calvo Times - Sound Assets
const SOUNDS = {
  typewriterKey: 'https://cdn.jsdelivr.net/gh/stepanosada/audio/Click.mp3',
  paperRustle: 'https://cdn.jsdelivr.net/gh/stepanosada/audio/hover-cut.mp3',
  newsroomAmbience: 'https://cdn.jsdelivr.net/gh/stepanosada/audio/background.mp3'
}

// Context for sound state
const SoundContext = createContext(null)

export function useSounds() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSounds must be used within a SoundProvider')
  }
  return context
}

export function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false) // Start with sound ON by default
  const [isInitialized, setIsInitialized] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)

  const clickSoundRef = useRef(null)
  const hoverSoundRef = useRef(null)
  const backgroundMusicRef = useRef(null)

  // Initialize sounds - optimized for memory
  useEffect(() => {
    // Typewriter key click for button presses
    clickSoundRef.current = new Howl({
      src: [SOUNDS.typewriterKey],
      volume: 0.5,
      preload: true,
      pool: 3
    })

    // Paper rustle for hover interactions
    hoverSoundRef.current = new Howl({
      src: [SOUNDS.paperRustle],
      volume: 0.3,
      preload: true,
      pool: 2
    })

    // Newsroom ambience - background music
    backgroundMusicRef.current = new Howl({
      src: [SOUNDS.newsroomAmbience],
      volume: 0.15,
      loop: true,
      html5: true, // Stream instead of loading entire file into memory
      preload: false, // Don't preload - load on first play
      onplay: () => {
        setMusicPlaying(true)
      },
      onpause: () => {
        setMusicPlaying(false)
      },
      onstop: () => {
        setMusicPlaying(false)
      }
    })

    setIsInitialized(true)

    return () => {
      clickSoundRef.current?.unload()
      hoverSoundRef.current?.unload()
      backgroundMusicRef.current?.unload()
    }
  }, [])

  // Handle mute state
  useEffect(() => {
    Howler.mute(isMuted)

    if (isMuted) {
      // Pause music when muted
      if (backgroundMusicRef.current?.playing()) {
        backgroundMusicRef.current.pause()
      }
    } else {
      // Resume/start music when unmuted (will load on first play since preload: false)
      if (backgroundMusicRef.current && !backgroundMusicRef.current.playing()) {
        backgroundMusicRef.current.play()
      }
    }
  }, [isMuted])

  const playClick = useCallback(() => {
    if (!isMuted && clickSoundRef.current) {
      clickSoundRef.current.play()
    }
  }, [isMuted])

  const playHover = useCallback(() => {
    if (!isMuted && hoverSoundRef.current) {
      hoverSoundRef.current.play()
    }
  }, [isMuted])

  const toggleMusic = useCallback(() => {
    if (!backgroundMusicRef.current) return

    if (musicPlaying) {
      backgroundMusicRef.current.pause()
      setMusicPlaying(false)
    } else {
      backgroundMusicRef.current.play()
      setMusicPlaying(true)
    }
  }, [musicPlaying])

  const startMusic = useCallback(() => {
    if (!isMuted && backgroundMusicRef.current && !musicPlaying) {
      backgroundMusicRef.current.play()
      setMusicPlaying(true)
    }
  }, [isMuted, musicPlaying])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  // Enable sounds (for first user interaction)
  const enableSounds = useCallback(() => {
    if (isMuted) {
      setIsMuted(false)
      // Start background music after enabling
      setTimeout(() => {
        if (backgroundMusicRef.current && !musicPlaying) {
          backgroundMusicRef.current.play()
          setMusicPlaying(true)
        }
      }, 100)
    }
  }, [isMuted, musicPlaying])

  const value = {
    isMuted,
    isInitialized,
    musicPlaying,
    playClick,
    playHover,
    toggleMusic,
    startMusic,
    toggleMute,
    enableSounds
  }

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  )
}

// Sound Toggle Button Component - Typewriter Key Design
export function SoundToggle({ className = '' }) {
  const { isMuted, toggleMute } = useSounds()

  return (
    <button
      onClick={toggleMute}
      className={`relative ${className}`}
      aria-label={isMuted ? 'Enable sound' : 'Mute sound'}
      aria-pressed={!isMuted}
      title={isMuted ? 'Turn sound on' : 'Turn sound off'}
    >
            {/* Tecla */}
      <span
        className={`
          block relative w-7 h-7 rounded-full border-2 transition-all duration-100
          ${isMuted
            ? 'bg-neutral-200 border-neutral-300 translate-y-0'
            : 'bg-neutral-100 border-neutral-400 translate-y-0.5'
          }
        `}
        style={{
          boxShadow: isMuted
            ? '0 3px 0 #a3a3a3, 0 4px 6px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(0,0,0,0.1)'
            : '0 1px 0 #a3a3a3, 0 2px 3px rgba(0,0,0,0.15), inset 0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {/* Círculo interior con símbolo */}
        <span
          className={`
            absolute inset-1 rounded-full flex items-center justify-center
            transition-colors duration-100
            ${isMuted ? 'bg-neutral-300' : 'bg-neutral-800'}
          `}
        >
          <span
            className={`
              text-xs font-serif transition-colors duration-100
              ${isMuted ? 'text-neutral-500' : 'text-paper'}
            `}
          >
            ♪
          </span>
        </span>
        {/* Reflejo de la tecla */}
        <span className="absolute top-0.5 left-1.5 w-2 h-0.5 bg-white/30 rounded-full" />
      </span>
    </button>
  )
}

export default SoundProvider
