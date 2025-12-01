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
    tech: ['React 18', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Groq API', 'Three.js', 'Vite'],
    features: [
      'Interactive Highlight System',
      'Drag-and-Drop Widgets',
      'Chat Library with Folders',
      'Real-time Streaming',
      'Flashcards with Spaced Repetition',
      'Dark/Light Themes'
    ],
    links: {
      live: 'https://veraos.ai',
      github: 'https://github.com/juliocalvo/veraos',
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
        src: '/videos/Drag-Drop-Widgets-Video.mp4',
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
        src: '/videos/vera-library-demo.mp4',
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
        content: 'The Chat Experience'
      },
      {
        type: 'text',
        content: 'The chat interface handles streaming responses, markdown rendering (including tables and code blocks with syntax highlighting), file attachments with drag-and-drop, and draft auto-save per conversation. When you close a chat mid-message and return later, your draft is still there. Small details, but they add up to an experience that feels professional rather than hobbyist.'
      },
      {
        type: 'text',
        content: 'File uploads validate more than just extensions. The system checks magic bytes to verify files actually are what they claim to be — a security measure most tutorials skip. Filenames are sanitized to prevent path traversal attacks. These aren\'t features users notice, but they\'re the difference between a demo and a product.'
      },
      {
        type: 'video',
        src: '/videos/vera-chat-demo.mp4',
        caption: 'The chat experience: streaming responses, markdown rendering, syntax highlighting, and file attachments.'
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
        src: '/videos/vera-flashcards-demo.mp4',
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
          'Supabase for auth, PostgreSQL database, real-time subscriptions, and file storage',
          'Groq API for fast AI inference with streaming (sub-second first token)',
          'Three.js + Simplex Noise for the animated central circle',
          'Custom embeddings server on Render (MiniLM-L12-v2, 384 dimensions)',
          'AES-256-GCM encryption for sensitive message data (client-side)',
          'Framer Motion for complex UI animations and transitions',
          'i18next for internationalization (English, Spanish, Portuguese)',
          'DOMPurify for XSS protection on all user-generated content',
          'Lazy loading for all widgets and modals (400KB bundle reduction)',
          'Debounced Supabase sync with change detection to minimize writes'
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
    title: 'Newspaper Portfolio: A Frontend Love Letter to Editorial Design',
    subtitle: 'Turning a portfolio into an interactive broadsheet with scroll animations and print edition',
    name: 'Portfolio',
    category: 'DESIGN',
    type: 'Personal Site',
    year: '2025',
    content: `Most developer portfolios look the same. This one is designed as a vintage 
      newspaper — complete with masthead, columns, pull quotes, and a downloadable 
      print edition. Because if you're going to show frontend skills, show range.`,
    fullContent: `A portfolio website designed as an interactive newspaper. Features include 
      scroll-triggered animations, a functional print edition modal, reading progress bar, 
      and responsive layouts that maintain the editorial aesthetic across all devices.`,
    pullQuote: '"Your portfolio is a product. Design it like one."',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    features: [
      'Newspaper Layout',
      'Print Edition',
      'Scroll Animations',
      'Reading Progress',
      'Responsive Design'
    ],
    links: {
      live: 'https://juliocalvo.dev',
      github: 'https://github.com/juliocalvor811-svg/portfolio'
    },

    // Full Article Data
    date: 'January 2025',
    readTime: '5',
    image: '/images/portfolio-project/newspaper-hero.png',
    imageCaption: 'The portfolio as interactive newspaper, complete with masthead and columns.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '2 weeks',
    role: 'Designer & Developer',

    lede: `Developer portfolios have a sameness problem. Dark theme, hero section, project cards, contact form. Functional, forgettable. I wanted something that would make someone pause — that would demonstrate frontend range through the design itself, not just the projects listed. The answer was a newspaper. Vintage editorial design, but interactive. Print-inspired, but thoroughly digital.`,

    bodyParagraphs: [
      {
        type: 'text',
        content: 'The concept started with a constraint: what if the portfolio itself was the most impressive project? Not just a container for other work, but a demonstration of layout skill, animation polish, and design thinking. Newspapers offered the perfect metaphor — they\'re information-dense, hierarchy-driven, and have centuries of refined typography conventions to draw from.'
      },
      {
        type: 'subheading',
        content: 'Editorial Layout in CSS'
      },
      {
        type: 'text',
        content: 'The multi-column layouts use CSS Grid extensively. Articles flow naturally, pull quotes break the rhythm intentionally, and the hierarchy guides the eye without explicit instructions. This is harder than it sounds — responsive editorial layout means the same content must work as a three-column broadsheet on desktop and a single-column mobile experience without losing its newspaper character.'
      },
      {
        type: 'pullquote',
        content: 'Good typography is invisible. Great typography makes you want to read.',
        attribution: 'Design Principle'
      },
      {
        type: 'subheading',
        content: 'Scroll-Triggered Animations'
      },
      {
        type: 'text',
        content: 'Elements reveal as you scroll — but subtly. No dramatic fly-ins or bounces. Articles fade up slightly as they enter the viewport. The reading progress bar at the top uses requestAnimationFrame for buttery 60fps updates. These details don\'t scream for attention; they just make the experience feel polished.'
      },
      {
        type: 'subheading',
        content: 'The Print Edition'
      },
      {
        type: 'text',
        content: 'Click "Print Edition" and the site transforms into a downloadable PDF-style view. Same content, reformatted for paper. This isn\'t just a print stylesheet — it\'s a completely different layout optimized for physical media. Because if you\'re going to commit to the newspaper metaphor, commit fully.'
      },
      {
        type: 'list',
        items: [
          'Masthead with date, edition number, and navigation',
          'Multi-column article layouts with proper text flow',
          'Pull quotes and drop caps for editorial authenticity',
          'Reading progress bar with smooth animation',
          'Print edition modal with paper-optimized layout',
          'Sound effects (optional) for interactions'
        ]
      },
      {
        type: 'subheading',
        content: 'Why This Approach'
      },
      {
        type: 'text',
        content: 'A portfolio should demonstrate range. Anyone can center a div. The question is: can you build something with personality that still works perfectly? Can you handle complex layouts? Do you sweat the details? This newspaper portfolio answers those questions before a single project is even clicked.'
      }
    ],

    technicalDetails: [
      {
        title: 'Layout System',
        description: 'CSS Grid-based editorial layout with responsive breakpoints that maintain newspaper character across all screen sizes.'
      },
      {
        title: 'Animations',
        description: 'Scroll-triggered reveals using Intersection Observer. Reading progress bar with requestAnimationFrame for 60fps smoothness.'
      },
      {
        title: 'Print Edition',
        description: 'Dedicated modal with paper-optimized layout. Not just a print stylesheet — a complete reformatting for physical media.'
      },
      {
        title: 'Typography',
        description: 'Careful font pairing, proper leading, and responsive type scales. Drop caps and pull quotes for editorial authenticity.'
      }
    ],

    conclusion: 'The best portfolios don\'t just list projects — they are projects. This newspaper design demonstrates layout skills, animation polish, responsive thinking, and attention to detail. It\'s a frontend love letter to editorial design, and it\'s the first impression before anything else gets clicked.'
  },
  {
    id: 3,
    // Card Preview Data
    title: 'Flashcards Study System: Spaced Repetition with Modern UX',
    subtitle: 'SM-2 algorithm meets thoughtful interface design',
    name: 'Flashcards',
    category: 'EDUCATION',
    type: 'Study Tool',
    year: '2024',
    content: `Study apps often sacrifice usability for features. This flashcard system 
      focuses on what actually matters: smooth card interactions, persistent sessions, 
      and the proven SM-2 algorithm for optimal retention.`,
    fullContent: `A flashcard study system implementing the SM-2 spaced repetition algorithm 
      with pause/resume sessions, progress tracking, deck organization, and keyboard 
      navigation. Part of veraOS but designed as a standalone experience.`,
    pullQuote: '"The best study tool is one you actually want to use."',
    tech: ['React', 'Tailwind CSS', 'LocalStorage', 'SM-2 Algorithm'],
    features: [
      'Spaced Repetition',
      'Session Persistence',
      'Keyboard Navigation',
      'Progress Analytics',
      'Deck Organization'
    ],
    links: {
      live: 'https://veraos.ai',
      github: 'https://github.com/juliocalvor811-svg/veraos'
    },

    // Full Article Data
    date: 'November 2024',
    readTime: '6',
    image: '/images/flashcards-project/study-view.png',
    imageCaption: 'The flashcard study interface with progress indicators and keyboard shortcuts.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '6 weeks',
    role: 'Developer & Designer',

    lede: `Anki is powerful but looks like it was designed in 2005. Quizlet is pretty but dumbed-down. I wanted something in between: the proven effectiveness of spaced repetition with an interface that feels modern and responds to how people actually study — in sessions that get interrupted, on devices that vary, with progress that should persist automatically.`,

    bodyParagraphs: [
      {
        type: 'text',
        content: 'The SM-2 algorithm is the foundation. Each card tracks its ease factor, interval, and repetition count. Rate a card easy and you won\'t see it for weeks. Rate it hard and it comes back tomorrow. This isn\'t new — it\'s been proven effective since the 1980s. What\'s new is making it feel good to use.'
      },
      {
        type: 'subheading',
        content: 'Sessions That Survive'
      },
      {
        type: 'text',
        content: 'Real studying gets interrupted. Phone calls, coffee breaks, closing the laptop. The session system saves state to localStorage continuously — current card, time elapsed, cards remaining. Close the browser mid-session and pick up exactly where you left off. Pause tracking even accounts for break time separately from study time.'
      },
      {
        type: 'pullquote',
        content: 'The best study tool is one you actually want to use.',
        attribution: 'Design Philosophy'
      },
      {
        type: 'subheading',
        content: 'Keyboard-First Design'
      },
      {
        type: 'text',
        content: 'Power users don\'t want to click. Space flips the card, 1-4 rates difficulty, arrow keys navigate. The entire study flow is possible without touching the mouse. This sounds minor until you\'re 50 cards deep and realize how much faster keyboard navigation feels.'
      },
      {
        type: 'list',
        items: [
          'SM-2 algorithm with proper interval calculations',
          'Session state persisted to localStorage',
          'Pause/resume with separate time tracking',
          'Full keyboard navigation for study flow',
          'Deck organization with color coding',
          'Progress analytics per deck and overall'
        ]
      },
      {
        type: 'subheading',
        content: 'Visual Feedback'
      },
      {
        type: 'text',
        content: 'Cards flip with a satisfying animation. Progress bars fill smoothly. Completion triggers a subtle celebration. These microinteractions don\'t affect learning outcomes directly, but they affect whether someone opens the app tomorrow. Motivation matters as much as algorithm.'
      }
    ],

    technicalDetails: [
      {
        title: 'SM-2 Implementation',
        description: 'Full SuperMemo 2 algorithm with ease factors, intervals, and repetition tracking per card.'
      },
      {
        title: 'Session Persistence',
        description: 'Continuous state saves to localStorage. Survives browser close, tracks paused time separately.'
      },
      {
        title: 'Keyboard Navigation',
        description: 'Complete study flow via keyboard. Space to flip, number keys for rating, arrows for navigation.'
      },
      {
        title: 'State Management',
        description: 'React context for deck and card state. Optimistic updates with proper error handling.'
      }
    ],

    conclusion: 'Effective learning tools need two things: proven methodology and pleasant experience. The SM-2 algorithm provides the methodology. Thoughtful interface design provides the experience. Together, they create a study tool that people actually use consistently — which is the only kind that works.'
  },
  {
    id: 4,
    // Card Preview Data
    title: 'Chat Interface: Streaming, Markdown, and Real-Time Highlights',
    subtitle: 'What happens when you take AI chat UX seriously',
    name: 'Chat UI',
    category: 'INTERFACE',
    type: 'AI Experience',
    year: '2024',
    content: `Most AI chat interfaces are glorified text boxes. This one handles streaming 
      responses, full markdown rendering, syntax highlighting, file attachments, and 
      a custom highlight system — all while feeling fast and responsive.`,
    fullContent: `A sophisticated chat interface featuring streaming AI responses, complete 
      markdown support with syntax highlighting, drag-and-drop file attachments, draft 
      auto-save, and an interactive highlight system applied in real-time.`,
    pullQuote: '"The interface is the product. Make it feel like it."',
    tech: ['React', 'Groq API', 'Tailwind CSS', 'Custom Markdown Parser'],
    features: [
      'Streaming Responses',
      'Syntax Highlighting',
      'File Attachments',
      'Draft Auto-save',
      'Interactive Highlights'
    ],
    links: {
      live: 'https://veraos.ai',
      github: 'https://github.com/juliocalvor811-svg/veraos'
    },

    // Full Article Data
    date: 'October 2024',
    readTime: '7',
    image: '/images/chat-project/streaming-demo.png',
    imageCaption: 'The chat interface with streaming response and syntax-highlighted code.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '8 weeks',
    role: 'Lead Developer',

    lede: `ChatGPT proved that AI chat could be mainstream. But its interface is basic — responses appear as monolithic text blocks, code highlighting is inconsistent, and there's no personality. Building veraOS's chat interface meant asking: what would AI chat look like if we designed it like a premium product?`,

    bodyParagraphs: [
      {
        type: 'text',
        content: 'Streaming was the first requirement. Watching tokens appear word-by-word feels conversational; waiting for a complete response feels like talking to a server. The implementation uses Server-Sent Events with careful handling of partial markdown — you can\'t render a code block until you know it\'s complete, but you can\'t wait for the whole message either.'
      },
      {
        type: 'subheading',
        content: 'Markdown Done Right'
      },
      {
        type: 'text',
        content: 'The markdown renderer handles tables, nested lists, code blocks with syntax highlighting, checkboxes, and blockquotes. But it also integrates with the highlight system — colored backgrounds and underlines applied by the AI don\'t break the markdown formatting. Getting this right required building a custom parser that processes highlights at the token level, before markdown rendering.'
      },
      {
        type: 'pullquote',
        content: 'The interface is the product. Make it feel like it.',
        attribution: 'Development Mantra'
      },
      {
        type: 'subheading',
        content: 'File Handling'
      },
      {
        type: 'text',
        content: 'Drag a file onto the chat and it attaches with a preview. But behind the scenes, the system validates more than just the extension. Magic byte verification confirms files are what they claim to be. Filename sanitization prevents path traversal. Size limits are enforced with clear feedback. Security isn\'t visible, but it\'s there.'
      },
      {
        type: 'list',
        items: [
          'Token-by-token streaming with SSE',
          'Full markdown: tables, code, lists, blockquotes',
          'Syntax highlighting for 50+ languages',
          'Drag-and-drop file attachments',
          'Magic byte verification for security',
          'Draft auto-save per conversation',
          'Model selector with tier gating'
        ]
      },
      {
        type: 'subheading',
        content: 'The Details'
      },
      {
        type: 'text',
        content: 'Drafts save automatically as you type, keyed per conversation. Switch chats and your unsent message waits for you. Copy buttons on code blocks provide feedback. The input expands as you type. Keyboard shortcuts work throughout. None of these are hard individually; together they create an experience that feels polished.'
      }
    ],

    technicalDetails: [
      {
        title: 'Streaming Pipeline',
        description: 'Server-Sent Events with partial markdown state management. Renders progressively without breaking formatting.'
      },
      {
        title: 'Markdown Parser',
        description: 'Custom tokenizer and AST parser. Integrates with highlight system at token level. Handles all common markdown features.'
      },
      {
        title: 'File Validation',
        description: 'MIME type checking plus magic byte verification. Filename sanitization. Size limits with user feedback.'
      },
      {
        title: 'State Management',
        description: 'Draft persistence per conversation. Optimistic message updates. Error recovery with user notification.'
      }
    ],

    conclusion: 'AI chat interfaces have room to grow. Most still feel like demos — functional but not refined. This interface demonstrates what\'s possible when you treat the chat experience as a product worth polishing. Streaming that feels natural, markdown that renders correctly, and dozens of small details that add up to something that feels professional.'
  }
]

export default projects
