// ✏️ Edit this file to change the text about you across the site.

export const profile = {
  name: 'Yuto',
  handle: 'seekrett',
  tagline: 'CS grad · programmer · writer · retired figure skater · professional gacha gambler',
  roles: ['software engineer', 'storyteller', 'ex-competitive skater', 'certified 50/50 loser', 'internet safety nerd'],
  bio: [
    "Hi! I'm Yuto, a computer science graduate who wants to make the internet a safer place for kids.",
    "I grew up on the ice as a competitive figure skater, which taught me that every clean landing is built on a thousand falls. I bring that same stubbornness to debugging.",
    'Off the clock you will find me writing stories, saving up pulls in Love & Deepspace and Genshin Impact, and making everything I touch a little more pink.',
  ],
  links: {
    github: 'https://github.com/seekrett',
    // Uncomment and fill these in to show them in the "Kiss & Cry" section:
    // linkedin: 'https://www.linkedin.com/in/your-handle',
    // email: 'you@example.com',
    // resume: '/resume.pdf', // put resume.pdf in the /public folder
  } as Record<string, string | undefined>,
}

// The "Inventory" in the Warm-up section. No levels, no bars: each item says
// what it is and which projects it was used in (the little ×N badge is that count).
//
// shape: the item art (gem, potion, scroll, book, feather, orb)
// mark:  1-3 characters drawn on the item, in place of a real logo
// usedIn: project titles; they don't have to match src/data/projects.ts exactly

export type ItemCategory = 'language' | 'framework' | 'tool' | 'skill'
export type ItemShape = 'gem' | 'potion' | 'scroll' | 'book' | 'feather' | 'orb'

export type Item = {
  name: string
  category: ItemCategory
  shape: ItemShape
  mark: string
  flavor: string
  usedIn: string[]
}

export const itemCategories: { id: ItemCategory; label: string; icon: string }[] = [
  { id: 'language', label: 'Languages', icon: '◆' },
  { id: 'framework', label: 'Frameworks', icon: '⚗' },
  { id: 'tool', label: 'Tools', icon: '✎' },
  { id: 'skill', label: 'Skills', icon: '❦' },
]

export const inventory: Item[] = [
  // Languages: gems
  {
    name: 'Python',
    category: 'language',
    shape: 'gem',
    mark: 'Py',
    flavor: 'A versatile gem that fits almost any build. Favored for bots, scripts and late-night puzzle solving.',
    usedIn: ['Fitness Flex Bot', 'Advent of Code 2025', 'Christmas Gift Picker'],
  },
  {
    name: 'Swift',
    category: 'language',
    shape: 'gem',
    mark: 'Sw',
    flavor: 'Light and quick, like a bird. Channels its power into apps that live in your pocket.',
    usedIn: ['Better Together', 'Gacha Chores'],
  },
  {
    name: 'C',
    category: 'language',
    shape: 'gem',
    mark: 'C',
    flavor: 'An ancient, unforgiving stone. Grants direct control over memory, at the cost of the occasional segfault.',
    usedIn: ['Network Ad Blocker', 'Systems coursework'],
  },
  {
    name: 'Kotlin',
    category: 'language',
    shape: 'gem',
    mark: 'Kt',
    flavor: 'A gem attuned to Android. Concise, null-safe and pleasant to wield.',
    usedIn: ['Android coursework'],
  },
  {
    name: 'Java',
    category: 'language',
    shape: 'gem',
    mark: 'Jv',
    flavor: 'A sturdy, well-documented gem found in nearly every CS curriculum.',
    usedIn: ['Coursework'],
  },
  {
    name: 'TypeScript',
    category: 'language',
    shape: 'gem',
    mark: 'TS',
    flavor: 'JavaScript with armor on. Catches bugs before they ever reach the rink.',
    usedIn: ['This portfolio'],
  },
  {
    name: 'SQL',
    category: 'language',
    shape: 'gem',
    mark: 'SQL',
    flavor: 'Speaks fluently with databases. Ask it the right question and it answers in rows.',
    usedIn: ['Database coursework'],
  },

  // Frameworks: potions
  {
    name: 'React',
    category: 'framework',
    shape: 'potion',
    mark: 'Re',
    flavor: 'Brew interfaces from small reusable components. This very page was mixed with it.',
    usedIn: ['This portfolio'],
  },
  {
    name: 'iOS Development',
    category: 'framework',
    shape: 'potion',
    mark: 'iOS',
    flavor: 'A potion distilled from Xcode and patience. Builds native apps for iPhone.',
    usedIn: ['Better Together', 'Gacha Chores'],
  },
  {
    name: 'Android Development',
    category: 'framework',
    shape: 'potion',
    mark: 'And',
    flavor: 'Activities, fragments and coroutines, all bottled up together.',
    usedIn: ['Android coursework'],
  },
  {
    name: 'Flutter',
    category: 'framework',
    shape: 'potion',
    mark: 'Fl',
    flavor: 'One recipe, two platforms. Used to prototype a step-tracking app.',
    usedIn: ['Pedometer proof of concept'],
  },

  // Tools: scrolls
  {
    name: 'Git & GitHub',
    category: 'tool',
    shape: 'scroll',
    mark: 'Git',
    flavor: 'A scroll that remembers every change ever made. Essential for any party.',
    usedIn: ['Every project'],
  },
  {
    name: 'Linux',
    category: 'tool',
    shape: 'scroll',
    mark: '>_',
    flavor: 'Inscribed with commands that open every door, provided you remember sudo.',
    usedIn: ['Network Ad Blocker', 'CTF Write-Ups'],
  },
  {
    name: 'Networking',
    category: 'tool',
    shape: 'orb',
    mark: 'DNS',
    flavor: 'An orb that sees every packet go by and quietly drops the ads.',
    usedIn: ['Network Ad Blocker'],
  },

  // Skills: books and feathers
  {
    name: 'Security & CTFs',
    category: 'skill',
    shape: 'book',
    mark: 'CTF',
    flavor: 'A tome of reversing, web, crypto and forensics. Studied to make the internet safer for kids.',
    usedIn: ['CTF Write-Ups', 'Network Ad Blocker'],
  },
  {
    name: 'Technical Writing',
    category: 'skill',
    shape: 'feather',
    mark: 'Aa',
    flavor: 'A quill that turns tangled problems into clear write-ups and docs.',
    usedIn: ['CTF Write-Ups', 'Project READMEs'],
  },
  {
    name: 'Storytelling',
    category: 'skill',
    shape: 'feather',
    mark: '❦',
    flavor: 'The same quill, enchanted for fiction. See the Library for its works.',
    usedIn: ['The Library'],
  },
  {
    name: 'Discipline',
    category: 'skill',
    shape: 'book',
    mark: '⛸',
    flavor: 'Forged over years of early-morning ice time. Fall, get up, try the jump again.',
    usedIn: ['Competitive figure skating'],
  },
]

export const talents = [
  { name: 'Triple Salchow', desc: 'Lands on one blade and one braincell.' },
  { name: 'Plot Twist', desc: 'Writes chapters faster than they can be edited.' },
  { name: 'Hard Pity', desc: 'Never gives up. Statistically, eventually wins.' },
]
