import Ornament from './ui/Ornament'

function ArticleView({ project, onBack }) {
  if (!project) return null

  return (
    <div className="animate-fadeIn">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs tracking-widest text-neutral-500 hover:text-neutral-900 mb-6 press-effect"
      >
        <span>←</span>
        <span>BACK TO FRONT PAGE</span>
      </button>

      {/* Article Header */}
      <header className="border-b-2 border-neutral-800 pb-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] tracking-widest text-neutral-500">
            {project.category}
          </span>
          <span className="text-neutral-300">·</span>
          <span className="text-[10px] tracking-widest text-neutral-500">
            {project.year}
          </span>
          <span className="text-neutral-300">·</span>
          <span className="text-[10px] tracking-widest text-neutral-500">
            {project.type}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-4 text-balance">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 italic font-serif max-w-3xl">
          {project.subtitle}
        </p>

        {/* Byline */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
          <div>
            <span className="font-bold text-neutral-700">By JULIO CALVO</span>
            <span className="mx-2">|</span>
            <span>Toronto Bureau</span>
          </div>
          <div className="hidden sm:block text-neutral-300">|</div>
          <div className="hidden sm:block">
            5 min read
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Content */}
        <article className="lg:col-span-8">
          {/* Lead paragraph with drop cap */}
          <p className="text-lg sm:text-xl leading-relaxed font-serif mb-6">
            <span className="text-5xl sm:text-6xl font-bold float-left mr-3 leading-none mt-1">
              {project.content.trim()[0]}
            </span>
            {project.content.trim().slice(1)}
          </p>

          {/* Project Image */}
          <figure className="my-8">
            <div className="bg-neutral-100 border-2 border-neutral-200 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl sm:text-8xl text-neutral-300 mb-3 font-serif">
                  {project.name[0]}
                </div>
                <p className="text-[10px] tracking-widest text-neutral-400">
                  PROJECT INTERFACE
                </p>
              </div>
            </div>
            <figcaption className="text-sm text-neutral-500 italic text-center mt-3 font-serif">
              The {project.name} interface showcasing the main dashboard view.
            </figcaption>
          </figure>

          {/* Pull Quote */}
          <blockquote className="border-l-4 border-neutral-800 pl-6 py-4 my-8">
            <p className="text-2xl sm:text-3xl italic font-serif leading-relaxed">
              {project.pullQuote}
            </p>
          </blockquote>

          {/* Full content */}
          <div className="space-y-6">
            <p className="text-base sm:text-lg leading-relaxed font-serif">
              {project.fullContent}
            </p>

            <p className="text-base sm:text-lg leading-relaxed font-serif text-neutral-700">
              The project demonstrates a commitment to thoughtful design and user-centered
              development, prioritizing both functionality and aesthetic cohesion. Each
              feature was carefully considered to solve real problems users face daily.
            </p>

            <p className="text-base sm:text-lg leading-relaxed font-serif text-neutral-700">
              Looking ahead, the platform continues to evolve with user feedback driving
              new feature development and refinement of existing capabilities. The goal
              remains the same: create tools that genuinely improve people's workflows.
            </p>
          </div>

          <Ornament className="my-10" />

          {/* Feature List in Article */}
          <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 my-8">
            <h3 className="text-xs tracking-widest font-bold mb-4">
              KEY FEATURES AT A GLANCE
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.features.map(feature => (
                <div key={feature} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-800 rotate-45" />
                  <span className="text-sm font-serif">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-8 space-y-6">
            {/* Project Card */}
            <div className="border-2 border-neutral-800 p-5 sm:p-6">
              <h3 className="text-xs tracking-widest font-bold mb-4 text-center border-b border-neutral-200 pb-3">
                PROJECT DETAILS
              </h3>

              <div className="text-center mb-4">
                <p className="text-2xl font-bold font-serif">{project.name}</p>
                <p className="text-sm text-neutral-500">{project.type}</p>
              </div>

              <Ornament className="my-4" />

              {/* Tech Stack */}
              <div className="mb-4">
                <p className="text-[10px] tracking-widest text-neutral-400 mb-2">
                  TECHNOLOGIES
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span
                      key={tech}
                      className="text-[10px] px-2 py-1 bg-neutral-100 border border-neutral-200 stamp"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Ornament className="my-4" />

              {/* Links */}
              <div className="space-y-2">
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 bg-neutral-900 text-white text-[10px] tracking-wider text-center press-effect"
                >
                  VIEW LIVE PROJECT →
                </a>
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 border-2 border-neutral-800 text-[10px] tracking-wider text-center press-effect hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  SOURCE CODE
                </a>
              </div>
            </div>

            {/* Related Notice */}
            <div className="border border-neutral-300 p-4 bg-neutral-50">
              <p className="text-[9px] tracking-widest text-neutral-400 mb-2">
                MORE FROM THE ARCHIVE
              </p>
              <p className="text-sm font-serif text-neutral-600">
                Explore additional projects in the Selected Works section to see
                the full portfolio of work.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t-2 border-neutral-800">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={onBack}
            className="text-xs tracking-widest text-neutral-500 hover:text-neutral-900 press-effect"
          >
            ← RETURN TO FRONT PAGE
          </button>

          <div className="text-[10px] tracking-widest text-neutral-400">
            FILED UNDER: {project.category}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ArticleView
