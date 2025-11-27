import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import Masthead from './components/Masthead'
import { TopBanner } from './components/ui/AdBanner'
import LoadingScreen from './components/ui/LoadingScreen'
import PageTransition from './components/ui/PageTransition'
import StickyNav from './components/ui/StickyNav'
import { SoundProvider } from './components/ui/SoundManager'
import NewspaperCTA from './components/ui/NewspaperCTA'
import PrintEdition from './components/PrintEdition'

/**
 * Fixed Reading Progress Bar
 * Always visible at the very top of the page
 * Uses requestAnimationFrame for buttery smooth animation
 */
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)
  const targetProgress = useRef(0)
  const currentProgress = useRef(0)
  const rafId = useRef(null)

  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor

    const animate = () => {
      // Smooth interpolation towards target
      currentProgress.current = lerp(currentProgress.current, targetProgress.current, 0.08)

      // Only update state when there's meaningful change
      if (Math.abs(currentProgress.current - progress) > 0.1) {
        setProgress(currentProgress.current)
      }

      rafId.current = requestAnimationFrame(animate)
    }

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const percentage = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0
      targetProgress.current = Math.min(percentage, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [progress])

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] bg-transparent">
      <div
        className="h-full bg-navy"
        style={{
          width: `${progress}%`,
          boxShadow: progress > 0 ? '0 0 8px rgba(30,58,95,0.4)' : 'none'
        }}
      />
    </div>
  )
}


// Lazy load sections for better initial load performance
const FrontPage = lazy(() => import('./components/FrontPage'))
const SelectedWorks = lazy(() => import('./components/SelectedWorks'))
const About = lazy(() => import('./components/About'))
const Classifieds = lazy(() => import('./components/Classifieds'))

// Simple loading fallback for lazy sections
function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="inline-block w-6 h-6 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
        <p className="mt-3 text-xs tracking-widest text-neutral-500">LOADING...</p>
      </div>
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('front')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showPrintEdition, setShowPrintEdition] = useState(false)

  // Subtle parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const parallaxElements = document.querySelectorAll('.parallax-element')

      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0.1
        const yPos = -(scrolled * speed)
        el.style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setActiveSection('works')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
    setSelectedProject(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'front':
        return <FrontPage onProjectClick={handleProjectClick} />
      case 'works':
        return <SelectedWorks initialProject={selectedProject} />
      case 'about':
        return <About />
      case 'contact':
        return <Classifieds />
      default:
        return <FrontPage onProjectClick={handleProjectClick} />
    }
  }

  // Show loading screen on initial load
  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <SoundProvider>
      <div className="min-h-screen bg-paper flex flex-col animate-fadeIn">
          {/* Reading progress bar - always visible at top (hidden during print edition) */}
          {!showPrintEdition && <ReadingProgressBar />}

          {/* Sticky navigation bar - appears on scroll */}
          <StickyNav
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />

          {/* Grain texture overlay - vintage paper effect */}
          <div className="grain-overlay" aria-hidden="true" />

          {/* Top Advertisement Banner - Only on The Developer section */}
          {activeSection === 'about' && <TopBanner />}

          <Masthead
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onPrintEdition={() => setShowPrintEdition(true)}
          />

          <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8 max-w-7xl mx-auto w-full">
            <PageTransition sectionKey={activeSection}>
              <Suspense fallback={<SectionLoader />}>
                {renderSection()}
              </Suspense>
            </PageTransition>
          </main>

          {/* Newspaper CTA - Only on Front Page */}
          {activeSection === 'front' && (
            <div className="border-t border-neutral-200">
              <NewspaperCTA onContactClick={() => handleSectionChange('contact')} />
            </div>
          )}

        <Footer
          onSectionChange={handleSectionChange}
          onPrintEdition={() => setShowPrintEdition(true)}
        />

        {/* Print Edition Overlay */}
        <PrintEdition
          isOpen={showPrintEdition}
          onClose={() => setShowPrintEdition(false)}
        />
      </div>
    </SoundProvider>
  )
}

/**
 * Footer compacto estilo editorial con iconos SVG
 */

// Iconos SVG para redes sociales
const SocialIcon = ({ type, className = "w-4 h-4" }) => {
  const icons = {
    github: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    linkedin: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    email: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
      </svg>
    ),
    veraos: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  }
  return icons[type] || null
}

function Footer({ onSectionChange, onPrintEdition }) {
  const socialLinks = [
    { href: 'https://github.com/juliocalvor811-svg', label: 'GitHub', icon: 'github', isExternal: true },
    { href: 'https://linkedin.com/in/juliocalvorios', label: 'LinkedIn', icon: 'linkedin', isExternal: true },
    { href: 'mailto:juliocalvorios@gmail.com', label: 'Email', icon: 'email', isExternal: false },
    { href: 'https://veraos.ai', label: 'veraOS', icon: 'veraos', isExternal: true },
  ]

  const navItems = [
    { id: 'front', label: 'Front Page' },
    { id: 'works', label: 'Works' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <footer role="contentinfo" aria-label="Site footer">
      <div className="bg-paper text-ink">
        <div className="h-0.5 bg-gradient-to-r from-paper via-ink to-paper" />
        <div className="px-4 sm:px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Marca */}
              <div>
                <p className="text-sm tracking-[0.15em] font-bold">JULIO CALVO</p>
                <p className="text-[9px] tracking-widest text-neutral-500">FRONTEND DEVELOPER</p>
              </div>

              {/* Navegación */}
              <nav className="flex flex-wrap justify-center gap-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSectionChange(item.id)}
                    className="text-[11px] tracking-[0.15em] text-neutral-600 hover:text-ink transition-colors focus:outline-none relative group"
                  >
                    {item.label.toUpperCase()}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-ink group-hover:w-full transition-all duration-300" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={onPrintEdition}
                  className="text-[11px] tracking-[0.15em] text-neutral-600 hover:text-ink transition-colors focus:outline-none relative group"
                >
                  PRINT EDITION
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-ink group-hover:w-full transition-all duration-300" />
                </button>
              </nav>

              {/* Social y copyright */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="w-9 h-9 border border-neutral-400 flex items-center justify-center text-neutral-500 hover:border-ink hover:text-ink hover:bg-ink/5 transition-all"
                      title={link.label}
                    >
                      <SocialIcon type={link.icon} className="w-4 h-4" />
                    </a>
                  ))}
                </div>
                <div className="hidden sm:block w-px h-6 bg-neutral-400" />
                <div className="text-right">
                  <p className="text-[9px] tracking-widest text-neutral-500">© 2025</p>
                  <p className="text-[8px] tracking-wider text-neutral-400">TORONTO, CANADA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 bg-ink" />
      </div>
    </footer>
  )
}

export default App
