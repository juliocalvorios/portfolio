import { useState } from 'react'
import Ornament from './ui/Ornament'
import ScrollReveal from './ui/ScrollReveal'
import { Gamepad2 } from 'lucide-react'
import MiniGames from './About/MiniGames'

function About() {
  const [showMiniGames, setShowMiniGames] = useState(false)

  // Show Mini Games instead of About content
  if (showMiniGames) {
    return <MiniGames onClose={() => setShowMiniGames(false)} />
  }

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <ScrollReveal>
        <div className="relative mb-6 sm:mb-8">
          {/* Mini Games Button - top right */}
          <button
            onClick={() => setShowMiniGames(true)}
            className="absolute top-0 right-0 group flex items-center gap-1.5 px-2 py-1 border border-neutral-300 hover:border-ink hover:bg-neutral-50 transition-all text-[10px] tracking-widest text-neutral-500 hover:text-ink"
          >
            <Gamepad2 className="w-3 h-3" />
            <span className="hidden sm:inline">MINI GAMES</span>
          </button>

          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">The Developer</h2>
            <p className="text-neutral-500 font-serif mt-1 text-xs sm:text-sm md:text-base tracking-wide">
              Frontend Developer · Toronto
            </p>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Portrait Column */}
        <div className="lg:col-span-4">
          <div className="bg-neutral-100 border border-neutral-200 aspect-square sm:aspect-[3/4] flex items-center justify-center mb-2 sm:mb-3 overflow-hidden">
            <img 
              src="/images/photo-profile-juliocalvo.JPG" 
              alt="Julio Calvo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contact Icons */}
          <div className="flex justify-center gap-4 mt-3">
            <a 
              href="mailto:juliocalvorios@gmail.com"
              className="text-neutral-400 hover:text-neutral-700 transition-colors"
              title="Email"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/juliocalvorios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-700 transition-colors"
              title="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://github.com/juliocalvor811-svg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-700 transition-colors"
              title="GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>

          <Ornament className="my-4 sm:my-6" />

          {/* Quick Info */}
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <InfoRow label="Location" value="Toronto, Ontario" />
            <InfoRow label="Origin" value="Zaragoza, Spain" />
            <InfoRow label="Focus" value="Frontend" />
            <InfoRow label="Work Auth" value="Full-time, any CA employer" />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8">
          {/* Article Content - Single column, simple */}
          <div className="font-serif text-sm sm:text-base leading-relaxed space-y-4 sm:space-y-5">
            <p>
              <span className="text-3xl sm:text-4xl font-bold float-left mr-2 leading-none mt-1">
                I
              </span>
              'm Julio. I'm from Zaragoza, Spain, and I've been living in Toronto for the past couple of years. Before getting into development, I studied Commerce and Marketing back in Spain. Then I moved here and did Multimedia Design at Humber Polytechnic.
            </p>
            <p>
              Most of what I know comes from building veraOS.
            </p>
          </div>

          {/* Technical Stack */}
          <ScrollReveal delay={0.1}>
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-neutral-200">
              <h4 className="text-[10px] sm:text-xs tracking-widest font-bold mb-3 sm:mb-4">
                TECHNICAL STACK
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <SkillList
                  title="Core"
                  skills={[
                    'React / Next.js',
                    'TypeScript / JavaScript',
                    'Tailwind CSS',
                    'HTML / CSS',
                  ]}
                />
                <SkillList
                  title="Tools & Frameworks"
                  skills={[
                    'Supabase',
                    'Framer Motion',
                    'Three.js',
                    'Jest + Playwright',
                  ]}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Education */}
          <ScrollReveal delay={0.2}>
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-neutral-200">
              <h4 className="text-[10px] sm:text-xs tracking-widest font-bold mb-3 sm:mb-4">
                EDUCATION
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
                  <p className="text-[9px] sm:text-xs tracking-widest text-neutral-500 mb-1 sm:mb-2">
                    TORONTO
                  </p>
                  <p className="font-bold font-serif text-sm sm:text-base">Humber Polytechnic</p>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    Multimedia Design & Development
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    2024 - 2025
                  </p>
                </div>

                <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
                  <p className="text-[9px] sm:text-xs tracking-widest text-neutral-500 mb-1 sm:mb-2">
                    SPAIN
                  </p>
                  <p className="font-bold font-serif text-sm sm:text-base">Colegio Montessori</p>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    Degree in Commerce & Marketing
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    2019 - 2023
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value, highlight = false }) {
  return (
    <div className="flex justify-between border-b border-neutral-200 pb-2 text-xs sm:text-sm">
      <span className="text-neutral-500">{label}</span>
      {highlight ? (
        <span
          className="font-medium px-1.5 py-0.5 rounded-sm"
          style={{
            color: '#5a6340',
            backgroundColor: 'rgba(90, 99, 64, 0.1)'
          }}
        >
          {value}
        </span>
      ) : (
        <span>{value}</span>
      )}
    </div>
  )
}

function SkillList({ title, skills }) {
  return (
    <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
      <p className="text-[9px] sm:text-xs tracking-widest text-neutral-500 mb-2 sm:mb-3">
        {title.toUpperCase()}
      </p>
      <div className="space-y-1.5 sm:space-y-2">
        {skills.map(skill => (
          <p key={skill} className="text-xs sm:text-sm font-serif">
            {skill}
          </p>
        ))}
      </div>
    </div>
  )
}

export default About
