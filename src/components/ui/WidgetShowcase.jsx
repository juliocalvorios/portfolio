import { useEffect, useRef, useState } from 'react'
import { Maximize2, Play } from 'lucide-react'

// Individual Widget Card - Compact version
function WidgetCard({ widget, index, isVisible }) {
  const videoRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Load video when visible
  useEffect(() => {
    if (isVisible && !isLoaded) {
      const timer = setTimeout(() => setIsLoaded(true), 200 + index * 100)
      return () => clearTimeout(timer)
    }
  }, [isVisible, isLoaded, index])

  // Play on hover
  useEffect(() => {
    if (!videoRef.current || !isLoaded) return
    if (isHovered) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isHovered, isLoaded])

  const handleFullscreen = (e) => {
    e.stopPropagation()
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  return (
    <div
      className="group relative"
      style={{ 
        animationDelay: `${index * 120}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The card that emerges */}
      <div
        className={`
          bg-white border border-neutral-200 rounded overflow-hidden
          shadow-sm hover:shadow-md transition-shadow duration-300
          ${isVisible ? 'animate-emerge' : 'opacity-0 -translate-y-full'}
        `}
        style={{ 
          animationDelay: `${index * 120}ms`,
        }}
      >
        {/* Video - Small aspect ratio */}
        <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
          {isLoaded ? (
            <>
              <video
                ref={videoRef}
                src={widget.video}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                preload="none"
                loading="lazy"
              />
              {/* Play overlay */}
              <div className={`
                absolute inset-0 flex items-center justify-center
                bg-black/10 transition-opacity duration-200
                ${isHovered ? 'opacity-0' : 'opacity-100'}
              `}>
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow">
                  <Play className="w-3.5 h-3.5 text-neutral-700 ml-0.5" />
                </div>
              </div>
              {/* Fullscreen */}
              <button
                onClick={handleFullscreen}
                className={`
                  absolute bottom-1.5 right-1.5 w-6 h-6 
                  bg-black/50 hover:bg-black/70 text-white rounded 
                  flex items-center justify-center
                  transition-opacity duration-200
                  ${isHovered ? 'opacity-100' : 'opacity-0'}
                `}
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-500 rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Compact text */}
        <div className="px-2.5 py-2">
          <h4 className="text-xs font-semibold text-neutral-900 leading-tight">
            {widget.name}
          </h4>
          <p className="text-[10px] text-neutral-500 leading-snug mt-0.5 line-clamp-1">
            {widget.description}
          </p>
        </div>
      </div>
    </div>
  )
}

// Main Component
function WidgetShowcase({ title, widgets }) {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3, rootMargin: '20px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <figure ref={containerRef} className="my-8 sm:my-10">
      {/* Title with line */}
      <div className={`
        relative flex items-center justify-center mb-5
        transition-all duration-500
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        {/* Line that cards emerge from */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-200" />
        
        {/* Title badge */}
        <span className="relative z-10 px-4 py-1 bg-white text-xs sm:text-sm font-serif italic text-neutral-500">
          {title}
        </span>
      </div>

      {/* Grid of cards - Compact 4 columns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {widgets.map((widget, index) => (
          <WidgetCard 
            key={widget.id} 
            widget={widget} 
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes emerge {
          0% {
            opacity: 0;
            transform: translateY(-100%) scale(0.95);
            clip-path: inset(100% 0 0 0);
          }
          40% {
            opacity: 1;
            clip-path: inset(50% 0 0 0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            clip-path: inset(0 0 0 0);
          }
        }
        
        .animate-emerge {
          animation: emerge 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </figure>
  )
}

export default WidgetShowcase
