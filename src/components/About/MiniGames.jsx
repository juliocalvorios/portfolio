import { useState } from 'react'
import { X, ChevronRight, Type, Search } from 'lucide-react'
import Wordle from './Wordle'
import WordSearch from './WordSearch'

const GAMES = [
  {
    id: 'wordsearch',
    name: 'Word Search',
    description: 'Find hidden words about me',
    Icon: Search,
  },
  {
    id: 'wordle',
    name: 'The Daily Word',
    description: 'Guess the 5-letter word in 6 tries',
    Icon: Type,
  },
]

/**
 * Mini Games Menu - Toggle between different puzzle games
 */
export default function MiniGames({ onClose }) {
  const [activeGame, setActiveGame] = useState(null)

  // If a game is active, render it
  if (activeGame === 'wordle') {
    return <Wordle onClose={() => setActiveGame(null)} />
  }

  if (activeGame === 'wordsearch') {
    return <WordSearch onClose={() => setActiveGame(null)} />
  }

  // Otherwise, show the menu
  return (
    <div className="animate-fadeIn flex flex-col h-full">
      {/* Header */}
      <div className="relative border-b border-neutral-200 py-3">
        <button
          onClick={onClose}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-neutral-500 hover:text-ink transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center font-serif font-bold text-2xl sm:text-3xl tracking-tight">
          Mini Games
        </h2>
      </div>

      {/* Games list */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <p className="text-[10px] tracking-widest text-neutral-500 mb-6">SELECT A PUZZLE</p>

        <div className="w-full max-w-sm space-y-3">
          {GAMES.map((game) => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className="w-full flex items-center gap-4 p-4 bg-white border border-neutral-200 rounded hover:border-neutral-400 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-neutral-200 rounded">
                <game.Icon className="w-5 h-5 text-neutral-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-serif font-bold text-lg">{game.name}</p>
                <p className="text-sm text-neutral-500">{game.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
            </button>
          ))}
        </div>

        <p className="text-xs text-neutral-400 mt-8 text-center">
          New puzzles every day at midnight
        </p>
      </div>
    </div>
  )
}
