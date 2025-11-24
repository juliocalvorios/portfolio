import Ornament from './ui/Ornament'

const sections = [
  { id: 'front', label: 'Front Page' },
  { id: 'works', label: 'Selected Works' },
  { id: 'about', label: 'The Developer' },
  { id: 'contact', label: 'Classifieds' },
]

function Masthead({ activeSection, onSectionChange }) {
  // Format today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase()

  return (
    <header className="px-4 md:px-8 pt-6 pb-4 border-b-2 border-neutral-800">
      {/* Top meta line */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] tracking-widest text-neutral-500 mb-4">
        <span>VOL. CXXXVII... NO. 47,892</span>
        <span className="hidden md:inline">LATE EDITION</span>
        <span>TORONTO, {today}</span>
      </div>
      
      {/* Top ornament */}
      <Ornament />
      
      {/* Main title */}
      <div className="text-center py-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-serif">
          THE CALVO CHRONICLE
        </h1>
        <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 mt-2">
          "ALL THE CODE THAT'S FIT TO SHIP"
        </p>
      </div>
      
      {/* Bottom ornament */}
      <Ornament />
      
      {/* Navigation */}
      <nav className="flex justify-center flex-wrap gap-3 md:gap-8 mt-4 pt-3 border-t border-neutral-300">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`text-[10px] md:text-xs tracking-widest pb-2 transition-colors ${
              activeSection === section.id 
                ? 'text-neutral-900 border-b-2 border-neutral-900 font-bold' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {section.label.toUpperCase()}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Masthead
