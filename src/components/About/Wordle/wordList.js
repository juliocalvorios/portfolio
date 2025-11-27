/**
 * Word list for The Daily Word puzzle
 * Each word reveals a fact about Julio Calvo
 */

export const WORDS = [
  {
    word: 'REACT',
    fact: 'Built 10 academic widgets for veraOS with it',
    category: 'tech'
  },
  {
    word: 'SPAIN',
    fact: 'Born in Zaragoza, a beautiful city in Spain',
    category: 'origin'
  },
  {
    word: 'NIGHT',
    fact: 'When most of my best code gets written',
    category: 'personal'
  },
  {
    word: 'CRAFT',
    fact: 'I treat every UI like a piece of art',
    category: 'philosophy'
  },
  {
    word: 'VERA',
    fact: 'My productivity OS. 10 widgets, one vision.',
    category: 'project'
  },
  {
    word: 'FIGMA',
    fact: 'Design first, code second. Always.',
    category: 'tech'
  },
  {
    word: 'JULIO',
    fact: 'Hey, that\'s me. Thanks for playing!',
    category: 'personal'
  },
  {
    word: 'CALVO',
    fact: 'Common Spanish surname. Means "bald". I\'m not.',
    category: 'personal'
  },
  {
    word: 'NORTH',
    fact: 'Left Spain for Toronto. 6,000 km for a dream.',
    category: 'location'
  },
  {
    word: 'MEDIA',
    fact: '4 years of Commerce & Digital Marketing in Spain',
    category: 'education'
  },
  {
    word: 'STYLE',
    fact: 'Tailwind CSS is my go-to for styling',
    category: 'tech'
  },
  {
    word: 'PIXEL',
    fact: 'If it\'s 1px off, I will notice. And fix it.',
    category: 'philosophy'
  },
  {
    word: 'LEARN',
    fact: 'Humber Polytechnic, Multimedia Design grad',
    category: 'education'
  },
  {
    word: 'DREAM',
    fact: 'Frontend role in Toronto. Let\'s make it happen.',
    category: 'philosophy'
  },
  {
    word: 'SHIP',
    fact: 'Done beats perfect. Always ship.',
    category: 'philosophy'
  },
  {
    word: 'FRESH',
    fact: 'New grad energy, zero bad habits',
    category: 'identity'
  },
  {
    word: 'GRIND',
    fact: 'Coded every single day for a year straight',
    category: 'philosophy'
  },
  {
    word: 'FOCUS',
    fact: 'One thing at a time. Currently: getting hired.',
    category: 'philosophy'
  },
  {
    word: 'PIANO',
    fact: 'Classical music while coding keeps me focused',
    category: 'personal'
  },
  {
    word: 'TRADE',
    fact: '4 years studying Commerce in Spain',
    category: 'education'
  },
]

// Get word for today based on date
export function getTodaysWord() {
  const today = new Date()
  const startDate = new Date('2025-01-01')
  const diffTime = Math.abs(today - startDate)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const index = diffDays % WORDS.length
  return WORDS[index]
}

// Get word number (edition)
export function getWordNumber() {
  const today = new Date()
  const startDate = new Date('2025-01-01')
  const diffTime = Math.abs(today - startDate)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays + 1
}

