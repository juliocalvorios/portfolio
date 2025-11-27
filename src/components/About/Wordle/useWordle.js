import { useState, useEffect, useCallback } from 'react'
import { getTodaysWord, getWordNumber, isValidWord } from './wordList'

const WORD_LENGTH = 5
const MAX_ATTEMPTS = 6

// localStorage keys
const STORAGE_KEY = 'julio-wordle-state'
const STATS_KEY = 'julio-wordle-stats'

function getInitialStats() {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0], // wins on attempt 1-6
  }
}

function loadStats() {
  try {
    const saved = localStorage.getItem(STATS_KEY)
    return saved ? JSON.parse(saved) : getInitialStats()
  } catch {
    return getInitialStats()
  }
}

function saveStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  } catch {
    // localStorage not available
  }
}

function loadGameState(wordNumber) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const state = JSON.parse(saved)
      // Only restore if same day's puzzle
      if (state.wordNumber === wordNumber) {
        return state
      }
    }
  } catch {
    // localStorage not available
  }
  return null
}

function saveGameState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage not available
  }
}

export function useWordle(isActive = true) {
  const todaysWordData = getTodaysWord()
  const todaysWord = todaysWordData.word.toUpperCase()
  const wordNumber = getWordNumber()

  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameStatus, setGameStatus] = useState('playing') // 'playing', 'won', 'lost'
  const [shake, setShake] = useState(false)
  const [revealingRow, setRevealingRow] = useState(null)
  const [stats, setStats] = useState(loadStats)
  const [message, setMessage] = useState('')

  // Load saved state on mount
  useEffect(() => {
    const savedState = loadGameState(wordNumber)
    if (savedState) {
      setGuesses(savedState.guesses)
      setGameStatus(savedState.gameStatus)
    }
  }, [wordNumber])

  // Save state when it changes
  useEffect(() => {
    if (guesses.length > 0 || gameStatus !== 'playing') {
      saveGameState({
        wordNumber,
        guesses,
        gameStatus,
      })
    }
  }, [guesses, gameStatus, wordNumber])

  // Get letter statuses for keyboard coloring
  const getLetterStatuses = useCallback(() => {
    const statuses = {}

    guesses.forEach(guess => {
      guess.split('').forEach((letter, i) => {
        const currentStatus = statuses[letter]

        if (todaysWord[i] === letter) {
          statuses[letter] = 'correct'
        } else if (todaysWord.includes(letter)) {
          if (currentStatus !== 'correct') {
            statuses[letter] = 'present'
          }
        } else {
          if (!currentStatus) {
            statuses[letter] = 'absent'
          }
        }
      })
    })

    return statuses
  }, [guesses, todaysWord])

  // Evaluate a guess
  const evaluateGuess = useCallback((guess) => {
    const result = []
    const wordArray = todaysWord.split('')
    const guessArray = guess.split('')
    const letterCounts = {}

    // Count letters in word
    wordArray.forEach(letter => {
      letterCounts[letter] = (letterCounts[letter] || 0) + 1
    })

    // First pass: mark correct letters
    guessArray.forEach((letter, i) => {
      if (letter === wordArray[i]) {
        result[i] = 'correct'
        letterCounts[letter]--
      }
    })

    // Second pass: mark present/absent
    guessArray.forEach((letter, i) => {
      if (result[i]) return

      if (letterCounts[letter] > 0) {
        result[i] = 'present'
        letterCounts[letter]--
      } else {
        result[i] = 'absent'
      }
    })

    return result
  }, [todaysWord])

  // Handle key press
  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== 'playing') return

    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        setShake(true)
        setMessage('Not enough letters')
        setTimeout(() => {
          setShake(false)
          setMessage('')
        }, 600)
        return
      }

      if (!isValidWord(currentGuess)) {
        setShake(true)
        setMessage('Not in word list')
        setTimeout(() => {
          setShake(false)
          setMessage('')
        }, 600)
        return
      }

      // Valid guess - reveal it
      const newGuesses = [...guesses, currentGuess]
      setRevealingRow(guesses.length)

      // Wait for reveal animation then update state
      setTimeout(() => {
        setGuesses(newGuesses)
        setCurrentGuess('')
        setRevealingRow(null)

        // Check win/lose
        if (currentGuess === todaysWord) {
          setGameStatus('won')
          setMessage('Brilliant!')

          // Update stats
          const newStats = { ...stats }
          newStats.gamesPlayed++
          newStats.gamesWon++
          newStats.currentStreak++
          newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak)
          newStats.guessDistribution[newGuesses.length - 1]++
          setStats(newStats)
          saveStats(newStats)
        } else if (newGuesses.length >= MAX_ATTEMPTS) {
          setGameStatus('lost')
          setMessage(`The word was ${todaysWord}`)

          // Update stats
          const newStats = { ...stats }
          newStats.gamesPlayed++
          newStats.currentStreak = 0
          setStats(newStats)
          saveStats(newStats)
        }
      }, WORD_LENGTH * 300 + 200) // Wait for all tiles to flip

    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1))
    } else if (currentGuess.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key)
    }
  }, [currentGuess, guesses, gameStatus, todaysWord, stats])

  // Keyboard event listener - only when active
  useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return

      const key = e.key.toUpperCase()

      if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
        e.preventDefault()
        handleKeyPress(key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyPress, isActive])

  // Generate share text
  const generateShareText = useCallback(() => {
    if (gameStatus === 'playing') return ''

    const won = gameStatus === 'won'
    const attempts = won ? guesses.length : 'X'

    let text = `The Daily Word #${wordNumber} ${attempts}/${MAX_ATTEMPTS}\n\n`

    guesses.forEach(guess => {
      const evaluation = evaluateGuess(guess)
      const row = evaluation.map(status => {
        if (status === 'correct') return '🟩'
        if (status === 'present') return '🟨'
        return '⬛'
      }).join('')
      text += row + '\n'
    })

    text += '\njuliocalvo.dev'

    return text
  }, [gameStatus, guesses, wordNumber, evaluateGuess])

  return {
    // State
    guesses,
    currentGuess,
    gameStatus,
    shake,
    revealingRow,
    stats,
    message,
    wordNumber,
    todaysWordData,

    // Computed
    letterStatuses: getLetterStatuses(),
    evaluateGuess,

    // Actions
    handleKeyPress,
    generateShareText,
  }
}
