// ✏️ Your bookshelf. The entries below are SAMPLES — replace them with your real works.
// `color` is the spine/cover colour, `link` is where people can read it (Wattpad, AO3, etc.)

export type Book = {
  title: string
  genre: string
  status: 'Ongoing' | 'Completed' | 'Hiatus' | 'Coming soon'
  synopsis: string
  color: string
  link?: string
  platform?: string
  chapters?: number
}

export const books: Book[] = [
  {
    title: 'Edges of Silver Ice',
    genre: 'Romance · Sports',
    status: 'Ongoing',
    synopsis: 'Sample entry: a retired skater coaches the rival who ended her career. Replace this with one of your real stories.',
    color: '#ff8fc2',
    platform: 'Wattpad',
    chapters: 12,
  },
  {
    title: 'Ninety Pulls to You',
    genre: 'Rom-com · Fantasy',
    status: 'Completed',
    synopsis: 'Sample entry: she spent her savings on a summoning banner. She did not expect the summon to talk back.',
    color: '#b9a3ff',
    platform: 'AO3',
    chapters: 24,
  },
  {
    title: 'The Glass Orchard',
    genre: 'Fantasy',
    status: 'Coming soon',
    synopsis: 'Sample entry: a quiet story about a girl who grows memories on trees.',
    color: '#8fd3f4',
  },
]
