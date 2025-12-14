'use client'

import { memo } from 'react'

/**
 * Win95DualDemo - Displays two demos side by side with Windows 95 styling
 * Used for The Impossible Form article to combine related demos
 */

const WIN95_COLORS = {
  background: '#c0c0c0',
  shadow: '#808080',
  highlight: '#ffffff',
  darkShadow: '#0a0a0a',
  lightHighlight: '#dfdfdf',
  titleBarStart: '#000080',
  titleBarEnd: '#1084d0',
}

function Win95DualDemo({ 
  leftDemo, 
  rightDemo, 
  leftTitle = 'Demo 1', 
  rightTitle = 'Demo 2',
  caption 
}) {
  return (
    <figure className="my-8 sm:my-10 md:my-12">
      {/* Main container with Win95 styling */}
      <div 
        className="p-3 sm:p-4 rounded-sm"
        style={{
          backgroundColor: WIN95_COLORS.background,
          boxShadow: `
            inset -1px -1px 0 0 ${WIN95_COLORS.darkShadow},
            inset 1px 1px 0 0 ${WIN95_COLORS.highlight},
            inset -2px -2px 0 0 ${WIN95_COLORS.shadow},
            inset 2px 2px 0 0 ${WIN95_COLORS.lightHighlight}
          `,
        }}
      >
        {/* Grid for two demos */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-3 sm:gap-4">
          {/* Left Demo */}
          <div>
            {/* Mini title bar */}
            <div 
              className="h-5 px-2 flex items-center mb-2"
              style={{
                background: `linear-gradient(90deg, ${WIN95_COLORS.titleBarStart}, ${WIN95_COLORS.titleBarEnd})`,
              }}
            >
              <span 
                className="text-[10px] font-bold text-white truncate"
                style={{ fontFamily: 'Tahoma, "MS Sans Serif", Geneva, sans-serif' }}
              >
                {leftTitle}
              </span>
            </div>
            {/* Demo content area */}
            <div 
              className="p-2 min-h-[200px] flex items-center justify-center"
              style={{
                backgroundColor: '#fff',
                boxShadow: `
                  inset 1px 1px 0 0 ${WIN95_COLORS.darkShadow},
                  inset -1px -1px 0 0 ${WIN95_COLORS.highlight},
                  inset 2px 2px 0 0 ${WIN95_COLORS.shadow}
                `,
              }}
            >
              {leftDemo}
            </div>
          </div>

          {/* Vertical divider - visible only on md+ */}
          <div 
            className="hidden md:block self-stretch"
            style={{
              background: `linear-gradient(180deg, 
                ${WIN95_COLORS.shadow} 0%, 
                ${WIN95_COLORS.shadow} 49%, 
                ${WIN95_COLORS.highlight} 50%, 
                ${WIN95_COLORS.highlight} 100%
              )`,
            }}
          />

          {/* Horizontal divider - visible only on mobile */}
          <div 
            className="block md:hidden h-[2px] my-2"
            style={{
              background: `linear-gradient(90deg, 
                ${WIN95_COLORS.shadow} 0%, 
                ${WIN95_COLORS.shadow} 49%, 
                ${WIN95_COLORS.highlight} 50%, 
                ${WIN95_COLORS.highlight} 100%
              )`,
            }}
          />

          {/* Right Demo */}
          <div>
            {/* Mini title bar */}
            <div 
              className="h-5 px-2 flex items-center mb-2"
              style={{
                background: `linear-gradient(90deg, ${WIN95_COLORS.titleBarStart}, ${WIN95_COLORS.titleBarEnd})`,
              }}
            >
              <span 
                className="text-[10px] font-bold text-white truncate"
                style={{ fontFamily: 'Tahoma, "MS Sans Serif", Geneva, sans-serif' }}
              >
                {rightTitle}
              </span>
            </div>
            {/* Demo content area */}
            <div 
              className="p-2 min-h-[200px] flex items-center justify-center"
              style={{
                backgroundColor: '#fff',
                boxShadow: `
                  inset 1px 1px 0 0 ${WIN95_COLORS.darkShadow},
                  inset -1px -1px 0 0 ${WIN95_COLORS.highlight},
                  inset 2px 2px 0 0 ${WIN95_COLORS.shadow}
                `,
              }}
            >
              {rightDemo}
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div 
          className="mt-3 h-5 flex items-center px-2"
          style={{
            boxShadow: `
              inset -1px -1px 0 0 ${WIN95_COLORS.highlight},
              inset 1px 1px 0 0 ${WIN95_COLORS.shadow}
            `,
          }}
        >
          <span 
            className="text-[10px] text-black"
            style={{ fontFamily: 'Tahoma, "MS Sans Serif", Geneva, sans-serif' }}
          >
            Interactive demos — try them both
          </span>
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <figcaption className="text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default memo(Win95DualDemo)
