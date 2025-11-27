import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { WORDS } from '../Wordle/wordList'

// Select 8 words for the puzzle
const PUZZLE_WORDS = WORDS.slice(0, 8)
const GRID_SIZE = 10

/**
 * Generate a word search grid with hidden words
 */
function generateGrid(words) {
  // Initialize empty grid
  const grid = Array(GRID_SIZE).fill(null).map(() =>
    Array(GRID_SIZE).fill(null).map(() => ({ letter: '', wordIndex: -1 }))
  )

  const wordPositions = []
  const directions = [
    { dx: 1, dy: 0 },   // horizontal
    { dx: 0, dy: 1 },   // vertical
    { dx: 1, dy: 1 },   // diagonal down-right
    { dx: -1, dy: 1 },  // diagonal down-left
  ]

  // Place each word
  words.forEach((wordData, wordIndex) => {
    const word = wordData.word
    let placed = false
    let attempts = 0

    while (!placed && attempts < 100) {
      const dir = directions[Math.floor(Math.random() * directions.length)]
      const startX = Math.floor(Math.random() * GRID_SIZE)
      const startY = Math.floor(Math.random() * GRID_SIZE)

      // Check if word fits
      const endX = startX + dir.dx * (word.length - 1)
      const endY = startY + dir.dy * (word.length - 1)

      if (endX >= 0 && endX < GRID_SIZE && endY >= 0 && endY < GRID_SIZE) {
        // Check if path is clear
        let canPlace = true
        for (let i = 0; i < word.length; i++) {
          const x = startX + dir.dx * i
          const y = startY + dir.dy * i
          const cell = grid[y][x]
          if (cell.letter !== '' && cell.letter !== word[i]) {
            canPlace = false
            break
          }
        }

        if (canPlace) {
          // Place the word
          const positions = []
          for (let i = 0; i < word.length; i++) {
            const x = startX + dir.dx * i
            const y = startY + dir.dy * i
            grid[y][x] = { letter: word[i], wordIndex }
            positions.push({ x, y })
          }
          wordPositions.push({ wordIndex, positions })
          placed = true
        }
      }
      attempts++
    }
  })

  // Fill empty cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x].letter === '') {
        grid[y][x].letter = letters[Math.floor(Math.random() * letters.length)]
      }
    }
  }

  return { grid, wordPositions }
}

/**
 * Word Search Game Component
 */
