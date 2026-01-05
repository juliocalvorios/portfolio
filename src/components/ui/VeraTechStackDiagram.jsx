/**
 * VeraTechStackDiagram
 * 
 * Clean, static tech stack visualization with real metrics
 */

const STACK = [
  {
    category: 'Frontend',
    color: '#3b82f6',
    items: [
      { name: 'React 18', detail: 'UI Framework' },
      { name: 'TypeScript', detail: 'Type Safety' },
      { name: 'Tailwind CSS', detail: 'Styling' },
      { name: 'Three.js', detail: 'Animated Circle' },
    ]
  },
  {
    category: 'Backend',
    color: '#22c55e',
    items: [
      { name: 'Supabase', detail: 'Auth + DB + Realtime' },
      { name: '20+ Edge Functions', detail: 'Secure API Proxies' },
      { name: 'Stripe', detail: 'Subscriptions' },
      { name: 'Render', detail: 'Embeddings Server' },
    ]
  },
  {
    category: 'AI Providers',
    color: '#f59e0b',
    items: [
      { name: 'OpenAI', detail: 'GPT-4o' },
      { name: 'Anthropic', detail: 'Claude Sonnet' },
      { name: 'Google', detail: 'Gemini Pro' },
      { name: 'Groq + Mistral + Scaleway', detail: 'Fast inference' },
    ]
  },
]

const METRICS = [
  { label: 'React Components', value: '200+' },
  { label: 'Edge Functions', value: '20+' },
  { label: 'AI Providers', value: '6' },
  { label: 'Widgets', value: '10+' },
]

export default function VeraTechStackDiagram() {
  return (
    <div className="select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-0.5">
        <span className="text-[10px] tracking-wider text-neutral-500 uppercase font-semibold">
          Technical Architecture
        </span>
      </div>

      {/* Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {STACK.map((section) => (
          <div 
            key={section.category}
            className="bg-white border border-neutral-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-100">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: section.color }}
              />
              <span className="text-xs font-semibold text-neutral-700">
                {section.category}
              </span>
            </div>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div key={item.name} className="flex justify-between items-baseline">
                  <span className="text-[11px] font-medium text-neutral-800">
                    {item.name}
                  </span>
                  <span className="text-[9px] text-neutral-400">
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-2">
        {METRICS.map((stat) => (
          <div 
            key={stat.label} 
            className="text-center p-3 bg-white rounded-lg border border-neutral-200"
          >
            <div className="text-lg font-bold text-neutral-800">{stat.value}</div>
            <div className="text-[9px] text-neutral-500 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
