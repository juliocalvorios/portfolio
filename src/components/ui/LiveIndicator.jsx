/**
 * Live/Breaking Indicator Component
 * NYT-style red LIVE or BREAKING text for urgent/featured content
 */

function LiveIndicator({ type = 'live', pulse = true }) {
  const labels = {
    live: 'LIVE',
    breaking: 'BREAKING',
    featured: 'FEATURED',
    new: 'NEW',
    updated: 'UPDATED',
  }

  const colors = {
    live: 'text-red-600 bg-red-50 border-red-200',
    breaking: 'text-red-700 bg-red-50 border-red-300',
    featured: 'text-stone-600 bg-stone-100 border-stone-300',
    new: 'text-stone-600 bg-stone-100 border-stone-300',
    updated: 'text-neutral-600 bg-neutral-100 border-neutral-300',
  }

  const dotColors = {
    live: 'bg-red-500',
    breaking: 'bg-red-600',
    featured: 'bg-stone-500',
    new: 'bg-stone-500',
    updated: 'bg-neutral-500',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] tracking-widest font-bold border ${colors[type]}`}>
      {(type === 'live' || type === 'breaking') && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColors[type]} opacity-75`} />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[type]}`} />
        </span>
      )}
      {labels[type]}
    </span>
  )
}

/**
 * Breaking News Banner
 * Full-width alert for top of page
 */
function BreakingBanner({ children, type = 'breaking' }) {
  const bgColors = {
    breaking: 'bg-red-600',
    live: 'bg-red-500',
    alert: 'bg-amber-500',
  }

  return (
    <div className={`${bgColors[type]} text-white py-2 px-4`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <span className="text-xs tracking-widest font-bold uppercase">
          {type === 'breaking' ? 'BREAKING' : type === 'live' ? 'LIVE' : 'ALERT'}
        </span>
        <span className="text-sm font-serif">{children}</span>
      </div>
    </div>
  )
}

export { LiveIndicator, BreakingBanner }
export default LiveIndicator
