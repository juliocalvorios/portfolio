/**
 * Related Article Inline Component
 * NYT-style inline reference to related content
 * Appears within article text: [Related: Article Title]
 */
function RelatedInline({ title, onClick, category }) {
  return (
    <span
      onClick={onClick}
      className="inline-flex items-center gap-1.5 mx-1 px-2 py-0.5 bg-neutral-50 border border-neutral-200 text-sm cursor-pointer hover:bg-neutral-100 hover:border-neutral-300 transition-colors group"
    >
      <span className="text-[9px] tracking-wider text-neutral-400 uppercase">Related:</span>
      <span className="font-serif text-neutral-700 group-hover:text-neutral-900">{title}</span>
      <span className="text-neutral-400 group-hover:text-neutral-600 transition-colors">→</span>
    </span>
  )
}

/**
 * Related Article Box - for sidebar or between paragraphs
 */
function RelatedBox({ title, category, onClick }) {
  return (
    <div
      onClick={onClick}
      className="my-6 p-4 border-l-2 border-neutral-300 bg-neutral-50 cursor-pointer hover:border-neutral-500 hover:bg-neutral-100 transition-all group"
    >
      <p className="text-[9px] tracking-widest text-neutral-400 uppercase mb-1">Related</p>
      <p className="text-sm font-serif font-semibold text-neutral-700 group-hover:text-neutral-900 transition-colors">
        {title}
      </p>
      {category && (
        <p className="text-[10px] tracking-wider text-neutral-400 mt-1">{category}</p>
      )}
    </div>
  )
}

export { RelatedInline, RelatedBox }
export default RelatedInline
