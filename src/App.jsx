import { useState } from 'react'
import Masthead from './components/Masthead'
import FrontPage from './components/FrontPage'
import SelectedWorks from './components/SelectedWorks'
import About from './components/About'
import Classifieds from './components/Classifieds'
import ArticleView from './components/ArticleView'

function App() {
  const [activeSection, setActiveSection] = useState('front')
  const [selectedProject, setSelectedProject] = useState(null)

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setActiveSection('article')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToFront = () => {
    setSelectedProject(null)
    setActiveSection('front')
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
      case 'article':
        return <ArticleView project={selectedProject} onBack={handleBackToFront} />
      case 'works':
        return <SelectedWorks />
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
  const currentYear = new Date().getFullYear()

  return (
    <footer className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 border-t-2 border-neutral-800 mt-8 sm:mt-12 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px bg-neutral-300 w-12 sm:w-20" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-neutral-400 rotate-45" />
            ))}
          </div>
          <div className="h-px bg-neutral-300 w-12 sm:w-20" />
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Masthead */}
          <div className="md:col-span-4 text-center md:text-left">
            <h3 className="font-serif font-bold text-xl sm:text-2xl mb-2">The Julio Calvo Times</h3>
            <p className="text-[10px] tracking-[0.2em] text-neutral-500 mb-3">
              ALL THE CODE THAT'S FIT TO SHIP
            </p>
            <p className="text-xs text-neutral-500 font-serif italic max-w-xs mx-auto md:mx-0">
              A frontend developer's portfolio, crafted with the same care as the projects within.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 text-center md:text-left">
            <p className="text-[9px] tracking-widest text-neutral-400 font-bold mb-3">SECTIONS</p>
            <nav className="space-y-2">
              {[
                { id: 'front', label: 'Front Page' },
                { id: 'works', label: 'Selected Works' },
                { id: 'about', label: 'The Developer' },
                { id: 'contact', label: 'Classifieds' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className="block text-sm font-serif text-neutral-600 typewriter-link w-full md:w-auto"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 text-center md:text-left">
            <p className="text-[9px] tracking-widest text-neutral-400 font-bold mb-3">CORRESPONDENCE</p>
            <div className="space-y-2 text-sm font-serif">
              <a href="mailto:julio@veraos.ai" className="block text-neutral-600 typewriter-link">
                julio@veraos.ai
              </a>
              <p className="text-neutral-500 text-xs">Toronto, Ontario, Canada</p>
              <p className="text-neutral-500 text-xs">Available for opportunities</p>
            </div>
          </div>

          {/* Colophon */}
          <div className="md:col-span-3 text-center md:text-left">
            <p className="text-[9px] tracking-widest text-neutral-400 font-bold mb-3">COLOPHON</p>
            <div className="text-xs text-neutral-500 space-y-1 font-serif">
              <p>Set in Georgia & SF Mono</p>
              <p>Built with React & Tailwind CSS</p>
              <p>Deployed via Vercel</p>
              <p className="text-neutral-400 italic mt-2">Last updated: Nov {currentYear}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar - Printer's mark */}
        <div className="border-t-2 border-b-2 border-neutral-800 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] sm:text-[10px] tracking-widest text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-neutral-800 rotate-45" />
              <span>PRINTED IN TORONTO, CANADA</span>
            </div>

            <div className="text-center">
              <span className="font-bold text-neutral-700">© {currentYear} JULIO CALVO</span>
              <span className="mx-2 text-neutral-300">|</span>
              <span>ALL RIGHTS RESERVED</span>
            </div>

            <div className="flex items-center gap-2">
              <span>EDITION NO. {String(Math.floor(Date.now() / 86400000) % 1000).padStart(3, '0')}</span>
              <span className="w-2 h-2 bg-neutral-800 rotate-45" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default App
