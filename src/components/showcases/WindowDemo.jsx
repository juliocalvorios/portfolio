'use client'

import { useState, useCallback, useEffect, memo, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * WindowDemo - Copied directly from Through The Glass project NordicWindow.tsx
 * Converted to JSX, added weather selector and day/night toggle
 */

export function WindowDemo() {
  const [condition, setCondition] = useState('clear')
  const [curtainsOpen, setCurtainsOpen] = useState(true)
  const [timeOfDay, setTimeOfDay] = useState('day')
  const [mounted, setMounted] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isNight = timeOfDay === 'night' || timeOfDay === 'dusk'

  // Paleta de colores SCANDINAVIAN WINTER CABIN - Madera roja noruega
  const colors = {
    frame: {
      outer: isNight ? '#1a0f0f' : '#6B2D2D',
      middle: isNight ? '#2a1515' : '#8B3A3A',
      inner: isNight ? '#3d2020' : '#A04545',
      accent: isNight ? '#4a2828' : '#B85555',
      highlight: isNight ? '#5a3535' : '#C96666',
      deep: isNight ? '#120a0a' : '#4A1E1E',
    },
    glass: {
      tint: isNight ? 'rgba(10, 15, 30, 0.3)' : 'rgba(200, 220, 255, 0.1)',
    },
    curtain: {
      base: isNight ? '#2a2525' : '#E8DDD5',
      shadow: isNight ? '#1a1515' : '#D0C4BC',
      highlight: isNight ? '#3a3232' : '#F5EDE5',
    }
  }

  const handleCurtainsToggle = useCallback(() => {
    setCurtainsOpen(prev => !prev)
  }, [])

  return (
    <div className="flex flex-col items-center gap-8 py-8 px-4">
      {/* Window */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
        style={{
          width: 'min(80vw, 420px)',
          height: 'min(50vh, 320px)',
        }}
      >
        {/* CAPA 2: MARCO EXTERIOR (Moldura principal) - con sombra integrada */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${colors.frame.middle} 0%, ${colors.frame.outer} 50%, ${colors.frame.outer} 100%)`,
            padding: '6px',
            boxShadow: isNight
              ? '0 25px 80px rgba(0,0,0,0.7), 0 15px 40px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.4)'
              : '0 25px 80px rgba(0,0,0,0.25), 0 15px 40px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.1)',
          }}
        >
          {/* Bisel superior del marco exterior */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5 rounded-t-xl"
            style={{
              background: `linear-gradient(180deg, ${colors.frame.highlight}90 0%, transparent 100%)`,
            }}
          />

          {/* Bisel inferior (sombra) del marco exterior */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2"
            style={{
              background: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 100%)',
            }}
          />

          {/* CAPA 3: SEGUNDO MARCO (Moldura intermedia) */}
          <div
            className="relative w-full h-full rounded-lg overflow-hidden"
            style={{
              background: `linear-gradient(170deg, ${colors.frame.inner} 0%, ${colors.frame.middle} 30%, ${colors.frame.middle} 70%, ${colors.frame.outer} 100%)`,
              padding: '8px',
              boxShadow: `inset 0 2px 4px rgba(255,255,255,${isNight ? 0.05 : 0.3}), inset 0 -2px 4px rgba(0,0,0,0.2)`,
            }}
          >
            {/* Textura de madera */}
            <WoodGrainTexture isNight={isNight} />

            {/* CAPA 4: MARCO INTERIOR (Rebaje para el cristal) */}
            <div
              className="relative w-full h-full rounded-md overflow-hidden"
              style={{
                background: colors.frame.outer,
                padding: '4px',
                boxShadow: `inset 0 3px 8px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(255,255,255,${isNight ? 0.05 : 0.15})`,
              }}
            >
              {/* CAPA 5: ÁREA DEL CRISTAL */}
              <div className="relative w-full h-full rounded overflow-hidden">
                {/* Fondo del cielo */}
                <div
                  className="absolute inset-0 transition-all duration-1000"
                  style={{
                    background: getSkyGradient(timeOfDay, condition),
                  }}
                />

                {/* Efectos del clima */}
                <div className="absolute inset-0 z-10">
                  <WeatherEffects condition={condition} isNight={isNight} />
                </div>

                {/* CRISTAL: Efectos de vidrio realista */}
                <GlassEffects isNight={isNight} condition={condition} />

                {/* DIVISIONES DE LA VENTANA (Muntins) */}
                <WindowMuntins colors={colors} isNight={isNight} />
              </div>
            </div>
          </div>
        </div>

        {/* CORTINAS */}
        <Curtains
          isNight={isNight}
          condition={condition}
          isOpen={curtainsOpen}
          onToggle={handleCurtainsToggle}
        />

        {/* ALFÉIZAR (Windowsill) */}
        <Windowsill colors={colors} isNight={isNight} condition={condition} />
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-8">
          <div className="w-7" /> {/* Spacer izquierdo para centrar weather */}
          <WeatherSelector
            currentCondition={condition}
            onSelect={setCondition}
            isNight={isNight}
          />
          <button
            onClick={() => setShowPhoto(!showPhoto)}
            className="w-7 h-7 rounded flex items-center justify-center transition-all hover:opacity-80"
            style={{
              background: showPhoto 
                ? (isNight ? 'rgba(212, 165, 116, 0.3)' : 'rgba(201, 168, 108, 0.4)')
                : (isNight ? 'rgba(60, 40, 40, 0.55)' : 'rgba(140, 90, 90, 0.5)'),
              border: `1px solid ${isNight ? 'rgba(80, 55, 55, 0.6)' : 'rgba(120, 80, 80, 0.5)'}`,
              color: isNight ? '#E8D5C4' : '#F5EBE0',
              opacity: showPhoto ? 1 : 0.7,
            }}
            title="View cabin photo"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </button>
        </div>
        <button
          onClick={() => setTimeOfDay(timeOfDay === 'day' ? 'night' : 'day')}
          className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all"
          style={{
            background: isNight ? 'rgba(42, 24, 24, 0.9)' : 'rgba(107, 58, 58, 0.9)',
            border: `1px solid ${isNight ? '#3a2525' : '#4A2525'}`,
            color: isNight ? '#E8D5C4' : '#F5EBE0',
          }}
        >
          {isNight ? 'Switch to Day' : 'Switch to Night'}
        </button>
      </div>

      <p className="text-xs text-neutral-500 italic">Click curtains to toggle</p>

      {/* Photo toggle */}
      {showPhoto && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="w-full max-w-md overflow-hidden"
        >
          <img
            src="/images/Through-The-Glass-Project/Winter-Cabin.png"
            alt="Warm wood tones, brass accents, Nordic atmosphere"
            className="w-full h-auto rounded-lg"
          />
          <p className="text-center text-neutral-500 text-xs mt-2 italic">Warm wood tones, brass accents, Nordic atmosphere.</p>
        </motion.div>
      )}
    </div>
  )
}

// ============================================
// TEXTURA DE MADERA
// ============================================
function WoodGrainTexture({ isNight }) {
  const grainColor = isNight ? '#0a0505' : '#3d1515'
  const grainColorLight = isNight ? '#1a0a0a' : '#5a2020'
  const knotColor = isNight ? '#080404' : '#2a0f0f'

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
      <svg className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="none">
        <defs>
          <pattern id="woodGrainRedDemo" patternUnits="userSpaceOnUse" width="150" height="12">
            <path d="M0,3 Q30,1 60,3 Q90,5 120,3 T150,3" stroke={grainColor} strokeWidth="0.8" fill="none" opacity="0.6" />
            <path d="M0,7 Q40,5 80,7 Q110,9 150,7" stroke={grainColor} strokeWidth="0.5" fill="none" opacity="0.4" />
            <path d="M0,10 Q25,9 50,10 Q75,11 100,10 T150,10" stroke={grainColorLight} strokeWidth="0.3" fill="none" opacity="0.3" />
          </pattern>
          <linearGradient id="woodDepthDemo" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.05" />
            <stop offset="50%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#woodGrainRedDemo)" />
        <rect width="100%" height="100%" fill="url(#woodDepthDemo)" />
      </svg>

      <div className="absolute rounded-full" style={{ width: '18px', height: '12px', top: '18%', left: '12%', background: `radial-gradient(ellipse, ${knotColor} 0%, ${knotColor}80 40%, transparent 70%)`, opacity: 0.3, transform: 'rotate(-5deg)' }} />
      <div className="absolute rounded-full" style={{ width: '14px', height: '10px', bottom: '25%', right: '18%', background: `radial-gradient(ellipse, ${knotColor} 0%, ${knotColor}80 40%, transparent 70%)`, opacity: 0.25, transform: 'rotate(8deg)' }} />

      <div className="absolute inset-0" style={{ background: `repeating-linear-gradient(92deg, transparent 0px, transparent 40px, ${isNight ? 'rgba(255,200,200,0.02)' : 'rgba(80,20,20,0.03)'} 40px, ${isNight ? 'rgba(255,200,200,0.02)' : 'rgba(80,20,20,0.03)'} 42px, transparent 42px, transparent 80px)` }} />
    </div>
  )
}

// ============================================
// EFECTOS DEL CRISTAL
// ============================================
function GlassEffects({ isNight, condition }) {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none z-20" style={{ background: isNight ? 'rgba(8, 12, 25, 0.08)' : 'rgba(200, 220, 255, 0.04)' }} />
      <div className="absolute inset-0 pointer-events-none z-30" style={{ background: `radial-gradient(ellipse 80% 60% at 15% 20%, rgba(255,255,255,${isNight ? 0.02 : 0.06}) 0%, rgba(255,255,255,${isNight ? 0.01 : 0.03}) 30%, transparent 60%)` }} />
      <div className="absolute inset-0 pointer-events-none z-30" style={{ background: `radial-gradient(ellipse 50% 40% at 85% 75%, rgba(255,255,255,${isNight ? 0.008 : 0.025}) 0%, transparent 50%)` }} />
      <div className="absolute inset-0 pointer-events-none z-25 rounded" style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,${isNight ? 0.03 : 0.12}), inset 0 -1px 0 rgba(0,0,0,0.08), inset 1px 0 0 rgba(255,255,255,${isNight ? 0.02 : 0.06}), inset -1px 0 0 rgba(0,0,0,0.04)` }} />

      {(condition === 'rain' || condition === 'storm') && (
        <div className="absolute inset-0 pointer-events-none z-35">
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(180deg, transparent 0%, rgba(180, 200, 220, 0.04) 50%, rgba(180, 200, 220, 0.08) 100%)' }} />
        </div>
      )}

      {condition === 'snow' && <FrostEffect />}
    </>
  )
}

