import { useState } from 'react'
import projects from '../data/projects'
import SectionRule from './ui/SectionRule'

function SelectedWorks({ initialProject = null }) {
  const [expandedId, setExpandedId] = useState(initialProject?.id || null)

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-serif">Selected Works</h2>
        <p className="text-neutral-500 italic font-serif mt-1">
          A collection of projects built with care and curiosity
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-0">
        {projects.map((project, index) => (
          <ProjectArticle
            key={project.id}
            project={project}
            index={index}
            isExpanded={expandedId === project.id}
            onToggle={() => setExpandedId(
              expandedId === project.id ? null : project.id
            )}
          />
        ))}
      </div>
    </div>
  )
}

function ProjectArticle({ project, index, isExpanded, onToggle }) {
  return (
    <article className={`border-b border-neutral-200 ${index === 0 ? 'border-t' : ''}`}>
      {/* Collapsed Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between group text-left"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <span className="text-neutral-300 font-mono text-sm w-8">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="text-[10px] tracking-widest text-neutral-400 mb-1">
              {project.category} · {project.year}
            </p>
            <h3 className={`text-xl md:text-2xl font-bold font-serif transition-colors ${
              isExpanded ? 'text-neutral-900' : 'text-neutral-700 group-hover:text-neutral-900'
            }`}>
              {project.name}
            </h3>
            <p className="text-sm text-neutral-500 font-serif mt-1 hidden md:block">
              {project.subtitle}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-400 hidden md:inline">
            {project.type}
          </span>
          <span className={`text-2xl transition-transform duration-300 ${
            isExpanded ? 'rotate-45' : ''
          }`}>
            +
          </span>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="pb-8 pl-4 md:pl-14 pr-4 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-7">
              {/* Project Image */}
              <div className="bg-neutral-100 border border-neutral-200 aspect-video flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-5xl text-neutral-300 mb-2 font-serif">
                    {project.name[0]}
                  </div>
                  <p className="text-[10px] tracking-widest text-neutral-400">
                    PROJECT SCREENSHOT
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-neutral max-w-none">
                <p className="text-sm leading-relaxed font-serif mb-4">
                  <span className="text-3xl font-bold float-left mr-2 leading-none mt-1">
                    {project.content.trim()[0]}
                  </span>
                  {project.content.trim().slice(1)}
                </p>
                <p className="text-sm leading-relaxed font-serif text-neutral-600">
                  {project.fullContent}
                </p>
              </div>

              {/* Pull Quote */}
              <blockquote className="border-l-4 border-neutral-800 pl-4 my-6">
                <p className="text-xl italic font-serif">
                  {project.pullQuote}
                </p>
              </blockquote>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              {/* Tech Stack */}
              <div className="bg-neutral-50 border border-neutral-200 p-5">
                <h4 className="text-xs tracking-widest font-bold mb-3">
                  TECHNOLOGIES USED
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span 
                      key={tech}
                      className="text-xs px-3 py-1.5 bg-white border border-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-neutral-50 border border-neutral-200 p-5">
                <h4 className="text-xs tracking-widest font-bold mb-3">
                  KEY FEATURES
                </h4>
                <ul className="space-y-2">
                  {project.features.map(feature => (
                    <li 
                      key={feature}
                      className="text-sm font-serif flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-neutral-400 rotate-45" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div className="flex gap-3">
                <a 
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-neutral-900 text-white text-xs tracking-wider text-center hover:bg-neutral-700 transition-colors"
                >
                  VIEW LIVE →
                </a>
                <a 
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 border border-neutral-900 text-xs tracking-wider text-center hover:bg-neutral-900 hover:text-white transition-colors"
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
