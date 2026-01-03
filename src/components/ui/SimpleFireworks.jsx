import { useEffect, useRef } from 'react'

/**
 * SimpleFireworks - Minimalist fireworks adapted to newspaper aesthetic
 * Launches small bursts of typographic symbols in the celebrate banner
 */
function SimpleFireworks({ isActive, onComplete }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationFrameRef = useRef(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Newspaper-style symbols
    const symbols = ['★', '●', '■', '◆', '▪', '–', '—']
    const colors = ['#1a1a1a', '#404040', '#737373', '#525252']

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 3
        this.vy = (Math.random() - 0.5) * 3 - 1
        this.opacity = 1
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)]
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.size = Math.random() * 4 + 6
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.1
        this.gravity = 0.08
        this.life = 0
        this.maxLife = 120
      }

      update() {
        this.life++
        this.vy += this.gravity
        this.x += this.vx
        this.y += this.vy
        this.vx *= 0.99
        this.vy *= 0.99
        this.rotation += this.rotationSpeed
        this.opacity = 1 - (this.life / this.maxLife)
        return this.life < this.maxLife
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.globalAlpha = this.opacity
        ctx.font = `${this.size}px Georgia, serif`
        ctx.fillStyle = this.color
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.symbol, 0, 0)
        ctx.restore()
      }
    }

    // Create initial burst from center
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    for (let i = 0; i < 20; i++) {
      particlesRef.current.push(new Particle(centerX, centerY))
    }

    let startTime = Date.now()
    const duration = 2000

    const animate = () => {
      const elapsed = Date.now() - startTime

      if (elapsed > duration) {
        onComplete?.()
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter(particle => {
        const alive = particle.update()
        if (alive) particle.draw()
        return alive
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      particlesRef.current = []
    }
  }, [isActive, onComplete])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default SimpleFireworks