// ============================================
// EFECTO DE ESCARCHA
// ============================================
function FrostEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-20 h-20`}
          style={{
            background: `radial-gradient(ellipse at ${pos.includes('left') ? '0%' : '100%'} ${pos.includes('top') ? '0%' : '100%'}, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 30%, transparent 60%)`,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// DIVISIONES DE LA VENTANA (Muntins)
// ============================================
function WindowMuntins({ colors, isNight }) {
  const muntinWidth = 12
  const muntinDepth = isNight ? 0.1 : 0.25

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2" style={{ width: muntinWidth }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${colors.frame.outer} 0%, ${colors.frame.inner} 20%, ${colors.frame.accent} 50%, ${colors.frame.inner} 80%, ${colors.frame.outer} 100%)` }} />
        <div className="absolute top-0 left-1 right-1 h-full" style={{ background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${muntinDepth}) 50%, transparent 100%)` }} />
        <div className="absolute top-0 bottom-0 -right-1 w-2" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.15) 0%, transparent 100%)' }} />
      </div>

      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2" style={{ height: muntinWidth }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${colors.frame.outer} 0%, ${colors.frame.inner} 20%, ${colors.frame.accent} 50%, ${colors.frame.inner} 80%, ${colors.frame.outer} 100%)` }} />
        <div className="absolute top-1 left-0 right-0 h-1" style={{ background: `linear-gradient(180deg, rgba(255,255,255,${muntinDepth}) 0%, transparent 100%)` }} />
        <div className="absolute left-0 right-0 -bottom-1 h-2" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 100%)' }} />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10" style={{ background: `radial-gradient(circle, ${colors.frame.accent} 0%, ${colors.frame.inner} 60%, ${colors.frame.outer} 100%)`, boxShadow: `inset 0 1px 2px rgba(255,255,255,${muntinDepth}), 0 2px 4px rgba(0,0,0,0.2)` }} />
    </div>
  )
}

