'use client'

import { useState, useCallback } from 'react'

/**
 * Interactive Export demo from Ontario Flag Time Machine
 * Shows the download button with PNG/SVG options and actual download functionality
 */
export function ExportDemo() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [lastDownload, setLastDownload] = useState(null)

  const year = 1965
  const era = 'Ontario Flag Adoption'
  const flagSrc = '/images/Ontario-Flag/ontario.svg'

  const getFileName = (format) => {
    const sanitizedEra = era.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
    return `ontario-flag-${year}-${sanitizedEra}.${format}`
  }

  const downloadSVG = useCallback(async () => {
    setIsDownloading(true)
    try {
      const response = await fetch(flagSrc)
      const svgText = await response.text()

      const blob = new Blob([svgText], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = getFileName('svg')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setLastDownload({ format: 'SVG', filename: getFileName('svg') })
    } catch (error) {
      console.error('Error downloading SVG:', error)
    } finally {
      setIsDownloading(false)
      setShowOptions(false)
    }
  }, [])

  const downloadPNG = useCallback(async () => {
    setIsDownloading(true)
    try {
      const response = await fetch(flagSrc)
      const svgText = await response.text()

      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
      const svgElement = svgDoc.documentElement

      const viewBox = svgElement.getAttribute('viewBox')
      let width = 1200
      let height = 600

      if (viewBox) {
        const [, , vbWidth, vbHeight] = viewBox.split(' ').map(Number)
        if (vbWidth && vbHeight) {
          const aspectRatio = vbHeight / vbWidth
          width = 1200
          height = Math.round(width * aspectRatio)
        }
      }

      const svgBase64 = btoa(unescape(encodeURIComponent(svgText)))
      const dataUrl = `data:image/svg+xml;base64,${svgBase64}`

      const img = new Image()
      img.crossOrigin = 'anonymous'

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(0, 0, width, height)
          ctx.drawImage(img, 0, 0, width, height)

          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = url
              link.download = getFileName('png')
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              URL.revokeObjectURL(url)
              setLastDownload({ format: 'PNG', filename: getFileName('png') })
            }
            setIsDownloading(false)
            setShowOptions(false)
          }, 'image/png', 1.0)
        }
      }

      img.onerror = () => {
        setIsDownloading(false)
        setShowOptions(false)
      }

      img.src = dataUrl
    } catch (error) {
      console.error('Error downloading PNG:', error)
      setIsDownloading(false)
      setShowOptions(false)
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Main panel */}
      <div className="
        relative w-full max-w-sm
        bg-gradient-to-b from-[#1a1815] via-[#0f0e0c] to-[#1a1815]
        border border-[#3a3530]
        rounded-lg
        p-6
        shadow-[inset_0_2px_8px_rgba(0,0,0,0.5),0_4px_12px_rgba(0,0,0,0.3)]
      ">
        {/* Corner screws */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm">
          <div className="absolute inset-0.5 border-t border-[#5a4a35] rotate-45" />
        </div>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm">
          <div className="absolute inset-0.5 border-t border-[#5a4a35] rotate-45" />
        </div>
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm">
          <div className="absolute inset-0.5 border-t border-[#5a4a35] rotate-45" />
        </div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#c9a86c] to-[#8b7355] shadow-sm">
          <div className="absolute inset-0.5 border-t border-[#5a4a35] rotate-45" />
        </div>

        {/* Title plate */}
        <div className="flex justify-center mb-4">
          <div className="
            px-3 py-1
            bg-gradient-to-b from-[#2a2520] to-[#1a1510]
            border border-[#3a3530]
            text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-[#d4c4b0]
            font-mono uppercase
            shadow-inner
          ">
            Export System
          </div>
        </div>

        {/* Flag preview */}
        <div className="
          relative mb-4
          bg-gradient-to-b from-[#0a0805] to-[#151210]
          border-2 border-[#3a3025]
          rounded-sm
          p-3
          shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]
        ">
          <img
            src={flagSrc}
            alt="Ontario Flag"
            className="w-full h-auto"
          />
          {/* Year badge */}
          <div className="
            absolute top-2 right-2
            px-2 py-0.5
            bg-[#0a0805]/80
            border border-[#3a3025]
            text-[10px] font-mono text-[#ff6b35]
          ">
            {year}
          </div>
        </div>

        {/* Filename preview */}
        <div className="
          mb-4 px-3 py-2
          bg-[#0a0805]
          border border-[#2a2520]
          rounded-sm
        ">
          <p className="text-[9px] text-[#6a6560] font-mono uppercase tracking-wider mb-1">Filename</p>
          <p className="text-[11px] text-[#c9a86c] font-mono truncate">
            ontario-flag-{year}-ontario-flag-adoption
          </p>
        </div>

        {/* Download button */}
        <div className="relative flex justify-center">
          <button
            onClick={() => setShowOptions(!showOptions)}
            disabled={isDownloading}
            className="
              flex items-center gap-2
              px-5 py-2.5
              bg-gradient-to-b from-[#2a2520] to-[#1a1510]
              border border-[#3a3530]
              text-[11px] tracking-[0.1em] text-[#c9a86c]
              font-mono uppercase
              hover:border-[#4a4540] hover:text-[#d9b87c]
              active:bg-[#151210]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all
            "
          >
            {/* Download icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {isDownloading ? 'Downloading...' : 'Download Flag'}
          </button>

          {/* Dropdown options */}
          {showOptions && !isDownloading && (
            <div className="
              absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-50
              bg-gradient-to-b from-[#2a2520] to-[#1a1510]
              border border-[#3a3530]
              shadow-lg
              min-w-[120px]
            ">
              <button
                onClick={downloadPNG}
                className="
                  w-full px-4 py-2.5
                  text-left text-[11px] tracking-[0.1em] text-[#b5a5a0]
                  font-mono uppercase
                  hover:bg-[#3a3530] hover:text-[#c9a86c]
                  border-b border-[#3a3530]
                  transition-colors
                  flex items-center gap-2
                "
              >
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                PNG
              </button>
              <button
                onClick={downloadSVG}
                className="
                  w-full px-4 py-2.5
                  text-left text-[11px] tracking-[0.1em] text-[#b5a5a0]
                  font-mono uppercase
                  hover:bg-[#3a3530] hover:text-[#c9a86c]
                  transition-colors
                  flex items-center gap-2
                "
              >
                <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                SVG
              </button>
            </div>
          )}

          {/* Click outside to close */}
          {showOptions && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowOptions(false)}
            />
          )}
        </div>

        {/* Last download feedback */}
        {lastDownload && (
          <div className="mt-4 text-center">
            <p className="text-[10px] text-[#22c55e] font-mono">
              Downloaded: {lastDownload.filename}
            </p>
          </div>
        )}
      </div>

      {/* Interactive hint */}
      <p className="text-xs text-neutral-500 italic text-center">
        Click Download to export as PNG or SVG
      </p>
    </div>
  )
}

export default ExportDemo
