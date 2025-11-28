import { useEffect } from 'react'
import projects from '../data/projects'
import { RelatedBox } from './ui/RelatedInline'

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
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-neutral-600 text-sm sm:text-base">
              JC
            </div>
            <div>
              <p className="font-semibold text-xs sm:text-sm">By Julio Calvo</p>
              <p className="text-[10px] sm:text-xs text-neutral-500">Reporting from Toronto</p>
            </div>
          </div>
          {/* How this was built */}
          <p className="text-[10px] sm:text-xs text-neutral-500 mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-neutral-100">
            <span className="font-semibold text-neutral-600">How this was built:</span>{' '}
            {project.duration} of development as {project.role.toLowerCase()}, using {project.tech.slice(0, 3).join(', ')}.
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 md:mb-12">
        <div className="relative border border-neutral-200 overflow-hidden">
          {project.image ? (
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
          {project.imageCaption}
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
                    {paragraph.content}
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
                    <div className="aspect-video bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                      <span className="text-3xl sm:text-4xl text-neutral-300 font-serif">
                        {paragraph.placeholder}
                      </span>
                    </div>
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

                {/* Insert Related Article inline after 3rd paragraph */}
                {index === 2 && (
                  <RelatedBox
                    title={projects.find(p => p.id !== projectId)?.name || 'Related Project'}
                    category={projects.find(p => p.id !== projectId)?.category}
                    onClick={() => {
                      const related = projects.find(p => p.id !== projectId)
                      if (related) window.location.hash = `project-${related.id}`
                    }}
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

            {/* Technologies */}
            <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
              <h3 className="text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-bold mb-3 sm:mb-4">TECHNOLOGIES</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tech.map(tech => (
                  <span
                    key={tech}
                    className="text-[9px] sm:text-[10px] tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 bg-white border border-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

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
