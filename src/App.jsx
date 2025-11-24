import { useState } from 'react'
import Masthead from './components/Masthead'
import FrontPage from './components/FrontPage'

function App() {
  const [activeSection, setActiveSection] = useState('front')
  const [selectedProject, setSelectedProject] = useState(null)

  // Handle project click from FrontPage
  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setActiveSection('works')
  }

  // Render current section
  const renderSection = () => {
    switch (activeSection) {
      case 'front':
        return <FrontPage onProjectClick={handleProjectClick} />
      case 'works':
        return <ComingSoon section="Selected Works" />
      case 'about':
        return <ComingSoon section="The Developer" />
      case 'contact':
        return <ComingSoon section="Classifieds" />
      default:
        return <FrontPage onProjectClick={handleProjectClick} />
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <Masthead 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
        {renderSection()}
      </main>
      
      <Footer />
    </div>
  )
}

/**
 * Placeholder for sections not yet implemented
 */
function ComingSoon({ section }) {
  return (
    <div className="text-center py-20">
      <p className="text-neutral-400 text-sm tracking-widest">
        {section.toUpperCase()}
      </p>
      <p className="text-neutral-300 mt-2 font-serif italic">
        Coming in next phase...
      </p>
    </div>
  )
}

/**
 * Footer component
 */
function Footer() {
  return (
    <footer className="px-4 md:px-8 py-6 border-t-2 border-neutral-800 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-widest text-neutral-500">
        <span>© 2025 THE CALVO CHRONICLE</span>
        <span>PRINTED IN TORONTO, CANADA</span>
        <span>FRONTEND · UI/UX · REACT</span>
      </div>
    </footer>
  )
}

export default App
