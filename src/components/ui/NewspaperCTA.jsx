import { useState, useEffect, useRef } from 'react'

/**
 * NewspaperCTA Component
 * Animated newspaper that spins into view when scrolled to
 * Elegant entry animation with smooth hover interaction using lerp
 */
function NewspaperCTA({ onContactClick }) {
  const [isVisible, setIsVisible] = useState(false)
  const [animationDone, setAnimationDone] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const containerRef = useRef(null)
  const newspaperRef = useRef(null)
  const animationFrameRef = useRef(null)
  const hasTriggered = useRef(false)

  // Smooth hover using refs to avoid re-renders
  const currentTransform = useRef({ x: 0, y: 0, rotate: 0 })
  const targetTransform = useRef({ x: 0, y: 0, rotate: 0 })

  // Check on mount if element is already in view (user scrolled directly there)
  useEffect(() => {
    // Small delay to let the page settle after mount
    const timer = setTimeout(() => {
      if (containerRef.current && !hasTriggered.current) {
        const rect = containerRef.current.getBoundingClientRect()
        // Element is visible if its top is within the viewport
        // (less than viewport height AND greater than 0 - meaning on screen)
        const isOnScreen = rect.top >= 0 && rect.top < window.innerHeight

        if (isOnScreen) {
          // Already in view on mount - skip animation, show directly
          setShouldAnimate(false)
          setIsVisible(true)
          setAnimationDone(true)
          hasTriggered.current = true
        }
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer to trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true

          if (shouldAnimate) {
            // Scrolled into view - play animation
            setIsVisible(true)
            setTimeout(() => setAnimationDone(true), 1600)
          } else {
            // Already handled on mount
            setIsVisible(true)
            setAnimationDone(true)
          }
        }
      },
      { threshold: 0.6 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [shouldAnimate])

  // Smooth lerp animation loop for hover effect (like a drop of water)
  useEffect(() => {
    if (!animationDone) return

    const lerp = (start, end, factor) => start + (end - start) * factor

    const animate = () => {
      // Smooth interpolation towards target with easing factor 0.06
      currentTransform.current.x = lerp(currentTransform.current.x, targetTransform.current.x, 0.06)
      currentTransform.current.y = lerp(currentTransform.current.y, targetTransform.current.y, 0.06)
      currentTransform.current.rotate = lerp(currentTransform.current.rotate, targetTransform.current.rotate, 0.06)

      if (newspaperRef.current) {
        newspaperRef.current.style.transform = `
          translate(${currentTransform.current.x}px, ${currentTransform.current.y}px)
          rotate(${-3 + currentTransform.current.rotate}deg)
        `
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animationDone])

  // Mouse move handler - updates target, lerp handles smooth transition
  const handleMouseMove = (e) => {
    if (!animationDone || !newspaperRef.current) return

    const rect = newspaperRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate offset from center - subtle movement
    const deltaX = (e.clientX - centerX) / 30
    const deltaY = (e.clientY - centerY) / 30

    // Slight rotation based on horizontal position
    const rotateOffset = deltaX / 10

    targetTransform.current = {
      x: deltaX,
      y: deltaY,
      rotate: rotateOffset
    }
  }

  const handleMouseLeave = () => {
    // Return to resting position
    targetTransform.current = { x: 0, y: 0, rotate: 0 }
  }

  const today = new Date()
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div
      ref={containerRef}
      className="py-16 sm:py-24 flex justify-center items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Scale-up container (like original Springfield Shopper) */}
      <div
        className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{
          animation: isVisible && shouldAnimate ? 'scaleUp 1.5s ease-out forwards' : 'none'
        }}
      >
        {/* Rotating newspaper wrapper */}
        <div
          ref={newspaperRef}
          className="relative"
          style={{
            animation: isVisible && shouldAnimate && !animationDone ? 'spinFast 0.5s linear 3' : 'none',
            transform: 'rotate(-3deg)',
          }}
        >
        {/* Stacked pages effect - creates depth */}
        <div
          className="absolute bg-paper border border-neutral-400"
          style={{
            width: '8px',
            height: '98%',
            left: '-10px',
            top: '1%',
          }}
        />
        <div
          className="absolute bg-paper border border-neutral-300"
          style={{
            width: '8px',
            height: '96%',
            left: '-19px',
            top: '2%',
          }}
        />

        {/* Newspaper Container */}
        <div className="relative bg-paper border-2 border-neutral-800 p-4 sm:p-6 w-[320px] sm:w-[500px] md:w-[600px] shadow-2xl">

          {/* Newspaper Name */}
          <div className="text-center border-b-2 border-neutral-800 pb-3 sm:pb-4 mb-3 sm:mb-4">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The Julio Calvo Times
            </h2>
            <p className="text-[8px] sm:text-[10px] tracking-[0.3em] text-neutral-500 mt-1">
              ALL THE CODE THAT'S FIT TO SHIP
            </p>
          </div>

          {/* Info Bar */}
          <div className="flex justify-between items-center border-b border-neutral-300 pb-2 mb-3 sm:mb-4 text-[9px] sm:text-[11px]">
            <span className="tracking-wider text-neutral-500">{dateString.toUpperCase()}</span>
            <span className="font-bold">SPECIAL EDITION</span>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-[10px] sm:text-xs tracking-widest text-neutral-500 mb-2">BREAKING</p>
            <h3
              className="text-xl sm:text-3xl md:text-4xl font-black leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <span className="block">Frontend Developer</span>
              <span className="block">Seeks New Opportunity</span>
            </h3>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-300 pt-4">
            {/* Left Column */}
            <div className="border-r-0 sm:border-r border-neutral-200 pr-0 sm:pr-4">
              <h4 className="font-bold text-xs sm:text-sm border-b border-neutral-200 pb-1 mb-2">
                Skills in High Demand
              </h4>
              <div className="text-[10px] sm:text-xs leading-relaxed text-neutral-600 space-y-1">
                <p>React.js specialist with proven track record in building production-ready applications.</p>
                <p>Tailwind CSS expert. Responsive design advocate. Performance-obsessed.</p>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-neutral-200">
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold font-serif">4</p>
                  <p className="text-[8px] sm:text-[9px] text-neutral-500">PROJECTS</p>
                </div>
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold font-serif">1</p>
                  <p className="text-[8px] sm:text-[9px] text-neutral-500">NPM PACKAGE</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h4 className="font-bold text-xs sm:text-sm border-b border-neutral-200 pb-1 mb-2">
                Location: Toronto
              </h4>
              <div className="text-[10px] sm:text-xs leading-relaxed text-neutral-600">
                <p>Humber Polytechnic graduate ready to contribute to meaningful products.</p>
              </div>

              {/* CTA Button */}
              <button
                onClick={onContactClick}
                className="w-full mt-4 py-2 sm:py-3 bg-neutral-900 text-white text-[10px] sm:text-xs tracking-widest font-bold hover:bg-neutral-700 transition-colors"
              >
                CONTACT NOW
              </button>

              <p className="text-[8px] sm:text-[9px] text-neutral-400 text-center mt-2 italic">
                "Available for immediate hire"
              </p>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="mt-4 sm:mt-6 pt-3 border-t-2 border-neutral-800 text-center">
            <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-500">
              AVAILABLE FOR IMMEDIATE HIRE
            </p>
          </div>

          {/* Corner fold effect */}
          <div
            className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 hidden sm:block"
            style={{
              background: 'linear-gradient(135deg, transparent 50%, #e5e5e5 50%)',
              boxShadow: '-2px 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>
      </div>

      {/* CSS Keyframes - Springfield Shopper style but shorter */}
      <style>{`
        @keyframes scaleUp {
          0% {
            transform: scale(0.01);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes spinFast {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default NewspaperCTA
