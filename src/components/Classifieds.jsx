import Ornament from './ui/Ornament'
import ScrollReveal from './ui/ScrollReveal'
import InkRipple from './ui/InkRipple'

function Classifieds() {
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">Classifieds & Notices</h2>
          <p className="text-neutral-500 italic font-serif mt-1 text-xs sm:text-sm md:text-base">
            Professional inquiries and opportunities welcome
          </p>
        </div>
      </ScrollReveal>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

        {/* Employment Box */}
        <ScrollReveal delay={0}>
          <div className="border-2 border-neutral-800 p-4 sm:p-6">
          <h3 className="text-center text-[10px] sm:text-xs tracking-widest font-bold border-b border-neutral-300 pb-2 sm:pb-3 mb-3 sm:mb-4">
            POSITION WANTED
          </h3>
          
          <div className="text-center mb-3 sm:mb-4 font-serif">
            <p className="text-base sm:text-lg font-bold">FRONTEND DEVELOPER</p>
            <p className="text-neutral-600 text-sm sm:text-base">UI/UX Designer</p>
          </div>
          
          <Ornament className="my-3 sm:my-4" />
          
          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-center">
            <p><span className="text-neutral-500">Availability:</span> Immediate</p>
            <p><span className="text-neutral-500">Location:</span> Toronto, ON</p>
            <p><span className="text-neutral-500">Work Permit:</span> PGWP</p>
            <p><span className="text-neutral-500">Remote:</span> Open to hybrid</p>
          </div>
          
          <Ornament className="my-3 sm:my-4" />
          
          <p className="text-[10px] sm:text-xs text-center text-neutral-500 italic">
            Willing to relocate within GTA.
          </p>
          </div>
        </ScrollReveal>

        {/* Contact Box - Featured */}
        <ScrollReveal delay={0.1}>
          <InkRipple>
            <div className="border-2 border-neutral-800 p-4 sm:p-6 bg-neutral-50">
          <h3 className="text-center text-[10px] sm:text-xs tracking-widest font-bold border-b border-neutral-300 pb-2 sm:pb-3 mb-3 sm:mb-4">
            DIRECT CORRESPONDENCE
          </h3>
          
          <div className="space-y-4 sm:space-y-6 text-center">
            {/* Email */}
            <div>
              <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-500 mb-1">
                ELECTRONIC MAIL
              </p>
              <a
                href="mailto:juliocalvorios@gmail.com"
                className="text-base sm:text-lg font-serif hover:underline break-all"
              >
                juliocalvorios@gmail.com
              </a>
            </div>
            
            <Ornament />
            
            {/* Location */}
            <div>
              <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-500 mb-1">
                CURRENT LOCATION
              </p>
              <p className="font-serif text-sm sm:text-base">Toronto, Ontario</p>
              <p className="text-xs sm:text-sm text-neutral-500">Canada</p>
            </div>
            
            <Ornament />
            
            {/* Response Time */}
            <div>
              <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-500 mb-1">
                RESPONSE TIME
              </p>
              <p className="font-serif text-sm sm:text-base">Within 24 hours</p>
            </div>
          </div>
          
          {/* CTA */}
          <a
            href="mailto:juliocalvorios@gmail.com?subject=Job Opportunity - Frontend Developer"
            className="block mt-4 sm:mt-6 px-4 py-3 min-h-[44px] flex items-center justify-center bg-neutral-900 text-white text-[9px] sm:text-[10px] md:text-xs tracking-wider sm:tracking-widest text-center hover:bg-neutral-700 transition-colors"
          >
            SEND INQUIRY →
          </a>
            </div>
          </InkRipple>
        </ScrollReveal>

        {/* Links Box */}
        <ScrollReveal delay={0.2}>
          <div className="border-2 border-neutral-800 p-4 sm:p-6">
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

      {/* Bottom Notice */}
      <ScrollReveal delay={0.1}>
        <div className="mt-8 sm:mt-12 border-t-2 border-b-2 border-neutral-800 py-6 sm:py-8">
          <div className="max-w-2xl mx-auto text-center px-4">
            <h3 className="text-[10px] sm:text-xs tracking-widest font-bold mb-3 sm:mb-4">
              A NOTE TO RECRUITERS & HIRING MANAGERS
            </h3>
            <p className="font-serif text-neutral-600 leading-relaxed text-sm sm:text-base">
              Thank you for taking the time to review my work. I understand that
              hiring is a significant investment, and I appreciate the consideration.
              I'm genuinely excited about the opportunity to contribute to a team
              that values craftsmanship and continuous learning.
            </p>
            <p className="font-serif text-neutral-600 leading-relaxed mt-3 sm:mt-4 text-sm sm:text-base hidden sm:block">
              If you see potential in my work, I'd love to discuss how I can bring
              value to your team. I'm happy to complete technical assessments,
              participate in pair programming sessions, or have a conversation
              about your product challenges.
            </p>
            <Ornament className="my-4 sm:my-6" />
            <p className="text-xs sm:text-sm font-serif italic">
              "The best way to predict the future is to build it."
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Additional Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
        {/* Ideal Role */}
        <ScrollReveal delay={0}>
          <div className="border border-neutral-300 p-4 sm:p-6">
            <h4 className="text-[10px] sm:text-xs tracking-widest font-bold mb-3 sm:mb-4">
              IDEAL ROLE CHARACTERISTICS
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-serif">
              <ListItem text="Product-focused team that ships regularly" />
              <ListItem text="Opportunity to grow frontend & design skills" />
              <ListItem text="Mentorship from senior developers" />
              <ListItem text="Modern tech stack (React, TypeScript)" />
              <ListItem text="Collaborative, low-ego environment" />
              <ListItem text="Work that impacts real users" />
            </ul>
          </div>
        </ScrollReveal>

        {/* What I Bring */}
        <ScrollReveal delay={0.1}>
          <div className="border border-neutral-300 p-4 sm:p-6">
            <h4 className="text-[10px] sm:text-xs tracking-widest font-bold mb-3 sm:mb-4">
              WHAT I BRING TO THE TABLE
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-serif">
              <ListItem text="Strong bias toward action and shipping" />
              <ListItem text="Self-directed learning ability (proof: veraOS)" />
              <ListItem text="Eye for design and user experience" />
              <ListItem text="Clean, maintainable code practices" />
              <ListItem text="Genuine enthusiasm for the craft" />
              <ListItem text="No ego, ready to learn from everyone" />
            </ul>
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

function ListItem({ text }) {
  return (
    <li className="flex items-start gap-2">
      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-neutral-400 rotate-45 mt-1.5 shrink-0" />
      <span>{text}</span>
    </li>
  )
}

export default Classifieds