// ============================================
// CORTINAS CON DRAPEADO REAL
// ============================================
function Curtains({ isNight, condition, isOpen, onToggle }) {
  const hasWind = condition === 'storm' && isOpen

  const curtainBase = isNight ? '#2a2525' : '#E8DDD5'
  const curtainShadow = isNight ? '#1a1515' : '#D0C4BC'
  const curtainHighlight = isNight ? '#3a3232' : '#F5EDE5'

  const foldCount = isOpen ? 5 : 8
  const curtainWidth = isOpen ? '12%' : '50%'

  return (
    <>
      {/* CORTINA IZQUIERDA */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 z-40 cursor-pointer overflow-hidden"
        style={{ marginTop: '-1%', marginBottom: '-2%' }}
        initial={false}
        animate={{ width: curtainWidth, x: hasWind ? [0, 6, 0, 4, 0] : 0 }}
        transition={hasWind ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : { duration: 1.2, ease: 'easeInOut' }}
        onClick={onToggle}
      >
        <div className="relative w-full h-full">
          {[...Array(foldCount)].map((_, i) => {
            const foldWidth = 100 / foldCount
            const isEven = i % 2 === 0
            return (
              <div
                key={i}
                className="absolute top-0 bottom-0"
                style={{
                  left: `${i * foldWidth}%`,
                  width: `${foldWidth + 5}%`,
                  background: `linear-gradient(90deg, ${isEven ? curtainShadow : curtainBase} 0%, ${isEven ? curtainBase : curtainHighlight} 30%, ${isEven ? curtainHighlight : curtainBase} 70%, ${isEven ? curtainBase : curtainShadow} 100%)`,
                  boxShadow: isEven ? 'inset -2px 0 4px rgba(0,0,0,0.1)' : 'inset 2px 0 4px rgba(0,0,0,0.05)',
                }}
              />
            )
          })}
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px)' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent 60%, ${isNight ? '#1a1f2e' : '#f5f0e6'}00 100%)` }} />
          <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.1) 0%, transparent 100%)' }} />
        </div>
        <motion.div
          className="absolute right-0 top-1/4 w-4 h-20"
          style={{ background: `linear-gradient(90deg, ${curtainShadow} 0%, ${curtainBase} 50%, ${curtainShadow} 100%)`, borderRadius: '0 4px 4px 0', boxShadow: '2px 0 4px rgba(0,0,0,0.15)' }}
          animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* CORTINA DERECHA */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 z-40 cursor-pointer overflow-hidden"
        style={{ marginTop: '-1%', marginBottom: '-2%' }}
        initial={false}
        animate={{ width: curtainWidth, x: hasWind ? [0, -5, 0, -3, 0] : 0 }}
        transition={hasWind ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 } : { duration: 1.2, ease: 'easeInOut' }}
        onClick={onToggle}
      >
        <div className="relative w-full h-full">
          {[...Array(foldCount)].map((_, i) => {
            const foldWidth = 100 / foldCount
            const isEven = i % 2 === 0
            return (
              <div
                key={i}
                className="absolute top-0 bottom-0"
                style={{
                  right: `${i * foldWidth}%`,
                  width: `${foldWidth + 5}%`,
                  background: `linear-gradient(270deg, ${isEven ? curtainShadow : curtainBase} 0%, ${isEven ? curtainBase : curtainHighlight} 30%, ${isEven ? curtainHighlight : curtainBase} 70%, ${isEven ? curtainBase : curtainShadow} 100%)`,
                  boxShadow: isEven ? 'inset 2px 0 4px rgba(0,0,0,0.1)' : 'inset -2px 0 4px rgba(0,0,0,0.05)',
                }}
              />
            )
          })}
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px)' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(270deg, transparent 60%, ${isNight ? '#1a1f2e' : '#f5f0e6'}00 100%)` }} />
          <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.1) 0%, transparent 100%)' }} />
        </div>
        <motion.div
          className="absolute left-0 top-1/4 w-4 h-20"
          style={{ background: `linear-gradient(270deg, ${curtainShadow} 0%, ${curtainBase} 50%, ${curtainShadow} 100%)`, borderRadius: '4px 0 0 4px', boxShadow: '-2px 0 4px rgba(0,0,0,0.15)' }}
          animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* BARRA DE CORTINA */}
      <div
        className="absolute -top-3 -left-4 -right-4 h-4 z-50 cursor-pointer"
        onClick={onToggle}
        style={{
          background: `linear-gradient(180deg, ${isNight ? '#4a2828' : '#B85555'} 0%, ${isNight ? '#3d2020' : '#A04545'} 50%, ${isNight ? '#2a1515' : '#8B3A3A'} 100%)`,
          borderRadius: '3px',
          boxShadow: `0 3px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,${isNight ? 0.1 : 0.2})`,
        }}
      >
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-5 rounded-full" style={{ background: `radial-gradient(circle at 30% 30%, ${isNight ? '#8B7355' : '#D4AF37'}, ${isNight ? '#5a4a3a' : '#AA8C2C'})`, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-5 rounded-full" style={{ background: `radial-gradient(circle at 30% 30%, ${isNight ? '#8B7355' : '#D4AF37'}, ${isNight ? '#5a4a3a' : '#AA8C2C'})`, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />

        {[0, 1, 2].map((i) => (
          <motion.div
            key={`left-${i}`}
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-3 rounded-full border-2"
            style={{ borderColor: isNight ? '#8B7355' : '#C9A876', background: 'transparent' }}
            initial={false}
            animate={{ left: isOpen ? `${5 + i * 4}%` : `${15 + i * 10}%` }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`right-${i}`}
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-3 rounded-full border-2"
            style={{ borderColor: isNight ? '#8B7355' : '#C9A876', background: 'transparent' }}
            initial={false}
            animate={{ right: isOpen ? `${5 + i * 4}%` : `${15 + i * 10}%` }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </>
  )
}

// ============================================
// ALFÉIZAR
// ============================================
function Windowsill({ colors, isNight, condition }) {
  return (
    <div className="absolute -bottom-5 -left-5 -right-5 z-60" style={{ perspective: '500px' }}>
      {condition === 'snow' && (
        <motion.div
          className="absolute left-6 right-6 h-4"
          style={{
            top: '-8px',
            zIndex: -1,
            background: 'linear-gradient(180deg, #ffffff 0%, #f0f0f5 40%, #e0e0e8 100%)',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            transformOrigin: 'bottom',
            boxShadow: '0 -3px 10px rgba(255,255,255,0.8), inset 0 2px 4px rgba(255,255,255,0.9)',
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 3 }}
        />
      )}

      <div
        className="relative h-6"
        style={{
          background: `linear-gradient(180deg, ${colors.frame.accent} 0%, ${colors.frame.inner} 30%, ${colors.frame.middle} 100%)`,
          borderRadius: '4px 4px 0 0',
          transform: 'rotateX(-10deg)',
          transformOrigin: 'top center',
          boxShadow: `inset 0 2px 4px rgba(255,255,255,${isNight ? 0.1 : 0.3}), 0 4px 12px rgba(0,0,0,0.25)`,
        }}
      >
        <WoodGrainTexture isNight={isNight} />
      </div>

      <div
        className="h-3"
        style={{
          background: `linear-gradient(180deg, ${colors.frame.middle} 0%, ${colors.frame.outer} 100%)`,
          borderRadius: '0 0 6px 6px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(0,0,0,0.1)',
        }}
      />
    </div>
  )
}

// ============================================
// WEATHER EFFECTS (Three.js for snow/rain, CSS for others)
// ============================================
function WeatherEffects({ condition, isNight }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Rain - Three.js */}
      {(condition === 'rain' || condition === 'storm') && (
        <ThreeRain intensity={condition === 'storm' ? 'heavy' : 'moderate'} isStorm={condition === 'storm'} />
      )}

      {/* Snow - Three.js */}
      {condition === 'snow' && (
        <ThreeSnow intensity="moderate" isNight={isNight} />
      )}

      {/* Fog - CSS/Framer Motion */}
      {condition === 'fog' && <FogEffect isNight={isNight} />}

      {/* Clouds - CSS */}
      {condition === 'cloudy' && <CloudsEffect isNight={isNight} />}

      {/* Aurora - CSS */}
      {condition === 'aurora' && <AuroraEffect />}

      {/* Clear day - Sun glow */}
      {condition === 'clear' && !isNight && (
        <div className="absolute -top-8 -right-8 w-28 h-28" style={{ background: 'radial-gradient(circle, rgba(255,220,100,0.25), transparent 60%)' }} />
      )}

      {/* Clear night - Stars */}
      {condition === 'clear' && isNight && <StarsEffect />}
    </div>
  )
}

// ============================================
// THREE.JS SNOW (from Through The Glass)
// ============================================
function ThreeSnow({ intensity = 'moderate', isNight = false }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cleanupRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    
    let mounted = true
    
    // Dynamic import Three.js
    import('three').then((THREE) => {
      if (!mounted || !containerRef.current) return
      
      const container = containerRef.current
      const width = container.clientWidth || 400
      const height = container.clientHeight || 300

      const snowCount = { light: 800, moderate: 1500, heavy: 2500 }[intensity]

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)
      camera.position.z = 100

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      const snowGeo = new THREE.BufferGeometry()
      const positions = new Float32Array(snowCount * 3)
      const velocities = []

      for (let i = 0; i < snowCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 200
        positions[i * 3 + 1] = Math.random() * 200 - 100
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100
        velocities.push(0.2 + Math.random() * 0.3)
      }

      snowGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const snowMaterial = new THREE.PointsMaterial({
        size: 2,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      })

      const snow = new THREE.Points(snowGeo, snowMaterial)
      scene.add(snow)

      sceneRef.current = { scene, camera, renderer, snow, snowGeo, velocities, snowCount }

      const animate = () => {
        if (!sceneRef.current || !mounted) return
        
        const { renderer, scene, camera, snowGeo, velocities, snowCount } = sceneRef.current
        const positions = snowGeo.attributes.position.array
        
        for (let i = 0; i < snowCount; i++) {
          const i3 = i * 3
          positions[i3] += Math.sin(Date.now() * 0.001 + i) * 0.05
          positions[i3 + 1] -= velocities[i]

          if (positions[i3 + 1] < -100) {
            positions[i3 + 1] = 100
            positions[i3] = (Math.random() - 0.5) * 200
          }
        }
        
        snowGeo.attributes.position.needsUpdate = true
        renderer.render(scene, camera)
        sceneRef.current.animationId = requestAnimationFrame(animate)
      }

      animate()
      
      cleanupRef.current = () => {
        if (sceneRef.current) {
          cancelAnimationFrame(sceneRef.current.animationId)
          sceneRef.current.renderer.dispose()
          sceneRef.current.snowGeo.dispose()
          sceneRef.current.snow.material.dispose()
          if (container.contains(sceneRef.current.renderer.domElement)) {
            container.removeChild(sceneRef.current.renderer.domElement)
          }
          sceneRef.current = null
        }
      }
    })
    
    return () => {
      mounted = false
      if (cleanupRef.current) cleanupRef.current()
    }
  }, [intensity, isNight])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 10 }} />
}

