'use client'

import { useState } from 'react'

/**
 * Interactive demo showcasing Windows 95 UI styling from The Impossible Form
 * Shows the exact CSS values used for authentic Win95 aesthetics
 */
export function Win95StyleDemo() {
  const [hoveredElement, setHoveredElement] = useState(null)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const styleInfo = {
    panel: {
      name: 'Panel Background',
      css: 'background: #c0c0c0;\nbox-shadow: inset -1px -1px 0 #0a0a0a,\n           inset 1px 1px 0 #ffffff,\n           inset -2px -2px 0 #808080,\n           inset 2px 2px 0 #dfdfdf;'
    },
    titlebar: {
      name: 'Title Bar',
      css: 'background: linear-gradient(90deg, #000080, #1084d0);\ncolor: white;\nfont: bold 11px Tahoma;'
    },
    button: {
      name: 'Button (Raised)',
      css: 'background: #c0c0c0;\nbox-shadow: inset -1px -1px 0 #0a0a0a,\n           inset 1px 1px 0 #ffffff,\n           inset -2px -2px 0 #808080,\n           inset 2px 2px 0 #dfdfdf;'
    },
    input: {
      name: 'Input Field (Sunken)',
      css: 'background: white;\nbox-shadow: inset -1px -1px 0 #fff,\n           inset 1px 1px 0 #0a0a0a,\n           inset -2px -2px 0 #dfdfdf,\n           inset 2px 2px 0 #808080;'
    },
    checkbox: {
      name: 'Checkbox',
      css: 'background: white;\nbox-shadow: inset -1px -1px 0 #fff,\n           inset 1px 1px 0 #808080,\n           inset -2px -2px 0 #c0c0c0,\n           inset 2px 2px 0 #0a0a0a;'
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-3xl">
        {/* Windows 95 Window */}
        <div
          className="flex-1 bg-[#c0c0c0] p-1"
          style={{
            boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
          }}
          onMouseEnter={() => setHoveredElement('panel')}
          onMouseLeave={() => setHoveredElement(null)}
        >
          {/* Title Bar */}
          <div
            className="h-[18px] px-[3px] py-[3px] flex items-center justify-between mb-1 cursor-default"
            style={{ background: 'linear-gradient(90deg, #000080, #1084d0)' }}
            onMouseEnter={(e) => { e.stopPropagation(); setHoveredElement('titlebar') }}
            onMouseLeave={() => setHoveredElement('panel')}
          >
            <span className="text-white text-[11px] font-bold" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Windows 95 Style Guide
            </span>
            <div className="flex gap-[2px]">
              <button
                className="w-[16px] h-[14px] bg-[#c0c0c0] flex items-center justify-center"
                style={{
                  boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
                }}
              >
                <div className="w-[6px] h-[2px] bg-black mt-[6px]" />
              </button>
              <button
                className="w-[16px] h-[14px] bg-[#c0c0c0] flex items-center justify-center"
                style={{
                  boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
                }}
              >
                <div className="w-[9px] h-[9px] border border-black border-t-2" />
              </button>
              <button
                className="w-[16px] h-[14px] bg-[#c0c0c0] flex items-center justify-center text-black font-bold text-[12px] leading-none"
                style={{
                  boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-3 space-y-3">
            {/* Input Field */}
            <div>
              <label className="text-[11px] text-black block mb-1" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                Username:
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter username"
                className="w-full px-1 py-[2px] text-[11px] text-black bg-white"
                style={{
                  fontFamily: 'Tahoma, sans-serif',
                  boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #0a0a0a, inset -2px -2px 0 #dfdfdf, inset 2px 2px 0 #808080'
                }}
                onMouseEnter={() => setHoveredElement('input')}
                onMouseLeave={() => setHoveredElement('panel')}
              />
            </div>

            {/* Checkbox */}
            <label
              className="flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setHoveredElement('checkbox')}
              onMouseLeave={() => setHoveredElement('panel')}
            >
              <div
                className="w-[13px] h-[13px] bg-white flex items-center justify-center"
                style={{
                  boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080, inset -2px -2px 0 #c0c0c0, inset 2px 2px 0 #0a0a0a'
                }}
                onClick={() => setCheckboxChecked(!checkboxChecked)}
              >
                {checkboxChecked && (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1 4L3.5 7L8 1" stroke="black" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
              <span className="text-[11px] text-black" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                Remember me
              </span>
            </label>

            {/* Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                className="px-4 py-1 text-[11px] text-black min-w-[75px]"
                style={{
                  fontFamily: 'Tahoma, sans-serif',
                  backgroundColor: '#c0c0c0',
                  boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
                }}
                onMouseEnter={() => setHoveredElement('button')}
                onMouseLeave={() => setHoveredElement('panel')}
              >
                OK
              </button>
              <button
                className="px-4 py-1 text-[11px] text-black min-w-[75px]"
                style={{
                  fontFamily: 'Tahoma, sans-serif',
                  backgroundColor: '#c0c0c0',
                  boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
                }}
                onMouseEnter={() => setHoveredElement('button')}
                onMouseLeave={() => setHoveredElement('panel')}
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex gap-1 mt-1">
            <div
              className="flex-1 px-2 py-[2px]"
              style={{
                boxShadow: 'inset -1px -1px 0 #ffffff, inset 1px 1px 0 #808080'
              }}
            >
              <span className="text-[11px] text-black" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                Ready
              </span>
            </div>
          </div>
        </div>

        {/* CSS Info Panel */}
        <div
          className="flex-1 bg-[#c0c0c0] p-1"
          style={{
            boxShadow: 'inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf'
          }}
        >
          <div
            className="h-[18px] px-[3px] py-[3px] flex items-center mb-1"
            style={{ background: 'linear-gradient(90deg, #000080, #1084d0)' }}
          >
            <span className="text-white text-[11px] font-bold" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              CSS Inspector
            </span>
          </div>

          <div
            className="bg-white p-3 min-h-[180px]"
            style={{
              boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #0a0a0a, inset -2px -2px 0 #dfdfdf, inset 2px 2px 0 #808080'
            }}
          >
            {hoveredElement && styleInfo[hoveredElement] ? (
              <div>
                <p className="text-[11px] font-bold text-black mb-2" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                  {styleInfo[hoveredElement].name}
                </p>
                <pre className="text-[10px] text-[#000080] whitespace-pre-wrap font-mono bg-[#f0f0f0] p-2">
                  {styleInfo[hoveredElement].css}
                </pre>
              </div>
            ) : (
              <p className="text-[11px] text-[#808080] italic" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                Hover over elements to see their CSS...
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-500 italic">
        Hover over elements to inspect the exact Windows 95 CSS styling.
      </p>
    </div>
  )
}

export default Win95StyleDemo