// Valid 5-letter words for validation (common English words)
export const VALID_WORDS = new Set([
  // All our answer words
  ...WORDS.map(w => w.word.toUpperCase()),
  // Common 5-letter words for guessing
  'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
  'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
  'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE',
  'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ARROW', 'ASSET', 'AVOID', 'AWARD', 'AWARE',
  'BADGE', 'BASIC', 'BASIS', 'BEACH', 'BEGAN', 'BEGIN', 'BEING', 'BELOW', 'BENCH', 'BIRTH',
  'BLACK', 'BLADE', 'BLAME', 'BLANK', 'BLAST', 'BLEND', 'BLESS', 'BLIND', 'BLOCK', 'BLOOD',
  'BLOOM', 'BLOWN', 'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRAVE', 'BREAD',
  'BREAK', 'BRICK', 'BRIDE', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BRUSH', 'BUNCH',
  'BURST', 'BUYER', 'CABLE', 'CALIF', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS',
  'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE',
  'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOTH',
  'CLOUD', 'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRACK', 'CRANE', 'CRASH',
  'CRAZY', 'CREAM', 'CREEK', 'CRIME', 'CRISP', 'CROSS', 'CROWD', 'CROWN', 'CRUEL', 'CRUSH',
  'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DELTA',
  'DEPOT', 'DEPTH', 'DIRTY', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAIN', 'DRAMA', 'DRANK', 'DRAWN',
  'DRESS', 'DRIED', 'DRINK', 'DRIVE', 'DROVE', 'DWELL', 'EAGER', 'EARLY', 'EARTH', 'EATEN',
  'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'ESSAY',
  'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FANCY', 'FATAL', 'FAULT',
  'FAVOR', 'FEAST', 'FENCE', 'FEVER', 'FEWER', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT',
  'FINAL', 'FIRST', 'FIXED', 'FLAME', 'FLASH', 'FLEET', 'FLESH', 'FLOAT', 'FLOOD', 'FLOOR',
  'FLOUR', 'FLOWN', 'FLUID', 'FLUNG', 'FLYER', 'FOCAL', 'FORCE', 'FORGE', 'FORTH', 'FORTY',
  'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FREAK', 'FRESH', 'FRONT', 'FROST', 'FRUIT',
  'FULLY', 'FUNNY', 'GHOST', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GLORY', 'GONNA', 'GRACE',
  'GRADE', 'GRAIN', 'GRAND', 'GRANT', 'GRAPE', 'GRASP', 'GRASS', 'GRAVE', 'GREAT', 'GREEN',
  'GRIND', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'GUILT', 'HAPPY',
  'HARRY', 'HARSH', 'HAVEN', 'HEART', 'HEAVY', 'HEDGE', 'HELLO', 'HENCE', 'HENRY', 'HORSE',
  'HOTEL', 'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'IMPLY', 'INDEX', 'INNER', 'INPUT', 'INTEL',
  'INTER', 'INTRO', 'ISSUE', 'JAPAN', 'JIMMY', 'JOINT', 'JONES', 'JUDGE', 'JUICE', 'JUMBO',
  'KNIFE', 'KNOCK', 'KNOWN', 'LABEL', 'LABOR', 'LARGE', 'LASER', 'LATER', 'LATIN', 'LAUGH',
  'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEMON', 'LEVEL', 'LEVER', 'LEWIS',
  'LIGHT', 'LIMIT', 'LINKS', 'LIONS', 'LIVED', 'LIVER', 'LIVES', 'LLAMA', 'LOCAL', 'LOGIC',
  'LOOSE', 'LOTUS', 'LOVED', 'LOVER', 'LOWER', 'LOYAL', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC',
  'MAJOR', 'MAKER', 'MARCH', 'MARIA', 'MARRY', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA',
  'MERIT', 'MERRY', 'METAL', 'METER', 'MIDST', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL',
  'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVED', 'MOVER', 'MOVIE',
  'MUSIC', 'NAIVE', 'NAMED', 'NASTY', 'NAVAL', 'NEEDS', 'NERVE', 'NEVER', 'NEWER', 'NEWLY',
  'NEXUS', 'NIGHT', 'NINE', 'NOBLE', 'NOISE', 'NORTH', 'NOTED', 'NOTES', 'NOVEL', 'NURSE',
  'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'OLDER', 'OLIVE', 'OMEGA', 'ONION', 'ONSET', 'OPENS',
  'OPERA', 'OPTIC', 'ORDER', 'ORGAN', 'OTHER', 'OUGHT', 'OUTER', 'OWNED', 'OWNER', 'OXIDE',
  'OZONE', 'PAINT', 'PANEL', 'PANIC', 'PAPER', 'PARIS', 'PARKS', 'PARTY', 'PASTA', 'PASTE',
  'PATCH', 'PAUSE', 'PEACE', 'PEARL', 'PENNY', 'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIANO',
  'PIECE', 'PILOT', 'PINCH', 'PITCH', 'PIXEL', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE',
  'PLAZA', 'PLEAD', 'PLOTS', 'POINT', 'POLAR', 'POLLS', 'POUND', 'POWER', 'PRESS', 'PRICE',
  'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROBE', 'PROOF', 'PROUD', 'PROVE', 'PROXY',
  'PULSE', 'PUNCH', 'PUPIL', 'PURSE', 'QUEEN', 'QUERY', 'QUEST', 'QUICK', 'QUIET', 'QUITE',
  'QUOTA', 'QUOTE', 'RADAR', 'RADIO', 'RAISE', 'RALLY', 'RANCH', 'RANGE', 'RAPID', 'RATIO',
  'REACH', 'REACT', 'READS', 'READY', 'REALM', 'REBEL', 'REFER', 'REIGN', 'RELAX', 'REPLY',
  'RETRY', 'RIDER', 'RIDGE', 'RIFLE', 'RIGHT', 'RIGID', 'RINGS', 'RISEN', 'RISKY', 'RIVAL',
  'RIVER', 'ROADS', 'ROBOT', 'ROCKY', 'ROGER', 'ROMAN', 'ROOTS', 'ROSES', 'ROUGH', 'ROUND',
  'ROUTE', 'ROYAL', 'RUGBY', 'RULER', 'RURAL', 'SAFER', 'SAINT', 'SALAD', 'SALES', 'SALON',
  'SANDY', 'SANTA', 'SARAH', 'SATAN', 'SAUCE', 'SAVED', 'SAVER', 'SCALE', 'SCAM', 'SCENE',
  'SCOPE', 'SCORE', 'SCOUT', 'SCRAP', 'SEATS', 'SEEDS', 'SEEKS', 'SEEMS', 'SEIZE', 'SELLS',
  'SENSE', 'SERVE', 'SETUP', 'SEVEN', 'SHADE', 'SHAKE', 'SHALL', 'SHAME', 'SHAPE', 'SHARE',
  'SHARK', 'SHARP', 'SHEEP', 'SHEER', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHINE', 'SHOCK',
  'SHOOT', 'SHOPS', 'SHORE', 'SHORT', 'SHOTS', 'SHOWN', 'SHOWS', 'SIDES', 'SIGHT', 'SIGMA',
  'SIGNS', 'SILLY', 'SIMON', 'SINCE', 'SITES', 'SIXTH', 'SIXTY', 'SIZED', 'SIZES', 'SKILL',
  'SKULL', 'SLANT', 'SLATE', 'SLEEP', 'SLEPT', 'SLICE', 'SLIDE', 'SLOPE', 'SLOTS', 'SMALL',
  'SMART', 'SMELL', 'SMILE', 'SMITH', 'SMOKE', 'SNAKE', 'SOLAR', 'SOLID', 'SOLVE', 'SONGS',
  'SORRY', 'SORTS', 'SOULS', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPARK', 'SPAWN', 'SPEAK',
  'SPECS', 'SPEED', 'SPELL', 'SPEND', 'SPENT', 'SPICE', 'SPIKE', 'SPINE', 'SPLIT', 'SPOKE',
  'SPORT', 'SPOTS', 'SPRAY', 'SQUAD', 'STACK', 'STAFF', 'STAGE', 'STAIN', 'STAKE', 'STAMP',
  'STAND', 'STARK', 'STARS', 'START', 'STATE', 'STAYS', 'STEAK', 'STEAL', 'STEAM', 'STEEL',
  'STEEP', 'STEER', 'STEMS', 'STEPS', 'STEVE', 'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD',
  'STOPS', 'STORE', 'STORM', 'STORY', 'STOVE', 'STRAP', 'STRAW', 'STRIP', 'STUCK', 'STUDY',
  'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUITS', 'SUNNY', 'SUPER', 'SURGE', 'SUSAN', 'SWAMP',
  'SWEAR', 'SWEAT', 'SWEEP', 'SWEET', 'SWEPT', 'SWIFT', 'SWING', 'SWISS', 'SWORD', 'SWORN',
  'TABLE', 'TAKEN', 'TAKES', 'TALES', 'TALKS', 'TANKS', 'TASTE', 'TAXES', 'TEACH', 'TEAMS',
  'TEARS', 'TEETH', 'TELLS', 'TEMPO', 'TENDS', 'TENOR', 'TENSE', 'TENTH', 'TERMS', 'TERRY',
  'TESTS', 'TEXAS', 'TEXTS', 'THANK', 'THEFT', 'THEME', 'THERE', 'THESE', 'THICK', 'THIEF',
  'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB', 'TIGER', 'TIGHT',
  'TIMES', 'TINY', 'TIRED', 'TITLE', 'TODAY', 'TOKEN', 'TOMMY', 'TONES', 'TOOLS', 'TOOTH',
  'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOURS', 'TOWER', 'TOWNS', 'TOXIC', 'TRACE', 'TRACK',
  'TRADE', 'TRAIL', 'TRAIN', 'TRAIT', 'TRANS', 'TRASH', 'TREAT', 'TREES', 'TREND', 'TRIAL',
  'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRIPS', 'TROOP', 'TRUCK', 'TRULY', 'TRUMP', 'TRUNK',
  'TRUST', 'TRUTH', 'TUNED', 'TURNS', 'TWICE', 'TWINS', 'TWIST', 'TYING', 'TYPES', 'ULTRA',
  'UNCLE', 'UNDER', 'UNDUE', 'UNFAIR', 'UNION', 'UNITE', 'UNITS', 'UNITY', 'UNTIL', 'UPPER',
  'UPSET', 'URBAN', 'URGED', 'USAGE', 'USERS', 'USING', 'USUAL', 'VALID', 'VALUE', 'VALVE',
  'VAPOR', 'VAULT', 'VEGAS', 'VENUE', 'VERDE', 'VERSE', 'VIDEO', 'VIEWS', 'VILLA', 'VINYL',
  'VIRAL', 'VIRUS', 'VISIT', 'VITAL', 'VIVID', 'VOCAL', 'VOICE', 'VOTED', 'VOTER', 'VOTES',
  'WAGES', 'WAGON', 'WAIST', 'WALKS', 'WALLS', 'WANTS', 'WARNS', 'WASTE', 'WATCH', 'WATER',
  'WAVES', 'Wayne', 'WEEKS', 'WEIGH', 'WEIRD', 'WELLS', 'WELSH', 'WHALE', 'WHEAT', 'WHEEL',
  'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WIDTH', 'WILLS', 'WINES', 'WINGS',
  'WIPED', 'WIRED', 'WIRES', 'WITCH', 'WIVES', 'WOMAN', 'WOMEN', 'WOODS', 'WORDS', 'WORKS',
  'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WOUND', 'WRATH', 'WRECK', 'WRITE',
  'WRONG', 'WROTE', 'XEROX', 'YACHT', 'YARDS', 'YEARS', 'YEAST', 'YIELD', 'YOUNG', 'YOURS',
  'YOUTH', 'ZONES', 'ZONED',
])

export function isValidWord(word) {
  return VALID_WORDS.has(word.toUpperCase())
}
