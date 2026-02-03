const projects = [
  {
    id: 1,
    slug: 'veraos',
    // Card Preview Data
    title: 'veraOS: Building a Full-Stack Productivity Platform from Scratch',
    subtitle: 'Drag-and-drop widgets, interactive highlights, real-time chat, and a library system - all integrated with AI',
    name: 'veraOS',
    category: 'FULLSTACK · AI INTEGRATION',
    type: 'Full-Stack Product',
    year: '2025',
    content: `Full-stack productivity platform with drag-and-drop widgets, AI chat with semantic highlighting,
      library system with folders, and academic tools. 6 months of work.`,
    fullContent: `Full-stack productivity platform: drag-and-drop widget dashboard, AI chat with semantic highlighting,
      library system with folders and search, academic tools with spaced repetition. 6 months, solo developer.`,
    pullQuote: '"Six months building this taught me more about React than any course could."',
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
      'Interactive Highlight System',
      'Drag-and-Drop Widgets',
      'Chat Library with Folders',
      'Real-time Streaming',
      'Flashcards with Spaced Repetition',
      'Multi-provider AI Integration'
    ],
    links: {
      live: 'https://veraos.ai',
      github: 'https://github.com/juliocalvorios/veraos',
      npm: 'https://npmjs.com/package/react-ai-highlight-parser'
    },

    // Card Preview Video
    portraitVideo: '/videos/veraOS-Project/Drag-Drop-Widgets-Video.mp4',

    // Full Article Data
    date: 'December 2025',
    readTime: '10',
    video: '/videos/veraOS-Project/Vera_Full_Video.mp4',
    videoCaption: 'The veraOS dashboard with customizable widgets and AI chat integration.',
    author: {
      name: 'Julio Calvo',
      title: 'Creative Developer'
    },
    duration: '6 months',
    role: 'Solo Developer & Designer',

    lede: `Full-stack productivity platform with drag-and-drop widgets, AI chat with semantic highlighting, library system with folders, and academic tools. 6 months, solo developer.`,

    bodyParagraphs: [
      {
        type: 'subheading',
        content: 'The Interactive Highlight System'
      },
      {
        type: 'text',
        content: 'Real-time semantic highlighting that applies as text streams in - not after. The system parses incoming text, identifies semantic markers, handles nested formatting, and renders styled output without blocking the stream. 350 lines of tokenization logic, published as an npm package.'
      },
      {
        type: 'text',
        content: 'The technical challenge: text arrives in chunks, markers can span multiple chunks, and the UI needs to update every frame without flicker. Stack-based parsing with O(n) complexity, placeholder substitution for code blocks, cleanup for malformed markers.'
      },
      {
        type: 'list',
        items: [
          'Stack-based tokenizer - O(n) parsing, handles incomplete/nested markers mid-stream',
          '60 visual combinations (2 palettes × 10 semantic colors × 3 modes)',
          'Zero-flicker rendering during streaming via incremental DOM updates',
          'npm package: react-ai-highlight-parser'
        ]
      },
      {
        type: 'highlight-showcase',
        caption: 'Live demonstration: The highlight system cycles through modes (highlights, underline, both) and palettes (vibrant, natural) - exactly as implemented in veraOS.'
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
        content: 'Customizable dashboard with 10+ widget types (pomodoro, flashcards, schedule, goals, focus timer). Drag to reorder, resize to fit, layouts persist to Supabase per user.'
      },
      {
        type: 'text',
        content: 'The drag system runs collision detection on every frame. Used spatial indexing to keep it O(n) instead of O(n²). Widgets lazy-load on mount - 400KB off the initial bundle. ResizeObserver handles responsive layouts inside each widget.'
      },
      {
        type: 'list',
        items: [
          '10+ widget types, each with independent state and ResizeObserver layouts',
          'O(n) collision detection via spatial indexing (not O(n²) pairwise checks)',
          'Lazy loading - widgets mount on add, 400KB bundle reduction',
          'Layouts persist per user to Supabase'
        ]
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
        content: 'Chat library with nested folders and subfolders, drag-and-drop organization, and full-text search. Optimistic updates with automatic rollback - the UI responds instantly, syncs to Supabase in background, reverts if the request fails.'
      },
      {
        type: 'text',
        content: 'Action history persists to database (last 100 actions per user). Pin, favorite, archive. Tier-based storage limits.'
      },
      {
        type: 'list',
        items: [
          'Nested folders and subfolders with drag-and-drop (chats and folders)',
          'Optimistic updates with rollback on failure',
          'Action history in Supabase - survives refresh, max 100 per user',
          'Full-text search across all conversations'
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
        content: 'Academic Mode injects widget data into AI context. Ask "what should I study?" and the system pulls your flashcards due for review, upcoming exams, study goals, schedule - 10 widget types have context extractors that format their data for the prompt.'
      },
      {
        type: 'text',
        content: 'Embeddings run on a Render server (MiniLM-L12-v2, 384 dimensions). Originally tried transformers.js in browser - 25MB download per user. Moved to server: 0 bytes client-side, ~50ms per embedding.'
      },
      {
        type: 'list',
        items: [
          '10 widget types with context extractors (flashcards, schedule, goals, pomodoro, etc.)',
          'Embedding server on Render - MiniLM-L12-v2, 384 dimensions',
          'Replaced 25MB client download with server-side computation (~50ms/query)',
          'Context builder formats widget data into structured prompts'
        ]
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
        content: '4 subscription tiers (Free, Pro, Student, Annual) via Stripe. Checkout through Edge Function that creates portal sessions - users manage billing, cancel, update payment method directly in Stripe\'s hosted portal.'
      },
      {
        type: 'text',
        content: 'i18next with 4 languages (EN, ES, FR, DE) and 18 namespaces - one per feature/widget. Lazy-loads translations on demand.'
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
        content: 'Spaced repetition using FSRS-4.5. 4 learning steps (1min, 10min, 1hr, 6hrs), 8 card types with difficulty modifiers, leech detection after 8 lapses. Response time affects next interval calculation.'
      },
      {
        type: 'text',
        content: 'Study sessions persist to localStorage - pause, close browser, resume later. Full keyboard navigation in expanded view.'
      },
      {
        type: 'list',
        items: [
          'FSRS-4.5 algorithm with 4 learning steps and 6 card states',
          '8 card types (basic, multiple choice, fill-in, math, etc.) with difficulty modifiers',
          'Leech detection after 8 lapses - flags cards that need attention',
          'Session state persists to localStorage'
        ]
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
        content: '5 React Contexts: WidgetsContext (layout), WidgetDataContext (state), ThemeContext (appearance), SubscriptionContext (tier limits), ExpandedWidgetContext (modals).'
      },
      {
        type: 'text',
        content: 'Animated center circle with Three.js + Simplex Noise - responds to AI state and theme changes.'
      },
      {
        type: 'text',
        content: '20+ Supabase Edge Functions as API proxies. AES-256-GCM client-side encryption. DOMPurify for XSS.'
      },
      {
        type: 'list',
        items: [
          '6 LLM providers (OpenAI, Claude, Gemini, Groq, Mistral, Scaleway) with automatic fallbacks',
          '20+ Supabase Edge Functions as secure API proxies',
          'AES-256-GCM encryption for sensitive data (client-side)',
          'Three.js + Simplex Noise for animated UI elements',
          'DOMPurify for XSS protection on user content',
          'Region-aware routing for EU compliance'
        ]
      },
      {
        type: 'tech-stack',
        caption: 'Interactive architecture diagram: Hover over nodes to see details, watch data flow between services.'
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

    conclusion: 'veraOS is proof that modern development looks different than it did five years ago. AI tools are part of the workflow now. The question isn\'t whether to use them, but how to use them well. Six months of building this platform taught me React deeply, exposed me to real architectural decisions, and showed me what it takes to ship something that works reliably.'
  },
  {
    id: 2,
    slug: 'ontario-flag',
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
    pullQuote: '"Built with TypeScript strict mode and 73 unit tests."',
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
      live: 'https://ontario-flag-project.vercel.app',
      github: 'https://github.com/juliocalvorios/Ontario-Flag-Project'
    },

    // Card Preview Video
    portraitVideo: '/videos/Ontario-Machine-Flag-project/Ontario-Flag.mp4',

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
    slug: 'through-the-glass',
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
      live: 'https://through-the-glass-project.vercel.app',
      github: 'https://github.com/juliocalvorios/Through-The-Glass-Project'
    },

    // Card Preview Video
    portraitVideo: '/videos/Through-The-Glass-Project/Through-The-Glass-Video-1.mp4',

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
    slug: 'impossible-form',
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
    pullQuote: '"Dark patterns are everywhere. This project makes them obvious by turning them into comedy."',
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
      github: 'https://github.com/juliocalvorios/The-Impossible-Form'
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
      title: 'Creative Developer'
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
