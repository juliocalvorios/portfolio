import { useState, useEffect, useRef } from 'react'

/**
 * VeraTechStackDiagram
 * 
 * Advanced animated architecture diagram showing vera's tech stack
 * with flowing data particles between nodes.
 */

const NODES = [
  { id: 'react', label: 'React 18', x: 50, y: 20, type: 'frontend', desc: 'UI Framework' },
  { id: 'three', label: 'Three.js', x: 15, y: 45, type: 'frontend', desc: 'Animated Circle' },
  { id: 'tailwind', label: 'Tailwind', x: 85, y: 45, type: 'frontend', desc: 'Styling' },
  { id: 'supabase', label: 'Supabase', x: 50, y: 55, type: 'backend', desc: 'Auth + DB + Storage' },
  { id: 'groq', label: 'Groq API', x: 20, y: 80, type: 'ai', desc: 'LLM Inference' },
  { id: 'render', label: 'Render', x: 80, y: 80, type: 'ai', desc: 'Embeddings Server' },
]

const CONNECTIONS = [
  { from: 'react', to: 'three' },
  { from: 'react', to: 'tailwind' },
  { from: 'react', to: 'supabase' },
  { from: 'supabase', to: 'groq' },
  { from: 'supabase', to: 'render' },
]

const TYPE_COLORS = {
  frontend: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' },
  backend: { bg: '#dcfce7', border: '#22c55e', text: '#166534' },
  ai: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
}

export default function VeraTechStackDiagram() {
  const [activeNode, setActiveNode] = useState(null)
  const [particles, setParticles] = useState([])
  const svgRef = useRef(null)
  const particleId = useRef(0)

  // Generate flowing particles
  useEffect(() => {
    const interval = setInterval(() => {
      const connection = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)]
      const fromNode = NODES.find(n => n.id === connection.from)
      const toNode = NODES.find(n => n.id === connection.to)
      
      if (fromNode && toNode) {
        const newParticle = {
          id: particleId.current++,
          fromX: fromNode.x,
          fromY: fromNode.y,
          toX: toNode.x,
          toY: toNode.y,
          progress: 0,
          color: TYPE_COLORS[toNode.type].border
        }
        setParticles(prev => [...prev.slice(-8), newParticle])
      }
    }, 800)

    return () => clearInterval(interval)
  }, [])

  // Animate particles
  useEffect(() => {
    const animate = () => {
      setParticles(prev => 
        prev
          .map(p => ({ ...p, progress: p.progress + 0.02 }))
          .filter(p => p.progress < 1)
      )
    }
    const frame = requestAnimationFrame(function loop() {
      animate()
      requestAnimationFrame(loop)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const getNodePosition = (node) => ({
    x: `${node.x}%`,
    y: `${node.y}%`
  })

  return (
    <div className="select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-0.5">
        <span className="text-[9px] tracking-wider text-neutral-400 uppercase">Technical Architecture</span>
        <div className="flex gap-3">
          {Object.entries(TYPE_COLORS).map(([type, colors]) => (
            <div key={type} className="flex items-center gap-1">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.border }}
              />
              <span className="text-[8px] text-neutral-500 capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Diagram */}
      <div className="relative bg-neutral-50 border border-neutral-200 rounded-lg overflow-hidden" style={{ height: '320px' }}>
        <svg 
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
        >
          {/* Connection lines */}
          {CONNECTIONS.map((conn, i) => {
            const from = NODES.find(n => n.id === conn.from)
            const to = NODES.find(n => n.id === conn.to)
            if (!from || !to) return null
            
            return (
              <line
                key={i}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="#d1d5db"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                className="transition-all duration-300"
                style={{
                  stroke: activeNode === from.id || activeNode === to.id 
                    ? TYPE_COLORS[to.type].border 
                    : '#d1d5db'
                }}
              />
            )
          })}

          {/* Animated particles */}
          {particles.map(p => {
            const x = p.fromX + (p.toX - p.fromX) * p.progress
            const y = p.fromY + (p.toY - p.fromY) * p.progress
            const opacity = p.progress < 0.2 ? p.progress * 5 : p.progress > 0.8 ? (1 - p.progress) * 5 : 1
            
            return (
              <circle
                key={p.id}
                cx={`${x}%`}
                cy={`${y}%`}
                r="3"
                fill={p.color}
                opacity={opacity}
              >
                <animate
                  attributeName="r"
                  values="2;4;2"
                  dur="0.5s"
                  repeatCount="indefinite"
                />
              </circle>
            )
          })}
        </svg>

        {/* Nodes */}
        {NODES.map(node => {
          const colors = TYPE_COLORS[node.type]
          const isActive = activeNode === node.id
          
          return (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 cursor-pointer"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                zIndex: isActive ? 10 : 2
              }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <div 
                className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 ${
                  isActive ? 'scale-110 shadow-lg' : 'shadow-sm'
                }`}
                style={{
                  backgroundColor: colors.bg,
                  borderColor: colors.border,
                }}
              >
                <div 
                  className="text-[11px] font-semibold text-center"
                  style={{ color: colors.text }}
                >
                  {node.label}
                </div>
                <div 
                  className={`text-[8px] text-center transition-all duration-200 overflow-hidden ${
                    isActive ? 'max-h-10 opacity-100 mt-0.5' : 'max-h-0 opacity-0'
                  }`}
                  style={{ color: colors.text }}
                >
                  {node.desc}
                </div>
              </div>
            </div>
          )
        })}

        {/* Decorative grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Tech details */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: 'Bundle Size', value: '~1.5MB', detail: '(after lazy loading)' },
          { label: 'First Paint', value: '<1.2s', detail: '(Lighthouse)' },
          { label: 'API Latency', value: '~50ms', detail: '(embeddings)' },
        ].map((stat, i) => (
          <div key={i} className="text-center p-2 bg-neutral-50 rounded border border-neutral-100">
            <div className="text-[10px] text-neutral-400">{stat.label}</div>
            <div className="text-sm font-semibold text-neutral-800">{stat.value}</div>
            <div className="text-[8px] text-neutral-400">{stat.detail}</div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <p className="text-[9px] text-center text-neutral-400 mt-2">
        Hover over nodes to see details • Particles show data flow
      </p>
    </div>
  )
}
