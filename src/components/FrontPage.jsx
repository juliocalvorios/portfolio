import { useState, lazy, Suspense, useRef, useEffect } from 'react'
import projects from '../data/projects'
import SectionRule from './ui/SectionRule'
import TiltCard from './ui/TiltCard'
import InkRipple from './ui/InkRipple'
import ScrollReveal from './ui/ScrollReveal'
import { LiveIndicator } from './ui/LiveIndicator'
import { useSounds } from './ui/SoundManager'
import SidebarWidget from './ui/SidebarWidget'

// Lazy load VeraCircle (Three.js is heavy)
const VeraCircle = lazy(() => import('./ui/VeraCircle'))

function FrontPage({ onProjectClick }) {
  const [hoveredArticle, setHoveredArticle] = useState(null)
  const { playClick, playHover } = useSounds()

  const leadStory = projects[0]
  const secondaryStories = projects.slice(1)

  return (
    <div className="animate-fadeIn">
      {/* Lead Story */}
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">

        {/* Main Article */}
        <article className="lg:col-span-8">
          <div className="border-b-2 border-neutral-800 pb-3 sm:pb-4 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <LiveIndicator type="featured" pulse={false} />
              <p className="text-[9px] sm:text-xs tracking-wider sm:tracking-widest text-neutral-500">
                {leadStory.category}
              </p>
            </div>
            <InkRipple>
              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight font-bold font-serif cursor-pointer hover:text-neutral-600 transition-colors text-balance"
                onClick={() => { playClick(); onProjectClick && onProjectClick(leadStory) }}
                onMouseEnter={playHover}
              >
                {leadStory.title}
              </h2>
            </InkRipple>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 mt-1 sm:mt-2 italic font-serif">
              {leadStory.subtitle}
            </p>
          </div>
          
          {/* Article content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              {/* Enhanced Byline - NYT 2023 style */}
              <div className="text-[9px] sm:text-[10px] md:text-xs text-neutral-500 mb-2 sm:mb-3">
                <p className="font-bold text-neutral-700">By JULIO CALVO</p>
                <p className="text-neutral-500 mt-0.5">
                  Reporting from Toronto · {leadStory.readTime} min read
                </p>
              </div>

              {/* Article text with drop cap */}
              <p className="text-xs sm:text-sm leading-relaxed font-serif">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold float-left mr-1.5 sm:mr-2 leading-none mt-0.5 sm:mt-1">
                  {leadStory.content.trim()[0]}
                </span>
                {leadStory.content.trim().slice(1)}
              </p>

              {/* Tech tags */}
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {(Array.isArray(leadStory.tech) 
                  ? leadStory.tech 
                  : Object.entries(leadStory.tech).flatMap(([key, val]) => 
                      key === 'languages' 
                        ? val.map(l => l.name) 
                        : val
                    )
                ).map(tech => (
                  <span
                    key={tech}
                    className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 bg-neutral-100 border border-neutral-200 text-neutral-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {/* Vera Circle */}
              <div
                className="cursor-pointer flex justify-center"
                onClick={() => { playClick(); onProjectClick && onProjectClick(leadStory) }}
                onMouseEnter={playHover}
              >
                <Suspense fallback={
                  <div className="w-[280px] h-[280px] flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                  </div>
                }>
                  <VeraCircle width={280} height={280} />
                </Suspense>
              </div>
              <p className="text-[9px] sm:text-[10px] text-neutral-500 mt-1.5 sm:mt-2 italic text-center">
                The veraOS interactive circle.
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 lg:border-l border-neutral-300 lg:pl-4 xl:pl-6 mt-4 lg:mt-0">
          <SidebarWidget
            projects={projects}
            onProjectClick={onProjectClick}
            playClick={playClick}
            playHover={playHover}
          />
        </aside>
        </div>
      </ScrollReveal>

      <SectionRule title="More Stories" />

      {/* Secondary Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {secondaryStories.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.1} direction="up">
            <ArticleCard
              project={project}
              index={i + 2}
              isHovered={hoveredArticle === project.id}
              onMouseEnter={() => { playHover(); setHoveredArticle(project.id) }}
              onMouseLeave={() => setHoveredArticle(null)}
              onClick={() => { playClick(); onProjectClick && onProjectClick(project) }}
            />
          </ScrollReveal>
        ))}
      </div>

    </div>
  )
}

function truncateTitle(title, wordCount) {
  const words = title.split(' ')
  if (words.length <= wordCount) return title
  return words.slice(0, wordCount).join(' ') + '...'
}

// Video thumbnail that loops first 10 seconds
function ThumbnailVideo({ src, className }) {
  const videoRef = useRef(null)
  const maxDuration = 10 // seconds

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.currentTime >= maxDuration) {
        video.currentTime = 0
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      autoPlay
      muted
      playsInline
    />
  )
}

function ArticleCard({ project, index, isHovered, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <TiltCard intensity={6}>
      <InkRipple>
        <article
          className="cursor-pointer group"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          {/* Thumbnail - Video (10s loop), Portrait Image, or Letter */}
          <div className="bg-neutral-100 border border-neutral-200 aspect-[4/3] flex items-center justify-center mb-2 sm:mb-3 overflow-hidden relative">
            {project.video ? (
              <ThumbnailVideo
                src={project.video}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : project.portraitImage ? (
              <img
                src={project.portraitImage}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <span className="text-3xl sm:text-4xl md:text-5xl text-neutral-300 font-serif group-hover:scale-110 transition-transform duration-300">
                {project.name[0]}
              </span>
            )}
          </div>

          {/* Meta */}
          <p className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest text-neutral-500 mb-1">
            {project.category}
          </p>

          {/* Title */}
          <h3 className="text-sm sm:text-base md:text-lg font-bold leading-tight font-serif group-hover:text-neutral-600 transition-colors">
            {truncateTitle(project.title, 8)}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 sm:mt-2 font-serif line-clamp-2 sm:line-clamp-3">
            {project.content.slice(0, 100).trim()}...
          </p>
        </article>
      </InkRipple>
    </TiltCard>
  )
}

export default FrontPage
