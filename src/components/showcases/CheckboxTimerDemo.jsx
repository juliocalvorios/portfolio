'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const TIME_LIMIT = 10

/**
 * Interactive demo of the self-unchecking checkbox from The Impossible Form
 * Checkbox unchecks itself after a countdown timer expires
 */
export function CheckboxTimerDemo() {
  const [checked, setChecked] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [hasExpiredOnce, setHasExpiredOnce] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Start timer when checked
  useEffect(() => {
    if (!checked) {
      setTimeRemaining(null)
      return
    }

    setTimeRemaining(TIME_LIMIT)

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [checked])

  // Uncheck when time expires
  useEffect(() => {
    if (timeRemaining === 0 && checked) {
      setChecked(false)
      setHasExpiredOnce(true)
    }
  }, [timeRemaining, checked])

  const handleChange = useCallback(() => {
    setChecked(!checked)
    setSubmitted(false)
  }, [checked])

  const handleSubmit = () => {
    if (checked) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setChecked(false)
      }, 2000)
    }
  }

  const handleReset = () => {
    setChecked(false)
    setTimeRemaining(null)
    setHasExpiredOnce(false)
    setSubmitted(false)
  }

  const progressPercentage = timeRemaining !== null
    ? (timeRemaining / TIME_LIMIT) * 100
    : 100

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
            Self-Unchecking Checkbox Demo
          </span>
        </div>

        {/* Content area */}
        <div
          className="bg-white p-4"
          style={{
            boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080, inset -2px -2px 0 #c0c0c0, inset 2px 2px 0 #0a0a0a'
          }}
        >
          {/* Checkbox with timer */}
          <div className="relative" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            <label className="flex items-center gap-2 cursor-pointer">
              {/* Windows 95 style checkbox */}
              <div className="relative">
                <motion.div
                  animate={{ scale: checked ? [1, 1.1, 1] : 1 }}
                  className="w-[13px] h-[13px] bg-white flex items-center justify-center cursor-pointer"
                  style={{
                    boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080, inset -2px -2px 0 #c0c0c0, inset 2px 2px 0 #0a0a0a'
                  }}
                  onClick={handleChange}
                >
                  {checked && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-[9px] h-[9px]"
                      viewBox="0 0 9 9"
                      fill="none"
                    >
                      <path
                        d="M1 4L3.5 7L8 1"
                        stroke="#000"
                        strokeWidth="2"
                        strokeLinecap="square"
                      />
                    </motion.svg>
                  )}
                </motion.div>

                {/* Timer bar */}
                {checked && timeRemaining !== null && (
                  <div
                    className="absolute -bottom-2 left-0 w-[13px] h-[3px]"
                    style={{
                      boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080',
                      backgroundColor: '#c0c0c0',
                    }}
                  >
                    <motion.div
                      className="h-full"
                      style={{
                        backgroundColor: timeRemaining <= 3 ? '#FF0000' : '#000080',
                        width: `${progressPercentage}%`,
                      }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>

              <span className="text-[11px] text-black">I agree to the Terms and Conditions</span>

              {/* Timer badge */}
              {checked && timeRemaining !== null && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] ml-1 px-1"
                  style={{
                    fontFamily: 'monospace',
                    backgroundColor: timeRemaining <= 3 ? '#FF0000' : '#c0c0c0',
                    color: timeRemaining <= 3 ? '#fff' : '#000',
                    boxShadow: timeRemaining <= 3
                      ? 'none'
                      : 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080',
                  }}
                >
                  {timeRemaining}s
                </motion.span>
              )}
            </label>

            {/* Warning messages */}
            {checked && timeRemaining !== null && timeRemaining <= 5 && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] mt-3"
                style={{ color: '#FF0000', fontFamily: 'Tahoma, sans-serif' }}
              >
                {timeRemaining <= 2 ? "Quick! Submit now!" : "Hurry, it's about to uncheck!"}
              </motion.p>
            )}

            {hasExpiredOnce && !checked && !submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] mt-3"
                style={{ color: '#808000', fontFamily: 'Tahoma, sans-serif' }}
              >
                Oops, it unchecked itself. Try again, but faster this time.
              </motion.p>
            )}

            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] mt-3"
                style={{ color: '#008000', fontFamily: 'Tahoma, sans-serif' }}
              >
                ✓ Submitted in time! Well done.
              </motion.p>
            )}
          </div>

          {/* Submit button */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={!checked}
              className="px-4 py-1 text-[11px] text-black disabled:text-[#808080]"
              style={{
                fontFamily: 'Tahoma, sans-serif',
                backgroundColor: '#c0c0c0',
                boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
              }}
            >
              Submit
            </button>
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
        Check the box and try to submit before the {TIME_LIMIT} second timer expires.
      </p>
    </div>
  )
}

export default CheckboxTimerDemo
