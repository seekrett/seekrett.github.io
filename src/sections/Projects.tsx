import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, githubProfile, type Project } from '../data/projects'
import { activities } from '../activities'
import { openActivity } from '../useHashRoute'
import { ProjectCard, Stars } from '../components/ProjectCard'
import { useReveal } from '../useReveal'
import './Projects.css'

const PITY = 5 // guaranteed 5★ on this pull

function pull(pity: number): Project {
  const by = (r: number) => projects.filter((p) => p.rarity === r)
  const roll = Math.random()
  let rarity: number = roll < 0.2 ? 5 : roll < 0.55 ? 4 : 3
  if (pity + 1 >= PITY) rarity = 5
  let pool = by(rarity)
  for (let r = rarity; pool.length === 0 && r >= 3; r--) pool = by(r) // fall back if a tier is empty
  if (pool.length === 0) pool = projects
  return pool[Math.floor(Math.random() * pool.length)]
}

/** "Project Banner": a gacha-style showcase of projects, plus any playable limited events. */
export function Projects() {
  const ref = useReveal<HTMLElement>()
  const [pity, setPity] = useState(0)
  const [result, setResult] = useState<Project | null>(null)
  const [phase, setPhase] = useState<'star' | 'card'>('star')

  const doPull = () => {
    const p = pull(pity)
    setPity(p.rarity === 5 ? 0 : pity + 1)
    setPhase('star')
    setResult(p)
  }

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="section-head reveal">
        <span className="eyebrow">rate up!</span>
        <h2 className="section-title">Project Banner</h2>
        <p className="section-sub">
          Things I've built. Make a wish to pull a random one, or scroll down to see the whole collection. No real currency
          required.
        </p>
      </div>

      <div className="banner reveal">
        <div className="banner-art" aria-hidden="true">
          <span className="banner-star b1">✦</span>
          <span className="banner-star b2">✧</span>
          <span className="banner-star b3">✦</span>
          <span className="banner-orb">✦</span>
        </div>
        <div className="banner-copy">
          <span className="banner-tag">Featured Wish</span>
          <h3>Starlit Repositories</h3>
          <p>
            Rate up on: <strong>{projects.filter((p) => p.rarity === 5).map((p) => p.title).join(' · ')}</strong>
          </p>
          <div className="banner-actions">
            <button className="btn btn-primary wish-btn" onClick={doPull}>
              ✦ Wish ×1
            </button>
            <span className="pity">
              Pity {pity}/{PITY}
              <small>guaranteed ★5 at {PITY}</small>
            </span>
          </div>
        </div>
      </div>

      {activities.length > 0 && (
        <div className="events reveal">
          {activities.map((a) => (
            <article key={a.id} className="event-card">
              <span className="event-ribbon">Limited Event</span>
              <span className="event-emoji" aria-hidden="true">
                {a.emoji}
              </span>
              <div className="event-copy">
                <h3>{a.title}</h3>
                <p>{a.blurb}</p>
                {a.ends && <small>{a.ends} · playable right here</small>}
              </div>
              <button className="btn btn-primary" onClick={() => openActivity(a.id)}>
                Play ▶
              </button>
            </article>
          ))}
        </div>
      )}

      <h3 className="collection-title reveal">
        Collection <span>{projects.length} obtained</span>
      </h3>
      <div className="collection">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} className="reveal" />
        ))}
      </div>
      <p className="collection-more reveal">
        <a className="btn btn-ghost" href={githubProfile} target="_blank" rel="noreferrer">
          See every repo on GitHub ↗
        </a>
      </p>

      <AnimatePresence>
        {result && (
          <motion.div
            className={`pull-overlay r${result.rarity}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => (phase === 'star' ? setPhase('card') : setResult(null))}
            role="dialog"
            aria-modal="true"
            aria-label="Wish result"
          >
            {phase === 'star' ? (
              <motion.div
                key="star"
                className="pull-meteor"
                initial={{ x: '-60vw', y: '-50vh', scale: 0.4 }}
                animate={{ x: 0, y: 0, scale: [0.4, 0.6, 2.4] }}
                transition={{ duration: 1.5, ease: [0.5, 0, 0.75, 0] }}
                onAnimationComplete={() => setPhase('card')}
              >
                ✦
              </motion.div>
            ) : (
              <motion.div
                key="card"
                className="pull-result"
                initial={{ rotateY: 90, scale: 0.7 }}
                animate={{ rotateY: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 160, damping: 14 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pull-glow" aria-hidden="true" />
                <p className="pull-new">
                  <Stars n={result.rarity} /> NEW!
                </p>
                <ProjectCard p={result} />
                <div className="pull-actions">
                  <button className="btn btn-primary" onClick={doPull}>
                    ✦ Wish again
                  </button>
                  <button className="btn btn-ghost" onClick={() => setResult(null)}>
                    Close
                  </button>
                </div>
              </motion.div>
            )}
            {phase === 'star' && <span className="pull-skip">tap to skip</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