export default function WordSearch({ onClose }) {
  const [gridData, setGridData] = useState(null)
  const [foundWords, setFoundWords] = useState([])
  const [selectedCells, setSelectedCells] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [startCell, setStartCell] = useState(null)
  const [showFoundWord, setShowFoundWord] = useState(null)

  // Generate grid on mount (using seeded random based on date for daily puzzle)
  useEffect(() => {
    // Seed based on today's date for consistent daily puzzle
    const today = new Date()
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()

    // Simple seeded random
    let seedValue = seed
    const seededRandom = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280
      return seedValue / 233280
    }

    // Override Math.random temporarily
    const originalRandom = Math.random
    Math.random = seededRandom

    const data = generateGrid(PUZZLE_WORDS)
    setGridData(data)

    // Restore Math.random
    Math.random = originalRandom

    // Load saved progress
    const savedKey = `wordsearch-${seed}`
    const saved = localStorage.getItem(savedKey)
    if (saved) {
      setFoundWords(JSON.parse(saved))
    }
  }, [])

  // Save progress
  useEffect(() => {
    if (foundWords.length > 0) {
      const today = new Date()
      const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
      localStorage.setItem(`wordsearch-${seed}`, JSON.stringify(foundWords))
    }
  }, [foundWords])

  const getCellsInLine = useCallback((start, end) => {
    if (!start || !end) return []

    const cells = []
    const dx = Math.sign(end.x - start.x)
    const dy = Math.sign(end.y - start.y)

    // Only allow straight lines (horizontal, vertical, diagonal)
    const distX = Math.abs(end.x - start.x)
    const distY = Math.abs(end.y - start.y)

    if (distX !== 0 && distY !== 0 && distX !== distY) {
      return [] // Not a valid line
    }

    const steps = Math.max(distX, distY)
    for (let i = 0; i <= steps; i++) {
      cells.push({
        x: start.x + dx * i,
        y: start.y + dy * i
      })
    }

    return cells
  }, [])

  const handleCellMouseDown = (x, y) => {
    setIsSelecting(true)
    setStartCell({ x, y })
    setSelectedCells([{ x, y }])
  }

  const handleCellMouseEnter = (x, y) => {
    if (isSelecting && startCell) {
      const cells = getCellsInLine(startCell, { x, y })
      setSelectedCells(cells)
    }
  }

  const handleMouseUp = () => {
    if (isSelecting && selectedCells.length > 0 && gridData) {
      // Check if selected cells form a word
      const selectedWord = selectedCells
        .map(cell => gridData.grid[cell.y][cell.x].letter)
        .join('')

      // Check both directions
      const reversedWord = selectedWord.split('').reverse().join('')

      const wordIndex = PUZZLE_WORDS.findIndex(
        w => w.word === selectedWord || w.word === reversedWord
      )

      if (wordIndex !== -1 && !foundWords.includes(wordIndex)) {
        setFoundWords(prev => [...prev, wordIndex])
        setShowFoundWord(PUZZLE_WORDS[wordIndex])
        setTimeout(() => setShowFoundWord(null), 3000)
      }
    }

    setIsSelecting(false)
    setStartCell(null)
    setSelectedCells([])
  }

  const isSelected = (x, y) => {
    return selectedCells.some(cell => cell.x === x && cell.y === y)
  }

  const isFoundCell = (x, y) => {
    if (!gridData) return false
    return foundWords.some(wordIndex => {
      const wordPos = gridData.wordPositions.find(wp => wp.wordIndex === wordIndex)
      return wordPos?.positions.some(pos => pos.x === x && pos.y === y)
    })
  }

  const allFound = foundWords.length === PUZZLE_WORDS.length

  if (!gridData) {
    return (
      <div className="animate-fadeIn flex flex-col h-full items-center justify-center">
        <div className="inline-block w-6 h-6 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="animate-fadeIn flex flex-col h-full">
      {/* Header */}
      <div className="relative border-b border-neutral-200 py-3">
        <button
          onClick={onClose}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-neutral-500 hover:text-ink transition-colors"
          aria-label="Back"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center font-serif font-bold text-2xl sm:text-3xl tracking-tight">
          Word Search
        </h2>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-neutral-500 text-sm">
          {foundWords.length}/{PUZZLE_WORDS.length}
        </div>
      </div>

      {/* Found word notification */}
      {showFoundWord && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 bg-[#6aaa64] text-white px-4 py-2 rounded shadow-lg animate-fadeIn">
          <p className="font-bold">{showFoundWord.word}</p>
          <p className="text-sm opacity-90">"{showFoundWord.fact}"</p>
        </div>
      )}

      {/* Game area */}
      <div className="flex-1 flex flex-col items-center justify-center py-4 overflow-auto">
        {/* Grid */}
        <div
          className="select-none touch-none"
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchEnd={handleMouseUp}
        >
          <div
            className="grid gap-0.5 sm:gap-1 p-2 bg-neutral-100 rounded"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            }}
          >
            {gridData.grid.map((row, y) =>
              row.map((cell, x) => (
                <button
                  key={`${x}-${y}`}
                  className={`
                    w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center
                    text-sm sm:text-base font-bold rounded
                    transition-colors duration-150
                    ${isFoundCell(x, y)
                      ? 'bg-[#6aaa64] text-white'
                      : isSelected(x, y)
                        ? 'bg-[#c9b458] text-white'
                        : 'bg-white text-ink hover:bg-neutral-50'
                    }
                  `}
                  onMouseDown={() => handleCellMouseDown(x, y)}
                  onMouseEnter={() => handleCellMouseEnter(x, y)}
                  onTouchStart={() => handleCellMouseDown(x, y)}
                  onTouchMove={(e) => {
                    const touch = e.touches[0]
                    const element = document.elementFromPoint(touch.clientX, touch.clientY)
                    if (element?.dataset?.x && element?.dataset?.y) {
                      handleCellMouseEnter(
                        parseInt(element.dataset.x),
                        parseInt(element.dataset.y)
                      )
                    }
                  }}
                  data-x={x}
                  data-y={y}
                >
                  {cell.letter}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Word list */}
        <div className="mt-6 px-4 w-full max-w-sm">
          <p className="text-[10px] tracking-widest text-neutral-500 mb-2 text-center">FIND THESE WORDS</p>
          <div className="grid grid-cols-2 gap-2">
            {PUZZLE_WORDS.map((wordData, i) => (
              <div
                key={i}
                className={`text-center py-1 px-2 rounded text-sm ${
                  foundWords.includes(i)
                    ? 'bg-[#6aaa64]/10 text-[#6aaa64] line-through'
                    : 'text-neutral-700'
                }`}
              >
                {wordData.word}
              </div>
            ))}
          </div>
        </div>

        {/* All found message */}
        {allFound && (
          <div className="mt-6 text-center">
            <p className="font-serif font-bold text-lg text-[#6aaa64]">All words found!</p>
            <p className="text-xs text-neutral-400 mt-2">Come back tomorrow for a new puzzle!</p>
          </div>
        )}
      </div>
    </div>
  )
}
