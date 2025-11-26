/**
 * Vintage newspaper-style advertisements
 * Inspired by old classified ads with modern hover effects
 */
import { Bug, FlaskConical } from 'lucide-react'

// Bug Hunter / Wanted Poster style - Vertical poster format
export function WantedAd({ className = '' }) {
  return (
    <div
      className={`group relative bg-paper overflow-hidden transition-all duration-300 w-[175px] ${className}`}
    >
      {/* Outer frame - double border effect */}
      <div className="absolute inset-0 border-2 border-neutral-800 group-hover:border-red-700 transition-colors duration-300" />
      <div className="absolute inset-[3px] border border-neutral-400 group-hover:border-red-400 transition-colors duration-300" />

      {/* Corner dots */}
      <span className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-neutral-400 group-hover:bg-red-600 transition-colors duration-300" />
      <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-neutral-400 group-hover:bg-red-600 transition-colors duration-300" />
      <span className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-neutral-400 group-hover:bg-red-600 transition-colors duration-300" />
      <span className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-neutral-400 group-hover:bg-red-600 transition-colors duration-300" />

      {/* Inner content */}
      <div className="relative m-2 p-2.5 text-center">
        {/* WANTED header */}
        <h4
          className="text-xl font-black tracking-wider group-hover:text-red-700 transition-colors duration-300 mb-0.5"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          WANTED
        </h4>
        <p className="text-[9px] tracking-widest text-neutral-500 group-hover:text-red-500 transition-colors duration-300 mb-2">
          DEAD OR ALIVE
        </p>

        {/* Bug icon */}
        <div className="mx-auto w-14 h-14 border border-neutral-800 bg-neutral-100 group-hover:bg-red-50 group-hover:border-red-700 transition-all duration-300 mb-2 flex items-center justify-center">
          <Bug className="w-7 h-7 text-neutral-300 group-hover:text-red-400 transition-colors duration-300" />
        </div>

        {/* Crime */}
        <p className="text-[10px] italic text-neutral-500 group-hover:text-red-600 transition-colors duration-300">
          Wanted for
        </p>
        <p className="text-xs font-bold font-serif group-hover:text-red-800 transition-colors duration-300 mb-1.5">
          Frontend Bugs
        </p>

        {/* Charges */}
        <div className="text-[10px] text-neutral-500 group-hover:text-red-600 transition-colors duration-300 mb-2 space-y-0.5">
          <p>✗ Crimes against UX</p>
          <p>✗ Breaking layouts</p>
        </div>

        {/* Reward */}
        <div className="border-t border-neutral-300 group-hover:border-red-300 pt-1.5 transition-colors duration-300">
          <p className="text-[9px] tracking-widest text-neutral-400 group-hover:text-red-500 transition-colors duration-300">
            REWARD
          </p>
          <p className="text-sm font-black font-serif group-hover:text-red-700 transition-colors duration-300">
            Clean UI
          </p>
        </div>
      </div>

      {/* "FIXED" stamp on hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-all duration-500 rotate-[-15deg] scale-0 group-hover:scale-100">
        <div className="border-2 border-red-600 rounded px-2 py-1">
          <span className="text-base font-black text-red-600 tracking-wider">FIXED</span>
        </div>
      </div>
    </div>
  )
}

// "Miracle Cure" Patent Medicine poster style - matching WantedAd dimensions
export function HireAd({ className = '' }) {
  return (
    <div
      className={`group relative bg-paper overflow-hidden transition-all duration-300 w-[175px] ${className}`}
    >
      {/* Outer frame - double border effect */}
      <div className="absolute inset-0 border-2 border-neutral-800 group-hover:border-emerald-700 transition-colors duration-300" />
      <div className="absolute inset-[3px] border border-neutral-400 group-hover:border-emerald-400 transition-colors duration-300" />

      {/* Corner dots */}
      <span className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-neutral-400 group-hover:bg-emerald-600 transition-colors duration-300" />
      <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-neutral-400 group-hover:bg-emerald-600 transition-colors duration-300" />
      <span className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-neutral-400 group-hover:bg-emerald-600 transition-colors duration-300" />
      <span className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-neutral-400 group-hover:bg-emerald-600 transition-colors duration-300" />

      {/* Inner content */}
      <div className="relative m-2 p-2.5 text-center">
        {/* ELIXIR header */}
        <h4
          className="text-xl font-black tracking-wider group-hover:text-emerald-700 transition-colors duration-300 mb-0.5"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          ELIXIR
        </h4>
        <p className="text-[9px] tracking-widest text-neutral-500 group-hover:text-emerald-500 transition-colors duration-300 mb-2">
          GUARANTEED RESULTS
        </p>

        {/* Elixir flask icon */}
        <div className="mx-auto w-14 h-14 border border-neutral-800 bg-neutral-100 group-hover:bg-emerald-50 group-hover:border-emerald-700 transition-all duration-300 mb-2 flex items-center justify-center">
          <FlaskConical className="w-7 h-7 text-neutral-300 group-hover:text-emerald-400 transition-colors duration-300" />
        </div>

        {/* Product name */}
        <p className="text-[10px] italic text-neutral-500 group-hover:text-emerald-600 transition-colors duration-300">
          Dr. Calvo's
        </p>
        <p className="text-xs font-bold font-serif group-hover:text-emerald-800 transition-colors duration-300 mb-1.5">
          Code Elixir
        </p>

        {/* Benefits */}
        <div className="text-[10px] text-neutral-500 group-hover:text-emerald-600 transition-colors duration-300 mb-2 space-y-0.5">
          <p>✓ Fixes layouts</p>
          <p>✓ Cures slow apps</p>
        </div>

        {/* Apply */}
        <div className="border-t border-neutral-300 group-hover:border-emerald-300 pt-1.5 transition-colors duration-300">
          <p className="text-[9px] tracking-widest text-neutral-400 group-hover:text-emerald-500 transition-colors duration-300">
            APPLY WITHIN
          </p>
          <p className="text-sm font-black font-serif group-hover:text-emerald-700 transition-colors duration-300">
            Toronto
          </p>
        </div>
      </div>

      {/* "CURED!" stamp on hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-all duration-500 rotate-[-15deg] scale-0 group-hover:scale-100">
        <div className="border-2 border-emerald-600 rounded px-2 py-1">
          <span className="text-base font-black text-emerald-600 tracking-wider">CURED!</span>
        </div>
      </div>
    </div>
  )
}

export default WantedAd