// ============================================
// THREE.JS RAIN (from Through The Glass)
// ============================================
function ThreeRain({ intensity = 'moderate', isStorm = false }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cleanupRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    
    let mounted = true

    import('three').then((THREE) => {
      if (!mounted || !containerRef.current) return
      
      const container = containerRef.current
      const width = container.clientWidth || 400
      const height = container.clientHeight || 300
      const rainCount = { light: 300, moderate: 600, heavy: 1000 }[intensity]

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)
      camera.position.set(0, 0, 100)
      camera.lookAt(0, 0, 0)

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      const positions = new Float32Array(rainCount * 6)
      const velocities = []

      for (let i = 0; i < rainCount; i++) {
        const x = (Math.random() - 0.5) * 200
        const y = Math.random() * 200 - 100
        const z = (Math.random() - 0.5) * 100
        const streakLength = 3 + Math.random() * 5

        positions[i * 6] = x
        positions[i * 6 + 1] = y
        positions[i * 6 + 2] = z
        positions[i * 6 + 3] = x + 0.2
        positions[i * 6 + 4] = y - streakLength
        positions[i * 6 + 5] = z

        velocities.push(1 + Math.random() * 1.5)
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const material = new THREE.LineBasicMaterial({
        color: isStorm ? 0x8899bb : 0xaabbdd,
        transparent: true,
        opacity: isStorm ? 0.6 : 0.4,
      })

      const rainLines = new THREE.LineSegments(geometry, material)
      scene.add(rainLines)

      sceneRef.current = { scene, camera, renderer, rainLines, velocities, rainCount, geometry, material }

      const animate = () => {
        if (!sceneRef.current || !mounted) return
        
        const { renderer, scene, camera, rainLines, velocities, rainCount } = sceneRef.current
        const positions = rainLines.geometry.attributes.position.array
        
        for (let i = 0; i < rainCount; i++) {
          const i6 = i * 6
          const speed = velocities[i]
          positions[i6 + 1] -= speed
          positions[i6 + 4] -= speed

          if (positions[i6 + 1] < -100) {
            const newY = 100 + Math.random() * 50
            const streakLength = 3 + Math.random() * 5
            positions[i6 + 1] = newY
            positions[i6 + 4] = newY - streakLength
            const newX = (Math.random() - 0.5) * 200
            positions[i6] = newX
            positions[i6 + 3] = newX + 0.2
          }
        }
        
        rainLines.geometry.attributes.position.needsUpdate = true
        renderer.render(scene, camera)
        sceneRef.current.animationId = requestAnimationFrame(animate)
      }

      animate()
      
      cleanupRef.current = () => {
        if (sceneRef.current) {
          cancelAnimationFrame(sceneRef.current.animationId)
          sceneRef.current.renderer.dispose()
          sceneRef.current.geometry.dispose()
          sceneRef.current.material.dispose()
          if (container.contains(sceneRef.current.renderer.domElement)) {
            container.removeChild(sceneRef.current.renderer.domElement)
          }
          sceneRef.current = null
        }
      }
    })
    
    return () => {
      mounted = false
      if (cleanupRef.current) cleanupRef.current()
    }
  }, [intensity, isStorm])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 10 }} />
}

