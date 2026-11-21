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
    blurb: 'Pick your name, enter the secret code the host sent you, and find out who you are gifting. Shh!',
    emoji: '🎁',
    ends: 'Limited holiday event',
    Component: lazy(() => import('./gift-draw/GiftDraw')),
  },
]
