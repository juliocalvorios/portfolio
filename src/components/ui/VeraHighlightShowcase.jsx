import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * VeraHighlightShowcase - Exact vera timing and styles
 */

// Palettes
const PALETTES = {
  vibrant: {
    bg: { Y: '#FFF4C3', B: '#D5FEFF', O: '#FFD5C3', G: '#DCFCE7', R: '#fee2e2', P: '#FEECFF', L: '#E6F3FF', GR: '#E8E6E5', H: '#ede9fe', BR: '#f5e8dd' },
    ul: { Y: '#FFC41A', B: '#5DCFFF', O: '#FF7744', G: '#22C55E', R: '#ef4444', P: '#FC90FF', L: '#8DC5FF', GR: '#ACA8A4', H: '#8b5cf6', BR: '#92400e' }
  },
  natural: {
    bg: { Y: '#F7F4EF', B: '#EEF3F5', O: '#F7F0EB', G: '#EFF2ED', R: '#F5EFEF', P: '#F3F0F5', L: '#EFF3F5', GR: '#F0F0EE', H: '#F2F0F5', BR: '#F5F2EF' },
    ul: { Y: '#A09080', B: '#607880', O: '#906850', G: '#708060', R: '#906060', P: '#908090', L: '#607080', GR: '#909088', H: '#807090', BR: '#908070' }
  }
}

const AVATAR = { bg: '#E8E5DC', bgSoft: '#F8F7F3', color: '#6B7056' }

const CONVOS = [
  { 
    user: "How does useEffect cleanup work?", 
    text: `[Y]Cleanup functions run before unmount[/Y] when dependencies change.

Return a function and [B]React calls it at the right time[/B]. [O]Always clean up listeners[/O].

This prevents [R]memory leaks[/R].` 
  },
  { 
    user: "Grid vs Flexbox?", 
    text: `[Y]Grid is 2D, Flexbox is 1D[/Y].

[B]Flexbox for components[/B] — navbars, cards. [G]Grid for pages[/G].

[BR]One axis = Flex. Two = Grid.[/BR]` 
  },
  { 
    user: "Interface vs type?", 
    text: `[Y]Interface for extendable shapes[/Y]. [B]Declaration merging[/B].

[O]Type for unions[/O]. Only type does [P]conditionals[/P].

[G]Either works[/G] for most cases.` 
  }
]

const MODES = [
  { m: 'highlights', p: 'vibrant' }, { m: 'underline', p: 'vibrant' }, { m: 'both', p: 'vibrant' },
  { m: 'highlights', p: 'natural' }, { m: 'underline', p: 'natural' }, { m: 'both', p: 'natural' },
]

// Parser
function parse(text, mode, pal) {
  if (!text) return null
  const c = PALETTES[pal]
  const out = []
  let k = 0, last = 0
  const re = /\[([YBOGRLP]|GR|H|BR)\]([\s\S]*?)\[\/\1\]/g
  let m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      const seg = text.slice(last, m.index)
      seg.split('\n').forEach((line, i, arr) => {
        if (line) out.push(<span key={k++}>{line}</span>)
        if (i < arr.length - 1) out.push(<br key={k++} />)
      })
    }
    const code = m[1], content = m[2]
    const s = {}
    if (mode !== 'underline') { s.backgroundColor = c.bg[code]; s.padding = '1px 3px 0'; s.borderRadius = '3px' }
    if (mode !== 'highlights') { s.textDecoration = `underline ${c.ul[code]}`; s.textDecorationThickness = '2px'; s.textUnderlineOffset = '2px'; s.textDecorationSkipInk = 'none' }
    out.push(<span key={k++} style={s}>{content}</span>)
    last = re.lastIndex
  }
  if (last < text.length) {
    const seg = text.slice(last)
    seg.split('\n').forEach((line, i, arr) => {
      if (line) out.push(<span key={k++}>{line}</span>)
      if (i < arr.length - 1) out.push(<br key={k++} />)
    })
  }
  return out
}

// User message
function User({ text, show }) {
  return (
    <div 
      className="flex justify-end mb-3 px-4"
      style={{ 
        opacity: show ? 1 : 0, 
        transform: show ? 'none' : 'translateX(12px)', 
        transition: 'all 0.3s ease-out' 
      }}
    >
      <div 
        className="inline-flex items-start gap-2.5 px-3 py-2.5 rounded-lg"
        style={{ 
          backgroundColor: AVATAR.bgSoft, 
          border: `1px solid ${AVATAR.bg}`,
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
          maxWidth: '85%' 
        }}
      >
        <div 
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: AVATAR.bg, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke={AVATAR.color} viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
          </svg>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed pt-0.5">{text}</p>
      </div>
    </div>
  )
}

// Typing bars - exact vera style
function Bars({ color }) {
  return (
    <span className="vera-bars">
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  )
}