// ============================================
// FOG EFFECT (Framer Motion)
// ============================================
function FogEffect({ isNight }) {
  const fogColor = isNight ? '50, 55, 70' : '200, 200, 210'
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ background: `rgba(${fogColor}, 0.55)` }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(0deg, rgba(${fogColor}, 0.44) 0%, rgba(${fogColor}, 0.22) 50%, rgba(${fogColor}, 0.11) 100%)` }} />
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 150% 100% at 50% 80%, rgba(${fogColor}, 0.28) 0%, transparent 60%)` }}
        animate={{ x: ['-10%', '10%', '-10%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// ============================================
// CLOUDS EFFECT
// ============================================
function CloudsEffect({ isNight }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes cloudDriftDemo { 0% { transform: translateX(-100%); } 100% { transform: translateX(400px); } }
      `}</style>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${15 + i * 18}%`,
            width: `${60 + i * 15}px`,
            height: `${20 + i * 5}px`,
            background: isNight ? 'rgba(60,70,90,0.5)' : 'rgba(200,210,220,0.6)',
            filter: 'blur(8px)',
            animation: `cloudDriftDemo ${18 + i * 4}s linear infinite`,
            animationDelay: `${i * 3}s`,
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// AURORA EFFECT
// ============================================
function AuroraEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes auroraWaveDemo { 0%, 100% { opacity: 0.3; transform: translateX(-10%) scaleY(1); } 50% { opacity: 0.5; transform: translateX(10%) scaleY(1.3); } }
      `}</style>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute w-full h-24"
          style={{
            top: `${i * 22}%`,
            background: `linear-gradient(180deg, transparent, ${i === 0 ? 'rgba(0,255,128,0.12)' : i === 1 ? 'rgba(128,0,255,0.08)' : 'rgba(0,200,255,0.1)'}, transparent)`,
            filter: 'blur(15px)',
            animation: `auroraWaveDemo ${6 + i * 2}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// STARS EFFECT
// ============================================
function StarsEffect() {
  const stars = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 60,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2,
  })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Moon */}
      <div
        className="absolute rounded-full"
        style={{
          top: '8%',
          right: '12%',
          width: '35px',
          height: '35px',
          background: 'radial-gradient(circle at 35% 35%, #FFFEF5 0%, #F8F4E0 30%, #EBE5C8 60%, #DED8B0 100%)',
          boxShadow: '0 0 15px rgba(255, 255, 240, 0.4), 0 0 30px rgba(255, 255, 220, 0.25)',
        }}
      />
    </div>
  )
}

