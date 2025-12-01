import { useState, useRef, useEffect } from 'react'
import { Maximize2, Pause, Play, Gamepad2, Video } from 'lucide-react'
import VeraHighlightShowcase from './VeraHighlightShowcase'

/**
 * Video Player for the highlight showcase
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
 * Tabbed showcase: Interactive Demo | Video
 */
export default function HighlightShowcaseTabs() {
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
          <VeraHighlightShowcase />
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
          <VideoPlayer src="/videos/highlights-final-video.mp4" />
        </div>
      </div>
    </div>
  )
}
