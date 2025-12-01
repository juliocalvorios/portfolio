import { useState, useRef, useEffect } from 'react'
import { Maximize2, Pause, Play, Gamepad2, Video } from 'lucide-react'

/**
 * Video Player component
 */
function VideoPlayer({ src }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded && videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [isLoaded])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
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

  return (
    <div className="relative group overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto bg-neutral-100"
        loop
        muted
        playsInline
        onLoadedData={() => setIsLoaded(true)}
      />
      <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={togglePlay}
          className="w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-lg flex items-center justify-center cursor-pointer"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={handleFullscreen}
          className="w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-lg flex items-center justify-center cursor-pointer"
          aria-label="Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

/**
 * Academic Mode Demo (simplified version without video integration)
 */
const QUERY = "What should I study today?"

const WIDGETS = [
  { id: 'flashcards', name: 'Flashcards', data: '12 cards due', score: 0.89 },
  { id: 'schedule', name: 'Schedule', data: 'Exam in 3 days', score: 0.76 },
  { id: 'pomodoro', name: 'Pomodoro', data: '2h studied', score: 0.31 },
  { id: 'goals', name: 'Study Goals', data: '3 goals set', score: 0.22 },
]

const THRESHOLD = 0.5
const PHASE_DURATION = 2000

function AcademicModeDemo() {
  const [phase, setPhase] = useState(0)
  const [auto, setAuto] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!auto || !isVisible || !hasStarted) return

    const timer = setTimeout(() => {
      setPhase(p => (p + 1) % 4)
    }, PHASE_DURATION)

    return () => clearTimeout(timer)
  }, [auto, phase, isVisible, hasStarted])

  const jumpToPhase = (targetPhase) => {
    setPhase(targetPhase)
    setAuto(true)
  }

  const relevantWidgets = WIDGETS.filter(w => w.score >= THRESHOLD)

  return (
    <div ref={containerRef}>
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <span className="text-[9px] tracking-wider text-neutral-400 uppercase">Academic Mode</span>
        <button
          onClick={() => setAuto(!auto)}
          className="w-5 h-5 flex items-center justify-center rounded bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition-colors"
        >
          {auto ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
        </button>
      </div>

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
                    height: phase >= 1 ? `${value * 100}%` : '10%',
                    backgroundColor: phase >= 1 ? '#6B7056' : '#e5e7eb',
                    opacity: phase >= 1 ? 0.4 + value * 0.6 : 0.3,
                  }}
                />
              )
            })}
          </div>
          <div
            className="text-[9px] text-neutral-400 mt-1.5 font-mono transition-opacity duration-300"
            style={{ opacity: phase >= 1 ? 1 : 0 }}
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
              const showScore = phase >= 2
              const showSelected = phase >= 3 && isRelevant

              return (
                <div
                  key={w.id}
                  className="flex items-center gap-2 transition-all duration-300"
                  style={{
                    opacity: phase >= 2 ? (showSelected || phase < 3 ? 1 : 0.3) : 0.5,
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
        {phase >= 3 && (
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

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-2.5">
        {[0, 1, 2, 3].map(i => (
          <button
            key={i}
            onClick={() => jumpToPhase(i)}
            className="p-0.5"
          >
            <div
              className="rounded-full transition-all duration-200"
              style={{
                width: i === phase ? 16 : 6,
                height: 6,
                backgroundColor: i <= phase ? '#6B7056' : '#E5E7EB',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * Tabbed showcase: Interactive Demo | Video
 */
export default function AcademicFlowTabs() {
  const [activeTab, setActiveTab] = useState('demo')

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('demo')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'demo'
              ? 'bg-white text-neutral-900 border-b-2 border-neutral-900 -mb-px'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          Interactive Demo
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'video'
              ? 'bg-white text-neutral-900 border-b-2 border-neutral-900 -mb-px'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          See it in veraOS
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 relative">
        <div 
          className="transition-all duration-300 ease-out"
          style={{
            opacity: activeTab === 'demo' ? 1 : 0,
            transform: activeTab === 'demo' ? 'translateX(0)' : 'translateX(-20px)',
            position: activeTab === 'demo' ? 'relative' : 'absolute',
            pointerEvents: activeTab === 'demo' ? 'auto' : 'none',
            width: '100%'
          }}
        >
          <AcademicModeDemo />
        </div>
        <div 
          className="transition-all duration-300 ease-out"
          style={{
            opacity: activeTab === 'video' ? 1 : 0,
            transform: activeTab === 'video' ? 'translateX(0)' : 'translateX(20px)',
            position: activeTab === 'video' ? 'relative' : 'absolute',
            pointerEvents: activeTab === 'video' ? 'auto' : 'none',
            top: activeTab === 'video' ? 'auto' : 0,
            left: activeTab === 'video' ? 'auto' : 0,
            right: activeTab === 'video' ? 'auto' : 0,
            width: '100%'
          }}
        >
          <VideoPlayer src="/videos/embeddings.mp4" />
        </div>
      </div>
    </div>
  )
}
