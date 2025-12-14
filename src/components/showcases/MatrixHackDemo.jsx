'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HACKED_VALUES = {
  name: 'John Hacker',
  email: 'bypass@system.net',
  password: 'Hack3d!2024',
  age: '27',
}

function TypedText({ text, onComplete, speed = 50 }) {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setShowCursor(false)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  return (
    <span className="text-[#00FF00]">
      {displayed}
      {showCursor && <span className="animate-pulse">_</span>}
    </span>
  )
}

/**
 * Interactive demo of the Matrix hack from The Impossible Form
 * Shows the DOS-style terminal window with typing effect
 */
export function MatrixHackDemo() {
  const [isHacking, setIsHacking] = useState(false)
  const [hackPhase, setHackPhase] = useState('idle') // idle, init, typing, complete
  const [typingField, setTypingField] = useState('name')
  const [glitchText, setGlitchText] = useState('C:\\>_')
  const [isGlitching, setIsGlitching] = useState(false)

  // Glitch effect for button
  useEffect(() => {
    if (!isHacking) {
      const glitchChars = '!@#$%^&*<>?/\\|'

      const doGlitch = () => {
        setIsGlitching(true)
        let count = 0
        const glitchInterval = setInterval(() => {
          const randomText = Array.from({ length: 5 }, () =>
            glitchChars[Math.floor(Math.random() * glitchChars.length)]
          ).join('')
          setGlitchText(randomText)
          count++

          if (count > 8) {
            clearInterval(glitchInterval)
            setGlitchText('C:\\>_')
            setIsGlitching(false)
          }
        }, 80)
      }

      const timeout = setTimeout(doGlitch, 2000)
      const interval = setInterval(doGlitch, 8000)

      return () => {
        clearTimeout(timeout)
        clearInterval(interval)
      }
    }
  }, [isHacking])

  const handleHack = useCallback(() => {
    setIsHacking(true)
    setHackPhase('init')
    setTypingField('name')

    // Progress through phases
    setTimeout(() => setHackPhase('typing'), 2000)
  }, [])

  const handleFieldComplete = useCallback((field) => {
    const nextField = {
      name: 'email',
      email: 'password',
      password: 'age',
      age: 'done',
    }

    setTimeout(() => {
      const next = nextField[field]
      setTypingField(next)

      if (next === 'done') {
        setHackPhase('complete')
      }
    }, 200)
  }, [])

  const handleReset = () => {
    setIsHacking(false)
    setHackPhase('idle')
    setTypingField('name')
  }

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Demo container */}
      <div className="relative w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!isHacking ? (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 py-2"
            >
              <p className="text-[11px] text-neutral-500" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                Click the glitching button to trigger the hack sequence.
              </p>

              {/* Hack button - Win95 style */}
              <motion.button
                onClick={handleHack}
                animate={{
                  scale: isGlitching ? [1, 1.1, 0.95, 1.05, 1] : 1,
                  x: isGlitching ? [0, -2, 3, -1, 0] : 0,
                }}
                transition={{ duration: 0.4 }}
                style={{ fontFamily: 'Tahoma, sans-serif' }}
              >
                <motion.div
                  className="px-3 py-1"
                  animate={{
                    backgroundColor: isGlitching ? ['#c0c0c0', '#00FF00', '#c0c0c0', '#00FF00', '#c0c0c0'] : '#c0c0c0',
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
                  }}
                >
                  <span
                    className="text-[11px] font-mono"
                    style={{
                      color: isGlitching ? '#00FF00' : '#000000',
                      textShadow: isGlitching ? '0 0 5px #00FF00' : 'none',
                    }}
                  >
                    {glitchText}
                  </span>
                </motion.div>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* DOS-style window */}
              <div className="bg-[#000080] border-2 border-[#aaaaaa]">
                {/* Title bar */}
                <div className="bg-[#aaaaaa] px-2 py-[2px] flex justify-between items-center">
                  <span className="text-[11px] text-black font-bold" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                    C:\WINDOWS\system32\cmd.exe
                  </span>
                  <div className="flex gap-[2px]">
                    <button
                      className="w-[16px] h-[14px] bg-[#c0c0c0] text-[10px] font-bold"
                      style={{
                        boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff'
                      }}
                    >
                      _
                    </button>
                    <button
                      className="w-[16px] h-[14px] bg-[#c0c0c0] text-[10px] font-bold"
                      style={{
                        boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff'
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Terminal content */}
                <div
                  className="bg-black p-3 text-[11px] text-[#c0c0c0] min-h-[220px]"
                  style={{ fontFamily: 'Consolas, "Courier New", monospace' }}
                >
                  <div className="mb-2">Microsoft Windows [Version 4.10.1998]</div>
                  <div className="mb-2">(C) Copyright Microsoft Corp 1981-1998.</div>
                  <div className="mb-4">
                    C:\WINDOWS\system32&gt; <span className="text-[#00FF00]">hack.exe --bypass-form</span>
                  </div>

                  {hackPhase === 'init' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="text-[#FFFF00]">[*] Initializing bypass protocol...</div>
                      <div className="text-[#00FF00]">[*] Scanning form defenses...</div>
                      <motion.div
                        animate={{ opacity: [0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="text-[#00FF00]"
                      >
                        [*] Injecting payload..._
                      </motion.div>
                    </motion.div>
                  )}

                  {(hackPhase === 'typing' || hackPhase === 'complete') && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="text-[#00FF00] mb-2">[+] BYPASS SUCCESSFUL!</div>
                      <div className="text-[#FFFF00] mb-3">[*] Injecting form data...</div>

                      <div className="space-y-1 ml-2">
                        <div className="flex">
                          <span className="text-[#808080] w-20">name:</span>
                          {typingField === 'name' ? (
                            <TypedText text={HACKED_VALUES.name} onComplete={() => handleFieldComplete('name')} />
                          ) : ['email', 'password', 'age', 'done'].includes(typingField) ? (
                            <span className="text-[#00FF00]">{HACKED_VALUES.name}</span>
                          ) : (
                            <span className="text-[#808080]">...</span>
                          )}
                        </div>

                        <div className="flex">
                          <span className="text-[#808080] w-20">email:</span>
                          {typingField === 'email' ? (
                            <TypedText text={HACKED_VALUES.email} onComplete={() => handleFieldComplete('email')} />
                          ) : ['password', 'age', 'done'].includes(typingField) ? (
                            <span className="text-[#00FF00]">{HACKED_VALUES.email}</span>
                          ) : (
                            <span className="text-[#808080]">...</span>
                          )}
                        </div>

                        <div className="flex">
                          <span className="text-[#808080] w-20">password:</span>
                          {typingField === 'password' ? (
                            <TypedText text={HACKED_VALUES.password} onComplete={() => handleFieldComplete('password')} />
                          ) : ['age', 'done'].includes(typingField) ? (
                            <span className="text-[#00FF00]">{HACKED_VALUES.password}</span>
                          ) : (
                            <span className="text-[#808080]">...</span>
                          )}
                        </div>

                        <div className="flex">
                          <span className="text-[#808080] w-20">age:</span>
                          {typingField === 'age' ? (
                            <TypedText text={HACKED_VALUES.age} onComplete={() => handleFieldComplete('age')} />
                          ) : typingField === 'done' ? (
                            <span className="text-[#00FF00]">{HACKED_VALUES.age}</span>
                          ) : (
                            <span className="text-[#808080]">...</span>
                          )}
                        </div>
                      </div>

                      {hackPhase === 'complete' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-4"
                        >
                          <div className="text-[#00FF00]">[+] All fields injected!</div>
                          <div className="text-[#FFFF00]">[*] Disabling form defenses...</div>
                          <motion.div
                            animate={{ opacity: [0, 1] }}
                            transition={{ repeat: 3, duration: 0.3 }}
                            className="text-[#FF0000] font-bold mt-2"
                          >
                            ACCESS GRANTED
                          </motion.div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Reset button */}
              {hackPhase === 'complete' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-4 flex justify-center"
                >
                  <button
                    onClick={handleReset}
                    className="px-4 py-1 text-[11px] text-black"
                    style={{
                      fontFamily: 'Tahoma, sans-serif',
                      backgroundColor: '#c0c0c0',
                      boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
                    }}
                  >
                    Reset Demo
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MatrixHackDemo
