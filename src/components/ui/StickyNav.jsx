import { useState, useEffect } from 'react'

/**
 * Sticky Navigation Bar
 * NYT-style horizontal bar that appears on scroll
 * Shows current section and links to related articles
 */
function StickyNav({ activeSection, onSectionChange, relatedArticles = [] }) {
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show after scrolling down 300px
      if (currentScrollY > 300) {
        // Show when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      } else {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const sections = [
    { id: 'front', label: 'Front Page' },
    { id: 'works', label: 'Selected Works' },
    { id: 'about', label: 'The Developer' },
    { id: 'contact', label: 'Classifieds' },
  ]

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] bg-paper/95 backdrop-blur-sm border-b border-neutral-200 transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between h-11 sm:h-12">
          {/* Left: Mini logo */}
          <button
            onClick={() => onSectionChange('front')}
            className="text-xs sm:text-sm font-bold font-serif hover:opacity-70 transition-opacity min-h-[44px] flex items-center"
          >
            TJCT
          </button>

          {/* Center: Section navigation */}
          <nav className="hidden sm:flex items-center gap-4 md:gap-6">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest transition-colors min-h-[44px] flex items-center ${
                  activeSection === section.id
                    ? 'text-neutral-900 font-bold'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {section.label.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* Right: Related articles scroll */}
          {relatedArticles.length > 0 && (
            <div className="hidden lg:flex items-center gap-2 text-xs">
              <span className="text-neutral-400">More:</span>
              {relatedArticles.slice(0, 2).map((article, i) => (
                <button
                  key={i}
                  onClick={article.onClick}
                  className="text-neutral-600 hover:text-neutral-900 transition-colors truncate max-w-[120px] min-h-[44px] flex items-center"
                >
                  {article.title}
                </button>
              ))}
            </div>
          )}

          {/* Mobile: Current section indicator */}
          <span className="sm:hidden text-[9px] tracking-wider text-neutral-500">
            {sections.find(s => s.id === activeSection)?.label.toUpperCase()}
          </span>
        </div>
      </div>

    </div>
  )
}

export { StickyNav }
export default StickyNav
