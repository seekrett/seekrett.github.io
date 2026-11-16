// ✏️ Your project collection. Add, remove or reorder freely.
// rarity: 5 = featured (gold), 4 = notable (purple), 3 = smaller/coursework (blue)

export type Project = {
  title: string
  description: string
  rarity: 3 | 4 | 5
  tags: string[]
  repo?: string // GitHub link
  link?: string // live demo, App Store, Devpost, etc.
  linkLabel?: string
}

export const projects: Project[] = [
  {
    title: 'Better Together',
    description: 'An iOS health companion app for all kinds of patients: medications, check-ins and care, all in one gentle place.',
    rarity: 5,
    tags: ['Swift', 'iOS', 'Health'],
    repo: 'https://github.com/seekrett/better-together',
  },
  {
    title: 'Gacha Chores',
    description: 'An iOS app that turns your to-do list into a gacha game. Finish tasks, earn pulls, and finally get rewarded for doing the dishes.',
    rarity: 5,
    tags: ['Swift', 'iOS', 'Gamification'],
    repo: 'https://github.com/seekrett/gacha-chores',
  },
  {
    title: 'Network Ad Blocker',
    description: 'A network-level ad blocker written in C that filters ad and tracker domains for every device on the network.',
    rarity: 4,
    tags: ['C', 'Networking', 'Security'],
    repo: 'https://github.com/seekrett/ad-blocker',
  },
  {
    title: 'CTF Write-Ups',
    description: 'A collection of write-ups for the capture-the-flag challenges I have solved: reversing, web, crypto and forensics.',
    rarity: 4,
    tags: ['Security', 'CTF'],
    repo: 'https://github.com/seekrett/CTF-Write-Ups',
  },
  {
    title: 'Fitness Flex Bot',
    description: 'A Python bot that keeps a group accountable for workouts, tracking streaks and flexing on the slackers.',
    rarity: 4,
    tags: ['Python', 'Bot'],
    repo: 'https://github.com/seekrett/fitness-flex-bot',
  },
  {
    title: 'Advent of Code 2025',
    description: 'My solutions to Advent of Code 2025, one festive puzzle a day.',
    rarity: 3,
    tags: ['Python', 'Algorithms'],
    repo: 'https://github.com/seekrett/aoc-2025',
  },
]

export const githubProfile = 'https://github.com/seekrett?tab=repositories'
