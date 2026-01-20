import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import './PrintEdition.css'

// Play a "ding" sound using Web Audio API
const playDingSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

    // Create oscillator for the ding
    const oscillator = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    // Bell-like tone
    oscillator.frequency.setValueAtTime(830, audioCtx.currentTime) // High note
    oscillator.type = 'sine'

    // Quick fade out for bell effect
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8)

    oscillator.start(audioCtx.currentTime)
    oscillator.stop(audioCtx.currentTime + 0.8)
  } catch (e) {
    // Silently fail if Web Audio not supported
  }
}

export default function PrintEdition({ isOpen, onClose }) {
  const [isPrinting, setIsPrinting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const audioRef = useRef(null)

  const ANIMATION_DURATION = 5000 // 5 seconds

  useEffect(() => {
    if (isOpen) {
      // Start printing animation after a small delay
      setTimeout(() => {
        setIsPrinting(true)
        // Play printer sound
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch(() => {})
        }
      }, 500)

      // Animation complete - stop sound and play ding
      setTimeout(() => {
        setIsComplete(true)
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
        // Play completion ding
        playDingSound()
      }, ANIMATION_DURATION + 500)
    } else {
      // Reset state when closed
      setIsPrinting(false)
      setIsComplete(false)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [isOpen])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/Julio-Calvo-Frontend-Engineer.pdf'
    link.download = 'Julio-Calvo-Frontend-Engineer.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Format today's date
  const today = new Date()
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase()

  // Calculate volume and issue
  const startDate = new Date('2024-01-01')
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24))
  const volume = today.getFullYear() - 2023
  const toRoman = (num) => {
    const numerals = [['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],['L',50],['XL',40],['X',10],['IX',9],['V',5],['IV',4],['I',1]]
    let result = ''
    for (const [letter, value] of numerals) {
      while (num >= value) { result += letter; num -= value }
    }
    return result
  }

  return (
    <div className="print-edition-overlay">
      {/* Printer sound */}
      <audio ref={audioRef}>
        <source src="/sounds/printer-76911.mp3" type="audio/mpeg" />
      </audio>

      {/* Close button */}
      <button
        onClick={onClose}
        className="print-edition-close"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Printer machine */}
      <div className="printer-machine">
        <div className="printer-slot"></div>
        <div className="printer-body">
          <div className="printer-detail"></div>
          <div className="printer-detail"></div>
          <div className="printer-detail"></div>
        </div>
      </div>

      {/* Paper container */}
      <div className="paper-container">
        <div className={`matrix-paper ${isPrinting ? 'printing' : ''}`}>
          {/* Left perforated edge */}
          <div className="paper-edge paper-edge-left">
            {[...Array(27)].map((_, i) => (
              <div key={i} className="paper-hole" />
            ))}
          </div>

          {/* Paper content - Newspaper style */}
          <div className="paper-content">
            {/* Masthead */}
            <div className="paper-masthead">
              <h1 className="paper-name">Julio Calvo</h1>
              <div className="paper-title-role">Frontend Engineer · Toronto, ON</div>
              <div className="paper-contact">
                <span>juliocalvorios.com</span>
                <span className="paper-contact-sep">·</span>
                <span>+1 437-254-9832</span>
                <span className="paper-contact-sep">·</span>
                <span>juliocalvorios@gmail.com</span>
              </div>
              <div className="paper-contact">
                <span>github.com/juliocalvorios</span>
                <span className="paper-contact-sep">·</span>
                <span>linkedin.com/in/juliocalvorios</span>
              </div>
            </div>

            {/* Divider */}
            <div className="paper-divider">
              <div className="paper-divider-line"></div>
            </div>

            {/* Technologies */}
            <div className="paper-section">
              <h3 className="paper-section-title">Technologies</h3>
              <p className="paper-text-compact">
                React · TypeScript · Next.js · Tailwind CSS · Supabase · Jest · Playwright · Three.js · Zod · React Hook Form
              </p>
            </div>

            {/* Main Project */}
            <div className="paper-section">
              <h3 className="paper-section-title">Main Project</h3>
              <div className="paper-project-header">
                <strong>veraOS</strong>
                <span className="paper-project-url">veraos.ai</span>
              </div>
              <ul className="paper-list">
                <li>Built 10 interactive widget types with drag-and-drop using O(n) collision detection via spatial indexing</li>
                <li>Implemented AES-256-GCM encryption with server-side keys via Supabase Vault, zero client exposure</li>
                <li>Designed chat library system with nested folders, drag-and-drop organization, and optimistic updates with rollback</li>
                <li>Developed flashcard system with FSRS-4.5 spaced repetition algorithm and 8 card types</li>
                <li>Architected lazy-loading system with code splitting (5.3MB split into 50+ chunks that load on-demand)</li>
                <li>Offloaded embeddings processing to server-side (25MB → 0MB client download)</li>
                <li>Integrated 6 LLM providers with streaming semantic highlighting and automatic fallbacks</li>
              </ul>
            </div>

            {/* Additional Projects */}
            <div className="paper-section">
              <h3 className="paper-section-title">Additional Projects</h3>
              <div className="paper-project-item">
                <strong>Ontario Flag Time Machine</strong> — 73 unit tests + 5 E2E, TypeScript strict, branded types
                <span className="paper-project-url-inline">ontario-flag-project.vercel.app</span>
              </div>
              <div className="paper-project-item">
                <strong>The Impossible Form</strong> — React Hook Form + Zod, pixel-perfect Windows 95 UI
                <span className="paper-project-url-inline">the-impossible-form.vercel.app</span>
              </div>
              <div className="paper-project-item">
                <strong>Through the Glass</strong> — Three.js particles, GLSL shaders, real-time weather API
                <span className="paper-project-url-inline">through-the-glass-project.vercel.app</span>
              </div>
            </div>

            {/* Open Source */}
            <div className="paper-section">
              <h3 className="paper-section-title">Open Source</h3>
              <div className="paper-opensource-box">
                <div className="paper-project-header">
                  <strong>react-ai-highlight-parser</strong>
                  <span className="paper-project-url">npmjs.com/package/react-ai-highlight-parser</span>
                </div>
                <p className="paper-opensource-desc">
                  Streaming text parser with O(n) tokenization, 60 semantic highlight combinations
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="paper-section">
              <h3 className="paper-section-title">Education</h3>
              <div className="paper-education-item">
                <div><strong>Humber Polytechnic, Toronto</strong> — Diploma in Multimedia Design & Development</div>
                <div className="paper-education-year">2024–2025</div>
              </div>
              <div className="paper-education-item">
                <div><strong>Montessori College, Spain</strong> — Commerce & Marketing Management</div>
                <div className="paper-education-year">2019–2023</div>
              </div>
            </div>
          </div>

          {/* Right perforated edge */}
          <div className="paper-edge paper-edge-right">
            {[...Array(27)].map((_, i) => (
              <div key={i} className="paper-hole" />
            ))}
          </div>
        </div>
      </div>

      {/* Download button - appears when complete */}
      {isComplete && (
        <button
          className="download-button"
          onClick={handleDownload}
        >
          DOWNLOAD PDF
        </button>
      )}

      {/* Printing status */}
      {!isComplete && (
        <div className="print-status">
          {isPrinting ? 'Printing...' : 'Preparing...'}
        </div>
      )}
    </div>
  )
}
