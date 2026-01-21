/**
 * NYT-style Advertisement Banners
 * Simulates real newspaper ads for a creative portfolio experience
 */

// Top banner ad - appears above masthead (only on The Developer section)
export function TopBanner() {
  return (
    <div className="bg-neutral-100 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3">
        <div className="flex items-center justify-center gap-2 sm:gap-4 pl-8 sm:pl-16 md:pl-24">
          <span className="text-[8px] sm:text-[9px] tracking-widest text-neutral-400 uppercase">
            Advertisement
          </span>
          <div className="h-px w-8 sm:w-12 bg-neutral-300" />
          <a
            href="mailto:julio@veraos.ai?subject=Job Opportunity - Frontend Developer"
            className="group flex items-center gap-2 sm:gap-3"
          >
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
              HIRE THIS DEVELOPER
            </span>
            <span className="text-[9px] sm:text-[10px] text-neutral-400 hidden sm:inline">
              — Available for Frontend roles in Toronto
            </span>
            <span className="text-[10px] sm:text-xs text-neutral-500 group-hover:text-neutral-700 transition-colors">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

// Mid-content ad strip - appears between sections
export function AdStrip({ variant = 'default' }) {
  const ads = {
    default: {
      label: 'PAID POST',
      sponsor: 'From Julio Calvo Studios',
      headline: 'Clean Code. Creative Solutions. On Time.',
      cta: 'View Portfolio',
      link: '#'
    },
    hiring: {
      label: 'SPONSORED',
      sponsor: 'Career Opportunities',
      headline: 'Looking for a developer who ships? You found him.',
      cta: 'Get in Touch',
      link: 'mailto:julio@veraos.ai'
    },
    project: {
      label: 'FEATURED',
      sponsor: 'veraOS',
      headline: 'The future of productivity. Built with React.',
      cta: 'Explore',
      link: 'https://veraos.ai'
    }
  }

  const ad = ads[variant] || ads.default

  return (
    <div className="my-8 sm:my-12 py-6 sm:py-8 border-y border-neutral-200 bg-gradient-to-r from-neutral-50 via-white to-neutral-50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* Ad Label */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-8 bg-neutral-300" />
          <span className="text-[9px] tracking-[0.2em] text-neutral-400 uppercase">
            {ad.label}
          </span>
          <div className="h-px w-8 bg-neutral-300" />
        </div>

        {/* Sponsor */}
        <p className="text-[10px] sm:text-xs tracking-widest text-neutral-500 mb-2 uppercase">
          {ad.sponsor}
        </p>

        {/* Headline */}
        <h3
          className="text-lg sm:text-xl md:text-2xl font-serif font-medium text-neutral-800 mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {ad.headline}
        </h3>

        {/* CTA */}
        <a
          href={ad.link}
          className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-wider uppercase text-neutral-600 hover:text-neutral-900 transition-colors group"
        >
          <span className="border-b border-neutral-400 group-hover:border-neutral-900 pb-0.5">
            {ad.cta}
          </span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  )
}

// Sidebar ad module - small box ad
export function SidebarAd({ type = 'hiring' }) {
  const ads = {
    hiring: {
      badge: 'NOW HIRING',
      title: 'Frontend Developer',
      subtitle: 'Your company here?',
      description: 'I build fast, accessible, beautiful interfaces.',
      cta: 'Contact',
      link: 'mailto:julio@veraos.ai',
      accent: true
    },
    newsletter: {
      badge: 'SUBSCRIBE',
      title: 'The Daily Ship',
      subtitle: 'Weekly insights',
      description: 'Code tips, project updates, and industry thoughts.',
      cta: 'Coming Soon',
      link: '#',
      accent: false
    },
    veraos: {
      badge: 'SPONSOR',
      title: 'veraOS',
      subtitle: 'by Julio Calvo',
      description: 'A complete productivity operating system.',
      cta: 'Learn More',
      link: 'https://veraos.ai',
      accent: false
    }
  }

  const ad = ads[type] || ads.hiring

  return (
    <div className={`p-4 border ${ad.accent ? 'border-neutral-800 bg-neutral-50' : 'border-neutral-200'}`}>
      {/* Badge */}
      <div className={`inline-block px-2 py-0.5 text-[8px] tracking-widest mb-3 ${
        ad.accent
          ? 'bg-neutral-800 text-white'
          : 'bg-neutral-100 text-neutral-600'
      }`}>
        {ad.badge}
      </div>

      {/* Title */}
      <h4 className="text-sm font-bold font-serif mb-0.5">{ad.title}</h4>
      <p className="text-[10px] text-neutral-500 mb-2">{ad.subtitle}</p>

      {/* Description */}
      <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
        {ad.description}
      </p>

      {/* CTA */}
      <a
        href={ad.link}
        className={`inline-block text-[10px] tracking-wider uppercase transition-colors ${
          ad.accent
            ? 'text-neutral-800 hover:text-neutral-600 font-bold'
            : 'text-neutral-500 hover:text-neutral-800'
        }`}
      >
        {ad.cta} →
      </a>
    </div>
  )
}

// Classifieds-style mini ads grid
export function ClassifiedsAds() {
  const classifieds = [
    {
      category: 'SERVICES',
      title: 'Web Development',
      text: 'React, Next.js, Tailwind. Fast delivery. julio@veraos.ai'
    },
    {
      category: 'FOR HIRE',
      title: 'Frontend Developer',
      text: 'React expert. Clean interfaces. Portfolio available.'
    },
    {
      category: 'PROJECTS',
      title: 'Open Source',
      text: 'Contributing to the community. Check GitHub.'
    },
    {
      category: 'WANTED',
      title: 'Interesting Problems',
      text: 'Complex challenges welcome. Let\'s build something great.'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 bg-neutral-50 border border-neutral-200">
      <div className="col-span-2 md:col-span-4 mb-2">
        <h4 className="text-[10px] tracking-widest text-neutral-500 uppercase text-center">
          — Classified Advertisements —
        </h4>
      </div>
      {classifieds.map((ad, i) => (
        <div key={i} className="text-center p-2">
          <span className="text-[8px] tracking-wider text-neutral-400 uppercase block mb-1">
            {ad.category}
          </span>
          <h5 className="text-xs font-bold mb-1">{ad.title}</h5>
          <p className="text-[10px] text-neutral-500 leading-tight">{ad.text}</p>
        </div>
      ))}
    </div>
  )
}

export default { TopBanner, AdStrip, SidebarAd, ClassifiedsAds }
