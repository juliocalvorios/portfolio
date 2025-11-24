/**
 * Ornamental divider with diamond shapes
 * Used between sections for visual separation
 */
function Ornament({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-neutral-400" />
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="w-1 h-1 bg-neutral-400 rotate-45" 
          />
        ))}
      </div>
      <div className="flex-1 h-px bg-neutral-400" />
    </div>
  )
}

export default Ornament
