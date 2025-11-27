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
    // TODO: Generate and download PDF
    alert('PDF download coming soon!')
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
            {[...Array(24)].map((_, i) => (
              <div key={i} className="paper-hole" />
            ))}
          </div>

          {/* Paper content - Newspaper style */}
          <div className="paper-content">
            {/* Masthead */}
            <div className="paper-masthead">
              <div className="paper-edition">Vol. {toRoman(volume)} · No. {daysSinceStart + 1} · Late Edition</div>
              <h1 className="paper-title">THE JULIO CALVO TIMES</h1>
              <div className="paper-tagline">"All the Code That's Fit to Ship"</div>
              <div className="paper-meta">
                <span>TORONTO, CANADA</span>
                <span>{dateFormatted}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="paper-divider">
              <div className="paper-divider-line"></div>
              <div className="paper-divider-ornament">✦</div>
              <div className="paper-divider-line"></div>
            </div>

            {/* Main headline */}
            <div className="paper-headline">
              <h2>Frontend Developer Seeks New Challenge in Toronto's Tech Scene</h2>
              <p className="paper-lead">
                Spanish-born creative combines design sensibility with technical skill,
                bringing pixel-perfect interfaces and user-focused solutions to the table.
              </p>
            </div>

            {/* Two columns */}
            <div className="paper-columns">
              <div className="paper-column">
                <h3>Technical Skills</h3>
                <ul>
                  <li>React.js & JavaScript</li>
                  <li>Tailwind CSS & CSS3</li>
                  <li>Figma & UI Design</li>
                  <li>Git & Version Control</li>
                </ul>
              </div>
              <div className="paper-column">
                <h3>Education</h3>
                <p>
                  <strong>Humber Polytechnic</strong><br/>
                  Multimedia Design & Dev.
                </p>
                <p style={{marginTop: '8px'}}>
                  <strong>Spain</strong><br/>
                  Commerce & Digital Marketing
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="paper-quote">
              <p>"I believe in building, not waiting. Every project is a chance to create something meaningful."</p>
              <cite>Julio Calvo, Frontend Developer</cite>
            </div>

            {/* Footer */}
            <div className="paper-footer">
              <div className="paper-footer-left">EST. 2024</div>
              <div className="paper-footer-center">juliocalvo.dev</div>
              <div className="paper-footer-right">PRINT EDITION</div>
            </div>
          </div>

          {/* Right perforated edge */}
          <div className="paper-edge paper-edge-right">
            {[...Array(24)].map((_, i) => (
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
