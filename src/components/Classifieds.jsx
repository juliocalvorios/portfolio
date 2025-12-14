import Ornament from './ui/Ornament'
import ScrollReveal from './ui/ScrollReveal'

function Classifieds() {
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">Classifieds & Notices</h2>
        </div>
      </ScrollReveal>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">

        {/* Employment Box + Contact */}
        <ScrollReveal delay={0}>
          <div className="border-2 border-neutral-800 p-4 sm:p-6 h-full">
          <h3 className="text-center text-[10px] sm:text-xs tracking-widest font-bold border-b border-neutral-300 pb-2 sm:pb-3 mb-3 sm:mb-4">
            POSITION WANTED
          </h3>
          
          <div className="text-center mb-3 sm:mb-4 font-serif">
            <p className="text-base sm:text-lg font-bold">FRONTEND DEVELOPER</p>
          </div>
          
          <Ornament className="my-3 sm:my-4" />
          
          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-center">
            <p><span className="text-neutral-500">Availability:</span> Immediate</p>
            <p><span className="text-neutral-500">Location:</span> Toronto, ON</p>
            <p><span className="text-neutral-500">Work Permit:</span> Full-time for any CA employer</p>
            <p><span className="text-neutral-500">Remote:</span> Open</p>
          </div>
          
          <Ornament className="my-3 sm:my-4" />
          
          <div className="text-center">
            <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-500 mb-1">
              ELECTRONIC MAIL
            </p>
            <a
              href="mailto:juliocalvorios@gmail.com"
              className="text-sm sm:text-base font-serif hover:underline break-all"
            >
              juliocalvorios@gmail.com
            </a>
          </div>
          
          <a
            href="mailto:juliocalvorios@gmail.com?subject=Job Opportunity - Frontend Developer"
            className="block mt-4 sm:mt-6 px-4 py-3 min-h-[44px] flex items-center justify-center bg-neutral-900 text-white text-[9px] sm:text-[10px] md:text-xs tracking-wider sm:tracking-widest text-center hover:bg-neutral-700 transition-colors"
          >
            SEND INQUIRY →
          </a>
          </div>
        </ScrollReveal>

        {/* Links Box */}
        <ScrollReveal delay={0.1}>
          <div className="border-2 border-neutral-800 p-4 sm:p-6 h-full">
          <h3 className="text-center text-[10px] sm:text-xs tracking-widest font-bold border-b border-neutral-300 pb-2 sm:pb-3 mb-3 sm:mb-4">
            PUBLIC RECORDS
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            <LinkItem 
              label="GitHub Repository"
              sublabel="Source code & contributions"
              href="https://github.com/juliocalvor811-svg"
            />
            <LinkItem
              label="LinkedIn Profile"
              sublabel="Professional history"
              href="https://linkedin.com/in/juliocalvorios"
            />
            <LinkItem 
              label="Resume / CV"
              sublabel="Download PDF"
              href="/resume.pdf"
            />
            <LinkItem
              label="veraOS Live"
              sublabel="Main project demo"
              href="https://veraos.ai"
            />
          </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

function LinkItem({ label, sublabel, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block border-b border-neutral-200 pb-2 sm:pb-3 py-2 min-h-[44px] group"
    >
      <p className="text-[11px] sm:text-xs md:text-sm font-bold font-serif group-hover:underline">
        {label} →
      </p>
      <p className="text-[9px] sm:text-[10px] md:text-xs text-neutral-500">{sublabel}</p>
    </a>
  )
}

export default Classifieds
