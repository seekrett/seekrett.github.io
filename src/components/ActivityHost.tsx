import { useEffect } from 'react'
import { activities } from '../activities'
import { closeActivity } from '../useHashRoute'
import './ActivityHost.css'

/** Full-screen overlay that runs a playable activity from src/activities. */
export function ActivityHost({ id }: { id: string | null }) {
  const activity = activities.find((a) => a.id === id)

  useEffect(() => {
    if (!activity) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeActivity()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [activity])

  if (!activity) return null
  const { Component } = activity

  return (
    <div className="activity-overlay" role="dialog" aria-modal="true" aria-label={activity.title}>
      <div className="activity-window">
        <header className="activity-bar">
          <span className="activity-name">
            {activity.emoji} {activity.title}
          </span>
          <button className="activity-close" onClick={closeActivity} aria-label="Close and go back to the portfolio">
            ✕
          </button>
        </header>
        <div className="activity-body">
          <Component />
        </div>
      </div>
    </div>
  )
}
