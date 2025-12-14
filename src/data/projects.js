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
      and search, and academic tools with spaced repetition. Built over 6 months as a way 
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
    duration: '6 months',
    role: 'Solo Developer & Designer',

    lede: `veraOS started with a simple question: how do you actually build a product where AI isn't just a chatbot, but something deeply integrated into the experience? Not just "call the OpenAI API and display the response" — but AI that understands your data, responds in context, and enhances the interface itself. Six months later, the answer is a full productivity platform with drag-and-drop widgets, interactive highlights, a library system, and academic tools. This is what I learned building it.`,

    bodyParagraphs: [
      {
        type: 'subheading',
        content: 'The Interactive Highlight System'
      },
      {
        type: 'text',
        content: 'Most AI chat interfaces just render text. veraOS does something different: as the AI responds, it applies semantic highlighting in real-time. Users can choose between color highlights, underlines, or both — with customizable palettes that update instantly. This wasn\'t a simple CSS trick. It required building a token-based parser that processes the AI\'s response stream, identifies highlight codes, handles nested formatting, protects code blocks from being highlighted, and cleans up malformed tags without breaking the content. The parser is available as an open source npm package: **react-ai-highlight-parser**.'
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
    title: 'Ontario Flag Time Machine - Next.js & Testing',
    subtitle: 'An interactive visualization built with TypeScript strict mode and 73 unit tests',
    name: 'Flag Time Machine',
    category: 'FRONTEND · NEXT.JS · TESTING',
    type: 'Interactive Experience',
    year: '2025',
    content: `A project focused on code quality: TypeScript in strict mode, branded types 
      to prevent invalid states, and comprehensive testing with Jest and Playwright.`,
    fullContent: `An interactive web experience built with Next.js 14 and TypeScript that visualizes
      the evolution of Ontario's flag from 1763 to present day. The focus was on code quality:
      strict TypeScript, comprehensive testing, and clean architecture.`,
    pullQuote: '"73 unit tests and 5 E2E tests. Because code that works once should work every time."',
    tech: {
      languages: [
        { name: 'TypeScript', percentage: 85 },
        { name: 'CSS', percentage: 15 }
      ],
      frontend: ['Next.js 14', 'React 18', 'Tailwind CSS'],
      tools: ['Jest', 'Playwright', 'React Testing Library']
    },
    features: [
      '73 Unit Tests',
      '5 E2E Tests (Playwright)',
      'TypeScript Strict Mode',
      'Branded Types',
      'Full Keyboard Navigation',
      'Canvas API Export'
    ],
    links: {
      live: 'https://ontario-flag.juliocalvo.dev',
      github: 'https://github.com/juliocalvorios/ontario-flag-time-machine'
    },

    // Full Article Data
    date: 'December 2025',
    readTime: '4',
    video: '/videos/Ontario-Machine-Flag-project/Ontario-Flag.mp4',
    videoCaption: 'The Ontario Flag Time Machine: 260 years of history, 73 tests.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '2 weeks',
    role: 'Solo Developer & Designer',

    lede: `An interactive visualization of Ontario's flag from 1763 to today. Built with Next.js 14, TypeScript strict mode, and 73 unit tests. Branded types that make invalid states impossible. 5 end-to-end tests with Playwright.`,

    bodyParagraphs: [
      {
        type: 'subheading',
        content: 'TypeScript Strict Mode'
      },
      {
        type: 'text',
        content: 'The entire codebase runs in strict mode with no escape hatches. The year value uses a branded type that prevents invalid values at compile time. You cannot pass 1750 or 2030 without TypeScript catching it.'
      },
      {
        type: 'list',
        items: [
          'Branded Year type: only values 1763-2025 are valid',
          'Strict null checks throughout',
          'No any types anywhere in the codebase',
          'useCallback hooks with proper dependency arrays'
        ]
      },
      {
        type: 'subheading',
        content: 'Testing: 73 Unit + 5 E2E'
      },
      {
        type: 'text',
        content: 'This project has 73 unit tests with Jest and React Testing Library, plus 5 end-to-end tests with Playwright. The focus is on behavior that actually matters: era boundary transitions, keyboard navigation, state persistence.'
      },
      {
        type: 'test-runner-demo',
        caption: 'Tests focus on era boundaries (1867→1868) and user interactions.'
      },
      {
        type: 'subheading',
        content: 'Accessibility'
      },
      {
        type: 'text',
        content: 'Full keyboard navigation. Every control works without a mouse.'
      },
      {
        type: 'list-with-image',
        items: [
          '← → : Years (±1)',
          'Shift + ← → : Decades (±10)',
          '↑ ↓ : Jump eras',
          'Home / End : 1763 or 2025',
          'U / S / P / T : Toggles'
        ],
        image: '/images/Ontario-Flag/Keyboard-Shortcuts.png',
        imageAlt: 'Keyboard shortcuts'
      },
      {
        type: 'subheading',
        content: 'Export System'
      },
      {
        type: 'text',
        content: 'Canvas API for PNG export at 2x resolution. Native SVG export. Auto-generated filenames with year and era.'
      },
      {
        type: 'export-demo',
        caption: 'PNG (raster) or SVG (vector) download.'
      },
      {
        type: 'subheading',
        content: 'The Result'
      },
      {
        type: 'text',
        content: 'All that code produces this: a vintage control panel where everything actually works. Drag the dial. Toggle the switches. Watch the nixie tubes glow.'
      },
      {
        type: 'ontario-flag-collage-demo',
        caption: 'Drag, click, toggle. 260 years of history, 73 tests behind it.'
      }
    ],

    technicalDetails: [
      {
        title: 'Framework',
        description: 'Next.js 14 with App Router. TypeScript in strict mode with no escape hatches.'
      },
      {
        title: 'Testing',
        description: '73 unit tests (Jest + RTL) and 5 E2E tests (Playwright). Focus on era boundaries and user interactions.'
      },
      {
        title: 'Type Safety',
        description: 'Branded Year type prevents invalid values. Strict null checks. No any types.'
      },
      {
        title: 'Accessibility',
        description: 'Full keyboard navigation. ARIA labels. Tested with screen readers.'
      },
      {
        title: 'Export',
        description: 'Canvas API for PNG at 2x resolution. Native SVG export. Auto-generated filenames.'
      }
    ],

    conclusion: 'TypeScript strict mode, 73 tests covering era boundaries and user interactions, zero any types.'
  },
  {
    id: 3,
    // Card Preview Data
    title: 'A Window That Knows Your Weather: Three.js + APIs',
    subtitle: 'Three.js particle effects synced to your real location via Weather and Geolocation APIs',
    name: 'Through the Glass',
    category: 'FRONTEND · INTERACTIVE',
    type: 'Interactive Experience',
    year: '2025',
    content: `What if you could look through a window into a Nordic cabin, watching real weather
      unfold outside? Built with Three.js particle effects and Weather + Geolocation APIs 
      to sync with your actual location and time.`,
    fullContent: `An immersive web experience featuring a Nordic cabin window with real-time weather
      effects, interactive elements like curtains and lamps, ambient sound systems, and a bookshelf
      with discoverable content. Built with Next.js 14, Three.js, and Framer Motion.`,
    pullQuote: '"If it\'s snowing where you are, it\'s snowing in the cabin."',
    tech: {
      languages: [
        { name: 'TypeScript', percentage: 97.3 },
        { name: 'CSS', percentage: 1.9 },
        { name: 'JavaScript', percentage: 0.8 }
      ],
      frontend: ['Next.js 14', 'React 18', 'Three.js', 'Framer Motion'],
      tools: ['Tailwind CSS', 'React Query']
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
    readTime: '2',
    video: '/videos/Through-The-Glass-Project/Through-The-Glass-Video-1.mp4',
    videoCaption: 'The Nordic cabin window with snow falling outside and warm interior lighting.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '3 weeks',
    role: 'Solo Developer & Designer',

    lede: `A Nordic cabin window that syncs with your real weather and time. Three.js renders snow, rain, and aurora particles. Weather and Geolocation APIs personalize the experience to your location.`,

    bodyParagraphs: [
      {
        type: 'subheading',
        content: 'How It Works Together'
      },
      {
        type: 'text',
        content: 'The window defaults to your actual weather. Geolocation API gets your coordinates, Weather API returns current conditions, and Three.js renders the matching particle system. Time of day syncs too. Visit at night and the cabin is lit by lamplight with stars visible through the window.'
      },
      {
        type: 'text',
        content: 'Each weather type is a full Three.js scene. Snow uses instanced rendering for thousands of particles with wind simulation. Rain implements droplet physics. Aurora uses custom GLSL shaders with wave functions for the flowing light curtains.'
      },
      {
        type: 'text',
        content: 'Weather changes crossfade the audio instead of cutting it. 30-step fade with ease-in-out timing.'
      },
      {
        type: 'window-demo',
        caption: 'Select weather conditions and toggle day/night. The cabin aesthetic: warm wood tones, brass accents, Nordic atmosphere.'
      },
      {
        type: 'subheading',
        content: 'The Bookshelf: Hidden Content'
      },
      {
        type: 'text',
        content: 'On the left side sits a bookshelf with interactive books. Hover and they tilt, revealing spine labels. Click to open. One shows the tech stack, another has developer info, the third contains a haiku. Nothing is labeled. Users discover it by curiosity.'
      },
      {
        type: 'video',
        src: '/videos/Through-The-Glass-Project/books.mp4',
        caption: 'Hovering tilts books, clicking opens them to reveal hidden content.'
      }
    ],
    technicalDetails: [
      {
        title: 'Framework',
        description: 'Next.js 14 with App Router and TypeScript. Tailwind CSS with custom design tokens for the cabin color palette.'
      },
      {
        title: 'Weather Rendering',
        description: 'Three.js particle systems for snow, rain, and fog. Custom GLSL shaders with wave functions for aurora. Instanced rendering for performance.'
      },
      {
        title: 'Animation System',
        description: 'Framer Motion with custom spring physics for curtains. AnimatePresence for weather transitions. SVG animations for clock hands.'
      },
      {
        title: 'Audio Engine',
        description: 'Two custom hooks for ambient and interaction sounds. 30-step crossfade with ease-in-out curves. Layered audio: piano at 8%, weather sounds, fireplace at night.'
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

    conclusion: 'Three.js for particles, Web Audio for soundscapes, Weather and Geolocation APIs for personalization. The kind of immersive experience that meditation apps or ambient workspaces use.'
  },
  {
    id: 4,
    // Card Preview Data
    title: 'The Impossible Form: A Windows 95 Nightmare',
    subtitle: 'A form that fights back: fleeing buttons, self-unchecking checkboxes, and Windows 95 nostalgia',
    name: 'Impossible Form',
    category: 'FRONTEND · CREATIVE',
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
        { name: 'TypeScript', percentage: 97 },
        { name: 'CSS', percentage: 3 }
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
    readTime: '4',
    video: '/videos/The-Impossible-Form-Project/the-impossible-form.mp4',
    videoCaption: 'The Impossible Form: a Windows 95 window that actively resists being filled out.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '2 weeks',
    role: 'Solo Developer & Designer',

    lede: `What if a form didn't want to be filled out? A submit button that runs away. Checkboxes that uncheck themselves. Password requirements that change after you type. Dark patterns cranked up to absurdity, wrapped in Windows 95 nostalgia.`,

    bodyParagraphs: [
      {
        type: 'subheading',
        content: 'The Fleeing Button'
      },
      {
        type: 'text',
        content: 'Move your cursor toward the submit button and it dodges away. Tracks cursor position, calculates escape direction, animates with Framer Motion. After 5 failed attempts, it surrenders.'
      },
      {
        type: 'fleeing-button-demo'
      },
      {
        type: 'subheading',
        content: 'The Self-Unchecking Checkbox'
      },
      {
        type: 'text',
        content: 'Check the checkbox and a timer starts. When it hits zero, the checkbox unchecks itself. Timer starts at 10 seconds, decreases to 8, then 6 as the form adapts.'
      },
      {
        type: 'checkbox-timer-demo'
      },
      {
        type: 'subheading',
        content: 'The Gaslighting Password Field'
      },
      {
        type: 'text',
        content: 'Type a password and requirements appear. Satisfy one, another appears. Then: "Must not contain the letter e." It always finds something wrong.'
      },
      {
        type: 'password-requirements-demo'
      },
      {
        type: 'subheading',
        content: 'Windows 95: Pixel-Perfect'
      },
      {
        type: 'text',
        content: 'Not vague "retro" aesthetic - pixel-perfect recreation. Exact grays, 4-layer box-shadow bevels, blue title bar gradient, Tahoma 11px.'
      },
      {
        type: 'win95-style-demo'
      },
      {
        type: 'subheading',
        content: 'Draggable Windows'
      },
      {
        type: 'text',
        content: 'Both windows are draggable, just like real Windows 95. Click the title bar, drag anywhere. Boundary clamping keeps them on screen.'
      },
      {
        type: 'draggable-window-demo'
      },
      {
        type: 'subheading',
        content: 'The Stats Panel'
      },
      {
        type: 'text',
        content: 'A separate window tracks your suffering in real-time. Failed clicks, checkbox resets, password rejects, time elapsed.'
      },
      {
        type: 'stats-panel-demo'
      },
      {
        type: 'subheading',
        content: 'Matrix Hack: The Hidden Bypass'
      },
      {
        type: 'text',
        content: 'Click "C:\\>_" or type "hack" anywhere. Matrix-style green rain fills the screen, progress bar hacks through defenses, form auto-submits.'
      },
      {
        type: 'matrix-hack-demo'
      }
    ],

    technicalDetails: [
      {
        title: 'Stack',
        description: 'Next.js 14, TypeScript strict, React Hook Form + Zod, Framer Motion, Tailwind CSS.'
      },
      {
        title: 'Animation',
        description: 'Framer Motion springs (stiffness: 300, damping: 20). Cursor tracking with escape vectors. 60fps draggable windows.'
      },
      {
        title: 'Windows 95',
        description: '4-layer box-shadow bevels. System colors (#c0c0c0, #808080). Tahoma 11px. Custom angry favicon.'
      },
      {
        title: 'Easter Eggs',
        description: 'useEasterEggs detects paste, autofill, devtools. Matrix rain with katakana. Web Audio for retro sounds.'
      }
    ],

    conclusion: 'The Impossible Form is technically solid and genuinely fun - React Hook Form, Zod, Framer Motion, Web Audio API, all applied to something people actually want to share. Dark patterns as comedy, with real engineering underneath.'
  },

]

export default projects
