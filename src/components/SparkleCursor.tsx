import { useEffect } from 'react'
import { useReducedMotion } from '../useReducedMotion'
import './SparkleCursor.css'

const GLYPHS = ['✦', '✧', '⋆', '♡']

/** A little trail of sparkles that follows the mouse (desktop only). */
export function SparkleCursor() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    let last = 0
    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - last < 45) return
      last = now
      const s = document.createElement('span')
      s.className = 'cursor-sparkle'
      s.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      s.style.left = `${e.clientX}px`
      s.style.top = `${e.clientY}px`
      s.style.setProperty('--dx', `${(Math.random() - 0.5) * 30}px`)
      s.style.fontSize = `${10 + Math.random() * 8}px`
      document.body.appendChild(s)
      s.addEventListener('animationend', () => s.remove())
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])

  return null
}
