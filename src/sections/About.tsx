import { profile, talents } from '../data/profile'
import { Inventory } from '../components/Inventory'
import { useReveal } from '../useReveal'
import './About.css'

/** "Warm-up": an about-me styled like a gacha character profile. */
export function About() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="about" className="section" ref={ref}>
      <div className="section-head reveal">
        <span className="eyebrow">warm-up</span>
        <h2 className="section-title">Character Profile</h2>
      </div>

      <div className="about-grid">
        <div className="char-card card reveal">
          <div className="char-portrait">
            <span className="char-initial">{profile.name[0]}</span>
            <span className="char-orbit o1">✦</span>
            <span className="char-orbit o2">❄</span>
            <span className="char-orbit o3">♡</span>
          </div>
          <div className="char-meta">
            <h3>{profile.name}</h3>
            <span className="stars char-stars" aria-label="5 stars">
              ★★★★★
            </span>
            <dl>
              <div>
                <dt>Element</dt>
                <dd>❄ Ice</dd>
              </div>
              <div>
                <dt>Weapon</dt>
                <dd>⌨ Keyboard</dd>
              </div>
              <div>
                <dt>Class</dt>
                <dd>CS Graduate</dd>
              </div>
              <div>
                <dt>Main quest</dt>
                <dd>A safer internet for kids</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="about-right">
          <div className="card about-bio reveal">
            <h3 className="about-h">Story</h3>
            {profile.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="card about-talents reveal">
            <h3 className="about-h">Talents</h3>
            <ul>
              {talents.map((t) => (
                <li key={t.name}>
                  <strong>{t.name}</strong>
                  <span>{t.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Inventory />
    </section>
  )
}
