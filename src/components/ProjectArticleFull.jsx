import { useEffect, useRef, useState } from 'react'
import { Maximize2, Pause, Play } from 'lucide-react'
import projects from '../data/projects'
import VeraHighlightShowcase from './ui/VeraHighlightShowcase'
import HighlightShowcaseTabs from './ui/HighlightShowcaseTabs'
import AcademicFlowTabs from './ui/AcademicFlowTabs'
import VeraTechStackDiagram from './ui/VeraTechStackDiagram'
import WidgetShowcase from './ui/WidgetShowcase'
import TechStackBar from './ui/TechStackBar'
import VintageSwitchDemo from './showcases/VintageSwitchDemo'
import NixieTubeDemo from './showcases/NixieTubeDemo'
import YearLeverDemo from './showcases/YearLeverDemo'
import VintageControlPanelDemo from './showcases/VintageControlPanelDemo'
import ExportDemo from './showcases/ExportDemo'
import WindowDemo from './showcases/WindowDemo'
import TestRunnerDemo from './showcases/TestRunnerDemo'
import FleeingButtonDemo from './showcases/FleeingButtonDemo'
import CheckboxTimerDemo from './showcases/CheckboxTimerDemo'
import PasswordRequirementsDemo from './showcases/PasswordRequirementsDemo'
import Win95StyleDemo from './showcases/Win95StyleDemo'
import DraggableWindowDemo from './showcases/DraggableWindowDemo'
import StatsPanelDemo from './showcases/StatsPanelDemo'
import MatrixHackDemo from './showcases/MatrixHackDemo'
import OntarioFlagCollageDemo from './showcases/OntarioFlagCollageDemo'
import Win95DualDemo from './showcases/Win95DualDemo'
import VictoryPageDemo from './showcases/VictoryPageDemo'

// Video Player Component with lazy loading and viewport-aware playback
function VideoPlayer({ src }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [userPaused, setUserPaused] = useState(false)

  // Lazy load and track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsVisible(visible)
        
        // Load video when first visible
        if (visible && !isLoaded) {
          setIsLoaded(true)
        }
      },
      { threshold: 0.3 } // 30% visible to trigger
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isLoaded])

  // Play/pause based on visibility (only if user hasn't manually paused)
  useEffect(() => {
    if (!isLoaded || !videoRef.current) return
    
    if (isVisible && !userPaused) {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isVisible, isLoaded, userPaused])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setUserPaused(true) // User manually paused
      } else {
        videoRef.current.play().catch(() => {})
        setUserPaused(false) // User wants to play
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
    <div 
      ref={containerRef}
      className="relative group overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100"
    >
      {isLoaded ? (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-auto bg-neutral-100 -mt-[0.5%]"
          style={{ marginBottom: '-0.5%' }}
          loop
          playsInline
        />
      ) : (
        <div className="aspect-video flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
        </div>
      )}
      {isLoaded && (
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
      )}
    </div>
  )
}

