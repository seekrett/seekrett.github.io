import { Suspense } from 'react'
import { Backdrop } from './components/Backdrop'
import { SparkleCursor } from './components/SparkleCursor'
import { SkateNav, type NavStop } from './components/SkateNav'
import { ActivityHost } from './components/ActivityHost'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Writing } from './sections/Writing'
import { Contact } from './sections/Contact'
import { useActivityRoute } from './useHashRoute'

// The page is laid out like a skating program: each section is an element.
const stops: NavStop[] = [
  { id: 'home', label: 'Opening Pose', icon: '⛸' },
  { id: 'about', label: 'Warm-up', icon: '✿' },
  { id: 'projects', label: 'Project Banner', icon: '✦' },
  { id: 'writing', label: 'Library', icon: '❦' },
  { id: 'contact', label: 'Kiss & Cry', icon: '♡' },
]

export default function App() {
  const activityId = useActivityRoute()

  return (
    <>
      <Backdrop />
      <SparkleCursor />
      <SkateNav stops={stops} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Writing />
        <Contact />
      </main>
      <Suspense fallback={null}>
        <ActivityHost id={activityId} />
      </Suspense>
    </>
  )
}