// ============================================
// WEATHER SELECTOR (copied from Through The Glass)
// ============================================
function WeatherSelector({ currentCondition, onSelect, isNight }) {
  const conditions = [
    { value: 'clear', icon: <SunIcon />, label: 'Clear' },
    { value: 'cloudy', icon: <CloudIcon />, label: 'Cloudy' },
    { value: 'rain', icon: <RainIcon />, label: 'Rain' },
    { value: 'snow', icon: <SnowIcon />, label: 'Snow' },
    { value: 'storm', icon: <StormIcon />, label: 'Storm' },
    { value: 'fog', icon: <FogIcon />, label: 'Fog' },
    { value: 'aurora', icon: <AuroraIcon />, label: 'Aurora' },
  ]

  const selectorColors = {
    bg: isNight ? '#2a1818' : '#6B3A3A',
    bgLight: isNight ? '#3a2222' : '#7A4545',
    border: isNight ? '#1a0f0f' : '#4A2525',
    accent: isNight ? '#D4A574' : '#C9A86C',
    text: isNight ? '#E8D5C4' : '#F5EBE0',
    selected: isNight ? 'rgba(212,165,116,0.25)' : 'rgba(201,168,108,0.3)',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Marco de madera del selector */}
      <div
        className="relative p-0.5 sm:p-1 rounded-lg"
        style={{
          background: `linear-gradient(145deg, ${selectorColors.bgLight} 0%, ${selectorColors.bg} 50%, ${selectorColors.border} 100%)`,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.2)',
        }}
      >
        {/* Borde interior */}
        <div
          className="p-1.5 sm:p-2 md:p-3 rounded-md flex gap-0.5 sm:gap-1"
          style={{
            background: isNight
              ? 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
              : 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 100%)',
            border: `1px solid ${selectorColors.border}`,
          }}
        >
          {conditions.map(({ value, icon, label }) => {
            const isSelected = currentCondition === value
            return (
              <motion.button
                key={value}
                onClick={() => onSelect(value)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md flex items-center justify-center transition-colors"
                style={{
                  background: isSelected ? selectorColors.selected : 'transparent',
                  border: isSelected ? `1px solid ${selectorColors.accent}` : '1px solid transparent',
                  boxShadow: isSelected ? `0 0 8px ${selectorColors.accent}40, inset 0 0 4px ${selectorColors.accent}20` : 'none',
                }}
                title={label}
              >
                <div className="scale-75 sm:scale-90 md:scale-100" style={{ color: isSelected ? selectorColors.accent : selectorColors.text }}>
                  {icon}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Textura de madera sutil */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-lg overflow-hidden" style={{ opacity: 0.15 }}>
        <defs>
          <pattern id="selectorWoodGrainDemo" patternUnits="userSpaceOnUse" width="60" height="8">
            <path d="M0,4 Q15,2 30,4 T60,4" stroke={isNight ? '#4a2828' : '#3A2020'} strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#selectorWoodGrainDemo)" />
      </svg>
    </motion.div>
  )
}

// ============================================
// WEATHER ICONS (copied from Through The Glass)
// ============================================
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function CloudIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  )
}

function RainIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M16 13v8M8 13v8M12 15v8" />
      <path d="M18 8h-1.26A8 8 0 1 0 9 16h9a5 5 0 0 0 0-10z" />
    </svg>
  )
}

function SnowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20" />
      <path d="M2 12h20" />
      <path d="m4.93 4.93 14.14 14.14" />
      <path d="m19.07 4.93-14.14 14.14" />
    </svg>
  )
}

function StormIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
      <polyline points="13 11 9 17 15 17 11 23" />
    </svg>
  )
}

function FogIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 14h16M4 10h16M4 18h16" />
    </svg>
  )
}

function AuroraIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 20c0-8 4-16 8-16s8 8 8 16" />
      <path d="M8 20c0-5 2-10 4-10s4 5 4 10" />
      <path d="M12 20v-6" />
    </svg>
  )
}

// ============================================
// SKY GRADIENT
// ============================================
function getSkyGradient(timeOfDay, condition) {
  if (condition === 'storm') return 'linear-gradient(180deg, #0f1218 0%, #1a2030 20%, #2a3545 40%, #3a4555 60%, #2a3540 80%, #1f2530 100%)'
  if (condition === 'rain') {
    const isNight = timeOfDay === 'night' || timeOfDay === 'dusk'
    return isNight ? 'linear-gradient(180deg, #0f1419 0%, #1a2530 30%, #2a3545 60%, #3a4555 100%)' : 'linear-gradient(180deg, #6a7a8a 0%, #8a9aaa 30%, #a0b0c0 60%, #b0c0d0 100%)'
  }
  if (condition === 'snow') {
    const isNight = timeOfDay === 'night' || timeOfDay === 'dusk'
    return isNight ? 'linear-gradient(180deg, #1a1f2e 0%, #2a3345 30%, #3a4555 60%, #4a5565 100%)' : 'linear-gradient(180deg, #c8d0d8 0%, #d8e0e8 30%, #e8f0f8 60%, #f0f5fa 100%)'
  }
  if (condition === 'fog') return 'linear-gradient(180deg, #9aa0a8 0%, #b8c0c8 30%, #d0d8e0 60%, #e0e8f0 100%)'
  if (condition === 'cloudy') {
    const isNight = timeOfDay === 'night' || timeOfDay === 'dusk'
    return isNight ? 'linear-gradient(180deg, #1a1f28 0%, #2a3040 30%, #3a4555 60%, #4a5565 100%)' : 'linear-gradient(180deg, #8a9aaa 0%, #a0b0c0 30%, #b8c8d8 60%, #c8d8e8 100%)'
  }
  if (condition === 'aurora') return 'linear-gradient(180deg, #080810 0%, #101020 20%, #181830 40%, #202040 60%, #282850 80%, #1a1a30 100%)'

  // Clear sky
  if (timeOfDay === 'night') return 'linear-gradient(180deg, #080810 0%, #101020 20%, #181830 40%, #202040 60%, #282850 80%, #1a1a30 100%)'
  return 'linear-gradient(180deg, #3080c0 0%, #50a0d8 25%, #70b8e8 50%, #90d0f0 75%, #b0e0f8 100%)'
}

export default WindowDemo
