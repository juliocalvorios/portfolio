import { useState, useEffect, useRef } from 'react'
import { Maximize2, Pause, Play } from 'lucide-react'

/**
 * VeraAcademicModeFlow
 *
 * Visualization of how Academic Mode works.
 * Shows: query → embedding → widget matching → context → real video.
 * - Only starts when visible in viewport (IntersectionObserver)
 * - Video appears BELOW the demo with smooth transition
 * - Clicking dots jumps to that phase but keeps auto-playing
 */

const QUERY = "What should I study today?"

const WIDGETS = [
  { id: 'flashcards', name: 'Flashcards', data: '12 cards due', score: 0.89 },
  { id: 'schedule', name: 'Schedule', data: 'Exam in 3 days', score: 0.76 },
  { id: 'pomodoro', name: 'Pomodoro', data: '2h studied', score: 0.31 },
  { id: 'goals', name: 'Study Goals', data: '3 goals set', score: 0.22 },
]

const THRESHOLD = 0.5

// Timing configuration (in milliseconds)
const PHASE_DURATION = 2000  // Each demo phase lasts 2 seconds

export default function VeraAcademicModeFlow() {
  const [phase, setPhase] = useState(0)           // 0-3: demo phases, 4: video
  const [auto, setAuto] = useState(true)          // Auto-play enabled?
  const [isVisible, setIsVisible] = useState(false)  // Is component in viewport?
  const [hasStarted, setHasStarted] = useState(false) // Has animation started at least once?
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  // Detect when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        // Start animation when first visible
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }  // Trigger when 30% visible
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  // Timer for demo phases (0-3), stops at phase 4 (video takes over)
  // Only runs when: auto is on, component is visible, and has started
  useEffect(() => {
    if (!auto) return
    if (!isVisible) return  // Pause when not visible
    if (!hasStarted) return // Don't start until first visible
    if (phase >= 4) return  // Video phase - no auto advance

    const timer = setTimeout(() => {
      setPhase(p => p + 1)
    }, PHASE_DURATION)

    return () => clearTimeout(timer)
  }, [auto, phase, isVisible, hasStarted])

  // When entering video phase, start playing
  useEffect(() => {
    if (phase === 4 && videoRef.current && isVisible) {
      videoRef.current.currentTime = 0
      const playPromise = videoRef.current.play()
      if (playPromise) {
        playPromise
          .then(() => setIsVideoPlaying(true))
          .catch(() => {})
      }
    }
  }, [phase, isVisible])

  // Pause video when component leaves viewport
  useEffect(() => {
    if (!isVisible && videoRef.current && isVideoPlaying) {
      videoRef.current.pause()
      setIsVideoPlaying(false)
    }
  }, [isVisible, isVideoPlaying])

  // When video ends, loop back to demo
  const handleVideoEnded = () => {
    setIsVideoPlaying(false)
    setPhase(0)
  }

  const toggleVideoPlay = () => {
    if (!videoRef.current) return
    if (isVideoPlaying) {
      videoRef.current.pause()
      setIsVideoPlaying(false)
    } else {
      videoRef.current.play()
      setIsVideoPlaying(true)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen()
      }
    }
  }

  // Jump to a specific phase (keeps auto-play on so it continues)
  const jumpToPhase = (targetPhase) => {
    setPhase(targetPhase)
    // Keep auto on so it continues after this phase
    setAuto(true)
  }

  const relevantWidgets = WIDGETS.filter(w => w.score >= THRESHOLD)
  const isVideoPhase = phase === 4

  return (
    <div ref={containerRef}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <span className="text-[9px] tracking-wider text-neutral-400 uppercase">Academic Mode</span>
        <button
          onClick={() => setAuto(!auto)}
          className="w-5 h-5 flex items-center justify-center rounded bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition-colors"
        >
          {auto ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
        </button>
      </div>

      {/* Demo content - always visible but fades when video is showing */}
      <div
        className="transition-opacity duration-500"
        style={{ opacity: isVideoPhase ? 0.3 : 1 }}
      >
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          {/* Query */}
          <div className="p-3 border-b border-neutral-100">
            <div className="text-[9px] text-neutral-400 mb-1">Query</div>
            <div
              className="text-sm text-neutral-700 transition-opacity duration-300"
              style={{ opacity: phase >= 0 ? 1 : 0.3 }}
            >
              "{QUERY}"
            </div>
          </div>

          {/* Embedding visualization */}
          <div className="p-3 border-b border-neutral-100" style={{ backgroundColor: '#FAFAFA' }}>
            <div className="text-[9px] text-neutral-400 mb-2">Embedding (384 dimensions)</div>
            <div className="flex gap-0.5 h-6 items-end">
              {Array.from({ length: 48 }).map((_, i) => {
                const value = Math.sin(i * 0.3 + phase) * 0.5 + 0.5
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all duration-500"
                    style={{
                      height: phase >= 1 && phase < 4 ? `${value * 100}%` : '10%',
                      backgroundColor: phase >= 1 && phase < 4 ? '#6B7056' : '#e5e7eb',
                      opacity: phase >= 1 && phase < 4 ? 0.4 + value * 0.6 : 0.3,
                    }}
                  />
                )
              })}
            </div>
            <div
              className="text-[9px] text-neutral-400 mt-1.5 font-mono transition-opacity duration-300"
              style={{ opacity: phase >= 1 && phase < 4 ? 1 : 0 }}
            >
              [0.23, -0.45, 0.12, 0.67, -0.33, ...]
            </div>
          </div>

          {/* Widget matching */}
          <div className="p-3">
            <div className="text-[9px] text-neutral-400 mb-2">
              Cosine Similarity <span className="text-neutral-300">· threshold: {THRESHOLD}</span>
            </div>
            <div className="space-y-1.5">
              {WIDGETS.map((w, i) => {
                const isRelevant = w.score >= THRESHOLD
                const showScore = phase >= 2 && phase < 4
                const showSelected = phase >= 3 && phase < 4 && isRelevant

                return (
                  <div
                    key={w.id}
                    className="flex items-center gap-2 transition-all duration-300"
                    style={{
                      opacity: phase >= 2 && phase < 4 ? (showSelected || phase < 3 ? 1 : 0.3) : 0.5,
                    }}
                  >
                    <div className="w-16 text-[10px] text-neutral-600 truncate">{w.name}</div>
                    <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: showScore ? `${w.score * 100}%` : '0%',
                          backgroundColor: isRelevant ? '#6B7056' : '#d1d5db',
                          transitionDelay: `${i * 100}ms`
                        }}
                      />
                    </div>
                    <div
                      className="w-8 text-[9px] text-right font-mono transition-opacity duration-300"
                      style={{
                        opacity: showScore ? 1 : 0,
                        color: isRelevant ? '#6B7056' : '#999'
                      }}
                    >
                      {w.score.toFixed(2)}
                    </div>
                    {showSelected && (
                      <div className="text-[9px] text-green-600">✓</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Context sent to AI */}
          {phase >= 3 && phase < 4 && (
            <div className="px-3 pb-3">
              <div className="p-2 rounded bg-neutral-50 border border-neutral-200">
                <div className="text-[9px] text-neutral-400 mb-1">Context → AI</div>
                <div className="text-[10px] text-neutral-600 font-mono">
                  {relevantWidgets.map(w => (
                    <div key={w.id}>{w.name}: {w.data}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video section - appears below with smooth height transition */}
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: isVideoPhase ? '500px' : '0px',
          opacity: isVideoPhase ? 1 : 0,
          marginTop: isVideoPhase ? '12px' : '0px'
        }}
      >
        <div className="relative group">
          <div className="rounded-lg border border-neutral-200 overflow-hidden bg-neutral-100">
            {/* Video header */}
            <div className="p-3 border-b border-neutral-100 bg-white">
              <div className="text-[9px] text-neutral-400 mb-1">Under the Hood</div>
              <div className="text-sm text-neutral-700">Real embedding visualization</div>
            </div>
            {/* Video */}
            <video
              ref={videoRef}
              src="/videos/embeddings.mp4"
              muted
              playsInline
              onEnded={handleVideoEnded}
              className="w-full h-auto bg-neutral-100"
            />
          </div>
          {/* Video controls - same style as VideoPlayer */}
          {isVideoPhase && (
            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={toggleVideoPlay}
                className="w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-lg flex items-center justify-center cursor-pointer"
                aria-label={isVideoPlaying ? 'Pause' : 'Play'}
              >
                {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={handleFullscreen}
                className="w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-lg flex items-center justify-center cursor-pointer"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress indicator: Demo → Video */}
      <div className="flex justify-center items-center gap-2 mt-2.5">
        {/* Demo label */}
        <button
          onClick={() => jumpToPhase(0)}
          className="flex items-center gap-1"
        >
          <span
            className="text-[9px] transition-all duration-200"
            style={{
              color: !isVideoPhase ? '#6B7056' : '#999',
              fontWeight: !isVideoPhase ? 500 : 400
            }}
          >
            Demo
          </span>
        </button>

        {/* Phase dots for demo */}
        <div className="flex gap-1">
          {[0, 1, 2, 3].map(i => (
            <button
              key={i}
              onClick={() => jumpToPhase(i)}
              className="p-0.5"
            >
              <div
                className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: i <= phase && phase < 4 ? '#6B7056' : '#E5E7EB',
                  transform: i === phase && phase < 4 ? 'scale(1.3)' : 'scale(1)'
                }}
              />
            </button>
          ))}
        </div>

        {/* Arrow separator */}
        <span className="text-[9px] text-neutral-300">→</span>

        {/* Video indicator */}
        <button
          onClick={() => jumpToPhase(4)}
          className="flex items-center gap-1"
        >
          <div
            className="w-1.5 h-1.5 rounded-full transition-all duration-200"
            style={{
              backgroundColor: isVideoPhase ? '#6B7056' : '#E5E7EB',
              transform: isVideoPhase ? 'scale(1.3)' : 'scale(1)'
            }}
          />
          <span
            className="text-[9px] transition-all duration-200"
            style={{
              color: isVideoPhase ? '#6B7056' : '#999',
              fontWeight: isVideoPhase ? 500 : 400
            }}
          >
            Video
          </span>
        </button>
      </div>
    </div>
  )
}
