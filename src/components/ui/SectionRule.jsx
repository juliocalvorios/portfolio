/**
 * Section divider with centered title
 * Used to separate content sections with a label
 * NYT-style hierarchy: double (major), single (standard), light (minor)
 */
function SectionRule({ title, variant = 'standard' }) {
  // Line styles based on variant
  const lineStyles = {
    double: 'h-[3px] bg-neutral-900 border-t border-b border-neutral-900',
    standard: 'h-px bg-neutral-800',
    light: 'h-px bg-neutral-300',
  }

  const lineClass = lineStyles[variant] || lineStyles.standard

  if (!title) {
    // Just a line divider without text
    return (
      <div className={`my-6 ${variant === 'double' ? 'my-8' : ''}`}>
        {variant === 'double' ? (
          <div className="flex flex-col gap-0.5">
            <div className="h-[2px] bg-neutral-900" />
            <div className="h-px bg-neutral-900" />
          </div>
        ) : (
          <div className={lineClass} />
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-4 ${variant === 'double' ? 'my-10' : 'my-8'}`}>
      {variant === 'double' ? (
        <>
          <div className="flex-1 flex flex-col gap-0.5">
            <div className="h-[2px] bg-neutral-900" />
            <div className="h-px bg-neutral-900" />
          </div>
          <span className="text-xs tracking-[0.2em] text-neutral-900 uppercase font-bold">
            {title}
          </span>
          <div className="flex-1 flex flex-col gap-0.5">
            <div className="h-[2px] bg-neutral-900" />
            <div className="h-px bg-neutral-900" />
          </div>
        </>
      ) : (
        <>
          <div className={`flex-1 ${lineClass}`} />
          <span className={`text-[10px] tracking-[0.3em] uppercase ${
            variant === 'light' ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            {title}
          </span>
          <div className={`flex-1 ${lineClass}`} />
        </>
      )}
    </div>
  )
}

export default SectionRule
