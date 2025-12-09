const projects = [
  {
    id: 1,
    // Card Preview Data
    title: 'veraOS: Building a Full-Stack Productivity Platform from Scratch',
    subtitle: 'Drag-and-drop widgets, interactive highlights, real-time chat, and a library system — all integrated with AI',
    name: 'veraOS',
    category: 'FULLSTACK · AI INTEGRATION',
    type: 'Full-Stack Product',
    year: '2025',
    content: `What started as a project to learn how to truly integrate AI into a product 
      became a full productivity platform. Not just calling an API — building features 
      where AI understands your notes, flashcards, and schedule to give contextual answers.`,
    fullContent: `veraOS is an AI-powered productivity platform featuring a drag-and-drop widget 
      dashboard, interactive chat with semantic highlighting, a library system with folders 
      and search, and academic tools with spaced repetition. Built over 12 months as a way 
      to learn modern frontend development and AI integration.`,
    pullQuote: '"The best way to learn frontend is to build something too ambitious and figure it out."',
    tech: {
      languages: [
        { name: 'JavaScript', percentage: 80.7 },
        { name: 'HTML', percentage: 10.6 },
        { name: 'TypeScript', percentage: 6.5 },
        { name: 'PLpgSQL', percentage: 2.2 },
      ],
      backend: ['Supabase', 'Edge Functions', 'Stripe'],
      ai: ['6 LLM Providers', 'Embeddings Server']
    },
    features: [
      '100K+ lines codebase',
      'Interactive Highlight System',
      'Drag-and-Drop Widgets',
      'Chat Library with Folders',
      'Real-time Streaming',
      'Flashcards with Spaced Repetition'
    ],
    links: {
      live: 'https://veraos.ai',
      github: 'https://github.com/juliocalvorios/veraos',
      npm: 'https://npmjs.com/package/react-ai-highlight-parser'
    },

    // Full Article Data
    date: 'January 2025',
    readTime: '10',
    image: '/images/veraOS-project/vera-interface.png',
    imageCaption: 'The veraOS dashboard with customizable widgets and AI chat integration.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '12 months',
    role: 'Solo Developer & Designer',

    lede: `veraOS started with a simple question: how do you actually build a product where AI isn't just a chatbot, but something deeply integrated into the experience? Not just "call the OpenAI API and display the response" — but AI that understands your data, responds in context, and enhances the interface itself. Twelve months later, the answer is a full productivity platform with drag-and-drop widgets, interactive highlights, a library system, and academic tools. This is what I learned building it.`,

    bodyParagraphs: [
      {
        type: 'subheading',
        content: 'The Interactive Highlight System'
      },
      {
        type: 'text',
        content: 'Most AI chat interfaces just render text. veraOS does something different: as the AI responds, it applies semantic highlighting in real-time. Users can choose between color highlights, underlines, or both — with customizable palettes that update instantly. This wasn\'t a simple CSS trick. It required building a token-based parser that processes the AI\'s response stream, identifies highlight codes, handles nested formatting, protects code blocks from being highlighted, and cleans up malformed tags without breaking the content. The parser is available as an open source npm package: react-ai-highlight-parser.'
      },
      {
        type: 'list',
        items: [
          'Token parser that handles nested highlight tags correctly',
          'Real-time application during streaming responses',
          'Multiple modes: highlights only, underlines only, or both combined',
          'Customizable color palettes that apply instantly',
          'Code block protection — syntax highlighting isn\'t affected',
          'Graceful handling of malformed or orphaned tags'
        ]
      },
      {
        type: 'highlight-showcase',
        caption: 'Live demonstration: The highlight system cycles through modes (highlights, underline, both) and palettes (vibrant, natural) — exactly as implemented in veraOS.'
      },
      {
        type: 'pullquote',
        content: 'The highlight system taught me that the best features often live at the intersection of backend logic and frontend polish.',
        attribution: 'Development Reflection'
      },
      {
        type: 'subheading',
        content: 'Drag-and-Drop Widget Dashboard'
      },
      {
        type: 'text',
        content: 'The main interface is a customizable dashboard inspired by Notion and Linear. Users can add widgets — pomodoro timer, flashcards, study goals, focus zone, schedule — and arrange them freely. Dragging a widget shows visual feedback, other widgets shift to make room, and layouts persist across sessions. Each widget is completely independent with its own state, but they can communicate through a shared context when needed.'
      },
      {
        type: 'text',
        content: 'The technical challenge was making this feel smooth. Collision detection runs on every drag frame — I used spatial hashing to keep it O(n) instead of O(n²). Widgets respond to resize events through ResizeObserver, adapting their internal layouts. The whole system lazy-loads: widgets only mount when added, reducing the initial bundle by over 400KB.'
      },
      {
        type: 'video',
        src: '/videos/veraOS-Project/Drag-Drop-Widgets-Video.mp4',
        caption: 'Widgets can be dragged, resized, and customized. Layouts persist per user.'
      },
      {
        type: 'subheading',
        content: 'Chat Library with Folders'
      },
      {
        type: 'text',
        content: 'Every chat is saved to a library that works like a file manager. Users can create folders (and subfolders), drag chats between them, pin favorites, search across all conversations, and archive old ones. This sounds simple until you implement it: optimistic updates that revert on failure, real-time sync with Supabase, undo/redo history that persists to the database, and a UI that feels instant even when network requests are in flight.'
      },
      {
        type: 'list',
        items: [
          'Nested folder structure with drag-and-drop organization',
          'Optimistic UI updates with automatic rollback on failure',
          'Undo/redo history persisted to Supabase — survives page refresh',
          'Full-text search across all chats and folders',
          'Pin, favorite, and archive functionality',
          'Tier-based limits with clear upgrade prompts'
        ]
      },
      {
        type: 'video',
        src: '/videos/veraOS-Project/libraryinterfacevideo.mp4',
        caption: 'The library system: folders, drag-and-drop, search, and real-time sync.'
      },
      {
        type: 'subheading',
        content: 'Academic Mode: AI That Knows Your Data'
      },
      {
        type: 'text',
        content: 'This is where the AI integration gets interesting. In Academic Mode, the AI doesn\'t just answer questions — it has context from your widgets. Ask "what should I study today?" and it checks your flashcards due for review, your upcoming exams in the schedule widget, and your study goals. The response isn\'t generic advice; it\'s specific to your data.'
      },
      {
        type: 'text',
        content: 'Under the hood, this uses embeddings. When you ask a question, the system generates a vector representation and compares it against pre-computed embeddings for each widget type. Only relevant widgets get queried for their data, keeping the context focused and the token count reasonable. The embedding model runs on a Render server — moving this computation off the client was necessary for performance.'
      },
      {
        type: 'pullquote',
        content: 'Academic Mode isn\'t "AI plus widgets." It\'s AI that understands widgets. That difference took months to get right.',
        attribution: 'Architecture Decision'
      },
      {
        type: 'academic-flow',
        caption: 'Interactive demo: Watch how user queries flow through the embedding system to generate contextual responses.'
      },
      {
        type: 'subheading',
        content: 'Upgrade Plans & Internationalization'
      },
      {
        type: 'text',
        content: 'veraOS offers tiered subscription plans integrated with Stripe: Free, Pro, Student, and Annual. The upgrade flow includes animated pricing cards and seamless checkout. The entire app supports English, Spanish, French, and German through i18next, with all UI elements adapting when you switch languages.'
      },
      {
        type: 'video',
        src: '/videos/veraOS-Project/settings-upgrade.mp4',
        caption: 'Settings panel with upgrade flow, Stripe integration, and language switching.'
      },
      {
        type: 'subheading',
        content: 'Flashcards with Study Sessions'
      },
      {
        type: 'text',
        content: 'The flashcard widget implements spaced repetition using the SM-2 algorithm. But beyond the algorithm, the UX required careful thought: study sessions that can be paused and resumed (with time tracking), flip animations that feel tactile, progress indicators that motivate without overwhelming, and an expanded view for serious study sessions with full keyboard navigation.'
      },
      {
        type: 'text',
        content: 'Study session state persists to localStorage, so closing the browser mid-session doesn\'t lose progress. Color palettes can be migrated between themes automatically — if you switch from "vibrant" to "natural" colors, your deck colors translate to the new palette rather than looking wrong.'
      },
      {
        type: 'video',
        src: '/videos/veraOS-Project/flashcards-widget-video.mp4',
        caption: 'Flashcards in action: spaced repetition, study sessions, flip animations, and progress tracking.'
      },

      {
        type: 'subheading',
        content: 'Technical Architecture'
      },
      {
        type: 'text',
        content: 'The app uses five React Contexts with clear separation: WidgetsContext for layout positions, WidgetDataContext for widget state, ThemeContext for appearance, SubscriptionContext for tier limits, and ExpandedWidgetContext for modal state. This isn\'t over-engineering — it\'s what happens when you actually need to share state across a complex app without prop drilling into madness.'
      },
      {
        type: 'text',
        content: 'The animated circle in the center of the dashboard uses Three.js with Simplex Noise for organic movement. It responds to user interactions and system state — pulsing faster during AI responses, changing color based on the active theme. This detail cost days to get right, but it\'s what makes the interface feel alive rather than static.'
      },
      {
        type: 'text',
        content: 'For AI-powered features, I built a separate embeddings server on Render running the paraphrase-multilingual-MiniLM-L12-v2 model. Originally I tried running transformers.js in the browser, but 25MB of downloads for each user was unacceptable. Moving this to a dedicated server reduced client-side overhead to zero while keeping embedding generation fast (~50ms per query).'
      },
      {
        type: 'list',
        items: [
          'Multi-provider AI routing across OpenAI, Claude, Gemini, Groq, Mistral, and Scaleway — with automatic fallbacks and region-aware routing for EU compliance',
          'Supabase for auth, PostgreSQL database, real-time subscriptions, and file storage',
          'Stripe integration for subscriptions with webhook handling and tier-based feature gating',
          'Custom embeddings server on Render (MiniLM-L12-v2, 384 dimensions)',
          'Three.js + Simplex Noise for the animated central circle',
          'AES-256-GCM encryption for sensitive message data (client-side)',
          'i18next for internationalization (English, Spanish, French, German)',
          'DOMPurify for XSS protection on all user-generated content',
          'Lazy loading for all widgets and modals (400KB bundle reduction)',
          '20+ Supabase Edge Functions as secure API proxies'
        ]
      },
      {
        type: 'tech-stack',
        caption: 'Interactive architecture diagram: Hover over nodes to see details, watch data flow between services.'
      },
      {
        type: 'subheading',
        content: 'What This Project Taught Me'
      },
      {
        type: 'text',
        content: 'Building veraOS taught me that production code is fundamentally different from tutorial code. Tutorials show you how to make something work. Production requires thinking about what happens when it doesn\'t work — network failures, malformed data, user mistakes, edge cases. Every feature in veraOS has error handling, loading states, and fallback behavior. That\'s not paranoia; it\'s professionalism.'
      },
      {
        type: 'text',
        content: 'More importantly, I learned how to work effectively with AI tools. Not as a crutch, but as a collaborator. I can look at any part of this codebase and explain why it works, modify it confidently, and debug it when it breaks. The AI accelerated my learning; it didn\'t replace it.'
      },
      {
        type: 'pullquote',
        content: 'Using AI to build made me better at building. That\'s the skill that matters now.',
        attribution: 'Final Reflection'
      }
    ],

    technicalDetails: [
      {
        title: 'Frontend Stack',
        description: 'React 18 + Vite 7, TypeScript for critical paths, Tailwind CSS for styling, Framer Motion for animations. Three.js powers the animated circle with Simplex Noise.'
      },
      {
        title: 'AI Infrastructure',
        description: 'Groq API for LLM inference (sub-second responses). Custom embeddings server on Render using MiniLM-L12-v2 (384 dimensions). Replaced 25MB transformers.js with 0-byte client overhead.'
      },
      {
        title: 'Data Layer',
        description: 'Supabase for auth, PostgreSQL, real-time sync, and storage. AES-256-GCM client-side encryption. Optimistic updates with rollback. Debounced writes with change detection.'
      },
      {
        title: 'Widget System',
        description: 'Drag-and-drop with O(n) collision detection via spatial hashing. ResizeObserver for responsive layouts. 10+ lazy-loaded widgets (400KB bundle reduction).'
      },
      {
        title: 'Highlight Parser',
        description: 'Token-based streaming parser published as npm package (react-ai-highlight-parser). Handles nested tags, protects code blocks, cleans malformed markup.'
      },
      {
        title: 'Security',
        description: 'DOMPurify for XSS protection. Magic byte file validation. Path traversal prevention. Incognito mode for zero-persistence chats.'
      }
    ],

    conclusion: 'veraOS isn\'t just a portfolio project — it\'s proof that modern development looks different than it did five years ago. AI tools are part of the workflow now. The question isn\'t whether to use them, but how to use them well. Twelve months of building this platform taught me React deeply, exposed me to real architectural decisions, and showed me what it takes to ship something that works reliably. That\'s the experience I\'m bringing to my next role.'
  },
  {
    id: 2,
    // Card Preview Data
    title: 'Ontario Flag Time Machine: Where Vexillology Meets Vintage Tech',
    subtitle: 'An interactive journey through 260 years of Ontario\'s flag history with retro hardware aesthetics',
    name: 'Flag Time Machine',
    category: 'FRONTEND · CANADIAN HISTORY',
    type: 'Interactive Experience',
    year: '2025',
    content: `What if exploring history felt like operating a vintage piece of equipment?
      This time machine lets you travel from 1763 to today, watching Ontario's flag evolve
      through colonial rule, confederation, and provincial identity — all through brass
      levers, nixie tube displays, and toggle switches.`,
    fullContent: `An interactive web experience built with Next.js and TypeScript that visualizes
      the evolution of Ontario's flag from 1763 to present day. Features a vintage control panel
      aesthetic with functional brass levers, glowing nixie tube year displays, and historically
      accurate flag renderings for each era.`,
    pullQuote: '"The best interfaces don\'t feel like interfaces. They feel like instruments."',
    tech: {
      languages: [
        { name: 'TypeScript', percentage: 85 },
        { name: 'CSS', percentage: 15 }
      ],
      frontend: ['Next.js 14', 'React 18', 'Tailwind CSS'],
      tools: ['SVG Rendering', 'CSS Animations', 'Custom Hooks', 'Jest', 'Playwright']
    },
    features: [
      'Vintage Control Panel UI',
      'Nixie Tube Year Display',
      'Historical Flag Accuracy',
      'Keyboard Navigation',
      'PNG/SVG Export',
      'Jest + Playwright Testing'
    ],
    links: {
      live: 'https://ontario-flag.juliocalvo.dev',
      github: 'https://github.com/juliocalvorios/ontario-flag-time-machine'
    },

    // Full Article Data
    date: 'December 2025',
    readTime: '8',
    video: '/videos/Ontario-Machine-Flag-project/Ontario-Flag.mp4',
    videoCaption: 'The Ontario Flag Time Machine interface with brass controls and nixie tube display.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '2 weeks',
    role: 'Solo Developer & Designer',

    lede: `Most history websites present information like textbooks — walls of text, maybe a timeline, definitely boring. I wanted to build something different: an experience where exploring Ontario's flag history felt like operating a piece of vintage laboratory equipment. Brass levers you actually drag. Nixie tubes that glow orange as years tick by. Toggle switches with satisfying clicks. The result is a time machine that spans 260 years of Canadian history, from British colonial rule to the present day.`,

    bodyParagraphs: [
      {
        type: 'subheading',
        content: 'The Vintage Hardware Aesthetic'
      },
      {
        type: 'text',
        content: 'The interface draws inspiration from 1960s scientific instruments — the kind you\'d find in a physics lab or radio station. Every element reinforces this theme: the bakelite panel backgrounds with subtle noise textures, brass fixtures that catch the light with CSS gradients, indicator LEDs that glow with actual blur filters, and engraved plate labels in monospace uppercase. The attention to material authenticity makes the digital feel physical.'
      },
      {
        type: 'list',
        items: [
          'Bakelite-textured panels with SVG noise overlays at 3% opacity',
          'Brass gradients using 4-stop linear gradients (#e8d4b0 → #d4b896 → #c9a86c → #8b7355)',
          'LED indicators with feGaussianBlur SVG filters for authentic glow',
          'JetBrains Mono for plate labels — monospace uppercase with 0.15em letter-spacing',
          'Inset box-shadows simulating panel depth and worn edges'
        ]
      },
      {
        type: 'year-lever-demo',
        caption: 'Drag the brass lever to navigate through 260 years. The lever snaps to key historical years like 1867 (Confederation) and 1965 (flag adoption).'
      },
      {
        type: 'pullquote',
        content: 'The best interfaces don\'t feel like interfaces. They feel like instruments.',
        attribution: 'Design Philosophy'
      },
      {
        type: 'subheading',
        content: 'Nixie Tube Display: Typography That Glows'
      },
      {
        type: 'text',
        content: 'The year display uses the nixie tube aesthetic — those vacuum tubes from the 1950s-70s where digits glow orange behind glass. In CSS, this required layered effects: the base text in #ff6b35, a Gaussian blur filter creating the glow halo, and a subtle radial gradient simulating the glass tube curvature. Each digit sits in its own "tube" container with dark backgrounds and brass bezels.'
      },
      {
        type: 'nixie-demo',
        caption: 'Interactive demonstration: Click year buttons or use arrow keys to navigate. Watch the nixie tubes glow with authentic orange cathode effects.'
      },
      {
        type: 'subheading',
        content: 'Toggle Switches: State with Physicality'
      },
      {
        type: 'text',
        content: 'The Union Jack and Shield toggles use a vintage switch design. Each switch has a brass toggle that slides in a recessed track, with embossed grip lines for visual texture. When toggled, the LED indicator above glows green (on) or stays dark (off). The switch state affects the flag render in real-time — toggle off the Union Jack and the canton disappears, revealing what a modified ensign might have looked like.'
      },
      {
        type: 'vintage-switch-demo',
        caption: 'Toggle the Union Jack and Shield elements on/off. LED indicators provide immediate visual feedback.'
      },
      {
        type: 'subheading',
        content: 'Historical Accuracy: 8 Distinct Eras'
      },
      {
        type: 'text',
        content: 'Ontario\'s flag history is more complex than most people realize. Before the current flag (adopted in 1965), the province used variations of the Canadian Red Ensign — itself evolving through multiple versions as Canada\'s coat of arms changed in 1868, 1922, and 1957. Go back further and you reach Upper Canada (1791-1867), and before that, British colonial administration under the Royal Proclamation of 1763.'
      },
      {
        type: 'era-timeline',
        caption: 'Interactive timeline: Click any era to jump directly to that period and see the corresponding flag.'
      },
      {
        type: 'list',
        items: [
          '1763-1791: British Colonial Period — Union Jack flies over the new Province of Quebec',
          '1791-1867: Upper Canada Era — Constitutional Act creates distinct province',
          '1867: Confederation — Ontario becomes founding province of Canada',
          '1868-1921: First Red Ensign — Original Canadian coat of arms on red field',
          '1922-1956: Updated Red Ensign — Revised arms with new provincial shields',
          '1957-1964: Final Red Ensign — Simplified maple leaf design',
          '1965: The Vote — Ontario officially adopts its own provincial flag',
          '1965-Present: Current Flag — Red Ensign with Ontario shield'
        ]
      },
      {
        type: 'text',
        content: 'Each era shows the historically accurate flag rendered in SVG for crisp scaling at any resolution — with proper heraldic proportions, correct Union Jack counterchanging, and appropriate weathering based on the selected texture mode. Users can cycle through color palettes and toggle between "solid" and "aged" textures to simulate historical artifacts.'
      },
      {
        type: 'subheading',
        content: 'Keyboard Navigation: Power User Experience'
      },
      {
        type: 'text',
        content: 'Every control in the interface is accessible via keyboard. Arrow keys move through years (shift for decades), up/down arrows jump between historical eras. Home and End jump to 1763 and present day. Letter keys toggle interface elements: U for Union Jack, S for shield, P for palette, T for texture. Press ? to see all shortcuts in a modal. This makes the experience accessible and efficient for repeated exploration.'
      },
      {
        type: 'keyboard-map',
        caption: 'Full keyboard shortcut reference. Every control is accessible without a mouse.'
      },
      {
        type: 'list-with-image',
        items: [
          '← → : Navigate years (±1 year)',
          'Shift + ← → : Navigate decades (±10 years)',
          '↑ ↓ : Jump to next/previous historical era',
          'Home / End : Jump to 1763 or 2025',
          'U : Toggle Union Jack visibility',
          'S : Toggle Shield visibility',
          'P : Cycle through color palettes',
          'T : Toggle texture mode (solid/aged)',
          '? : Show keyboard shortcuts help'
        ],
        image: '/images/Ontario-Flag/Keyboard-Shortcuts.png',
        imageAlt: 'Keyboard shortcuts visual reference'
      },
      {
        type: 'subheading',
        content: 'Export System: PNG & SVG Downloads'
      },
      {
        type: 'text',
        content: 'Any flag configuration can be downloaded as PNG or SVG. The export preserves the current year\'s flag design, selected color palette, and texture mode. Filenames are automatically generated with the year and era (e.g., "ontario-flag-1965-adoption.png") for easy organization. The PNG export uses Canvas API for rasterization at 2x resolution for retina displays; SVG exports the raw vector for infinite scaling.'
      },
      {
        type: 'export-demo',
        caption: 'Download any flag configuration as PNG (raster) or SVG (vector). Filenames include year and era automatically.'
      },
      {
        type: 'subheading',
        content: 'Technical Architecture'
      },
      {
        type: 'text',
        content: 'The project is built with Next.js 14 and TypeScript in strict mode, using the App Router for clean project structure. Tailwind CSS handles styling with CSS custom properties for the vintage color palette — changing a single variable updates brass tones across every component. The flag component tree is memoized aggressively to prevent unnecessary re-renders during lever dragging.'
      },
      {
        type: 'tech-stack',
        caption: 'Architecture diagram: See how components connect, from user input through state management to SVG rendering.'
      },
      {
        type: 'list',
        items: [
          'Next.js 14 with App Router and TypeScript strict mode',
          'Tailwind CSS with custom design tokens for vintage palette',
          'Custom branded Year type preventing invalid year values',
          'useCallback hooks with proper dependency arrays for keyboard events',
          'SVG filters (feGaussianBlur, feTurbulence) for nixie glow and texture effects',
          'Canvas API for PNG export at 2x resolution',
          'CSS transitions with cubic-bezier easing for lever movement',
          'ResizeObserver for responsive flag scaling'
        ]
      },
      {
        type: 'text',
        content: 'State management uses React hooks exclusively — no external libraries. The year is stored as a branded TypeScript type that prevents invalid values at compile time. Palette and texture state use simple useState with localStorage persistence, so preferences survive page refresh. The keyboard handler uses useCallback with proper dependencies to avoid stale closures while maintaining 60fps responsiveness.'
      },
      {
        type: 'pullquote',
        content: 'History becomes interesting when you can interact with it. The goal was making 260 years of vexillology feel like discovery, not homework.',
        attribution: 'Project Reflection'
      },
      {
        type: 'subheading',
        content: 'CSS Details: Making Digital Feel Physical'
      },
      {
        type: 'text',
        content: 'The vintage aesthetic required obsessive attention to CSS details. The noise texture overlay uses an inline SVG with feTurbulence, applied at 3% opacity so it\'s felt more than seen. Brass components use 4-stop gradients with highlights and shadows baked in. The panel backgrounds combine linear gradients with inset box-shadows to simulate depth and wear. Every element has the same material language — brass, bakelite, glass — creating a cohesive instrument rather than a collection of UI widgets.'
      },
      {
        type: 'list',
        items: [
          'Noise overlay: feTurbulence SVG filter at baseFrequency="0.9" with fractalNoise',
          'Brass gradient: linear-gradient(180deg, #e8d4b0 0%, #d4b896 20%, #c9a86c 60%, #8b7355 100%)',
          'Panel depth: inset box-shadow 0 2px 4px rgba(0,0,0,0.5) combined with outer shadow',
          'Screw details: radial gradients with pseudo-element slot lines',
          'LED glow: feGaussianBlur stdDeviation="0.8" with feMerge for layered effect'
        ]
      },
      {
        type: 'subheading',
        content: 'Testing: Catching Bugs Where They Matter'
      },
      {
        type: 'text',
        content: 'The project includes 73 unit tests with Jest and React Testing Library, plus 5 E2E tests with Playwright. The focus is testing behavior that could actually break — era boundary transitions are critical because a bug at 1867→1868 shows the wrong flag for Confederation.'
      },
      {
        type: 'test-runner-demo',
        caption: 'Interactive demo: Click Run to simulate test execution. Tests focus on era boundaries and component interactions.'
      },
      {
        type: 'subheading',
        content: 'Why This Project Matters'
      },
      {
        type: 'text',
        content: 'I built this because I wanted to prove that "serious" subjects don\'t require boring interfaces. Canadian provincial history could be a Wikipedia article. Instead, it\'s an instrument you operate — and operating it teaches you something. The vintage aesthetic isn\'t just decoration; it creates a sense of occasion, of handling something significant. That emotional engagement is what makes information stick.'
      },
      {
        type: 'text',
        content: 'This project also demonstrates frontend range beyond typical SaaS interfaces. Historical data visualization. Custom component design with attention to material authenticity. Full keyboard accessibility. SVG mastery for complex heraldic rendering. CSS craftsmanship that makes digital feel physical. Not every project needs a vintage theme, but every project benefits from this level of intentionality about how the interface feels, not just how it functions.'
      },
      {
        type: 'text',
        content: 'For a Toronto-based role, there\'s also a local angle: Ontario\'s flag represents the province where I\'m building my career. Understanding its history — from British colony to Confederation founding member to distinct provincial identity — grounds my work in the place where I live. The time machine isn\'t just a portfolio piece; it\'s a love letter to Ontario, built with the best frontend tools available.'
      }
    ],

    technicalDetails: [
      {
        title: 'Framework',
        description: 'Next.js 14 with App Router. TypeScript in strict mode. Tailwind CSS with custom design tokens for the vintage aesthetic.'
      },
      {
        title: 'Flag Rendering',
        description: 'Pure SVG components with accurate heraldic proportions. Supports solid and aged texture modes. Multiple color palettes.'
      },
      {
        title: 'Vintage UI Components',
        description: 'Custom brass lever, nixie tube display, and toggle switches. CSS gradients simulate metal surfaces. SVG filters create glow effects.'
      },
      {
        title: 'Interaction Design',
        description: 'Full keyboard navigation with era jumping. Touch-friendly lever control. Responsive layout adapts vintage aesthetic to mobile.'
      },
      {
        title: 'Export System',
        description: 'PNG export via Canvas API. Native SVG export. Auto-generated filenames with year and era metadata.'
      },
      {
        title: 'Historical Data',
        description: '8 distinct eras from 1763-present. Contextual descriptions for each period. Accurate flag specifications per era.'
      },
      {
        title: 'Testing',
        description: 'Jest + React Testing Library for 73 unit/component tests. Playwright for 5 E2E tests. Focus on era boundary transitions and user interactions.'
      }
    ],

    conclusion: 'The Ontario Flag Time Machine proves that educational tools can have personality. By treating history as something worth designing for — not just displaying — the project turns passive reading into active exploration. The vintage interface isn\'t nostalgic whimsy; it\'s a deliberate choice to make 260 years of vexillology feel tangible. Sometimes the best way to understand the past is to build a machine that takes you there.'
  },
  {
    id: 3,
    // Card Preview Data
    title: 'Through the Glass: An Interactive Nordic Window Experience',
    subtitle: 'Real-time weather, ambient sounds, and cozy cabin aesthetics',
    name: 'Through the Glass',
    category: 'FRONTEND · INTERACTIVE',
    type: 'Interactive Experience',
    year: '2025',
    content: `What if you could look through a window into a Nordic cabin, watching real weather
      unfold outside? This interactive experience combines Three.js weather effects, ambient
      soundscapes, and meticulous UI design to create something genuinely cozy.`,
    fullContent: `An immersive web experience featuring a Nordic cabin window with real-time weather
      effects, interactive elements like curtains and lamps, ambient sound systems, and a bookshelf
      with discoverable content. Built with Next.js 14, Three.js, and Framer Motion.`,
    pullQuote: '"The best interfaces disappear. What remains is the experience."',
    tech: {
      languages: [
        { name: 'TypeScript', percentage: 97.3 },
        { name: 'CSS', percentage: 1.9 },
        { name: 'JavaScript', percentage: 0.8 }
      ],
      frontend: ['Next.js 14', 'React 18', 'Three.js', 'Framer Motion'],
      tools: ['Tailwind CSS', 'React Query', 'Web Audio API']
    },
    features: [
      'Real-time Weather API',
      'Three.js Weather Effects',
      'Ambient Sound System',
      'Interactive Curtains & Lamp',
      'Day/Night Cycle',
      'Discoverable Bookshelf'
    ],
    links: {
      live: 'https://through-the-glass.juliocalvo.dev',
      github: 'https://github.com/juliocalvorios/through-the-glass'
    },

    // Card Preview Image
    portraitImage: '/images/Through-The-Glass-Project/Portrait-Image.png',

    // Full Article Data
    date: 'December 2025',
    readTime: '8',
    video: '/videos/Through-The-Glass-Project/Through-The-Glass-Video-1.mp4',
    videoCaption: 'The Nordic cabin window with snow falling outside and warm interior lighting.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '3 weeks',
    role: 'Solo Developer & Designer',

    lede: `Most "ambient" websites are static images with looping audio. I wanted something different — a window you could actually interact with. Pull the curtains open. Click the lamp. Watch snow accumulate on the glass. Hear the clock tick when you hover over it. Through the Glass is an exercise in atmospheric UI design: every element serves the mood, and the mood is cozy Nordic cabin on a winter evening.`,

    bodyParagraphs: [
      {
        type: 'subheading',
        content: 'The Nordic Window: Glass That Feels Real'
      },
      {
        type: 'text',
        content: 'The window is the centerpiece. It\'s not just a frame around weather effects — it\'s a multi-layered glass simulation with reflections, frost patterns, and light refraction that changes based on time of day. At night, interior light creates a warm glow on the glass. During storms, rain streaks down the pane with realistic physics. The frame itself uses wood grain textures and subtle shadows to feel like actual painted Nordic trim.'
      },
      {
        type: 'list',
        items: [
          'Multi-layer glass with reflections and refraction effects',
          'Dynamic frost patterns using SVG noise filters',
          'Rain streaks with gravity-based animation',
          'Interior light reflection on glass at night',
          'Wood frame with grain texture and realistic shadows',
          'Responsive sizing that maintains proportions'
        ]
      },
      {
        type: 'window-demo',
        caption: 'Select weather conditions and toggle day/night to see the window respond in real-time.'
      },
      {
        type: 'subheading',
        content: 'Three.js Weather: Snow, Rain, and Aurora'
      },
      {
        type: 'text',
        content: 'Each weather type is a full Three.js scene rendered inside the window frame. Snow uses thousands of particles with wind simulation — flakes drift, swirl, and accumulate at different rates based on intensity. Rain implements realistic droplet physics with splash effects. The aurora borealis uses vertex shaders to create flowing, color-shifting curtains of light that respond to a simplex noise function.'
      },
      {
        type: 'text',
        content: 'Performance was critical. Running Three.js weather effects alongside Framer Motion animations and real-time audio could easily tank frame rates. The solution: weather particles use instanced rendering, effects outside the viewport are culled, and intensity scales dynamically based on device capability. On mobile, particle counts drop 60% while maintaining visual quality.'
      },
      {
        type: 'video',
        src: '/videos/Through-The-Glass-Project/rain-snow-aurora.mp4',
        caption: 'Cycling through weather conditions: clear skies, clouds, rain, snow, storm, fog, and aurora borealis.'
      },
      {
        type: 'pullquote',
        content: 'Weather isn\'t just visual. It\'s the sound of rain on glass, the muffled quiet of snow, the distant rumble of thunder.',
        attribution: 'Design Philosophy'
      },
      {
        type: 'subheading',
        content: 'Sounds and Interactive Elements'
      },
      {
        type: 'text',
        content: 'Every weather condition has its own soundscape. Rain brings gentle patter. Storms add thunder that syncs with lightning flashes. Snow creates a muffled quiet. But the sound system goes deeper: there\'s a subtle piano melody in the background, interaction sounds for curtains and switches, and a clock that only ticks when you hover over it. Each sound uses the Web Audio API with proper fade-ins to prevent jarring transitions.'
      },
      {
        type: 'text',
        content: 'The curtains use Framer Motion with custom spring physics — they don\'t just slide, they drape and settle naturally. The hanging lamp toggles between day and night modes with a satisfying click sound and light projection that illuminates the cabin wall. The wall switch panel controls both lighting and curtains, styled like vintage cabin hardware with wood texture and brass accents.'
      },
      {
        type: 'text',
        content: 'These interactions aren\'t just functional — they\'re discoverable. Nothing is labeled. Users figure out they can click the lamp by curiosity. The clock tick surprises them on first hover. This approach rewards exploration and makes the experience feel more like a real space than an interface.'
      },
      {
        type: 'list',
        items: [
          'Weather-based ambient soundscapes (rain, wind, thunder)',
          'Background piano at 8% volume for warmth',
          'Interaction sounds: curtain fabric, lamp click, light switch',
          'Clock ticks only on hover — a discoverable detail',
          'Curtains with Framer Motion spring physics',
          'Wall switch panel with wood texture and brass accents',
          'Master volume control with smooth fades'
        ]
      },
      {
        type: 'video',
        src: '/videos/Through-The-Glass-Project/Sounds.mp4',
        caption: 'Sounds and interactions in action: curtains opening, lamp clicking, weather changes, and ambient soundscapes.'
      },
      {
        type: 'subheading',
        content: 'The Bookshelf: Hidden Content Discovery'
      },
      {
        type: 'text',
        content: 'On the left side of the cabin sits a small bookshelf with interactive books. Hover over a book and it tilts, revealing a spine label. Click and the book opens to show content: the tech stack used to build the project, information about the developer, and a haiku about the experience itself. The books have realistic hover sounds and the open animation feels like actually handling a physical object.'
      },
      {
        type: 'list',
        items: [
          'Three interactive books with unique content',
          'Hover-triggered tilt animation with sound',
          'Click to open with page-flip animation',
          'Tech Stack book lists Next.js, React, Three.js, Framer Motion',
          'About book with developer information',
          'Poetry book with a haiku about the experience'
        ]
      },
      {
        type: 'video',
        src: '/videos/Through-The-Glass-Project/books.mp4',
        caption: 'The bookshelf in action: hovering tilts books, clicking opens them to reveal hidden content.'
      },
      {
        type: 'pullquote',
        content: 'The best details are the ones users discover themselves. A clock that ticks on hover. Books that actually open. Weather that matches your location.',
        attribution: 'On Discoverable Design'
      },
      {
        type: 'subheading',
        content: 'Real Weather Integration'
      },
      {
        type: 'text',
        content: 'The experience defaults to the user\'s actual weather. Using the browser\'s geolocation API and a weather service, the window shows what\'s happening outside your real window — if it\'s snowing where you are, it\'s snowing in the cabin. Users can override this with the weather selector to explore all conditions, but the default personalization makes the experience feel surprisingly intimate.'
      },
      {
        type: 'text',
        content: 'Time of day also syncs with reality. Visit at night and the cabin is lit by lamplight with stars visible through the window. Morning brings soft dawn colors. The combination of real weather and real time means no two visits are exactly alike.'
      },
      {
        type: 'subheading',
        content: 'Technical Architecture'
      },
      {
        type: 'text',
        content: 'The project uses Next.js 14 with the App Router for its component architecture and server-side capabilities. Three.js handles all weather particle systems with custom shaders for aurora effects. Framer Motion powers every animation from curtain physics to book tilts. React Query manages weather API data with proper caching. The sound system uses two custom hooks: useAmbientSound for weather-based loops and useInteractionSounds for one-shot effects.'
      },
      {
        type: 'list',
        items: [
          'Next.js 14 with App Router and TypeScript',
          'Three.js for weather particle systems (snow, rain, fog)',
          'Custom GLSL shaders for aurora borealis effect',
          'Framer Motion for all UI animations and transitions',
          'React Query for weather API data fetching',
          'Web Audio API with custom fade/crossfade logic',
          'Tailwind CSS for styling with custom design tokens',
          'SVG filters for glass frost and wood grain textures'
        ]
      },
      {
        type: 'tech-stack',
        caption: 'Architecture diagram: weather data flows through React Query, Three.js renders effects, Framer Motion handles UI state.'
      },
      {
        type: 'subheading',
        content: 'The Cabin Aesthetic'
      },
      {
        type: 'text',
        content: 'Every visual element reinforces the Nordic cabin atmosphere. The wall uses horizontal plank textures with SVG-based wood grain. Colors shift from warm red-brown during day to deep burgundy at night. The weather selector, wall switch, and clock all use the same material language: wood, brass, and warm metals. Even the loading state uses a spinner that matches the cabin\'s color palette.'
      },
      {
        type: 'text',
        content: 'Night mode adds subtle flickering light effects simulating a fireplace just out of frame. The lamp casts a realistic cone of light onto the wall. Stars outside the window twinkle at randomized intervals. These details don\'t demand attention — they create atmosphere subconsciously.'
      },
      {
        type: 'image',
        src: '/images/Through-The-Glass-Project/Winter-Cabin.png',
        caption: 'The cabin aesthetic: warm wood tones, brass accents, and cozy Nordic atmosphere.'
      },
      {
        type: 'subheading',
        content: 'Why This Project Matters'
      },
      {
        type: 'text',
        content: 'Through the Glass demonstrates that frontend development can be art. Not every project needs to be a dashboard or an e-commerce site. Sometimes the goal is simply to create an experience that makes someone pause, exhale, and feel something. The technical challenges — Three.js performance, audio synchronization, animation physics — serve an emotional purpose rather than a business one.'
      },
      {
        type: 'text',
        content: 'This project also showcases attention to detail at scale. Dozens of small decisions compound into overall quality: the exact timing of sound fade-ins, the spring constants for curtain draping, the hex values for Nordic cabin wood. None of these details are visible in a feature list, but users feel them. That\'s what separates a project from a product.'
      },
      {
        type: 'pullquote',
        content: 'Frontend development at its best is invisible. Users don\'t see the Three.js shaders or Framer Motion springs. They just feel cozy.',
        attribution: 'Final Reflection'
      }
    ],

    technicalDetails: [
      {
        title: 'Framework',
        description: 'Next.js 14 with App Router and TypeScript. Tailwind CSS with custom design tokens for the cabin color palette.'
      },
      {
        title: 'Weather Rendering',
        description: 'Three.js particle systems for snow, rain, and fog. Custom GLSL vertex shaders for aurora borealis. Instanced rendering for performance.'
      },
      {
        title: 'Animation System',
        description: 'Framer Motion with custom spring physics for curtains. AnimatePresence for weather transitions. SVG animations for clock hands.'
      },
      {
        title: 'Audio Engine',
        description: 'Web Audio API with two custom hooks. Crossfade logic for weather transitions. Interaction sounds with startTime offsets for instant playback.'
      },
      {
        title: 'Weather Integration',
        description: 'Geolocation API for user location. Weather API with React Query caching. Automatic time-of-day detection.'
      },
      {
        title: 'Visual Polish',
        description: 'SVG noise filters for frost and wood grain. Multi-layer glass reflections. Dynamic lighting based on time and weather.'
      }
    ],

    conclusion: 'Through the Glass proves that the web can be a medium for atmosphere, not just information. Every technical decision — Three.js particle counts, Framer Motion spring tensions, Web Audio fade curves — serves the goal of making someone feel like they\'re looking through a real window into a cozy Nordic cabin. That\'s frontend development as craft: invisible technology creating visible emotion.'
  },
  {
    id: 4,
    // Card Preview Data
    title: 'The Impossible Form: Dark UX Patterns as Comedy',
    subtitle: 'A form that fights back — fleeing buttons, self-unchecking checkboxes, and Windows 95 nostalgia',
    name: 'Impossible Form',
    category: 'CREATIVE · UX · FRONTEND',
    type: 'Interactive Experience',
    year: '2025',
    content: `What if a form didn't want to be filled out? Buttons that flee your cursor,
      checkboxes that uncheck themselves, passwords with changing requirements — all wrapped
      in authentic Windows 95 aesthetics. Dark patterns turned up to absurdity.`,
    fullContent: `An interactive form that actively resists completion. Features include fleeing
      submit buttons, self-unchecking checkboxes with timers, gaslighting password fields,
      moving age inputs, draggable Windows 95 windows, and a hidden Matrix-style hack mode.
      Built with React Hook Form, Zod validation, and Framer Motion.`,
    pullQuote: '"The best way to understand dark patterns is to experience them — then laugh about it."',
    tech: {
      languages: [
        { name: 'TypeScript', percentage: 92 },
        { name: 'CSS', percentage: 8 }
      ],
      frontend: ['Next.js 14', 'React 18', 'Framer Motion', 'React Hook Form'],
      tools: ['Zod Validation', 'Tailwind CSS', 'Web Audio API']
    },
    features: [
      'Fleeing Submit Button',
      'Self-Unchecking Checkboxes',
      'Gaslighting Password Field',
      'Windows 95 Authentic UI',
      'Matrix Hack Easter Egg',
      'Victory Statistics Page'
    ],
    links: {
      live: 'https://theimpossibleform.com',
      github: 'https://github.com/juliocalvorios/the-impossible-form'
    },

    // Card Preview Video (loops on hover)
    portraitVideo: '/videos/The-Impossible-Form-Project/the-impossible-form.mp4',

    // Full Article Data
    date: 'December 2025',
    readTime: '8',
    video: '/videos/The-Impossible-Form-Project/the-impossible-form.mp4',
    videoCaption: 'The Impossible Form: a Windows 95 window that actively resists being filled out.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '2 weeks',
    role: 'Solo Developer & Designer',

    lede: `Dark UX patterns are everywhere — hidden unsubscribe buttons, confusing opt-outs, deliberately frustrating interfaces. Instead of writing another article about them, I built something different: a form that embodies every dark pattern imaginable, cranked up to absurdity. The result is equal parts frustrating and hilarious — a Windows 95 application that doesn't want you to succeed.`,

    bodyParagraphs: [
      {
        type: 'text',
        content: 'The concept was simple: what if every dark pattern was turned up to eleven? Not subtle manipulation, but obvious, over-the-top resistance. A submit button that literally runs away. Checkboxes that uncheck themselves after a few seconds. Password requirements that change after you\'ve typed. The goal wasn\'t to trick users — it was to make the manipulation so visible it becomes comedy.'
      },
      {
        type: 'subheading',
        content: 'The Fleeing Button: Cursor Tracking & Escape Vectors'
      },
      {
        type: 'text',
        content: 'The signature feature. Move your cursor toward the submit button and it dodges away. The implementation tracks cursor position relative to the button center, calculates an escape vector pointing away from the cursor, and uses Framer Motion to animate to a new position — all while respecting window boundaries so it can\'t escape entirely. After enough failed attempts, the escape radius increases from 80px to 150px, making it progressively harder to catch.'
      },
      {
        type: 'fleeing-button-demo',
        caption: 'Interactive demo: Try to click the Submit button. Watch how it calculates escape vectors and increases difficulty after failed attempts.'
      },
      {
        type: 'list',
        items: [
          'Cursor position tracked via onMouseMove relative to button center',
          'Escape vector: normalize(buttonPos - cursorPos) × escapeDistance',
          'Boundary clamping: Math.max(0, Math.min(newX, window.innerWidth - buttonWidth))',
          'Adaptive difficulty: escapeRadius increases from 80px → 120px → 150px after 3 and 6 attempts',
          'Framer Motion spring animation with stiffness: 300, damping: 20'
        ]
      },
      {
        type: 'pullquote',
        content: 'Making something intentionally frustrating taught me more about good UX than any course.',
        attribution: 'Development Reflection'
      },
      {
        type: 'subheading',
        content: 'Self-Unchecking Checkbox: Time Pressure UX'
      },
      {
        type: 'text',
        content: 'Check the "I agree to terms" checkbox and a timer starts. A Windows 95-style progress bar counts down beneath it — when it hits zero, the checkbox unchecks itself. You have to check it and submit before time runs out. The timer starts at 10 seconds and decreases to 7, then 5 seconds after each uncheck, adding escalating time pressure.'
      },
      {
        type: 'checkbox-timer-demo',
        caption: 'Interactive demo: Click the checkbox and watch the countdown. The progress bar uses authentic Windows 95 inset styling with blue fill.'
      },
      {
        type: 'text',
        content: 'The visual feedback is key to the comedy. The Windows 95 checkbox uses the exact inset box-shadow pattern: inset -1px -1px 0 #fff, inset 1px 1px 0 #808080, inset -2px -2px 0 #c0c0c0, inset 2px 2px 0 #0a0a0a. The timer badge turns red at 3 seconds. Warning messages escalate from "Hurry!" to "Quick! Submit now!" creating genuine panic.'
      },
      {
        type: 'subheading',
        content: 'The Gaslighting Password Field'
      },
      {
        type: 'text',
        content: 'Type a password and requirements appear one by one: "Must contain uppercase." Add one. "Must contain a number." Add one. "Must contain a symbol." Add one. Then: "Must not contain the letter \'e\'." The requirements dynamically analyze your input and always find something new to complain about — even inventing absurd rules like "Must contain a prime number of characters."'
      },
      {
        type: 'password-requirements-demo',
        caption: 'Interactive demo: Type a password and watch the requirements change. The system always finds something wrong.'
      },
      {
        type: 'list',
        items: [
          'Dynamic requirement generation based on current input analysis',
          'Requirements pool: uppercase, lowercase, number, symbol, length, no common words',
          'Gaslighting rules: no letter "e", must end with number, prime character count',
          'Visual feedback: green checkmarks that turn red, requirements that "change their mind"',
          'Eye icon with crossed-out line suggesting the password is being watched'
        ]
      },
      {
        type: 'subheading',
        content: 'Windows 95 Authenticity: Pixel-Perfect Recreation'
      },
      {
        type: 'text',
        content: 'The entire interface is styled as a Windows 95 application — not a vague "retro" aesthetic, but pixel-perfect recreation. The exact grays (#c0c0c0 for panels, #808080 for shadows, #dfdfdf for highlights), the specific 4-layer box-shadow pattern for beveled edges, the blue title bar gradient (#000080 to #1084d0), the Tahoma system font at 11px.'
      },
      {
        type: 'win95-style-demo',
        caption: 'Interactive demo: Examine the Windows 95 styling. Hover over elements to see the exact CSS values used.'
      },
      {
        type: 'list',
        items: [
          'Panel background: #c0c0c0 (exact Windows 95 gray)',
          'Beveled edges: 4-layer inset box-shadow pattern for authentic 3D effect',
          'Title bar: linear-gradient(90deg, #000080, #1084d0) with white text',
          'Buttons: Raised effect with shadow inversion on :active state',
          'Font: Tahoma 11px, fallback to "MS Sans Serif", Geneva, sans-serif',
          'Resize handle: 6 diagonal lines using SVG pattern'
        ]
      },
      {
        type: 'text',
        content: 'This attention to detail serves the comedy. The familiar interface makes the absurd behavior funnier — it looks like something trustworthy from 1995, then betrays you. It\'s the visual equivalent of a deadpan delivery.'
      },
      {
        type: 'subheading',
        content: 'Draggable Windows: Desktop Simulation'
      },
      {
        type: 'text',
        content: 'Both the main form window and the Stats panel are draggable, just like real Windows 95. Click the title bar and drag anywhere on screen. The implementation uses mousedown/mousemove/mouseup events with position tracking, clamped to screen boundaries. Framer Motion\'s animate prop with x/y values (not CSS transform) ensures smooth 60fps movement.'
      },
      {
        type: 'draggable-window-demo',
        caption: 'Interactive demo: Drag the windows around. Note how they respect screen boundaries and stack like real Windows.'
      },
      {
        type: 'subheading',
        content: 'The Stats Panel: Frustration Metrics'
      },
      {
        type: 'text',
        content: 'A separate draggable window tracks your suffering in real-time. Failed button clicks, checkbox unchecks, password rejections, total time elapsed — all displayed as Windows 95 counters. The "Defense Level" indicator shows how much the form has adapted to resist you. This gamification of frustration makes users want to keep trying just to see the numbers go up.'
      },
      {
        type: 'stats-panel-demo',
        caption: 'The Stats panel updates in real-time. Watch your frustration metrics climb as you struggle.'
      },
      {
        type: 'subheading',
        content: 'Matrix Hack: The Hidden Bypass'
      },
      {
        type: 'text',
        content: 'For users who discover the "C:\\>_" button (styled as a subtle DOS prompt) or type "hack" anywhere on the page, there\'s an escape hatch. A Matrix-style green rain animation fills the screen while a progress bar "hacks" through the defenses. After 3 seconds, the form auto-submits with all fields filled, bypassing every obstacle.'
      },
      {
        type: 'matrix-hack-demo',
        caption: 'The Matrix hack sequence. Green rain animation with glitch effects and auto-completion.'
      },
      {
        type: 'list',
        items: [
          'Trigger: Click C:\\>_ button OR type "hack" anywhere on page',
          'Visual: Matrix rain using Canvas with falling characters (カタカナ + ASCII)',
          'Glitch effect: Button text randomizes through symbols before revealing "HACKED"',
          'Progress bar: Fills over 3 seconds with "Bypassing defenses..." text',
          'Completion: All form fields auto-filled, victory page redirect'
        ]
      },
      {
        type: 'text',
        content: 'The hack mode transforms the experience from frustration to triumph. Users don\'t just fill out a form — they defeat it. This narrative payoff makes the struggle worthwhile and gives users something to share ("I hacked the impossible form!").'
      },
      {
        type: 'subheading',
        content: 'Victory Page: Statistics & Celebration'
      },
      {
        type: 'text',
        content: 'Successfully submitting (legitimately or via hack) shows a Windows 95-styled victory screen with your struggle statistics: time elapsed, button chase attempts, checkbox resets, defense level reached. A downloadable "certificate" image and social share options let users brag about their achievement.'
      },
      {
        type: 'victory-page-demo',
        caption: 'The victory page with Windows 95 styling. Your suffering, quantified and celebrated.'
      },
      {
        type: 'subheading',
        content: 'Technical Architecture'
      },
      {
        type: 'text',
        content: 'Under the hood, it\'s a properly architected React application. React Hook Form manages form state with Zod schemas for validation — the irony of using professional form tools to build an unusable form wasn\'t lost on me. Custom hooks encapsulate the defensive behaviors, making them reusable and testable.'
      },
      {
        type: 'tech-stack',
        caption: 'Architecture diagram: See how the defensive hooks, form state, and animation systems connect.'
      },
      {
        type: 'list',
        items: [
          'Next.js 14 with App Router and TypeScript strict mode',
          'React Hook Form for form state management with Zod validation schemas',
          'Framer Motion for all animations: fleeing, scaling, dragging, Matrix rain',
          'Custom hooks: useFormDefenses (difficulty scaling), useFormDamage (stats tracking)',
          'useEasterEggs hook for Konami code and keyword detection',
          'useSoundEffects for retro audio feedback (optional)',
          'CSS-in-JS via Tailwind with inline styles for Windows 95 specifics',
          'LocalStorage for persisting victory statistics across sessions'
        ]
      },
      {
        type: 'subheading',
        content: 'The Favicon: Angry Window Face'
      },
      {
        type: 'text',
        content: 'Even the favicon tells the story. A 32x32 SVG of a Windows 95 window with an angry face — furrowed brows above the eyes, a frowning mouth. It\'s the first hint that this form has personality, visible in the browser tab before users even interact.'
      },
      {
        type: 'favicon-demo',
        caption: 'The custom favicon: a Windows 95 window that\'s angry at you. SVG for crisp rendering at any size.'
      },
      {
        type: 'pullquote',
        content: 'Every dark pattern I implemented made me think about its real-world equivalent. Building bad UX requires deeply understanding good UX.',
        attribution: 'Project Reflection'
      },
      {
        type: 'subheading',
        content: 'Why This Project Matters'
      },
      {
        type: 'text',
        content: 'The Impossible Form started as a joke and became a genuine learning experience. Dark patterns are usually invisible — that\'s what makes them effective and insidious. By making them absurdly visible, the project becomes educational. Users leave understanding exactly what manipulative UX feels like, which makes them better at recognizing subtle versions in the wild.'
      },
      {
        type: 'text',
        content: 'Technically, the project demonstrates frontend range: complex state management, physics-based animations, pixel-perfect styling recreation, Easter egg systems, and proper React architecture applied to something genuinely fun. That\'s the kind of work I want to do — technically solid, creatively unexpected, and worth sharing.'
      }
    ],

    technicalDetails: [
      {
        title: 'Form Architecture',
        description: 'React Hook Form with Zod validation schemas. Custom hooks for defensive behaviors (useFormDefenses tracks attempts and scales difficulty, useFormDamage aggregates frustration metrics). Type-safe throughout with TypeScript strict mode.'
      },
      {
        title: 'Animation System',
        description: 'Framer Motion for all interactions. Fleeing button uses cursor tracking with escape vector calculation and spring physics (stiffness: 300, damping: 20). Draggable windows use x/y animate props for 60fps movement.'
      },
      {
        title: 'Windows 95 Styling',
        description: 'Pixel-perfect recreation using CSS box-shadows for beveled edges (4-layer inset pattern). Exact system colors (#c0c0c0, #808080, #dfdfdf). Tahoma 11px font. Title bar gradients. Custom SVG favicon with angry face.'
      },
      {
        title: 'Easter Eggs',
        description: 'useEasterEggs hook detects Konami code and keyword triggers. Matrix rain uses Canvas 2D context with falling katakana characters. Glitch animation randomizes button text through symbol arrays.'
      },
      {
        title: 'State Management',
        description: 'React hooks exclusively — no external state libraries. Form state via React Hook Form. Defensive state via custom hooks with useCallback for performance. LocalStorage persistence for victory stats.'
      },
      {
        title: 'Sound System',
        description: 'Optional retro sound effects via Web Audio API. Click sounds, error buzzes, victory fanfare. useSoundEffects hook with volume control and mute toggle.'
      }
    ],

    conclusion: 'The Impossible Form proves that portfolio projects can be technically impressive and genuinely entertaining. It demonstrates React, TypeScript, animation systems, state management, and CSS craftsmanship — all while making people laugh and teaching them about dark patterns. Sometimes the best way to show what you can build is to build something no one asked for but everyone enjoys.'
  },
  {
    id: 5,
    // Card Preview Data
    title: 'Ontario Flag Time Machine: TypeScript State Machines and SVG Heraldry',
    subtitle: 'Decoupled visual/data state for 60fps interactions, branded types for compile-time safety, and historically accurate vector rendering',
    name: 'Flag Time Machine (Technical)',
    category: 'TYPESCRIPT · NEXT.JS · SVG',
    type: 'Interactive Application',
    year: '2025',
    content: `Three technical problems: implementing drag interactions with decoupled visual 
      and data state for 60fps performance, building a type-safe state machine for 8 historical 
      eras, and rendering SVG flags with correct heraldic geometry. The vintage aesthetic came 
      after the architecture was solid.`,
    fullContent: `A Next.js 14 application with strict TypeScript demonstrating advanced state 
      management patterns, custom hooks with proper dependency arrays, Canvas/SVG export pipelines, 
      and comprehensive keyboard navigation. Renders historically accurate flags using pure SVG 
      with correct Union Jack counterchanging geometry.`,
    pullQuote: '"Separating visual state from data state turned a janky interaction into 60fps smoothness."',
    tech: {
      languages: [
        { name: 'TypeScript', percentage: 85 },
        { name: 'CSS', percentage: 15 }
      ],
      frontend: ['Next.js 14', 'React 18', 'Tailwind CSS'],
      tools: ['SVG Rendering', 'Canvas API', 'Custom Hooks', 'Jest + RTL', 'Playwright']
    },
    features: [
      'Decoupled Visual/Data State',
      'Branded TypeScript Types',
      'Exhaustive Era Matching',
      'Full Keyboard Navigation',
      'Canvas/SVG Export Pipeline',
      'Comprehensive Test Coverage'
    ],
    links: {
      live: 'https://ontario-flag.juliocalvo.dev',
      github: 'https://github.com/juliocalvorios/ontario-flag-time-machine'
    },

    // Full Article Data
    date: 'December 2025',
    readTime: '8',
    image: '/images/ontario-flag-project/time-machine-hero.png',
    imageCaption: 'The Ontario Flag Time Machine: TypeScript strict mode, Next.js 14, zero runtime dependencies.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '2 weeks',
    role: 'Solo Developer',

    lede: `This project solved three technical problems that don't have obvious solutions. First: how do you implement a drag interaction where the visual feedback runs at 60fps but the data updates only at meaningful thresholds? Second: how do you model 8 distinct historical eras in TypeScript so invalid states are impossible at compile time? Third: how do you render a Union Jack correctly in SVG when most implementations get the diagonal stripe geometry wrong? The vintage control panel aesthetic came after I had the architecture working.`,

    bodyParagraphs: [
      {
        type: 'subheading',
        content: 'The Core Problem: Visual State vs Data State'
      },
      {
        type: 'text',
        content: 'The year lever needs to feel smooth when dragging — position updates on every mouse move. But the flag shouldn\'t re-render 60 times per second. The naive implementation couples these: lever moves, year updates, flag re-renders. Result: janky interaction. The solution is state decoupling: lever position is visual state (updates constantly), year is data state (updates at thresholds). React state handles both, but they change independently.'
      },
      {
        type: 'code',
        language: 'typescript',
        content: `// Two separate states with different update frequencies
const [leverPosition, setLeverPosition] = useState(0)  // Updates every frame
const [year, setYear] = useState<Year>(1763 as Year)   // Updates at era boundaries

const handleDrag = useCallback((clientX: number) => {
  const trackRect = trackRef.current?.getBoundingClientRect()
  if (!trackRect) return
  
  // Visual: updates immediately for smooth 60fps feedback
  const newPosition = clamp(
    (clientX - trackRect.left) / trackRect.width,
    0,
    1
  )
  setLeverPosition(newPosition)
  
  // Data: only updates when crossing era boundaries
  const newYear = positionToYear(newPosition)
  if (getEra(newYear) !== getEra(year)) {
    setYear(newYear)
  }
}, [year])  // Dependency array includes year for era comparison`
      },
      {
        type: 'text',
        content: 'The useCallback dependency array is critical here. Including `year` means the callback recreates when era changes, ensuring the comparison uses current data. Missing this creates stale closure bugs that are painful to debug.'
      },
      {
        type: 'subheading',
        content: 'Branded Types: Invalid Years Are Compile Errors'
      },
      {
        type: 'text',
        content: 'A year must be between 1763 and 2025. With a plain `number` type, nothing prevents passing 9999 or -50. Branded types add a compile-time tag that makes invalid values impossible to construct except through a validation function. It\'s a pattern from functional programming that TypeScript supports elegantly.'
      },
      {
        type: 'code',
        language: 'typescript',
        content: `// Branded type: a number that's been validated as a year
type Year = number & { readonly __brand: unique symbol }

// The only way to create a Year — validates at runtime, types at compile time
function createYear(n: number): Year {
  if (n < 1763 || n > 2025) {
    throw new RangeError(\`Year must be 1763-2025, received \${n}\`)
  }
  return n as Year
}

// Now this is a type error, not a runtime surprise:
// const badYear: Year = 9999  // Error: Type 'number' is not assignable to 'Year'

// This works:
const goodYear = createYear(1867)  // Type: Year`
      },
      {
        type: 'text',
        content: 'The benefit isn\'t just catching bugs — it\'s documentation. When a function accepts `Year`, you know it\'s already validated. No defensive coding at every boundary. The type system carries the proof.'
      },
      {
        type: 'subheading',
        content: 'Exhaustive Era Matching'
      },
      {
        type: 'text',
        content: 'Eight historical eras, each with different flag configurations. A switch statement could handle this, but adding a ninth era later wouldn\'t cause a type error — the code would silently fall through. TypeScript\'s exhaustiveness checking prevents this: if you miss a case, it won\'t compile.'
      },
      {
        type: 'code',
        language: 'typescript',
        content: `type Era = 
  | 'british-colonial'    // 1763-1791
  | 'upper-canada'        // 1791-1867
  | 'confederation'       // 1867
  | 'first-ensign'        // 1868-1921
  | 'updated-ensign'      // 1922-1956
  | 'final-ensign'        // 1957-1964
  | 'adoption'            // 1965
  | 'current'             // 1965-present

function getEra(year: Year): Era {
  if (year < 1791) return 'british-colonial'
  if (year < 1867) return 'upper-canada'
  if (year === 1867) return 'confederation'
  if (year < 1922) return 'first-ensign'
  if (year < 1957) return 'updated-ensign'
  if (year < 1965) return 'final-ensign'
  if (year === 1965) return 'adoption'
  return 'current'
}

// Exhaustiveness helper — if this compiles, you covered all cases
function getFlagConfig(era: Era): FlagConfig {
  switch (era) {
    case 'british-colonial': return { base: 'union-jack', shield: false }
    case 'upper-canada': return { base: 'union-jack', shield: false }
    case 'confederation': return { base: 'red-ensign', shield: 'canada-1867' }
    case 'first-ensign': return { base: 'red-ensign', shield: 'canada-1868' }
    case 'updated-ensign': return { base: 'red-ensign', shield: 'canada-1922' }
    case 'final-ensign': return { base: 'red-ensign', shield: 'canada-1957' }
    case 'adoption': return { base: 'ontario', shield: 'ontario' }
    case 'current': return { base: 'ontario', shield: 'ontario' }
    // No default — TypeScript errors if we miss a case
  }
}`
      },
      {
        type: 'subheading',
        content: 'SVG Heraldry: Getting the Union Jack Right'
      },
      {
        type: 'text',
        content: 'Most Union Jack implementations on the web are wrong. The red diagonal stripes (St. Patrick\'s Cross) are not centered — they\'re offset from the white diagonals (St. Andrew\'s Cross) in a pattern called counterchanging. This offset is specified in the official flag protocol. Getting it wrong is visually subtle but historically incorrect.'
      },
      {
        type: 'code',
        language: 'tsx',
        content: `// Union Jack with correct counterchanging
const UnionJack: FC<{ width: number; height: number }> = ({ width, height }) => {
  const w = width
  const h = height
  
  return (
    <svg viewBox={\`0 0 \${w} \${h}\`} xmlns="http://www.w3.org/2000/svg">
      {/* Blue field */}
      <rect width={w} height={h} fill="#012169" />
      
      {/* St Andrew's Cross (white diagonal) */}
      <path 
        d={\`M0,0 L\${w},\${h} M\${w},0 L0,\${h}\`} 
        stroke="#FFFFFF" 
        strokeWidth={h * 0.1} 
      />
      
      {/* St Patrick's Cross (red diagonal) — OFFSET for counterchanging */}
      {/* Upper-left to center: shifted RIGHT */}
      <path 
        d={\`M0,0 L\${w/2},\${h/2}\`} 
        stroke="#C8102E" 
        strokeWidth={h * 0.067}
        transform={\`translate(\${w * 0.017}, 0)\`}  // Key offset
      />
      {/* Center to lower-right: shifted RIGHT */}
      <path 
        d={\`M\${w/2},\${h/2} L\${w},\${h}\`} 
        stroke="#C8102E" 
        strokeWidth={h * 0.067}
        transform={\`translate(\${w * 0.017}, 0)\`}
      />
      {/* Upper-right to center: shifted LEFT */}
      <path 
        d={\`M\${w},0 L\${w/2},\${h/2}\`} 
        stroke="#C8102E" 
        strokeWidth={h * 0.067}
        transform={\`translate(-\${w * 0.017}, 0)\`}  // Opposite offset
      />
      {/* Center to lower-left: shifted LEFT */}
      <path 
        d={\`M\${w/2},\${h/2} L0,\${h}\`} 
        stroke="#C8102E" 
        strokeWidth={h * 0.067}
        transform={\`translate(-\${w * 0.017}, 0)\`}
      />
      
      {/* St George's Cross (red vertical/horizontal) */}
      <rect x={(w - w*0.2)/2} y={0} width={w*0.2} height={h} fill="#FFFFFF" />
      <rect x={0} y={(h - h*0.2)/2} width={w} height={h*0.2} fill="#FFFFFF" />
      <rect x={(w - w*0.12)/2} y={0} width={w*0.12} height={h} fill="#C8102E" />
      <rect x={0} y={(h - h*0.12)/2} width={w} height={h*0.12} fill="#C8102E" />
    </svg>
  )
}`
      },
      {
        type: 'text',
        content: 'The translate transforms are the key. Without them, the red diagonals sit perfectly centered on the white — visually acceptable but heraldically wrong. The 1.7% offset matches the official specification.'
      },
      {
        type: 'subheading',
        content: 'Keyboard Navigation: Full Event Handling'
      },
      {
        type: 'text',
        content: 'Every control accessible via keyboard. The challenge is handling modifier keys (Shift for decade jumps) and preventing default browser behavior without blocking legitimate shortcuts. The implementation uses a handler map pattern that\'s easy to extend.'
      },
      {
        type: 'code',
        language: 'typescript',
        content: `const useKeyboardNavigation = (
  year: Year,
  setYear: (y: Year) => void,
  toggles: { unionJack: () => void; shield: () => void; palette: () => void; texture: () => void }
) => {
  useEffect(() => {
    const handlers: Record<string, (e: KeyboardEvent) => void> = {
      'ArrowLeft': () => setYear(createYear(Math.max(1763, year - 1))),
      'ArrowRight': () => setYear(createYear(Math.min(2025, year + 1))),
      'Shift+ArrowLeft': () => setYear(createYear(Math.max(1763, year - 10))),
      'Shift+ArrowRight': () => setYear(createYear(Math.min(2025, year + 10))),
      'ArrowUp': () => setYear(getPreviousEraStart(year)),
      'ArrowDown': () => setYear(getNextEraStart(year)),
      'Home': () => setYear(createYear(1763)),
      'End': () => setYear(createYear(2025)),
      'u': toggles.unionJack,
      's': toggles.shield,
      'p': toggles.palette,
      't': toggles.texture,
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Build key string including modifiers
      const key = \`\${e.shiftKey ? 'Shift+' : ''}\${e.key}\`
      
      if (handlers[key]) {
        e.preventDefault()  // Prevent browser defaults
        handlers[key](e)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [year, setYear, toggles])  // All dependencies explicit
}`
      },
      {
        type: 'subheading',
        content: 'Export Pipeline: Canvas and SVG'
      },
      {
        type: 'text',
        content: 'Two export formats with different pipelines. SVG exports the raw vector — straightforward. PNG requires rasterization through Canvas API at 2x resolution for retina displays. Both generate filenames automatically with metadata.'
      },
      {
        type: 'code',
        language: 'typescript',
        content: `async function exportFlag(
  config: FlagConfig, 
  format: 'svg' | 'png',
  year: Year,
  era: Era
): Promise<void> {
  const filename = \`ontario-flag-\${year}-\${era}.\${format}\`
  
  if (format === 'svg') {
    // SVG: serialize the DOM node
    const svgElement = document.getElementById('flag-svg')
    if (!svgElement) return
    
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgElement)
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    downloadBlob(blob, filename)
    
  } else {
    // PNG: rasterize through Canvas at 2x for retina
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const scale = 2
    canvas.width = 1200 * scale
    canvas.height = 600 * scale
    ctx.scale(scale, scale)
    
    const svgData = new XMLSerializer().serializeToString(svgElement)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1200, 600)
      URL.revokeObjectURL(url)
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, filename)
      }, 'image/png')
    }
    img.src = url
  }
}`
      },
      {
        type: 'subheading',
        content: 'Testing Strategy: What Matters and Why'
      },
      {
        type: 'text',
        content: 'The testing approach focuses on behavior that could actually break: era boundary transitions, type validation, and user interactions. 73 unit tests with Jest and React Testing Library, plus 5 E2E tests with Playwright. The goal isn\'t coverage metrics — it\'s catching bugs where they\'re most likely to occur.'
      },
      {
        type: 'text',
        content: 'Era boundaries are the most critical logic. A bug here shows the wrong flag for a year — historically incorrect and embarrassing. The tests verify every transition point: 1790→1791 (Upper Canada), 1866→1867 (Confederation), 1964→1965 (Ontario flag adoption). These aren\'t arbitrary dates; they\'re where the logic branches.'
      },
      {
        type: 'code',
        language: 'typescript',
        content: `// Testing boundary years where bugs are most likely
describe('getFlagForYear - boundary transitions', () => {
  it('should handle 1867 → 1868 transition correctly', () => {
    // 1867: Confederation year - still Union Jack
    const before = getFlagForYear(toYear(1867))
    expect(before.src).toBe('/flags/union-jack.svg')

    // 1868: First Red Ensign begins
    const after = getFlagForYear(toYear(1868))
    expect(after.src).toBe('/flags/canada-1868-1921.svg')
  })

  it('should handle 1964 → 1965 transition correctly', () => {
    // Last year of Red Ensign → Ontario flag adoption
    const before = getFlagForYear(toYear(1964))
    const after = getFlagForYear(toYear(1965))

    expect(before.src).toContain('canada')
    expect(after.src).toBe('/flags/ontario.svg')
  })
})`
      },
      {
        type: 'text',
        content: 'Component tests verify interactions work without testing implementation details. Does clicking a switch call the toggle function? Does the disabled state prevent clicks? These tests use React Testing Library\'s philosophy: test behavior users care about, not internal state.'
      },
      {
        type: 'code',
        language: 'typescript',
        content: `describe('VintageSwitch interactions', () => {
  it('should call onToggle when clicked', () => {
    const onToggle = jest.fn()
    const { container } = render(
      <VintageSwitch label="Test" isOn={false} onToggle={onToggle} />
    )

    fireEvent.click(container.querySelector('.cursor-pointer'))
    expect(onToggle).toHaveBeenCalledWith(true)
  })

  it('should NOT call onToggle when disabled', () => {
    const onToggle = jest.fn()
    render(<VintageSwitch label="Test" isOn={false} onToggle={onToggle} disabled />)

    fireEvent.click(container.querySelector('.opacity-50'))
    expect(onToggle).not.toHaveBeenCalled()
  })
})`
      },
      {
        type: 'text',
        content: 'E2E tests with Playwright verify the full experience works in a real browser. These catch integration issues that unit tests miss: does the page actually load? Do keyboard shortcuts work after React hydration? Is the app responsive on mobile? Five tests covering the critical paths.'
      },
      {
        type: 'subheading',
        content: 'Technical Decisions'
      },
      {
        type: 'text',
        content: 'No external state management — React hooks are sufficient for this scale. No animation library — CSS transitions with cubic-bezier timing handle everything. No component library — custom components match the specific aesthetic. The only dependencies beyond Next.js are devDependencies for TypeScript and testing.'
      },
      {
        type: 'list',
        items: [
          'Next.js 14 with App Router — file-based routing, server components where applicable',
          'TypeScript strict mode — noImplicitAny, strictNullChecks, no escape hatches',
          'Zero runtime UI dependencies — React, Next.js, nothing else',
          'Tailwind CSS with CSS custom properties — single source of truth for palette',
          'Jest + React Testing Library + Playwright — unit, component, and E2E tests',
          'SVG-first rendering — scales to any resolution without artifacts'
        ]
      },
      {
        type: 'subheading',
        content: 'What I Learned'
      },
      {
        type: 'text',
        content: 'State decoupling is a pattern I\'ll use again. The visual/data separation solved a real performance problem with minimal complexity. Branded types are worth the setup cost — compile-time safety paid off immediately when refactoring era logic. SVG geometry requires reading specifications, not Stack Overflow — the Union Jack counterchanging was documented but not in any tutorial.'
      },
      {
        type: 'text',
        content: 'The vintage aesthetic works, but it\'s not the focus here. The code underneath is what makes it run at 60fps, prevents invalid states, and renders historically correct flags. The craft is in the engineering as much as the design.'
      }
    ],

    technicalDetails: [
      {
        title: 'State Architecture',
        description: 'Decoupled visual/data state pattern. Lever position updates at 60fps, year updates at era thresholds. useCallback with proper dependency arrays.'
      },
      {
        title: 'Type Safety',
        description: 'Branded Year type prevents invalid values at compile time. Exhaustive Era union with no default case. TypeScript strict mode throughout.'
      },
      {
        title: 'SVG Rendering',
        description: 'Correct Union Jack counterchanging geometry. Pure functional components. Memoized to prevent re-renders during drag.'
      },
      {
        title: 'Keyboard Navigation',
        description: 'Handler map pattern for easy extension. Modifier key support (Shift+Arrow). Proper event prevention without blocking browser shortcuts.'
      },
      {
        title: 'Export Pipeline',
        description: 'Canvas API for PNG at 2x resolution. XMLSerializer for SVG. Auto-generated filenames with year and era metadata.'
      },
      {
        title: 'Testing',
        description: 'Jest + React Testing Library for 73 unit/component tests. Playwright for 5 E2E tests. Focus on boundary transitions and user interactions.'
      }
    ],

    conclusion: 'This project demonstrates that frontend engineering is more than component composition. State decoupling, type safety, correct geometric rendering, comprehensive keyboard support, and proper testing — these are the skills that separate junior work from production-ready code. The vintage aesthetic is a design choice; the architecture underneath is engineering discipline.'
  },
  {
    id: 6,
    // Card Preview Data
    title: 'Open Source: Publishing npm Packages That Solve Real Problems',
    subtitle: 'From internal tool to published package — building reusable code for the React ecosystem',
    name: 'Open Source',
    category: 'OPEN SOURCE · NPM',
    type: 'npm Packages',
    year: '2025',
    content: `Building veraOS meant solving problems that didn't have good existing solutions.
      The highlight parser started as internal code, but it was useful enough to extract,
      document, and publish. That's the open source mindset: if it helped me, it might help others.`,
    fullContent: `A collection of npm packages extracted from production projects. Each package
      solves a specific problem with minimal dependencies and clear APIs. Published with
      TypeScript types, comprehensive documentation, and real-world usage examples.`,
    pullQuote: '"The best libraries come from solving your own problems first."',
    tech: {
      languages: [
        { name: 'TypeScript', percentage: 95 },
        { name: 'JavaScript', percentage: 5 }
      ],
      tools: ['tsup', 'npm', 'ESM/CJS']
    },
    features: [
      'TypeScript-first',
      'Zero Dependencies',
      'Tree-shakeable',
      'Full Type Definitions',
      'Streaming Support',
      'Production Tested'
    ],
    links: {
      npm: 'https://npmjs.com/package/react-ai-highlight-parser',
      github: 'https://github.com/juliocalvo/react-ai-highlight-parser'
    },

    // Full Article Data
    date: 'December 2025',
    readTime: '6',
    image: '/images/open-source/npm-packages.png',
    imageCaption: 'react-ai-highlight-parser on npm — semantic highlighting for AI responses.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: 'Ongoing',
    role: 'Author & Maintainer',

    lede: `Most developers consume open source. Fewer contribute. Even fewer publish their own packages. When I built veraOS, the highlight system for AI responses became complex enough that I realized it deserved to be its own thing — tested, documented, and available for anyone with the same problem. That's how react-ai-highlight-parser was born: not as a portfolio piece, but as a real tool extracted from a real product.`,

    bodyParagraphs: [
      {
        type: 'subheading',
        content: 'react-ai-highlight-parser'
      },
      {
        type: 'text',
        content: 'AI chat interfaces return plain text. But what if the AI could semantically mark important content — key points in yellow, definitions in blue, warnings in red — and the interface could render those marks as actual highlights? That\'s what this parser does. It takes AI responses with codes like [Y]important[/Y] and converts them to styled React components.'
      },
      {
        type: 'text',
        content: 'The tricky part isn\'t the regex. It\'s handling edge cases: nested tags, malformed markup from streaming responses, code blocks that shouldn\'t be highlighted, and orphaned closing tags. The parser uses a token-based approach with a stack for proper nesting — the same technique used in real parsers, just scoped to a specific problem.'
      },
      {
        type: 'code',
        language: 'typescript',
        content: `// Token-based parsing with stack for nested highlights
const tokens = text.split(/(\\[\\/?(?:Y|B|O|G|R)\\])/g);
const stack: Array<{ code: string; startIndex: number }> = [];

for (const token of tokens) {
  const openMatch = token.match(/^\\[(Y|B|O|G|R)\\]$/);
  if (openMatch) {
    stack.push({ code: openMatch[1], startIndex: output.length });
    continue;
  }

  const closeMatch = token.match(/^\\[\\/(Y|B|O|G|R)\\]$/);
  if (closeMatch) {
    // Find matching opener, wrap content, handle nesting
  }
}`
      },
      {
        type: 'list',
        items: [
          '10 semantic highlight codes (Yellow, Blue, Orange, Green, Red, Pink, Light Blue, Gray, Purple, Brown)',
          '3 display modes: background highlights, underlines, or both combined',
          '2 color palettes: vibrant (high contrast) and natural (muted)',
          'Streaming-safe: handles partial/incomplete tags gracefully',
          'Code block protection: syntax highlighting isn\'t affected',
          'Zero runtime dependencies beyond React'
        ]
      },
      {
        type: 'highlight-showcase',
        caption: 'Live demo: The highlight parser in action with different modes and palettes.'
      },
      {
        type: 'subheading',
        content: 'Publishing Process'
      },
      {
        type: 'text',
        content: 'Extracting internal code into a package requires more than copying files. The API needs to be clean — no internal assumptions leaking out. Types need to be exported properly. The build needs to output both ESM and CommonJS. Documentation needs to cover installation, basic usage, and edge cases. Tests need to verify the public API, not implementation details.'
      },
      {
        type: 'code',
        language: 'json',
        content: `{
  "name": "react-ai-highlight-parser",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts"
  }
}`
      },
      {
        type: 'text',
        content: 'The package uses tsup for building — it handles TypeScript compilation, bundling, and declaration file generation in one tool. Peer dependencies keep the bundle small: React is required but not bundled, so users don\'t download it twice.'
      },
      {
        type: 'subheading',
        content: 'API Design Decisions'
      },
      {
        type: 'text',
        content: 'The package exports both a React component and a pure function. The component is convenient for most cases. The function is useful when you need the HTML string directly — for server-side rendering or storing pre-processed content. Both use the same underlying parser, so behavior is identical.'
      },
      {
        type: 'code',
        language: 'tsx',
        content: `// React component — most common usage
import { HighlightRenderer } from 'react-ai-highlight-parser';

<HighlightRenderer
  content={aiResponse}
  mode="both"
  palette="vibrant"
/>

// Pure function — for SSR or preprocessing
import { parseHighlights } from 'react-ai-highlight-parser';

const html = parseHighlights(aiResponse, 'highlights', 'natural');`
      },
      {
        type: 'text',
        content: 'Helper functions handle common needs: hasHighlights() checks if processing is needed, removeHighlightCodes() strips all markup for plain text, extractHighlightCodes() returns which codes are used. These aren\'t exciting, but they\'re the difference between a library and a code snippet.'
      },
      {
        type: 'subheading',
        content: 'What I Learned'
      },
      {
        type: 'text',
        content: 'Publishing a package changes how you think about code. Internal code can have rough edges — you know the context, you know what to avoid. Public code needs to handle cases you didn\'t anticipate, from users you\'ll never meet. That discipline improves all your code, not just the published parts.'
      },
      {
        type: 'text',
        content: 'The other lesson: documentation is product design. A README that\'s hard to scan, examples that don\'t copy-paste cleanly, types that don\'t autocomplete well — these are bugs, even if the code works perfectly. The best libraries feel obvious to use. That\'s not accident; it\'s design.'
      },
      {
        type: 'pullquote',
        content: 'Publishing code forces you to think like a user, not just a developer. That perspective shift is worth more than the package itself.',
        attribution: 'Reflection'
      }
    ],

    technicalDetails: [
      {
        title: 'react-ai-highlight-parser',
        description: 'Token-based parser for AI responses with semantic highlighting. 10 color codes, 3 modes, 2 palettes. Handles streaming, protects code blocks, cleans malformed tags.'
      },
      {
        title: 'Build System',
        description: 'tsup for TypeScript compilation to ESM and CJS. Generates .d.ts files automatically. Zero-config for simple packages.'
      },
      {
        title: 'Package Structure',
        description: 'Dual exports for require() and import(). Peer dependencies for React. Tree-shakeable named exports.'
      },
      {
        title: 'Testing',
        description: 'Unit tests for parser edge cases. Integration tests for React components. Real-world strings from veraOS as test fixtures.'
      }
    ],

    conclusion: 'Open source isn\'t about building libraries from scratch — it\'s about recognizing when internal solutions deserve to be shared. react-ai-highlight-parser exists because I needed it, built it well enough to be reusable, and took the time to package it properly. More packages will follow as patterns emerge from other projects. The goal isn\'t npm download counts; it\'s contributing useful code to the ecosystem that helped me learn.'
  }
]

export default projects
