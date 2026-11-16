import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

// Playable mini-projects that run right here on the site.
// Each one shows up as a "Limited Event" card in the Projects section and opens
// at https://seekrett.github.io/#/play/<id>.
//
// To remove an activity: delete its folder in src/activities/ and its entry below.
// When this list is empty, the event card disappears and nothing else changes.

export type Activity = {
  id: string
  title: string
  blurb: string
  emoji: string
  ends?: string // shown on the card, purely cosmetic
  Component: LazyExoticComponent<ComponentType>
}

export const activities: Activity[] = [
  {
    id: 'gift-draw',
    title: 'Gift Exchange Draw',
    blurb: 'Pick a name out of the box for our gift exchange. Every name can only be drawn once!',
    emoji: '🎁',
    ends: 'Limited holiday event',
    Component: lazy(() => import('./gift-draw/GiftDraw')),
  },
]
