import Ornament from './ui/Ornament'
import ScrollReveal from './ui/ScrollReveal'
import { WantedAd, HireAd } from './ui/VintageAds'

function About() {
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">The Developer</h2>
          <p className="text-neutral-500 italic font-serif mt-1 text-xs sm:text-sm md:text-base">
            A profile in determination and self-directed learning
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Portrait Column */}
        <div className="lg:col-span-4">
          <div className="bg-neutral-100 border border-neutral-200 aspect-square sm:aspect-[3/4] flex items-center justify-center mb-2 sm:mb-3">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl text-neutral-300 mb-1.5 sm:mb-2">👤</div>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] tracking-wider sm:tracking-widest text-neutral-400">
                PORTRAIT
              </p>
            </div>
          </div>
          <p className="text-[9px] sm:text-[10px] text-neutral-500 italic text-center">
            Julio Calvo in his Toronto workspace, 2025.
          </p>

          <Ornament className="my-4 sm:my-6" />

          {/* Quick Info */}
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <InfoRow label="Location" value="Toronto, Ontario" />
            <InfoRow label="Origin" value="Zaragoza, Spain" />
            <InfoRow label="Focus" value="Frontend & UI/UX" />
            <InfoRow label="Status" value="Available for work" highlight />
          </div>

          {/* Vintage Ads */}
          <div className="flex justify-center gap-3 mt-6">
            <WantedAd />
            <HireAd />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8">
          {/* Article Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-serif mb-1.5 sm:mb-2 text-balance">
            The Developer Behind the Code
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-600 italic font-serif mb-3 sm:mb-4 lg:mb-6">
            From a small village in Spain to the tech scene of Toronto
          </p>

          {/* Article Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="font-serif text-xs sm:text-sm leading-relaxed space-y-2.5 sm:space-y-3 md:space-y-4">
              <p>
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold float-left mr-1.5 sm:mr-2 leading-none mt-0.5 sm:mt-1">
                  J
                </span>
                ulio Calvo's journey into software development defies conventional
                wisdom. Without a computer science degree or bootcamp certificate,
                he built veraOS—a comprehensive productivity platform with 137
                functional widgets—through pure determination and strategic use
                of modern tools.
              </p>
              <p>
                Originally from a small village of 100 inhabitants near Zaragoza,
                Spain, Calvo made the leap to Toronto to pursue his ambitions in
                tech. After completing his Multimedia Design program at Humber
                College, he dove headfirst into frontend development.
              </p>
              <p className="hidden md:block">
                "I realized that waiting for the perfect moment or the perfect
                credentials was just another form of procrastination," he explains.
                "So I started building. Every day. No excuses."
              </p>
            </div>

            <div>
              {/* Pull Quote */}
              <blockquote className="border-l-2 sm:border-l-4 border-navy pl-3 sm:pl-4 mb-3 sm:mb-4 md:mb-6">
                <p className="text-base sm:text-lg md:text-xl italic font-serif">
                  "I believe in building, not waiting. Every widget is a small
                  rebellion against the idea that you need permission to create."
                </p>
              </blockquote>

              <div className="font-serif text-xs sm:text-sm leading-relaxed space-y-2.5 sm:space-y-3 md:space-y-4">
                <p>
                  His approach combines obsessive attention to detail with a bias
                  toward shipping working software. While others debate frameworks
                  and best practices, Calvo pushes code.
                </p>
                <p className="hidden sm:block">
                  The result speaks for itself: 137 widgets, a complete academic
                  mode with spaced repetition, an AI-powered chat interface, and
                  a modular design system—all built in 12 months.
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <ScrollReveal delay={0.1}>
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-neutral-200">
              <h4 className="text-[10px] sm:text-xs tracking-widest font-bold mb-3 sm:mb-4">
                TECHNICAL PROFICIENCY
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <SkillCategory
                  title="Frontend Development"
                  skills={[
                    { name: 'React.js', level: 'Advanced' },
                    { name: 'JavaScript / ES6+', level: 'Advanced' },
                    { name: 'Tailwind CSS', level: 'Advanced' },
                    { name: 'HTML5 / CSS3', level: 'Advanced' },
                  ]}
                />
                <SkillCategory
                  title="Tools & Platforms"
                  skills={[
                    { name: 'Figma', level: 'Proficient' },
                    { name: 'Git / GitHub', level: 'Proficient' },
                    { name: 'Supabase', level: 'Proficient' },
                    { name: 'Vite', level: 'Proficient' },
                  ]}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Education */}
          <ScrollReveal delay={0.2}>
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-neutral-200">
              <h4 className="text-[10px] sm:text-xs tracking-widest font-bold mb-3 sm:mb-4">
                EDUCATION & BACKGROUND
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
                  <p className="text-[9px] sm:text-xs tracking-widest text-neutral-500 mb-1 sm:mb-2">
                    FORMAL EDUCATION
                  </p>
                  <p className="font-bold font-serif text-sm sm:text-base">Humber College</p>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    Multimedia Design & Development
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    Toronto, Ontario · 2023-2024
                  </p>
                </div>

                <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
                  <p className="text-[9px] sm:text-xs tracking-widest text-neutral-500 mb-1 sm:mb-2">
                    SELF-DIRECTED LEARNING
                  </p>
                  <p className="font-bold font-serif text-sm sm:text-base">veraOS Project</p>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    12 months intensive development
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    137 widgets · React · Full-stack
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* What I'm Looking For */}
          <ScrollReveal delay={0.3}>
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-neutral-200">
              <h4 className="text-[10px] sm:text-xs tracking-widest font-bold mb-3 sm:mb-4">
                WHAT I'M LOOKING FOR
              </h4>

              <div className="bg-neutral-900 text-white p-4 sm:p-6">
                <p className="font-serif leading-relaxed text-sm sm:text-base">
                  I'm seeking a <strong>Frontend Developer</strong> or{' '}
                  <strong>UI/UX Designer</strong> role in Toronto where I can
                  contribute to meaningful products, continue growing as a
                  developer, and work alongside people who care about craft.
                </p>
                <p className="font-serif leading-relaxed mt-3 sm:mt-4 text-neutral-300 text-sm sm:text-base">
                  I thrive in environments that value shipping over perfection,
                  learning by doing, and building things that actually matter.
                </p>
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

function SkillCategory({ title, skills }) {
  return (
    <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
      <p className="text-[9px] sm:text-xs tracking-widest text-neutral-500 mb-2 sm:mb-3">
        {title.toUpperCase()}
      </p>
      <div className="space-y-1.5 sm:space-y-2">
        {skills.map(skill => (
          <div key={skill.name} className="flex justify-between text-xs sm:text-sm">
            <span className="font-serif">{skill.name}</span>
            <span className="text-neutral-500">{skill.level}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About
