import { useState } from 'react'
import projects from '../data/projects'
import Ornament from './ui/Ornament'
import SectionRule from './ui/SectionRule'

function FrontPage({ onProjectClick }) {
  const [hoveredArticle, setHoveredArticle] = useState(null)
  
  const leadStory = projects[0]
  const secondaryStories = projects.slice(1)

  return (
    <div className="animate-fadeIn">
      {/* Lead Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
        
        {/* Main Article */}
        <article className="lg:col-span-8">
          <div className="border-b-2 border-neutral-800 pb-4 mb-4">
            <p className="text-[10px] sm:text-xs tracking-widest text-neutral-500 mb-2">
              {leadStory.category}
            </p>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl leading-tight font-bold font-serif cursor-pointer hover:text-neutral-600 transition-colors text-balance"
              onClick={() => onProjectClick && onProjectClick(leadStory)}
            >
              {leadStory.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mt-2 italic font-serif">
              {leadStory.subtitle}
            </p>
          </div>
          
          {/* Article content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Byline */}
              <p className="text-[10px] sm:text-xs text-neutral-500 mb-3">
                <span className="font-bold text-neutral-700">By JULIO CALVO</span>
                <span className="mx-2">|</span>
                Toronto Bureau
              </p>
              
              {/* Article text with drop cap */}
              <p className="text-sm leading-relaxed font-serif">
                <span className="text-3xl sm:text-4xl font-bold float-left mr-2 leading-none mt-1">
                  {leadStory.content.trim()[0]}
                </span>
                {leadStory.content.trim().slice(1)}
              </p>
              
              {/* Tech tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {leadStory.tech.map(tech => (
                  <span 
                    key={tech}
                    className="text-[10px] px-2 py-1 bg-neutral-100 border border-neutral-200 text-neutral-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              {/* Pull Quote */}
              <blockquote className="border-l-4 border-neutral-800 pl-4 my-4">
                <p className="text-lg sm:text-xl italic font-serif">
                  {leadStory.pullQuote}
                </p>
              </blockquote>
              
              {/* Project Image Placeholder */}
              <div 
                className="bg-neutral-100 border border-neutral-200 aspect-video flex items-center justify-center mt-4 cursor-pointer hover:bg-neutral-200 transition-colors group"
                onClick={() => onProjectClick && onProjectClick(leadStory)}
              >
                <div className="text-center">
                  <div className="text-4xl text-neutral-300 mb-2 group-hover:scale-110 transition-transform">⬚</div>
                  <p className="text-[10px] tracking-widest text-neutral-400">
                    VIEW PROJECT
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-neutral-500 mt-2 italic text-center">
                The veraOS dashboard interface.
              </p>
            </div>
          </div>
        </article>
        
        {/* Sidebar */}
        <aside className="lg:col-span-4 lg:border-l border-neutral-300 lg:pl-6 mt-6 lg:mt-0">
          <div className="border-b-2 border-neutral-800 pb-2 mb-4">
            <h3 className="text-xs tracking-widest font-bold">QUICK FACTS</h3>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 mb-6 stagger-children">
            <Stat number="137" label="WIDGETS SHIPPED" />
            <Stat number="12" label="MONTHS DEV" />
            <Stat number="0→1" label="SELF-TAUGHT" />
          </div>
          
          <Ornament className="my-6 hidden lg:flex" />
          
          {/* Article Index - Hidden on mobile */}
          <div className="hidden lg:block">
            <h3 className="text-xs tracking-widest font-bold mb-3">
              IN THIS EDITION
            </h3>
            <nav className="space-y-2">
              {projects.map((project, i) => (
                <a 
                  key={project.id}
                  href={`#project-${project.id}`}
                  className="flex gap-3 group"
                  onClick={(e) => {
                    e.preventDefault()
                    onProjectClick && onProjectClick(project)
                  }}
                >
                  <span className="text-neutral-400 font-mono text-xs">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-neutral-600 font-serif group-hover:text-neutral-900 transition-colors">
                    {truncateTitle(project.title, 5)}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
      
      <SectionRule title="More Stories" />
      
      {/* Secondary Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {secondaryStories.map((project, i) => (
          <ArticleCard
            key={project.id}
            project={project}
            index={i + 2}
            isHovered={hoveredArticle === project.id}
            onMouseEnter={() => setHoveredArticle(project.id)}
            onMouseLeave={() => setHoveredArticle(null)}
            onClick={() => onProjectClick && onProjectClick(project)}
          />
        ))}
      </div>
    </div>
  )
}

function Stat({ number, label }) {
  return (
    <div className="pb-3 lg:pb-4 border-b border-neutral-200">
      <p className="text-2xl lg:text-3xl font-bold font-serif">{number}</p>
      <p className="text-[9px] lg:text-[10px] text-neutral-500 tracking-wider">{label}</p>
    </div>
  )
}

function ArticleCard({ project, index, isHovered, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <article 
      className="cursor-pointer group hover-lift"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="bg-neutral-100 border border-neutral-200 aspect-[4/3] flex items-center justify-center mb-3 overflow-hidden">
        <span className="text-4xl sm:text-5xl text-neutral-300 font-serif group-hover:scale-110 transition-transform duration-300">
          {project.name[0]}
        </span>
      </div>
      
      {/* Meta */}
      <p className="text-[10px] tracking-widest text-neutral-500 mb-1">
        {project.category}
      </p>
      
      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold leading-tight font-serif group-hover:text-neutral-600 transition-colors">
        {truncateTitle(project.title, 8)}
      </h3>
      
      {/* Excerpt */}
      <p className="text-sm text-neutral-500 mt-2 font-serif line-clamp-2 sm:line-clamp-3">
        {project.content.slice(0, 100).trim()}...
      </p>
    </article>
  )
}

function truncateTitle(title, wordCount) {
  const words = title.split(' ')
  if (words.length <= wordCount) return title
  return words.slice(0, wordCount).join(' ') + '...'
}

export default FrontPage