// Assistant message - exact vera: text-base text-gray-700 leading-relaxed
function Assistant({ text, mode, pal, show, typing }) {
  const [displayed, setDisplayed] = useState('')
  const intervalRef = useRef(null)
  const indexRef = useRef(0)

  useEffect(() => {
    // Clear previous
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    if (!show || typing || !text) {
      setDisplayed('')
      indexRef.current = 0
      return
    }

    // Exact vera timing: 40ms interval, ~15 chars per chunk
    intervalRef.current = setInterval(() => {
      if (indexRef.current >= text.length) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        return
      }
      
      // Advance word by word, max 15 chars
      let end = indexRef.current + 1
      while (end < text.length && 
             text[end] !== ' ' && 
             text[end] !== '\n' && 
             end - indexRef.current < 15) {
        end++
      }
      // Include space/newline
      if (end < text.length && (text[end] === ' ' || text[end] === '\n')) {
        end++
      }
      
      indexRef.current = end
      setDisplayed(text.substring(0, end))
    }, 40)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [show, typing, text])

  const animating = show && !typing && displayed.length < (text?.length || 0)

  return (
    <div 
      className="px-4"
      style={{ 
        opacity: show ? 1 : 0, 
        transform: show ? 'none' : 'translateY(6px)', 
        transition: 'all 0.25s ease-out' 
      }}
    >
      <div className="text-[15px] text-gray-700" style={{ lineHeight: 1.1 }}>
        {typing ? (
          <Bars color={AVATAR.color} />
        ) : (
          <>
            {parse(displayed, mode, pal)}
            {animating && <Bars color={AVATAR.color} />}
          </>
        )}
      </div>
    </div>
  )
}

// Main
export default function VeraHighlightShowcase() {
  const [mi, setMi] = useState(0)
  const [ci, setCi] = useState(0)
  const [ph, setPh] = useState(0) // 0=idle, 1=user, 2=typing, 3=response
  const timerRef = useRef(null)

  const mode = MODES[mi]
  const conv = CONVOS[ci]

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    clear()
    
    // Start sequence
    setPh(1) // Show user
    
    timerRef.current = setTimeout(() => {
      setPh(2) // Typing
      
      timerRef.current = setTimeout(() => {
        setPh(3) // Response
        
        timerRef.current = setTimeout(() => {
          setPh(0) // Idle
          
          timerRef.current = setTimeout(() => {
            // Next mode
            setMi(p => {
              const n = (p + 1) % 6
              if (n === 0) setCi(c => (c + 1) % 3)
              return n
            })
          }, 300)
        }, 4000) // Show response for 4s
      }, 600) // Typing for 600ms
    }, 800) // User visible for 800ms before typing
    
    return clear
  }, [mi, clear])

  const select = (i) => {
    clear()
    setPh(0)
    setTimeout(() => setMi(i), 100)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <span className="text-[9px] tracking-wider text-neutral-400 uppercase">Demo</span>
        <div className="flex gap-1.5">
          <span 
            className="text-[9px] px-1.5 py-0.5 rounded font-medium"
            style={{ 
              backgroundColor: mode.p === 'vibrant' ? '#F5F3FF' : '#F5F5F2', 
              color: mode.p === 'vibrant' ? '#7c3aed' : '#666' 
            }}
          >
            {mode.p}
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-500 font-medium">
            {mode.m}
          </span>
        </div>
      </div>

      {/* Chat container */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="py-4" style={{ backgroundColor: '#FAFAFA', minHeight: 220 }}>
          <User text={conv.user} show={ph >= 1} />
          <Assistant text={conv.text} mode={mode.m} pal={mode.p} show={ph >= 2} typing={ph === 2} />
        </div>

        {/* Buttons */}
        <div className="px-3 py-2.5 border-t border-neutral-100 bg-white">
          <div className="flex flex-wrap justify-center gap-1.5">
            {MODES.map((x, i) => (
              <button 
                key={i} 
                onClick={() => select(i)} 
                className="px-2.5 py-1.5 rounded-md text-[10px] font-medium transition-colors duration-150"
                style={{ 
                  backgroundColor: i === mi 
                    ? (x.p === 'vibrant' ? '#EDE9FE' : '#ECECE8') 
                    : '#F5F5F5', 
                  color: i === mi 
                    ? (x.p === 'vibrant' ? '#5B21B6' : '#555') 
                    : '#888' 
                }}
              >
                {x.m} · {x.p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Palette preview */}
      <div className="flex justify-center gap-1.5 mt-3">
        {Object.values(PALETTES[mode.p].bg).slice(0, 8).map((c, i) => (
          <div key={i} className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: c }} />
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-2.5">
        {MODES.map((_, i) => (
          <button 
            key={i} 
            onClick={() => select(i)} 
            className="rounded-full transition-all duration-200"
            style={{ 
              width: i === mi ? 16 : 6, 
              height: 6, 
              backgroundColor: i === mi 
                ? (mode.p === 'vibrant' ? '#7c3aed' : '#6B7056') 
                : '#E5E7EB' 
            }}
          />
        ))}
      </div>

      <style>{`
        .vera-bars {
          display: inline-flex;
          gap: 3px;
          align-items: center;
          margin-left: 4px;
          vertical-align: middle;
          height: 18px;
        }
        .vera-bars span {
          width: 3px;
          height: 14px;
          border-radius: 1px;
          animation: verabars 1.2s ease-in-out infinite;
        }
        .vera-bars span:nth-child(1) { animation-delay: 0s; }
        .vera-bars span:nth-child(2) { animation-delay: 0.1s; }
        .vera-bars span:nth-child(3) { animation-delay: 0.2s; }
        @keyframes verabars {
          0%, 100% { height: 14px; opacity: 0.4; }
          50% { height: 18px; opacity: 1; }
        }
      `}</style>
    </div>
  )
}
