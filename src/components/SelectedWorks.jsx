import { useState } from 'react'
import projects from '../data/projects'
import Ornament from './ui/Ornament'

function SelectedWorks({ initialProject = null }) {
  const [expandedId, setExpandedId] = useState(initialProject?.id || null)

  return (
    <div className="animate-fadeIn">
      {/* Header with editorial styling */}
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-[10px] tracking-[0.3em] text-neutral-400 mb-2">PORTFOLIO</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif">Selected Works</h2>
        <p className="text-neutral-500 italic font-serif mt-2 text-sm sm:text-base max-w-md mx-auto">
          A collection of projects built with care and curiosity
        </p>
        <Ornament className="mt-6" />
      </div>

      {/* Index sidebar - visible on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Floating index */}
        <aside className="hidden lg:block lg:col-span-2">
          <div className="sticky top-8">
            <p className="text-[9px] tracking-widest text-neutral-400 mb-3 font-bold">INDEX</p>
            <nav className="space-y-2">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                  className={`block text-left w-full group ${
                    expandedId === project.id ? 'text-neutral-900' : 'text-neutral-400'
                  }`}
                >
                  <span className="font-mono text-[10px] mr-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-xs font-serif typewriter-link ${
                    expandedId === project.id ? 'font-bold' : ''
                  }`}>
                    {project.name}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-neutral-200">
              <p className="text-[9px] tracking-widest text-neutral-400 mb-1">TOTAL WORKS</p>
              <p className="text-2xl font-bold font-mono">{String(projects.length).padStart(2, '0')}</p>
            </div>
          </div>
        </aside>

        {/* Projects List */}
        <div className="lg:col-span-10 space-y-0">
          {projects.map((project, index) => (
            <ProjectArticle
              key={project.id}
              project={project}
              index={index}
              totalProjects={projects.length}
              isExpanded={expandedId === project.id}
              onToggle={() => setExpandedId(
                expandedId === project.id ? null : project.id
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectArticle({ project, index, totalProjects, isExpanded, onToggle }) {
  return (
    <article className={`border-b border-neutral-200 ${index === 0 ? 'border-t-2 border-t-neutral-800' : ''} ${
      isExpanded ? 'bg-neutral-50/50' : ''
    }`}>
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full py-5 sm:py-6 flex items-center justify-between group text-left press-effect"
      >
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-1 min-w-0">
          {/* Large decorative number */}
          <div className="hidden sm:flex flex-col items-center w-12 md:w-16 shrink-0">
            <span className="text-3xl md:text-4xl font-bold font-serif text-neutral-200 leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[8px] text-neutral-300 tracking-widest mt-1">
              /{String(totalProjects).padStart(2, '0')}
            </span>
          </div>

          {/* Mobile number */}
          <span className="sm:hidden text-neutral-300 font-mono text-xs w-6 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
              <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-400">
                {project.category}
              </p>
              <span className="text-neutral-300">·</span>
              <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-400">
                {project.year}
              </p>
              {index === 0 && (
                <span className="text-[8px] px-1.5 py-0.5 bg-neutral-900 text-white tracking-wider ml-2">
                  FEATURED
                </span>
              )}
            </div>
            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold font-serif transition-colors truncate sm:text-clip ink-bleed inline-block ${
              isExpanded ? 'text-neutral-900' : 'text-neutral-700'
            }`}>
              {project.name}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 font-serif mt-0.5 sm:mt-1 hidden sm:block">
              {project.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-2">
          <span className="text-[10px] sm:text-xs text-neutral-400 hidden md:inline border border-neutral-200 px-2 py-1">
            {project.type}
          </span>
          <div className={`w-8 h-8 sm:w-10 sm:h-10 border-2 border-neutral-800 flex items-center justify-center transition-all duration-300 ${
            isExpanded ? 'bg-neutral-900 text-white rotate-45' : 'bg-transparent group-hover:bg-neutral-100'
          }`}>
            <span className="text-lg sm:text-xl font-light">+</span>
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="pb-6 sm:pb-8 px-0 sm:pl-10 md:pl-14 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-7">
              {/* Project Image */}
              <div className="bg-neutral-100 border border-neutral-200 aspect-video flex items-center justify-center mb-4 sm:mb-6">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl text-neutral-300 mb-2 font-serif">
                    {project.name[0]}
                  </div>
                  <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-400">
                    PROJECT SCREENSHOT
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm leading-relaxed font-serif">
                  <span className="text-2xl sm:text-3xl font-bold float-left mr-2 leading-none mt-1">
                    {project.content.trim()[0]}
                  </span>
                  {project.content.trim().slice(1)}
                </p>
                <p className="text-sm leading-relaxed font-serif text-neutral-600">
                  {project.fullContent}
                </p>
              </div>

              {/* Pull Quote */}
              <blockquote className="border-l-4 border-neutral-800 pl-4 my-4 sm:my-6">
                <p className="text-lg sm:text-xl italic font-serif">
                  {project.pullQuote}
                </p>
              </blockquote>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              {/* Tech Stack */}
              <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
                <h4 className="text-[10px] sm:text-xs tracking-widest font-bold mb-3">
                  TECHNOLOGIES USED
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span 
                      key={tech}
                      className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 bg-white border border-neutral-200 stamp"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
                <h4 className="text-[10px] sm:text-xs tracking-widest font-bold mb-3">
                  KEY FEATURES
                </h4>
                <ul className="space-y-2">
                  {project.features.map(feature => (
                    <li 
                      key={feature}
                      className="text-xs sm:text-sm font-serif flex items-center gap-2"
                    >
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-neutral-400 rotate-45 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-neutral-900 text-white text-[10px] sm:text-xs tracking-wider text-center press-effect border-2 border-neutral-900"
                >
                  VIEW LIVE →
                </a>
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 border-2 border-neutral-900 text-[10px] sm:text-xs tracking-wider text-center press-effect hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  SOURCE CODE
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default SelectedWorks
