import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import './Hero.css'

const LOOP = 'M220 150 C 260 70, 400 70, 400 150 C 400 230, 260 230, 220 150 C 180 70, 40 70, 40 150 C 40 230, 180 230, 220 150 Z'

function useTypewriter(words: string[]) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[i % words.length]
    const done = !deleting && text === word
    const empty = deleting && text === ''
    const delay = done ? 1600 : empty ? 300 : deleting ? 35 : 70
    const t = setTimeout(() => {
      if (done) setDeleting(true)
      else if (empty) {
        setDeleting(false)
        setI((n) => n + 1)
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, i, words])
  return text
}

export function Hero() {
  const role = useTypewriter(profile.roles)
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="section hero">
      <div className="hero-copy">
        <span className="eyebrow hero-hi">hi hi, I'm</span>
        <h1 className="hero-name" aria-label={profile.name}>
          {profile.name.split('').map((ch, i) => (
            <span key={i} style={{ animationDelay: `${0.15 + i * 0.09}s` }} aria-hidden="true">
              {ch}
            </span>
          ))}
          <span className="hero-sparkle" aria-hidden="true">
            ✦
          </span>
        </h1>
        <p className="hero-role">
          <span className="hero-role-prefix">a</span> <span className="hero-role-word">{role}</span>
          <span className="caret" aria-hidden="true" />
        </p>
        <p className="hero-tagline">{profile.tagline}</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => go('projects')}>
            ✦ Pull for a project
          </button>
          <button className="btn btn-ghost" onClick={() => go('writing')}>
            ❦ Read my stories
          </button>
        </div>
      </div>

      <div className="hero-rink" aria-hidden="true">
        <svg viewBox="0 0 440 300">
          <defs>
            <radialGradient id="ice" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#eef9ff" />
              <stop offset="100%" stopColor="#d6efff" />
            </radialGradient>
          </defs>
          <rect x="6" y="6" width="428" height="288" rx="140" fill="url(#ice)" stroke="#9fdcf7" strokeWidth="6" />
          <rect x="6" y="6" width="428" height="288" rx="140" fill="none" stroke="#fff" strokeWidth="2" />
          <line x1="220" y1="10" x2="220" y2="290" stroke="#ffcde4" strokeWidth="3" />
          <circle cx="220" cy="150" r="34" fill="none" stroke="#ffcde4" strokeWidth="3" />
          <circle cx="110" cy="150" r="5" fill="#ffa6cf" />
          <circle cx="330" cy="150" r="5" fill="#ffa6cf" />

          <path d={LOOP} fill="none" stroke="#dcecf7" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
          <path d={LOOP} pathLength={1} fill="none" stroke="#ff7eb6" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="0.22 0.78">
            {/* same clock as the skater below, so the trail always follows right behind */}
            <animate attributeName="stroke-dashoffset" values="0.22;-0.78" dur="7s" repeatCount="indefinite" />
          </path>

          <g className="rink-skater">
            <circle r="15" fill="#fff" stroke="#f2559b" strokeWidth="3" />
            <text y="6" textAnchor="middle" fontSize="16">
              ⛸
            </text>
            <animateMotion dur="7s" repeatCount="indefinite" path={LOOP} rotate="auto" />
          </g>

          <text className="rink-spark s1" x="380" y="60">✦</text>
          <text className="rink-spark s2" x="50" y="250">✧</text>
          <text className="rink-spark s3" x="300" y="270">♡</text>
          <text className="rink-spark s4" x="70" y="55">❄</text>
        </svg>
        <p className="rink-caption">figure eight, but make it pink</p>
      </div>

      <button className="hero-scroll" onClick={() => go('about')} aria-label="Scroll to the next section">
        <span>scroll to skate on</span>
        <span className="hero-scroll-arrow">↓</span>
      </button>
    </section>
  )
}
