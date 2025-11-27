import { useState } from 'react'
import { useWordle } from './useWordle'
import WordleGrid from './WordleGrid'
import WordleKeyboard from './WordleKeyboard'
import { X, BarChart3 } from 'lucide-react'

/**
 * Stats Modal - appears on click
 */
function StatsModal({ stats, gameStatus, guesses, todaysWordData, onClose }) {
  const winPercentage = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0

  const maxGuessCount = Math.max(...stats.guessDistribution, 1)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30" onClick={onClose}>
      <div
        className="bg-paper border border-neutral-200 max-w-sm w-full p-6 relative shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-400 hover:text-ink"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Result if game over */}
        {gameStatus !== 'playing' && (
          <div className="text-center mb-6 pb-4 border-b border-neutral-200">
            <p className="text-[10px] tracking-widest text-neutral-500 mb-1">
              {gameStatus === 'won' ? 'YOU DISCOVERED' : 'THE WORD WAS'}
            </p>
            <p className="font-serif font-bold text-2xl">{todaysWordData.word}</p>
            <p className="text-sm text-neutral-600 italic mt-1">"{todaysWordData.fact}"</p>
          </div>
        )}

        <h3 className="text-center font-bold text-sm tracking-widest mb-4">STATISTICS</h3>

        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold">{stats.gamesPlayed}</p>
            <p className="text-[10px] text-neutral-500">Played</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{winPercentage}</p>
            <p className="text-[10px] text-neutral-500">Win %</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{stats.currentStreak}</p>
            <p className="text-[10px] text-neutral-500">Streak</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{stats.maxStreak}</p>
            <p className="text-[10px] text-neutral-500">Max</p>
          </div>
        </div>

        <h4 className="text-[10px] tracking-widest text-neutral-500 mb-2">GUESS DISTRIBUTION</h4>
        <div className="space-y-1">
          {stats.guessDistribution.map((count, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-3 text-xs">{i + 1}</span>
              <div
                className="h-5 flex items-center justify-end px-2 text-xs font-bold text-white"
                style={{
                  width: `${Math.max((count / maxGuessCount) * 100, 8)}%`,
                  minWidth: '24px',
                  backgroundColor: count > 0 ? (i === guesses.length - 1 && gameStatus === 'won' ? '#6aaa64' : '#787c7e') : '#d3d6da'
                }}
              >
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Main Wordle Component - NYT style (vertical, centered)
 */
export default function Wordle({ onClose }) {
  const {
    guesses,
    currentGuess,
    gameStatus,
    shake,
    revealingRow,
    stats,
    message,
    wordNumber,
    todaysWordData,
    letterStatuses,
    evaluateGuess,
    handleKeyPress,
  } = useWordle()

  const [showStats, setShowStats] = useState(false)

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
          The Daily Word
        </h2>

        <button
          onClick={() => setShowStats(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-neutral-500 hover:text-ink transition-colors"
          aria-label="Statistics"
        >
          <BarChart3 className="w-5 h-5" />
        </button>
      </div>

      {/* Game area - centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center py-4">
        {/* Message */}
        {message && (
          <div className="mb-4">
            <p className={`text-sm font-bold px-4 py-2 rounded ${
              gameStatus === 'won' ? 'bg-[#6aaa64] text-white' :
              gameStatus === 'lost' ? 'bg-neutral-800 text-white' :
              'bg-neutral-800 text-white'
            }`}>
              {message}
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="mb-6">
          <WordleGrid
            guesses={guesses}
            currentGuess={currentGuess}
            evaluateGuess={evaluateGuess}
            revealingRow={revealingRow}
            shake={shake}
          />
        </div>

        {/* Game over message */}
        {gameStatus !== 'playing' && (
          <div className="text-center mb-4">
            <p className="font-serif font-bold text-lg">{todaysWordData.word}</p>
            <p className="text-sm text-neutral-600 italic">"{todaysWordData.fact}"</p>
            <p className="text-xs text-neutral-400 mt-3">Come back tomorrow for a new word!</p>
          </div>
        )}
      </div>

      {/* Keyboard - fixed at bottom */}
      <div className="pb-2">
        <WordleKeyboard
          letterStatuses={letterStatuses}
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* Stats Modal */}
      {showStats && (
        <StatsModal
          stats={stats}
          gameStatus={gameStatus}
          guesses={guesses}
          todaysWordData={todaysWordData}
          onClose={() => setShowStats(false)}
        />
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes flip {
          0% { transform: rotateX(0); }
          50% { transform: rotateX(90deg); }
          100% { transform: rotateX(0); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }

        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-pop {
          animation: pop 0.1s ease-in-out;
        }
      `}</style>
    </div>
  )
}
