/**
 * Section divider with centered title
 * Used to separate content sections with a label
 */
function SectionRule({ title }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="h-px flex-1 bg-neutral-800" />
      <span className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
        {title}
      </span>
      <div className="h-px flex-1 bg-neutral-800" />
    </div>
  )
}

export default SectionRule
