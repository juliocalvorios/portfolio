'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Simplified set of requirements for the demo
const allRequirements = [
  { id: 'uppercase', label: 'Must contain uppercase letter', check: (v) => /[A-Z]/.test(v) },
  { id: 'lowercase', label: 'Must contain lowercase letter', check: (v) => /[a-z]/.test(v) },
  { id: 'number', label: 'Must contain a number', check: (v) => /\d/.test(v) },
  { id: 'special', label: 'Must contain special character (!@#$%)', check: (v) => /[!@#$%^&*]/.test(v) },
  { id: 'length8', label: 'Must be at least 8 characters', check: (v) => v.length >= 8 },
  { id: 'noE', label: 'Must not contain letter "e"', check: (v) => !/[eE]/.test(v) },
  { id: 'endNumber', label: 'Must end with a number', check: (v) => /\d$/.test(v) },
  { id: 'noSpaces', label: 'Must not contain spaces', check: (v) => !/\s/.test(v) },
]

const initialRequirements = ['uppercase', 'lowercase', 'number', 'special', 'length8']

/**
 * Interactive demo of the gaslighting password field from The Impossible Form
 * Requirements change dynamically as you type, adding new rules when you satisfy existing ones
 */
export function PasswordRequirementsDemo() {
  const [value, setValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [currentRequirements, setCurrentRequirements] = useState(initialRequirements)
  const [recentlyChanged, setRecentlyChanged] = useState(null)
  const [changeCount, setChangeCount] = useState(0)

  const requirements = currentRequirements.map(id =>
    allRequirements.find(r => r.id === id)
  ).filter(Boolean)

  const getRequirementStatus = useCallback((req) => {
    return req.check(value)
  }, [value])

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)

    // Check if we should swap requirements (gaslighting!)
    if (newValue && changeCount < 3) {
      const metCount = requirements.filter(r => r.check(newValue)).length

      // If user has met 3+ requirements, maybe swap one
      if (metCount >= 3 && Math.random() > 0.6) {
        const available = allRequirements.filter(r => !currentRequirements.includes(r.id))

        if (available.length > 0) {
          const metRequirements = requirements.filter(r => r.check(newValue))
          const toRemove = metRequirements[Math.floor(Math.random() * metRequirements.length)]
          const toAdd = available[Math.floor(Math.random() * available.length)]

          setTimeout(() => {
            setCurrentRequirements(prev =>
              prev.map(id => id === toRemove.id ? toAdd.id : id)
            )
            setRecentlyChanged(toAdd.id)
            setChangeCount(prev => prev + 1)
            setTimeout(() => setRecentlyChanged(null), 2000)
          }, 300)
        }
      }
    }
  }

  const handleReset = () => {
    setValue('')
    setCurrentRequirements(initialRequirements)
    setRecentlyChanged(null)
    setChangeCount(0)
  }

  const allMet = requirements.every(r => getRequirementStatus(r))

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Windows 95 style panel */}
      <div
        className="w-full max-w-md bg-[#c0c0c0] p-1"
        style={{
          boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
        }}
      >
        {/* Title bar */}
        <div
          className="h-[18px] px-[2px] py-[2px] flex items-center justify-between mb-2"
          style={{ background: 'linear-gradient(90deg, #000080, #1084d0)' }}
        >
          <span className="text-white text-[11px] font-bold px-1" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            Password Requirements Demo
          </span>
        </div>

        {/* Content area */}
        <div
          className="bg-white p-4"
          style={{
            boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080, inset -2px -2px 0 #c0c0c0, inset 2px 2px 0 #0a0a0a'
          }}
        >
          {/* Password input */}
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={value}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-2 py-1 pr-8 text-[11px] text-black bg-white"
              style={{
                fontFamily: 'Tahoma, sans-serif',
                boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #0a0a0a, inset -2px -2px 0 #dfdfdf, inset 2px 2px 0 #808080'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <svg className="w-4 h-4 text-[#808080]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[#808080]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Requirements list */}
          <div className="space-y-1">
            <p className="text-[10px] mb-2 text-[#808080]" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Password requirements:
              {changeCount > 0 && (
                <span className="text-[#808000] ml-1">
                  (changed {changeCount} time{changeCount > 1 ? 's' : ''})
                </span>
              )}
            </p>

            <AnimatePresence mode="popLayout">
              {requirements.map((req) => {
                const isMet = getRequirementStatus(req)
                const isNew = recentlyChanged === req.id

                return (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      backgroundColor: isNew ? '#fef3c7' : 'transparent',
                    }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 text-[10px] py-1 px-1"
                    style={{ fontFamily: 'Tahoma, sans-serif' }}
                  >
                    <motion.span
                      animate={{
                        scale: isMet ? [1, 1.3, 1] : 1,
                        color: isMet ? '#22c55e' : '#9ca3af',
                      }}
                    >
                      {isMet ? '✓' : '○'}
                    </motion.span>
                    <span className={isMet ? 'text-[#008000] line-through' : 'text-[#000]'}>
                      {req.label}
                    </span>
                    {isNew && (
                      <span className="text-[#808000] font-bold ml-auto">NEW!</span>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Warning messages */}
          {changeCount > 0 && changeCount < 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] mt-2 italic"
              style={{ color: '#808000', fontFamily: 'Tahoma, sans-serif' }}
            >
              The requirements might change again...
            </motion.p>
          )}

          {changeCount >= 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] mt-2"
              style={{ color: '#008000', fontFamily: 'Tahoma, sans-serif' }}
            >
              Requirements are now stable. You wore me down.
            </motion.p>
          )}

          {allMet && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] mt-2"
              style={{ color: '#008000', fontFamily: 'Tahoma, sans-serif' }}
            >
              ✓ All requirements met!
            </motion.p>
          )}

          {/* Reset button */}
          <div className="mt-4">
            <button
              onClick={handleReset}
              className="px-4 py-1 text-[11px] text-black"
              style={{
                fontFamily: 'Tahoma, sans-serif',
                backgroundColor: '#c0c0c0',
                boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-500 italic">
        Type a password and watch the requirements change as you satisfy them.
      </p>
    </div>
  )
}

export default PasswordRequirementsDemo
