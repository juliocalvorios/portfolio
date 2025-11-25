import Ornament from './ui/Ornament'

const sections = [
  { id: 'front', label: 'Front Page' },
  { id: 'works', label: 'Selected Works' },
  { id: 'about', label: 'The Developer' },
  { id: 'contact', label: 'Classifieds' },
]

function Masthead({ activeSection, onSectionChange }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase()

  return (
    <header className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-4 border-b-2 border-neutral-800">
      {/* Top meta line */}
      <div className="flex justify-between items-center text-[9px] sm:text-[10px] tracking-widest text-neutral-500 mb-3 sm:mb-4">
        <span className="hidden sm:inline">VOL. CXXXVII... NO. 47,892</span>
        <span className="sm:hidden">VOL. CXXXVII</span>
        <span className="hidden md:inline">LATE EDITION</span>
        <span className="text-right">
          <span className="hidden sm:inline">TORONTO, </span>
          {today}
        </span>
      </div>
      
      {/* Top ornament */}
      <Ornament />
      
      {/* Main title */}
      <div className="text-center py-3 sm:py-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-serif text-balance">
          THE CALVO CHRONICLE
        </h1>
        <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 mt-1 sm:mt-2">
          "ALL THE CODE THAT'S FIT TO SHIP"
        </p>
      </div>
      
      {/* Bottom ornament */}
      <Ornament />
      
      {/* Navigation */}
      <nav className="flex justify-center flex-wrap gap-2 sm:gap-4 md:gap-8 mt-3 sm:mt-4 pt-3 border-t border-neutral-300">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`text-[9px] sm:text-[10px] md:text-xs tracking-wider sm:tracking-widest pb-1 sm:pb-2 transition-all duration-200 ${
              activeSection === section.id 
                ? 'text-neutral-900 border-b-2 border-neutral-900 font-bold' 
                : 'text-neutral-500 hover:text-neutral-800'
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
