import { useState } from 'react'
import projects from '../data/projects'
import ProjectArticleFull from './ProjectArticleFull'
import ScrollReveal from './ui/ScrollReveal'
import InkRipple from './ui/InkRipple'

function SelectedWorks({ initialProject = null }) {
  const [selectedProjectId, setSelectedProjectId] = useState(initialProject?.id || null)
  const [expandedId, setExpandedId] = useState(null)

  if (selectedProjectId) {
    return (
      <ProjectArticleFull 
        projectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
      />
    )
  }

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">Selected Works</h2>
          <p className="text-neutral-500 italic font-serif mt-1 text-xs sm:text-sm md:text-base">
            A collection of projects built with care and curiosity
          </p>
        </div>
      </ScrollReveal>

      {/* Projects List */}
      <div className="space-y-0">
        {projects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.08}>
            <ProjectCard
              project={project}
              index={index}
              isExpanded={expandedId === project.id}
              onToggleExpand={() => setExpandedId(expandedId === project.id ? null : project.id)}
              onReadFull={() => setSelectedProjectId(project.id)}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project, index, isExpanded, onToggleExpand, onReadFull }) {
  return (
    <InkRipple>
      <article className={`border-b border-neutral-200 ${index === 0 ? 'border-t' : ''} transition-colors ${isExpanded ? 'bg-neutral-50' : 'hover:bg-neutral-50/50'}`}>
        {/* Header - Always Visible */}
        <button
          onClick={onToggleExpand}
          className="w-full py-5 sm:py-6 flex items-center justify-between group text-left px-2 sm:px-4"
        >
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-1 min-w-0">
          <span className="text-neutral-300 font-mono text-xs sm:text-sm w-6 sm:w-8 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-400 mb-0.5 sm:mb-1">
              {project.category} · {project.year}
            </p>
            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold font-serif transition-colors mb-1 ${
              isExpanded ? 'text-neutral-900' : 'text-neutral-700 group-hover:text-neutral-900'
            }`}>
              {project.name}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 font-serif line-clamp-2">
              {project.subtitle}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-2">
          <span className="text-xs sm:text-sm text-neutral-400 hidden md:inline">
            {project.readTime} min read
          </span>
          <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400 group-hover:text-neutral-900 transition-colors">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>
      </button>

      {/* Expanded Preview */}
      {isExpanded && (
        <div className="px-2 sm:px-4 pb-4 sm:pb-6 lg:pb-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 max-w-6xl">
            {/* Preview Content - Left Column */}
            <div className="lg:col-span-8">
              {/* Lede Preview */}
              <div className="mb-4 sm:mb-6">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed font-serif text-neutral-700">
                  {project.lede.slice(0, 300)}...
                </p>
              </div>

              {/* First Body Paragraph */}
              {project.bodyParagraphs[0] && (
                <p className="text-xs sm:text-sm lg:text-base leading-relaxed font-serif text-neutral-600 mb-3 sm:mb-4">
                  {project.bodyParagraphs[0].content?.slice(0, 200)}...
                </p>
              )}

              {/* Pull Quote Preview */}
              {project.pullQuote && (
                <blockquote className="border-l-2 sm:border-l-4 border-neutral-900 pl-3 sm:pl-4 lg:pl-6 my-3 sm:my-4 lg:my-6">
                  <p className="text-base sm:text-lg lg:text-xl italic font-serif text-neutral-800">
                    {project.pullQuote}
                  </p>
                </blockquote>
              )}

              {/* Read Full Article Button */}
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onReadFull()
                  }}
                  className="px-4 sm:px-6 py-3 min-h-[44px] bg-neutral-900 text-white text-[10px] sm:text-xs tracking-wider hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
                >
                  READ FULL ARTICLE
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-4 sm:h-4">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                <span className="text-[10px] sm:text-xs text-neutral-400 tracking-wider text-center sm:text-left">
                  {project.readTime} MINUTE READ
                </span>
              </div>
            </div>

            {/* Preview Sidebar - Right Column */}
            <div className="lg:col-span-4 space-y-3 sm:space-y-4">
              {/* Quick Info */}
              <div className="bg-white border border-neutral-200 p-3 sm:p-4">
                <h4 className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest font-bold mb-2 sm:mb-3 text-neutral-900">
                  AT A GLANCE
                </h4>
                <dl className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs">
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Type:</dt>
                    <dd className="font-serif font-semibold">{project.type}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Year:</dt>
                    <dd className="font-serif font-semibold">{project.year}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Duration:</dt>
                    <dd className="font-serif font-semibold">{project.duration}</dd>
                  </div>
                </dl>
              </div>

              {/* Technologies Preview */}
              <div className="bg-white border border-neutral-200 p-3 sm:p-4">
                <h4 className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest font-bold mb-2 sm:mb-3 text-neutral-900">
                  TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.slice(0, 4).map(tech => (
                    <span
                      key={tech}
                      className="text-[9px] sm:text-[10px] tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 bg-neutral-50 border border-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[9px] sm:text-[10px] tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 text-neutral-400">
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Key Features Preview */}
              <div className="bg-white border border-neutral-200 p-3 sm:p-4">
                <h4 className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest font-bold mb-2 sm:mb-3 text-neutral-900">
                  KEY FEATURES
                </h4>
                <ul className="space-y-1 sm:space-y-1.5">
                  {project.features.slice(0, 3).map(feature => (
                    <li
                      key={feature}
                      className="text-[10px] sm:text-xs font-serif flex items-center gap-1.5 sm:gap-2 text-neutral-700"
                    >
                      <span className="w-1 h-1 bg-neutral-400 rotate-45 shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {project.features.length > 3 && (
                    <li className="text-[10px] sm:text-xs text-neutral-400 ml-2.5 sm:ml-3">
                      +{project.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col gap-2">
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 sm:px-4 py-2.5 sm:py-2 min-h-[44px] flex items-center justify-center border border-neutral-900 text-[9px] sm:text-[10px] tracking-wider text-center hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  VIEW LIVE →
                </a>
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 sm:px-4 py-2.5 sm:py-2 min-h-[44px] flex items-center justify-center border border-neutral-300 text-[9px] sm:text-[10px] tracking-wider text-center hover:border-neutral-900 transition-colors"
                >
                  SOURCE CODE
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      </article>
    </InkRipple>
  )
}

export default SelectedWorks
