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

// Shown on the character sheet in the "Warm-up" section. Levels are out of 90.
export const skills: { name: string; level: number }[] = [
  { name: 'Python', level: 80 },
  { name: 'Swift / iOS', level: 70 },
  { name: 'C', level: 68 },
  { name: 'Kotlin / Android', level: 66 },
  { name: 'Java', level: 62 },
  { name: 'JavaScript / React', level: 60 },
  { name: 'SQL', level: 55 },
]

export const talents = [
  { name: 'Triple Salchow', desc: 'Lands on one blade and one braincell.' },
  { name: 'Plot Twist', desc: 'Writes chapters faster than they can be edited.' },
  { name: 'Hard Pity', desc: 'Never gives up. Statistically, eventually wins.' },
]
