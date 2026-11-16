import type { Project } from '../data/projects'
import './ProjectCard.css'

export function Stars({ n }: { n: number }) {
  return (
    <span className="stars" aria-label={`${n} stars`}>
      {'★'.repeat(n)}
    </span>
  )
}

export function ProjectCard({ p, className = '' }: { p: Project; className?: string }) {
  return (
    <article className={`pcard r${p.rarity} ${className}`}>
      <div className="pcard-top">
        <Stars n={p.rarity} />
        <span className="pcard-shine" aria-hidden="true" />
      </div>
      <h3 className="pcard-title">{p.title}</h3>
      <p className="pcard-desc">{p.description}</p>
      <div className="pcard-tags">
        {p.tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
      <div className="pcard-links">
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer">
            ⌥ Code
          </a>
        )}
        {p.link && (
          <a href={p.link} target="_blank" rel="noreferrer">
            ↗ {p.linkLabel ?? 'Visit'}
          </a>
        )}
      </div>
    </article>
  )
}
