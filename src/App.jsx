import { useState } from 'react'
import Masthead from './components/Masthead'

function App() {
  const [activeSection, setActiveSection] = useState('front')

  return (
    <div className="min-h-screen bg-paper">
      <Masthead 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      {/* Content will go here */}
      <main className="px-8 py-8">
        <p className="text-center text-neutral-500">
          Section: {activeSection}
        </p>
      </main>
    </div>
  )
}

export default App
