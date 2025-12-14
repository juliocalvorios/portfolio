'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * Interactive demo of the Stats Panel from The Impossible Form
 * Shows real-time frustration metrics in Windows 95 style
 */
export function StatsPanelDemo() {
  const [stats, setStats] = useState({
    failedClicks: 0,
    checkboxUnchecks: 0,
    passwordRejects: 0,
    totalTime: 0,
    frustrationLevel: 0
  })
  const [isRunning, setIsRunning] = useState(false)

  // Timer effect
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalTime: prev.totalTime + 1,
        frustrationLevel: Math.min(100, prev.frustrationLevel + Math.random() * 2)
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  const handleFailedClick = () => {
    setStats(prev => ({
      ...prev,
      failedClicks: prev.failedClicks + 1,
      frustrationLevel: Math.min(100, prev.frustrationLevel + 5)
    }))
    if (!isRunning) setIsRunning(true)
  }

  const handleCheckboxUncheck = () => {
    setStats(prev => ({
      ...prev,
      checkboxUnchecks: prev.checkboxUnchecks + 1,
      frustrationLevel: Math.min(100, prev.frustrationLevel + 8)
    }))
    if (!isRunning) setIsRunning(true)
  }

  const handlePasswordReject = () => {
    setStats(prev => ({
      ...prev,
      passwordRejects: prev.passwordRejects + 1,
      frustrationLevel: Math.min(100, prev.frustrationLevel + 10)
    }))
    if (!isRunning) setIsRunning(true)
  }

  const handleReset = () => {
    setStats({
      failedClicks: 0,
      checkboxUnchecks: 0,
      passwordRejects: 0,
      totalTime: 0,
      frustrationLevel: 0
    })
    setIsRunning(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDefenseLevel = () => {
    if (stats.frustrationLevel < 25) return { text: 'LOW', color: '#008000' }
    if (stats.frustrationLevel < 50) return { text: 'MEDIUM', color: '#808000' }
    if (stats.frustrationLevel < 75) return { text: 'HIGH', color: '#FF8000' }
    return { text: 'MAXIMUM', color: '#FF0000' }
  }

  const defense = getDefenseLevel()

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        {/* Stats Window */}
        <div
          className="flex-1 bg-[#c0c0c0] p-1"
          style={{
            boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
          }}
        >
          {/* Title bar */}
          <div
            className="h-[18px] px-[3px] py-[3px] flex items-center justify-between mb-1"
            style={{ background: 'linear-gradient(90deg, #000080, #1084d0)' }}
          >
            <span className="text-white text-[11px] font-bold" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Frustration Metrics
            </span>
          </div>

          {/* Content */}
          <div className="p-2 space-y-2">
            {/* Stats rows */}
            {[
              { label: 'Failed Button Clicks', value: stats.failedClicks, icon: '🖱️' },
              { label: 'Checkbox Unchecks', value: stats.checkboxUnchecks, icon: '☐' },
              { label: 'Password Rejects', value: stats.passwordRejects, icon: '🔒' },
              { label: 'Time Elapsed', value: formatTime(stats.totalTime), icon: '⏱️' }
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-2 py-1"
                style={{
                  backgroundColor: '#fff',
                  boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080'
                }}
              >
                <span className="text-[11px] text-black" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                  {stat.icon} {stat.label}
                </span>
                <span
                  className="text-[11px] font-mono font-bold"
                  style={{ color: '#000080' }}
                >
                  {stat.value}
                </span>
              </div>
            ))}

            {/* Frustration bar */}
            <div className="pt-2">
              <div className="flex justify-between mb-1">
                <span className="text-[10px] text-black" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                  Frustration Level
                </span>
                <span className="text-[10px] font-bold" style={{ color: defense.color, fontFamily: 'Tahoma, sans-serif' }}>
                  {Math.round(stats.frustrationLevel)}%
                </span>
              </div>
              <div
                className="h-[14px] w-full"
                style={{
                  backgroundColor: '#fff',
                  boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080, inset -2px -2px 0 #dfdfdf, inset 2px 2px 0 #0a0a0a'
                }}
              >
                <motion.div
                  className="h-full"
                  style={{
                    backgroundColor: defense.color,
                    width: `${stats.frustrationLevel}%`
                  }}
                  animate={{ width: `${stats.frustrationLevel}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Defense Level */}
            <div
              className="flex items-center justify-between px-2 py-1 mt-2"
              style={{
                backgroundColor: '#000',
                boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080'
              }}
            >
              <span className="text-[10px] text-[#00ff00] font-mono">
                DEFENSE LEVEL:
              </span>
              <motion.span
                className="text-[10px] font-mono font-bold"
                style={{ color: defense.color }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {defense.text}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Simulation Buttons */}
        <div
          className="flex-1 bg-[#c0c0c0] p-1"
          style={{
            boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
          }}
        >
          <div
            className="h-[18px] px-[3px] flex items-center mb-1"
            style={{ background: 'linear-gradient(90deg, #000080, #1084d0)' }}
          >
            <span className="text-white text-[11px] font-bold" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Simulate Events
            </span>
          </div>

          <div
            className="p-3 space-y-2"
            style={{
              backgroundColor: '#c0c0c0'
            }}
          >
            <p className="text-[10px] text-black" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Click to simulate form events:
            </p>

            {[
              { label: 'Failed Click', onClick: handleFailedClick },
              { label: 'Checkbox Uncheck', onClick: handleCheckboxUncheck },
              { label: 'Password Reject', onClick: handlePasswordReject }
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
                className="w-full px-3 py-1.5 text-[11px] text-black"
                style={{
                  fontFamily: 'Tahoma, sans-serif',
                  backgroundColor: '#c0c0c0',
                  boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
                }}
              >
                + {btn.label}
              </button>
            ))}

            <div className="border-t border-[#808080] pt-2 mt-2">
              <button
                onClick={handleReset}
                className="w-full px-3 py-1.5 text-[11px] text-black"
                style={{
                  fontFamily: 'Tahoma, sans-serif',
                  backgroundColor: '#c0c0c0',
                  boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
                }}
              >
                Reset Stats
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-500 italic">
        Click the simulation buttons to watch the frustration metrics climb in real-time.
      </p>
    </div>
  )
}

export default StatsPanelDemo
