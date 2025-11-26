import { useState, useEffect, lazy, Suspense } from 'react'
import Masthead from './components/Masthead'
import { TopBanner } from './components/ui/AdBanner'
import LoadingScreen from './components/ui/LoadingScreen'
import PageTransition from './components/ui/PageTransition'
import StickyNav from './components/ui/StickyNav'
import { SoundProvider } from './components/ui/SoundManager'

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
        />

        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8 max-w-7xl mx-auto w-full">
          <PageTransition sectionKey={activeSection}>
            <Suspense fallback={<SectionLoader />}>
              {renderSection()}
            </Suspense>
          </PageTransition>
        </main>

        <Footer onSectionChange={handleSectionChange} />
      </div>
    </SoundProvider>
  )
}

function Footer({ onSectionChange }) {
  return (
    <footer className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-t-2 border-neutral-800 mt-8 sm:mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="text-center sm:text-left">
            <p
              className="font-bold text-sm sm:text-base"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The Julio Calvo Times
            </p>
          </div>

          {/* Quick links */}
          <div className="flex gap-3 sm:gap-4 md:gap-6 text-[11px] sm:text-xs md:text-sm">
            <button
              onClick={() => onSectionChange('front')}
              className="text-neutral-500 hover:text-neutral-900 transition-colors py-2 min-h-[44px] flex items-center"
            >
              Home
            </button>
            <button
              onClick={() => onSectionChange('works')}
              className="text-neutral-500 hover:text-neutral-900 transition-colors py-2 min-h-[44px] flex items-center"
            >
              Works
            </button>
            <button
              onClick={() => onSectionChange('about')}
              className="text-neutral-500 hover:text-neutral-900 transition-colors py-2 min-h-[44px] flex items-center"
            >
              About
            </button>
            <button
              onClick={() => onSectionChange('contact')}
              className="text-neutral-500 hover:text-neutral-900 transition-colors py-2 min-h-[44px] flex items-center"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Bottom line */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4 border-t border-neutral-200 text-[9px] sm:text-[10px] tracking-widest text-neutral-500">
          <span>© 2025 JULIO CALVO</span>
          <span className="hidden sm:inline">PRINTED IN TORONTO, CANADA</span>
          <span>EST. 2024</span>
        </div>
      </div>
    </footer>
  )
}

export default App