function ProjectArticleFull({ projectId, onClose }) {
  const project = projects.find(p => p.id === projectId)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [projectId])

  if (!project) return null

  return (
    <article className="animate-fadeIn">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-3 sm:top-4 right-3 sm:right-4 z-50 w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors"
        aria-label="Close article"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Article Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 md:pt-12 pb-4 sm:pb-6 md:pb-8">
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest mb-3 sm:mb-4 md:mb-6">
          <span className="text-neutral-500">{project.category}</span>
          <span className="text-neutral-300">•</span>
          <time className="text-neutral-500">{project.date}</time>
          <span className="text-neutral-300">•</span>
          <span className="text-neutral-500">{project.readTime} MIN READ</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif leading-tight mb-3 sm:mb-4 md:mb-6 text-balance">
          {project.title}
        </h1>

        {/* Deck (Subtitle) */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif text-neutral-600 leading-relaxed mb-4 sm:mb-6 md:mb-8 text-balance">
          {project.subtitle}
        </p>

        {/* Enhanced Byline - NYT 2023 style */}
        <div className="pb-4 sm:pb-6 md:pb-8 border-b border-neutral-200">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img
              src="/images/photo-profile-juliocalvo.JPG"
              alt="Julio Calvo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-xs sm:text-sm">By Julio Calvo</p>
              <p className="text-[10px] sm:text-xs text-neutral-500">Reporting from Toronto</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image or Video */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 md:mb-12">
        <div className="relative border border-neutral-200 overflow-hidden">
          {project.video ? (
            <VideoPlayer src={project.video} />
          ) : project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-auto"
              loading="lazy"
            />
          ) : (
            <div className="aspect-[16/9] bg-neutral-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl sm:text-6xl md:text-8xl text-neutral-300 mb-2 sm:mb-4 font-serif">
                  {project.name[0]}
                </div>
                <p className="text-[9px] sm:text-[10px] md:text-xs tracking-wider sm:tracking-widest text-neutral-400">
                  {project.name.toUpperCase()}
                </p>
              </div>
            </div>
          )}
        </div>
        <p className="text-[10px] sm:text-xs text-neutral-500 mt-1.5 sm:mt-2 text-center sm:text-left">
          {project.videoCaption || project.imageCaption}
        </p>
      </div>

      {/* Article Body - Two Column Layout on Large Screens */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
        {/* Main Content Column */}
        <div className="lg:col-span-8">
          {/* Lede (First Paragraph with Drop Cap) */}
          <div className="prose prose-lg max-w-none mb-4 sm:mb-6">
            <p className="drop-cap text-sm sm:text-base md:text-lg leading-relaxed font-serif">
              {project.lede}
            </p>
          </div>

          {/* Body Paragraphs */}
          <div className="prose prose-lg max-w-none space-y-4 sm:space-y-6">
            {project.bodyParagraphs.map((paragraph, index) => (
              <div key={index}>
                {paragraph.type === 'text' && (
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-serif text-neutral-700">
                    {paragraph.content}
                  </p>
                )}

                {paragraph.type === 'subheading' && (
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-serif mt-6 sm:mt-8 mb-3 sm:mb-4">
                    {paragraph.content === 'The Interactive Highlight System' ? (
                      <>The Interactive <span style={{ backgroundColor: '#E8F0F4', padding: '2px 6px', borderRadius: '4px' }}>Highlight System</span></>
                    ) : paragraph.content}
                  </h2>
                )}

                {paragraph.type === 'pullquote' && (
                  <blockquote className="my-6 sm:my-8 md:my-12 border-l-2 sm:border-l-4 border-neutral-900 pl-4 sm:pl-6 md:pl-8">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl italic font-serif text-neutral-800 leading-tight">
                      {paragraph.content}
                    </p>
                    {paragraph.attribution && (
                      <footer className="mt-3 sm:mt-4 text-xs sm:text-sm text-neutral-500 tracking-wide">
                        — {paragraph.attribution}
                      </footer>
                    )}
                  </blockquote>
                )}

                {paragraph.type === 'image' && (
                  <figure className="my-6 sm:my-8 md:my-10">
                    {paragraph.src ? (
                      <img
                        src={paragraph.src}
                        alt={paragraph.caption || ''}
                        className="w-full h-auto rounded-lg border border-neutral-200"
                        loading="lazy"
                      />
                    ) : (
                      <div className="aspect-video bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center">
                        <span className="text-3xl sm:text-4xl text-neutral-300 font-serif">
                          {paragraph.placeholder || 'IMAGE'}
                        </span>
                      </div>
                    )}
                    <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-1.5 sm:mt-2">
                      {paragraph.caption}
                    </figcaption>
                  </figure>
                )}

                {paragraph.type === 'video' && (
                  <figure className="my-6 sm:my-8 md:my-10">
                    {paragraph.src ? (
                      <VideoPlayer src={paragraph.src} />
                    ) : (
                      <div className="aspect-video bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-12 h-12 mx-auto text-neutral-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          <span className="text-xs text-neutral-400">VIDEO PLACEHOLDER</span>
                        </div>
                      </div>
                    )}
                    <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-1.5 sm:mt-2">
                      {paragraph.caption}
                    </figcaption>
                  </figure>
                )}

                {paragraph.type === 'list' && (
                  <ul className="space-y-1.5 sm:space-y-2 my-4 sm:my-6">
                    {paragraph.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-serif text-neutral-700">
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-neutral-400 rotate-45 mt-2 sm:mt-3 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {paragraph.type === 'list-with-image' && (
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 my-6 sm:my-8">
                    {/* List */}
                    <ul className="space-y-1.5 sm:space-y-2 flex-1">
                      {paragraph.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-serif text-neutral-700">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-neutral-400 rotate-45 mt-2 sm:mt-3 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {/* Vertical Divider */}
                    <div className="hidden md:block w-px bg-neutral-200" />
                    {/* Horizontal Divider for mobile */}
                    <div className="block md:hidden h-px bg-neutral-200" />
                    {/* Image */}
                    <div className="flex-1">
                      <img
                        src={paragraph.image}
                        alt={paragraph.imageAlt || ''}
                        className="w-full h-auto rounded-lg border border-neutral-200"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                {paragraph.type === 'highlight-showcase' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <HighlightShowcaseTabs />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'tech-stack' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 sm:p-6">
                      <VeraTechStackDiagram />
                    </div>
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'academic-flow' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <AcademicFlowTabs />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'widget-showcase' && (
                  <WidgetShowcase
                    title={paragraph.title}
                    widgets={paragraph.widgets}
                  />
                )}

                {paragraph.type === 'vintage-switch-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <VintageSwitchDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'nixie-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <NixieTubeDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'year-lever-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <YearLeverDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'vintage-control-panel-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <VintageControlPanelDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'export-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <ExportDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'window-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <WindowDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'test-runner-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <TestRunnerDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'fleeing-button-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <FleeingButtonDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'checkbox-timer-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <CheckboxTimerDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'password-requirements-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <PasswordRequirementsDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'win95-style-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <Win95StyleDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'draggable-window-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <DraggableWindowDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'stats-panel-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <StatsPanelDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'matrix-hack-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <MatrixHackDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'ontario-flag-collage-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <OntarioFlagCollageDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'victory-page-demo' && (
                  <figure className="my-8 sm:my-10 md:my-12">
                    <VictoryPageDemo />
                    {paragraph.caption && (
                      <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
                        {paragraph.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {paragraph.type === 'dual-demo' && (
                  <Win95DualDemo
                    leftDemo={
                      paragraph.leftType === 'fleeing-button-demo' ? <FleeingButtonDemo /> :
                      paragraph.leftType === 'checkbox-timer-demo' ? <CheckboxTimerDemo /> :
                      paragraph.leftType === 'password-requirements-demo' ? <PasswordRequirementsDemo /> :
                      paragraph.leftType === 'win95-style-demo' ? <Win95StyleDemo /> :
                      paragraph.leftType === 'draggable-window-demo' ? <DraggableWindowDemo /> :
                      paragraph.leftType === 'stats-panel-demo' ? <StatsPanelDemo /> :
                      paragraph.leftType === 'matrix-hack-demo' ? <MatrixHackDemo /> :
                      null
                    }
                    rightDemo={
                      paragraph.rightType === 'fleeing-button-demo' ? <FleeingButtonDemo /> :
                      paragraph.rightType === 'checkbox-timer-demo' ? <CheckboxTimerDemo /> :
                      paragraph.rightType === 'password-requirements-demo' ? <PasswordRequirementsDemo /> :
                      paragraph.rightType === 'win95-style-demo' ? <Win95StyleDemo /> :
                      paragraph.rightType === 'draggable-window-demo' ? <DraggableWindowDemo /> :
                      paragraph.rightType === 'stats-panel-demo' ? <StatsPanelDemo /> :
                      paragraph.rightType === 'matrix-hack-demo' ? <MatrixHackDemo /> :
                      null
                    }
                    leftTitle={paragraph.leftTitle}
                    rightTitle={paragraph.rightTitle}
                    caption={paragraph.caption}
                  />
                )}

              </div>
            ))}
          </div>

          {/* Technical Details Section */}
          <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-neutral-200">
            <h3 className="text-base sm:text-lg md:text-xl font-bold font-serif mb-4 sm:mb-6">Technical Implementation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {project.technicalDetails.map((detail, index) => (
                <div key={index} className="bg-neutral-50 border border-neutral-200 p-3 sm:p-4">
                  <h4 className="font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2">{detail.title}</h4>
                  <p className="text-xs sm:text-sm text-neutral-600 font-serif">{detail.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <div className="mt-8 sm:mt-10 md:mt-12 prose prose-lg max-w-none">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-serif text-neutral-700">
              {project.conclusion}
            </p>
          </div>
        </div>

        {/* Sidebar Column */}
        <aside className="lg:col-span-4 space-y-4 sm:space-y-6">
          {/* Sticky Sidebar */}
          <div className="lg:sticky lg:top-8 space-y-4 sm:space-y-6">
            {/* Project Info Card */}
            <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
              <h3 className="text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-bold mb-3 sm:mb-4">PROJECT OVERVIEW</h3>
              <dl className="space-y-2 sm:space-y-3">
                <div>
                  <dt className="text-[9px] sm:text-[10px] tracking-wider text-neutral-500 mb-0.5 sm:mb-1">PROJECT TYPE</dt>
                  <dd className="text-xs sm:text-sm font-serif">{project.type}</dd>
                </div>
                <div>
                  <dt className="text-[9px] sm:text-[10px] tracking-wider text-neutral-500 mb-0.5 sm:mb-1">YEAR</dt>
                  <dd className="text-xs sm:text-sm font-serif">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-[9px] sm:text-[10px] tracking-wider text-neutral-500 mb-0.5 sm:mb-1">DURATION</dt>
                  <dd className="text-xs sm:text-sm font-serif">{project.duration}</dd>
                </div>
                <div>
                  <dt className="text-[9px] sm:text-[10px] tracking-wider text-neutral-500 mb-0.5 sm:mb-1">ROLE</dt>
                  <dd className="text-xs sm:text-sm font-serif">{project.role}</dd>
                </div>
              </dl>
            </div>

            {/* Technologies - GitHub style bar */}
            <TechStackBar tech={project.tech} />

            {/* Key Features */}
            <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
              <h3 className="text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-bold mb-3 sm:mb-4">KEY FEATURES</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {project.features.map(feature => (
                  <li
                    key={feature}
                    className="text-xs sm:text-sm font-serif flex items-center gap-1.5 sm:gap-2"
                  >
                    <span className="w-1 h-1 bg-neutral-400 rotate-45 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="space-y-2">
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 min-h-[44px] flex items-center justify-center bg-neutral-900 text-white text-[10px] sm:text-xs tracking-wider text-center hover:bg-neutral-700 transition-colors"
              >
                VIEW LIVE PROJECT →
              </a>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 min-h-[44px] flex items-center justify-center border border-neutral-900 text-[10px] sm:text-xs tracking-wider text-center hover:bg-neutral-900 hover:text-white transition-colors"
              >
                SOURCE CODE
              </a>
            </div>

            {/* Share Section */}
            <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
              <h3 className="text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-bold mb-3 sm:mb-4">SHARE THIS ARTICLE</h3>
              <div className="flex gap-2">
                <button className="flex-1 px-2 sm:px-3 py-2.5 sm:py-2 min-h-[44px] border border-neutral-300 text-[10px] sm:text-xs hover:bg-neutral-100 transition-colors">
                  Twitter
                </button>
                <button className="flex-1 px-2 sm:px-3 py-2.5 sm:py-2 min-h-[44px] border border-neutral-300 text-[10px] sm:text-xs hover:bg-neutral-100 transition-colors">
                  LinkedIn
                </button>
                <button className="flex-1 px-2 sm:px-3 py-2.5 sm:py-2 min-h-[44px] border border-neutral-300 text-[10px] sm:text-xs hover:bg-neutral-100 transition-colors">
                  Copy
                </button>
              </div>
            </div>

            {/* Related Projects */}
            <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
              <h3 className="text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-bold mb-3 sm:mb-4">RELATED WORK</h3>
              <div className="space-y-2 sm:space-y-3">
                {projects
                  .filter(p => p.id !== projectId)
                  .slice(0, 2)
                  .map(relatedProject => (
                    <button
                      key={relatedProject.id}
                      onClick={() => window.location.hash = `project-${relatedProject.id}`}
                      className="block w-full text-left group py-2 min-h-[44px]"
                    >
                      <p className="text-[9px] sm:text-[10px] tracking-wider text-neutral-400 mb-0.5 sm:mb-1">
                        {relatedProject.category}
                      </p>
                      <p className="text-xs sm:text-sm font-serif font-semibold group-hover:text-neutral-600 transition-colors">
                        {relatedProject.name}
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:mt-12 md:mt-16 mb-6 sm:mb-8 pt-6 sm:pt-8 border-t border-neutral-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2 py-2 min-h-[44px]"
          >
            <span>←</span> Back to Works
          </button>
          <div className="flex gap-3 sm:gap-4 text-[10px] sm:text-xs tracking-wider text-neutral-400">
            <span>{project.category}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProjectArticleFull
