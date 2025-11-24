import Ornament from './ui/Ornament'

function Classifieds() {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-serif">Classifieds & Notices</h2>
        <p className="text-neutral-500 italic font-serif mt-1">
          Professional inquiries and opportunities welcome
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Employment Box */}
        <div className="border-2 border-neutral-800 p-6">
          <h3 className="text-center text-xs tracking-widest font-bold border-b border-neutral-300 pb-3 mb-4">
            SEEKING EMPLOYMENT
          </h3>
          
          <div className="text-center mb-4 font-serif">
            <p className="text-lg font-bold">FRONTEND DEVELOPER</p>
            <p className="text-neutral-600">UI/UX Designer</p>
          </div>
          
          <Ornament className="my-4" />
          
          <div className="space-y-2 text-sm text-center">
            <p><span className="text-neutral-500">Availability:</span> Immediate</p>
            <p><span className="text-neutral-500">Location:</span> Toronto, ON</p>
            <p><span className="text-neutral-500">Work Permit:</span> PGWP</p>
            <p><span className="text-neutral-500">Remote:</span> Open to hybrid</p>
          </div>
          
          <Ornament className="my-4" />
          
          <p className="text-xs text-center text-neutral-500 italic">
            Willing to relocate within GTA. Competitive salary expected.
          </p>
        </div>

        {/* Contact Box - Featured */}
        <div className="border-2 border-neutral-800 p-6 bg-neutral-50">
          <h3 className="text-center text-xs tracking-widest font-bold border-b border-neutral-300 pb-3 mb-4">
            DIRECT CORRESPONDENCE
          </h3>
          
          <div className="space-y-6 text-center">
            {/* Email */}
            <div>
              <p className="text-[10px] tracking-widest text-neutral-500 mb-1">
                ELECTRONIC MAIL
              </p>
              <a 
                href="mailto:julio@veraos.ai"
                className="text-lg font-serif hover:underline"
              >
                julio@veraos.ai
              </a>
            </div>
            
            <Ornament />
            
            {/* Location */}
            <div>
              <p className="text-[10px] tracking-widest text-neutral-500 mb-1">
                CURRENT LOCATION
              </p>
              <p className="font-serif">Toronto, Ontario</p>
              <p className="text-sm text-neutral-500">Canada</p>
            </div>
            
            <Ornament />
            
            {/* Response Time */}
            <div>
              <p className="text-[10px] tracking-widest text-neutral-500 mb-1">
                RESPONSE TIME
              </p>
              <p className="font-serif">Within 24 hours</p>
            </div>
          </div>
          
          {/* CTA */}
          <a 
            href="mailto:julio@veraos.ai?subject=Job Opportunity - Frontend Developer"
            className="block mt-6 px-4 py-3 bg-neutral-900 text-white text-xs tracking-widest text-center hover:bg-neutral-700 transition-colors"
          >
            SEND INQUIRY →
          </a>
        </div>

        {/* Links Box */}
        <div className="border-2 border-neutral-800 p-6">
          <h3 className="text-center text-xs tracking-widest font-bold border-b border-neutral-300 pb-3 mb-4">
            PUBLIC RECORDS
          </h3>
          
          <div className="space-y-4">
            <LinkItem 
              label="GitHub Repository"
              sublabel="Source code & contributions"
              href="https://github.com/juliocalvor811-svg"
            />
            <LinkItem 
              label="LinkedIn Profile"
              sublabel="Professional history"
              href="https://linkedin.com/in/juliocalvo"
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
      </div>

      {/* Bottom Notice */}
      <div className="mt-12 border-t-2 border-b-2 border-neutral-800 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xs tracking-widest font-bold mb-4">
            A NOTE TO RECRUITERS & HIRING MANAGERS
          </h3>
          <p className="font-serif text-neutral-600 leading-relaxed">
            Thank you for taking the time to review my work. I understand that 
            hiring is a significant investment, and I appreciate the consideration. 
            I'm genuinely excited about the opportunity to contribute to a team 
            that values craftsmanship and continuous learning.
          </p>
          <p className="font-serif text-neutral-600 leading-relaxed mt-4">
            If you see potential in my work, I'd love to discuss how I can bring 
            value to your team. I'm happy to complete technical assessments, 
            participate in pair programming sessions, or have a conversation 
            about your product challenges.
          </p>
          <Ornament className="my-6" />
          <p className="text-sm font-serif italic">
            "The best way to predict the future is to build it."
          </p>
        </div>
      </div>

      {/* Additional Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Ideal Role */}
        <div className="border border-neutral-300 p-6">
          <h4 className="text-xs tracking-widest font-bold mb-4">
            IDEAL ROLE CHARACTERISTICS
          </h4>
          <ul className="space-y-2 text-sm font-serif">
            <ListItem text="Product-focused team that ships regularly" />
            <ListItem text="Opportunity to grow frontend & design skills" />
            <ListItem text="Mentorship from senior developers" />
            <ListItem text="Modern tech stack (React, TypeScript)" />
            <ListItem text="Collaborative, low-ego environment" />
            <ListItem text="Work that impacts real users" />
          </ul>
        </div>

        {/* What I Bring */}
        <div className="border border-neutral-300 p-6">
          <h4 className="text-xs tracking-widest font-bold mb-4">
            WHAT I BRING TO THE TABLE
          </h4>
          <ul className="space-y-2 text-sm font-serif">
            <ListItem text="Strong bias toward action and shipping" />
            <ListItem text="Self-directed learning ability (proof: veraOS)" />
            <ListItem text="Eye for design and user experience" />
            <ListItem text="Clean, maintainable code practices" />
            <ListItem text="Genuine enthusiasm for the craft" />
            <ListItem text="No ego, ready to learn from everyone" />
          </ul>
        </div>
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
      className="block border-b border-neutral-200 pb-3 group"
    >
      <p className="text-sm font-bold font-serif group-hover:underline">
        {label} →
      </p>
      <p className="text-xs text-neutral-500">{sublabel}</p>
    </a>
  )
}

function ListItem({ text }) {
  return (
    <li className="flex items-start gap-2">
      <span className="w-1.5 h-1.5 bg-neutral-400 rotate-45 mt-1.5 shrink-0" />
      <span>{text}</span>
    </li>
  )
}

export default Classifieds
