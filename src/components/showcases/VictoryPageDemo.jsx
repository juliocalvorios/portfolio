'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Demo of the Victory Page from The Impossible Form
 * Shows the Windows 95 styled results screen
 */
export function VictoryPageDemo() {
  const [stats] = useState({
    time: '2:47',
    fleeAttempts: 12,
    checkboxResets: 3,
    passwordRejects: 8,
    grade: 'B'
  })

  const getGradeColor = (grade) => {
    const colors = {
      'S': '#FFD700',
      'A': '#00FF00',
      'B': '#00BFFF',
      'C': '#FFA500',
      'D': '#FF4444'
    }
    return colors[grade] || '#FFFFFF'
  }

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {/* Victory Window */}
      <div
        className="w-full max-w-sm bg-[#c0c0c0] p-1"
        style={{
          boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
        }}
      >
        {/* Title bar */}
        <div
          className="h-[18px] px-[3px] flex items-center justify-between mb-1"
          style={{ background: 'linear-gradient(90deg, #000080, #1084d0)' }}
        >
          <span className="text-white text-[11px] font-bold" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            🎉 VICTORY!
          </span>
          <div className="flex gap-[2px]">
            <button
              className="w-[14px] h-[14px] bg-[#c0c0c0] text-[9px] flex items-center justify-center"
              style={{
                boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff'
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 space-y-3">
          {/* Grade */}
          <div className="text-center py-2">
            <p className="text-[10px] text-black mb-1" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Performance Rating
            </p>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-5xl font-bold"
              style={{ 
                color: getGradeColor(stats.grade),
                textShadow: `0 0 10px ${getGradeColor(stats.grade)}`,
                fontFamily: 'Tahoma, sans-serif'
              }}
            >
              {stats.grade}
            </motion.div>
          </div>

          {/* Stats */}
          <div
            className="p-2 space-y-1"
            style={{
              backgroundColor: '#fff',
              boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff'
            }}
          >
            <p className="text-[10px] text-black font-bold mb-2" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Your Struggle:
            </p>
            {[
              { label: 'Time Elapsed', value: stats.time },
              { label: 'Button Chase Attempts', value: stats.fleeAttempts },
              { label: 'Checkbox Resets', value: stats.checkboxResets },
              { label: 'Password Rejects', value: stats.passwordRejects }
            ].map((stat, i) => (
              <div key={i} className="flex justify-between text-[11px]" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                <span className="text-black">{stat.label}:</span>
                <span className="text-[#000080] font-bold">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Message */}
          <div
            className="p-2 text-center"
            style={{
              backgroundColor: '#FFFFCC',
              boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff'
            }}
          >
            <p className="text-[10px] text-black" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              You defeated the impossible form!<br/>
              <span className="text-[9px] text-neutral-600">Share your victory?</span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-center">
            {['Twitter', 'Copy Link'].map((label) => (
              <button
                key={label}
                className="px-3 py-1 text-[11px] text-black"
                style={{
                  fontFamily: 'Tahoma, sans-serif',
                  backgroundColor: '#c0c0c0',
                  boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[11px] text-neutral-500" style={{ fontFamily: 'Tahoma, sans-serif' }}>
        Sample victory screen with B rating.
      </p>
    </div>
  )
}

export default VictoryPageDemo
