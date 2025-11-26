/**
 * Ornamental divider with diamond shapes
 * Used between sections for visual separation
 */
function Ornament({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 md:gap-4 ${className}`}>
      <div className="flex-1 h-px bg-neutral-400" />
      <div className="flex gap-1 sm:gap-1.5 items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-neutral-400 transform rotate-45"
            style={{
              flexShrink: 0,
              display: 'block'
            }}
          />
        ))}
      </div>
      <div className="flex-1 h-px bg-neutral-400" />
    </div>
  )
}

export default Ornament
