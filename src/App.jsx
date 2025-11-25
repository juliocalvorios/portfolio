import { useState } from 'react'
import Masthead from './components/Masthead'
import FrontPage from './components/FrontPage'
import SelectedWorks from './components/SelectedWorks'
import About from './components/About'
import Classifieds from './components/Classifieds'

function App() {
  const [activeSection, setActiveSection] = useState('front')
  const [selectedProject, setSelectedProject] = useState(null)

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

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Masthead 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
      
      <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8 max-w-7xl mx-auto w-full">
        {renderSection()}
      </main>
      
      <Footer onSectionChange={handleSectionChange} />
    </div>
  )
}

function Footer({ onSectionChange }) {
  return (
    <footer className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-t-2 border-neutral-800 mt-8 sm:mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="text-center sm:text-left">
            <p className="font-serif font-bold text-sm sm:text-base">The Calvo Chronicle</p>
            <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5">
              Frontend Developer Portfolio
            </p>
          </div>
          
          {/* Quick links */}
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <button 
              onClick={() => onSectionChange('front')}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => onSectionChange('works')}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Works
            </button>
            <button 
              onClick={() => onSectionChange('about')}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => onSectionChange('contact')}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
        
        {/* Bottom line */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4 border-t border-neutral-200 text-[9px] sm:text-[10px] tracking-widest text-neutral-500">
          <span>© 2025 JULIO CALVO</span>
          <span className="hidden sm:inline">PRINTED IN TORONTO, CANADA</span>
          <span>BUILT WITH REACT + TAILWIND</span>
        </div>
      </div>
    </footer>
  )
}

export default App
