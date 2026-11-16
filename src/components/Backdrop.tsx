import { useMemo } from 'react'
import './Backdrop.css'

const GLYPHS = ['❄', '✦', '✧', '♡', '❅', '·']

/** Fixed background: drifting colour blobs, faint skate scratches and falling snow/sparkles. */
export function Backdrop() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        i,
        glyph: GLYPHS[i % GLYPHS.length],
        left: Math.random() * 100,
        size: 8 + Math.random() * 14,
        duration: 14 + Math.random() * 18,
        delay: -Math.random() * 30,
        drift: (Math.random() - 0.5) * 120,
      })),
    [],
  )

  return (
    <div className="backdrop" aria-hidden="true">
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />
      <svg className="scratches" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path d="M-50 620 C 250 480, 520 760, 820 560 S 1150 380, 1300 470" />
        <path d="M-80 300 C 200 200, 380 420, 640 300 S 1000 120, 1280 230" />
        <path d="M100 820 C 300 650, 700 700, 900 780" />
        <ellipse cx="930" cy="610" rx="120" ry="48" />
      </svg>
      {flakes.map((f) => (
        <span
          key={f.i}
          className="flake"
          style={
            {
              left: `${f.left}%`,
              fontSize: `${f.size}px`,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              '--drift': `${f.drift}px`,
            } as React.CSSProperties
          }
        >
          {f.glyph}
        </span>
      ))}
    </div>
  )
}
