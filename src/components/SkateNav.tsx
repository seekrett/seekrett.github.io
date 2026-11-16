import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SkateIcon } from './SkateIcon'
import './SkateNav.css'

export type NavStop = { id: string; label: string; icon: string }

/**
 * Navigation as an ice track: a rail on the left (a floating pill on phones)
 * with a skate that glides to whichever section you are looking at.
 */
export function SkateNav({ stops }: { stops: NavStop[] }) {
  const [active, setActive] = useState(stops[0].id)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const trackRef = useRef<HTMLDivElement>(null)

  // Track which section is in the middle of the screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    stops.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [stops])

  // Move the skate to the active stop.
  useLayoutEffect(() => {
    const place = () => {
      const b = btnRefs.current[active]
      if (b) setPos({ x: b.offsetLeft + b.offsetWidth / 2, y: b.offsetTop + b.offsetHeight / 2 })
    }
    place()
    // Re-measure whenever the rail changes size (fonts loading, rotating a phone, etc.)
    const ro = new ResizeObserver(place)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [active])

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const activeIndex = stops.findIndex((s) => s.id === active)

  return (
    <nav className="skate-nav" aria-label="Sections">
      <div className="skate-track" ref={trackRef}>
        <div
          className="skate-trail"
          style={{ '--progress': activeIndex / (stops.length - 1) } as React.CSSProperties}
        />
        {stops.map((s) => (
          <button
            key={s.id}
            ref={(el) => {
              btnRefs.current[s.id] = el
            }}
            className={`skate-stop${s.id === active ? ' is-active' : ''}`}
            onClick={() => go(s.id)}
            aria-current={s.id === active ? 'true' : undefined}
          >
            <span className="skate-dot" aria-hidden="true">
              {s.icon}
            </span>
            <span className="skate-label">{s.label}</span>
          </button>
        ))}
        <div className="skate-runner" style={{ '--x': `${pos.x}px`, '--y': `${pos.y}px` } as React.CSSProperties}>
          <SkateIcon size={30} />
        </div>
      </div>
    </nav>
  )
}
