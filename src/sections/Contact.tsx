import { useRef } from 'react'
import { profile } from '../data/profile'
import { useReveal } from '../useReveal'
import './Contact.css'

const LINK_INFO: Record<string, { label: string; icon: string; judge: string }> = {
  github: { label: 'GitHub', icon: '⌥', judge: 'Technical score' },
  linkedin: { label: 'LinkedIn', icon: 'in', judge: 'Professional score' },
  email: { label: 'Email', icon: '✉', judge: 'Say hello' },
  resume: { label: 'Résumé', icon: '❏', judge: 'Full protocol' },
}

const GIFTS = ['🧸', '💐', '🌸', '🎀', '🐰', '🌷', '💖']

/** "Kiss & Cry": contact links on a scoreboard. Fans can throw plushies onto the ice. */
export function Contact() {
  const ref = useReveal<HTMLElement>()
  const iceRef = useRef<HTMLDivElement>(null)

  const throwGift = () => {
    const ice = iceRef.current
    if (!ice) return
    for (let i = 0; i < 6; i++) {
      const g = document.createElement('span')
      g.className = 'thrown-gift'
      g.textContent = GIFTS[Math.floor(Math.random() * GIFTS.length)]
      g.style.left = `${8 + Math.random() * 84}%`
      g.style.animationDelay = `${i * 0.08}s`
      g.style.setProperty('--rot', `${(Math.random() - 0.5) * 120}deg`)
      ice.appendChild(g)
      g.addEventListener('animationend', () => setTimeout(() => g.remove(), 2500))
    }
  }

  const links = Object.entries(profile.links).filter(([, v]) => v)

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="section-head reveal">
        <span className="eyebrow">the scores are in</span>
        <h2 className="section-title">Kiss &amp; Cry</h2>
        <p className="section-sub">
          Hiring, collaborating, or just want to talk about your latest pull? My scoreboard is always open.
        </p>
      </div>

      <div className="scoreboard reveal">
        <div className="score-head">
          <span>{profile.name.toUpperCase()}</span>
          <span className="score-total">
            TOTAL <strong>∞</strong>
          </span>
        </div>
        <ul className="score-rows">
          {links.map(([key, href]) => {
            const info = LINK_INFO[key] ?? { label: key, icon: '↗', judge: 'Link' }
            const url = key === 'email' ? `mailto:${href}` : href!
            return (
              <li key={key}>
                <span className="score-judge">{info.judge}</span>
                <a href={url} target={key === 'email' ? undefined : '_blank'} rel="noreferrer">
                  <span className="score-icon" aria-hidden="true">
                    {info.icon}
                  </span>
                  {info.label}
                </a>
              </li>
            )
          })}
        </ul>
        <div className="score-rank">Personal best ✦ Rank #1 in our hearts</div>
      </div>

      <div className="mini-ice reveal" ref={iceRef}>
        <button className="btn btn-ghost" onClick={throwGift}>
          🧸 Throw a plushie onto the ice
        </button>
      </div>

      <footer className="footer">
        made with ♡, React and too many pulls · © {new Date().getFullYear()} {profile.name}
      </footer>
    </section>
  )
}
