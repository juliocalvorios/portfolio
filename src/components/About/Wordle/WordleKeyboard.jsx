import { memo } from 'react'

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
]

/**
 * Single keyboard key
 */
const Key = memo(function Key({ keyValue, status, onClick }) {
  const isSpecial = keyValue === 'ENTER' || keyValue === 'BACKSPACE'

  // Base classes - typewriter style
  const baseClasses = `
    flex items-center justify-center
    font-mono font-bold uppercase
    rounded-sm
    select-none
    transition-all duration-150
    active:scale-95
    border
  `

  // Size classes
  const sizeClasses = isSpecial
    ? 'px-2 sm:px-3 md:px-4 h-12 sm:h-14 text-[10px] sm:text-xs'
    : 'w-7 sm:w-9 md:w-10 h-12 sm:h-14 text-sm sm:text-base'

  // Color classes based on status - NYT colors
  let colorClasses = ''
  if (status === 'correct') {
    colorClasses = 'bg-[#6aaa64] text-white border-[#6aaa64] hover:bg-[#5a9a54]'
  } else if (status === 'present') {
    colorClasses = 'bg-[#c9b458] text-white border-[#c9b458] hover:bg-[#b9a448]'
  } else if (status === 'absent') {
    colorClasses = 'bg-[#787c7e] text-white border-[#787c7e] hover:bg-[#686c6e]'
  } else {
    colorClasses = 'bg-[#d3d6da] text-ink border-[#d3d6da] hover:bg-[#c3c6ca]'
  }

  // Display text
  const displayText = keyValue === 'BACKSPACE' ? '←' : keyValue

  return (
    <button
      type="button"
      onClick={() => onClick(keyValue)}
      className={`${baseClasses} ${sizeClasses} ${colorClasses}`}
      aria-label={keyValue}
    >
      {displayText}
    </button>
  )
})

/**
 * Keyboard row
 */
const KeyboardRow = memo(function KeyboardRow({ keys, letterStatuses, onKeyClick }) {
  return (
    <div className="flex justify-center gap-1 sm:gap-1.5">
      {keys.map(key => (
        <Key
          key={key}
          keyValue={key}
          status={letterStatuses[key]}
          onClick={onKeyClick}
        />
      ))}
    </div>
  )
})

/**
 * Full keyboard component
 */
function WordleKeyboard({ letterStatuses, onKeyPress }) {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2 w-full max-w-lg mx-auto">
      {KEYBOARD_ROWS.map((row, i) => (
        <KeyboardRow
          key={i}
          keys={row}
          letterStatuses={letterStatuses}
          onKeyClick={onKeyPress}
        />
      ))}
    </div>
  )
}

export default memo(WordleKeyboard)
