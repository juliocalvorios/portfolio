import { memo } from 'react'

const WORD_LENGTH = 5
const MAX_ATTEMPTS = 6

/**
 * Single tile component
 */
const Tile = memo(function Tile({ letter, status, isRevealing, revealDelay, isCurrentRow, position }) {
  const baseClasses = 'w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 flex items-center justify-center text-xl sm:text-2xl font-bold font-serif uppercase select-none'

  // Determine background and border colors based on status
  let colorClasses = ''
  let borderClasses = ''

  if (status === 'correct') {
    colorClasses = 'text-white'
    borderClasses = 'border-[#6aaa64] bg-[#6aaa64]'
  } else if (status === 'present') {
    colorClasses = 'text-white'
    borderClasses = 'border-[#c9b458] bg-[#c9b458]'
  } else if (status === 'absent') {
    colorClasses = 'text-white'
    borderClasses = 'border-[#787c7e] bg-[#787c7e]'
  } else if (letter) {
    colorClasses = 'bg-paper text-ink'
    borderClasses = 'border-neutral-400'
  } else {
    colorClasses = 'bg-paper'
    borderClasses = 'border-neutral-300'
  }

  // Animation classes
  const animationStyle = {}
  if (isRevealing && status) {
    animationStyle.animation = `flip 0.5s ease ${revealDelay}ms forwards`
    animationStyle.transformStyle = 'preserve-3d'
  }

  // Pop animation when typing
  const popClass = letter && isCurrentRow && !status ? 'animate-pop' : ''

  return (
    <div
      className={`${baseClasses} ${colorClasses} ${borderClasses} ${popClass} transition-colors duration-100`}
      style={animationStyle}
    >
      {letter}
    </div>
  )
})

/**
 * Single row of tiles
 */
const Row = memo(function Row({ guess, evaluation, isCurrentRow, currentGuess, isRevealing, shake }) {
  const tiles = []

  for (let i = 0; i < WORD_LENGTH; i++) {
    let letter = ''
    let status = null

    if (guess) {
      letter = guess[i] || ''
      status = evaluation ? evaluation[i] : null
    } else if (isCurrentRow) {
      letter = currentGuess[i] || ''
    }

    tiles.push(
      <Tile
        key={i}
        letter={letter}
        status={status}
        isRevealing={isRevealing}
        revealDelay={i * 300}
        isCurrentRow={isCurrentRow}
        position={i}
      />
    )
  }

  const shakeClass = shake && isCurrentRow ? 'animate-shake' : ''

  return (
    <div className={`flex gap-1.5 sm:gap-2 ${shakeClass}`}>
      {tiles}
    </div>
  )
})

/**
 * Main grid component
 */
function WordleGrid({ guesses, currentGuess, evaluateGuess, revealingRow, shake }) {
  const rows = []

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const guess = guesses[i]
    const isCurrentRow = i === guesses.length
    const isRevealing = i === revealingRow
    const evaluation = guess ? evaluateGuess(guess) : null

    rows.push(
      <Row
        key={i}
        guess={guess}
        evaluation={evaluation}
        isCurrentRow={isCurrentRow}
        currentGuess={isCurrentRow ? currentGuess : ''}
        isRevealing={isRevealing}
        shake={shake && isCurrentRow}
      />
    )
  }

  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      {rows}
    </div>
  )
}

export default memo(WordleGrid)
