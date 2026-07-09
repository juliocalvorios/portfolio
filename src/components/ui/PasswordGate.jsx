import { useState, useEffect } from 'react'

const PASSWORD_HASH = '6324d5ebe5a69678c97833c03623ceeea1d5b9f1fc17fccae4a5d6f9b7083270'
const SESSION_KEY = 'jc_auth'

async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setUnlocked(true)
    }
    setMounted(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setChecking(true)
    setError(false)

    const hash = await hashPassword(input)

    if (hash === PASSWORD_HASH) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setUnlocked(true)
    } else {
      setError(true)
      setInput('')
    }
    setChecking(false)
  }

  if (unlocked) return children

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-paper flex items-center justify-center p-6">
      {/* Grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      <div className="w-full max-w-sm relative">
        {/* Header bar */}
        <div className="h-1 bg-ink mb-6" />

        {/* Masthead */}
        <div className="text-center mb-8">
          <div className="text-[10px] tracking-[0.3em] text-neutral-500 mb-2">
            EST. 2025 · TORONTO
          </div>
          <h1 className="font-serif text-4xl font-black tracking-tight leading-none text-ink mb-1">
            THE DAILY CALVO
          </h1>
          <div className="text-[9px] tracking-[0.25em] text-neutral-500 uppercase">
            Restricted Edition
          </div>
        </div>

        <div className="h-px bg-ink mb-6" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-[0.25em] text-neutral-500 mb-2 uppercase">
              Press Pass Required
            </label>
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false) }}
              placeholder="Enter access code"
              autoFocus
              className={`w-full border px-4 py-3 bg-paper text-ink text-sm tracking-wider placeholder:text-neutral-300 focus:outline-none transition-colors ${
                error
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-neutral-400 focus:border-ink'
              }`}
            />
            {error && (
              <p className="mt-2 text-[10px] tracking-widest text-red-500 uppercase">
                — Invalid credentials. Access denied.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={checking || !input}
            className="w-full bg-ink text-paper py-3 text-[11px] tracking-[0.3em] uppercase font-bold hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {checking ? 'Verifying...' : 'Enter the newsroom'}
          </button>
        </form>

        <div className="h-px bg-ink mt-6 mb-3" />
        <div className="text-center text-[8px] tracking-widest text-neutral-400 uppercase">
          © 2026 Julio Calvo · All Rights Reserved
        </div>
      </div>
    </div>
  )
}
