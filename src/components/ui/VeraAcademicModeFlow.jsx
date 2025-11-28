import { useState, useEffect } from 'react'
import { Pause, Play } from 'lucide-react'

/**
 * VeraAcademicModeFlow
 * 
 * Simple, intelligent visualization of how Academic Mode works.
 * Shows the actual logic: query → embedding → widget matching → context.
 */

const QUERY = "What should I study today?"

const WIDGETS = [
  { id: 'flashcards', name: 'Flashcards', data: '12 cards due', score: 0.89 },
  { id: 'schedule', name: 'Schedule', data: 'Exam in 3 days', score: 0.76 },
  { id: 'pomodoro', name: 'Pomodoro', data: '2h studied', score: 0.31 },
  { id: 'goals', name: 'Study Goals', data: '3 goals set', score: 0.22 },
]

const THRESHOLD = 0.5

export default function VeraAcademicModeFlow() {
  const [phase, setPhase] = useState(0) // 0: query, 1: embedding, 2: matching, 3: context
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setPhase(p => (p + 1) % 4), 2000)
    return () => clearInterval(t)
  }, [auto])

  const relevantWidgets = WIDGETS.filter(w => w.score >= THRESHOLD)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <span className="text-[9px] tracking-wider text-neutral-400 uppercase">Academic Mode</span>
        <button
          onClick={() => setAuto(!auto)}
          className="w-5 h-5 flex items-center justify-center rounded bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition-colors"
        >
          {auto ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {/* Query */}
        <div className="p-3 border-b border-neutral-100">
          <div className="text-[9px] text-neutral-400 mb-1">Query</div>
          <div 
            className="text-sm text-neutral-700 transition-opacity duration-300"
            style={{ opacity: phase >= 0 ? 1 : 0.3 }}
          >
            "{QUERY}"
          </div>
        </div>

        {/* Embedding visualization */}
        <div className="p-3 border-b border-neutral-100" style={{ backgroundColor: '#FAFAFA' }}>
          <div className="text-[9px] text-neutral-400 mb-2">Embedding (384 dimensions)</div>
          <div className="flex gap-0.5 h-6 items-end">
            {Array.from({ length: 48 }).map((_, i) => {
              const value = Math.sin(i * 0.3 + phase) * 0.5 + 0.5
              return (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all duration-500"
                  style={{
                    height: phase >= 1 ? `${value * 100}%` : '10%',
                    backgroundColor: phase >= 1 ? '#6B7056' : '#e5e7eb',
                    opacity: phase >= 1 ? 0.4 + value * 0.6 : 0.3,
                  }}
                />
              )
            })}
          </div>
          <div 
            className="text-[9px] text-neutral-400 mt-1.5 font-mono transition-opacity duration-300"
            style={{ opacity: phase >= 1 ? 1 : 0 }}
          >
            [0.23, -0.45, 0.12, 0.67, -0.33, ...]
          </div>
        </div>

        {/* Widget matching */}
        <div className="p-3">
          <div className="text-[9px] text-neutral-400 mb-2">
            Cosine Similarity <span className="text-neutral-300">· threshold: {THRESHOLD}</span>
          </div>
          <div className="space-y-1.5">
            {WIDGETS.map((w, i) => {
              const isRelevant = w.score >= THRESHOLD
              const showScore = phase >= 2
              const showSelected = phase >= 3 && isRelevant
              
              return (
                <div 
                  key={w.id}
                  className="flex items-center gap-2 transition-all duration-300"
                  style={{ 
                    opacity: phase >= 2 ? (showSelected || phase < 3 ? 1 : 0.3) : 0.5,
                  }}
                >
                  <div className="w-16 text-[10px] text-neutral-600 truncate">{w.name}</div>
                  <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: showScore ? `${w.score * 100}%` : '0%',
                        backgroundColor: isRelevant ? '#6B7056' : '#d1d5db',
                        transitionDelay: `${i * 100}ms`
                      }}
                    />
                  </div>
                  <div 
                    className="w-8 text-[9px] text-right font-mono transition-opacity duration-300"
                    style={{ 
                      opacity: showScore ? 1 : 0,
                      color: isRelevant ? '#6B7056' : '#999'
                    }}
                  >
                    {w.score.toFixed(2)}
                  </div>
                  {showSelected && (
                    <div className="text-[9px] text-green-600">✓</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Context sent to AI */}
        {phase >= 3 && (
          <div className="px-3 pb-3">
            <div className="p-2 rounded bg-neutral-50 border border-neutral-200">
              <div className="text-[9px] text-neutral-400 mb-1">Context → AI</div>
              <div className="text-[10px] text-neutral-600 font-mono">
                {relevantWidgets.map(w => (
                  <div key={w.id}>{w.name}: {w.data}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Phase indicator */}
      <div className="flex justify-center gap-1.5 mt-2.5">
        {['Query', 'Embed', 'Match', 'Context'].map((label, i) => (
          <button
            key={i}
            onClick={() => { setPhase(i); setAuto(false) }}
            className="flex items-center gap-1"
          >
            <div 
              className="w-1.5 h-1.5 rounded-full transition-all duration-200"
              style={{ 
                backgroundColor: i === phase ? '#6B7056' : i < phase ? '#6B7056' : '#E5E7EB',
                opacity: i <= phase ? 1 : 0.5,
                transform: i === phase ? 'scale(1.3)' : 'scale(1)'
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
