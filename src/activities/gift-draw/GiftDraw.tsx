import { useState } from 'react'
import { cleanNames, useGiftDraw } from './useGiftDraw'
import './GiftDraw.css'

type Phase = 'box' | 'opening' | 'hidden' | 'revealed'

const CONFETTI = ['✦', '♡', '❄', '✧', '🎀']

export default function GiftDraw() {
  const { state, start, draw, reset, clear } = useGiftDraw()
  const [phase, setPhase] = useState<Phase>('box')
  const [drawer, setDrawer] = useState<string | null>(null)
  const [picked, setPicked] = useState<string | null>(null)

  if (state.names.length === 0) return <Setup onStart={start} />

  const waiting = state.names.filter((n) => !state.drawn.includes(n))
  const finished = state.pool.length === 0
  const needsDrawer = state.noSelf
  const canDraw = !finished && (!needsDrawer || drawer !== null)
  const anyDrawn = state.pool.length < state.names.length

  const openBox = () => {
    if (!canDraw) return
    const name = draw(drawer)
    if (!name) return
    setPicked(name)
    setPhase('opening')
    setTimeout(() => setPhase('hidden'), 1500)
  }

  const passOn = () => {
    setPicked(null)
    setDrawer(null)
    setPhase('box')
  }

  if (phase !== 'box' && picked) {
    return (
      <div className="gd">
        <div className={`gd-stage is-${phase}`}>
          <GiftBox opening />
          {phase !== 'opening' && (
            <button
              className={`gd-slip ${phase === 'revealed' ? 'is-revealed' : ''}`}
              onClick={() => setPhase('revealed')}
              disabled={phase === 'revealed'}
            >
              {phase === 'revealed' ? (
                <>
                  <span className="gd-slip-label">{drawer ? `${drawer}, you're gifting` : "You're gifting"}</span>
                  <span className="gd-slip-name">{picked}</span>
                </>
              ) : (
                <span className="gd-slip-tap">tap to reveal 🤫</span>
              )}
            </button>
          )}
          {phase === 'revealed' && (
            <div className="gd-confetti" aria-hidden="true">
              {Array.from({ length: 18 }, (_, i) => (
                <span
                  key={i}
                  style={
                    {
                      '--x': `${(i / 17 - 0.5) * 340}px`,
                      '--d': `${(i % 5) * 0.06}s`,
                    } as React.CSSProperties
                  }
                >
                  {CONFETTI[i % CONFETTI.length]}
                </span>
              ))}
            </div>
          )}
        </div>
        {phase === 'revealed' && (
          <div className="gd-center">
            <p className="gd-hint">Remember it, keep it secret, then hide it before passing the device on!</p>
            <button className="btn btn-primary" onClick={passOn}>
              Got it, hide &amp; pass it on
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="gd">
      <div className="gd-stage">
        <GiftBox />
        <p className="gd-count">
          {finished ? (
            <>Everyone has a giftee! Happy gifting 🎁</>
          ) : (
            <>
              <strong>{state.pool.length}</strong> {state.pool.length === 1 ? 'name' : 'names'} left in the box
            </>
          )}
        </p>
      </div>

      {!finished && needsDrawer && (
        <div className="gd-center">
          <p className="gd-label">Who's drawing?</p>
          <div className="gd-chips" role="radiogroup" aria-label="Who is drawing">
            {waiting.map((n) => (
              <button
                key={n}
                role="radio"
                aria-checked={drawer === n}
                className={`gd-chip${drawer === n ? ' is-on' : ''}`}
                onClick={() => setDrawer(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      {!finished && (
        <div className="gd-center">
          <button className="btn btn-primary gd-draw" onClick={openBox} disabled={!canDraw}>
            🎁 Open the box
          </button>
        </div>
      )}

      <details className="gd-host">
        <summary>Host options</summary>
        <p>
          {state.names.length} people · {state.noSelf ? "can't draw themselves" : 'anyone can draw any name'} · progress is
          saved in this browser, so do all the draws on this device.
        </p>
        <div className="gd-host-actions">
          {!anyDrawn ? (
            <button className="btn btn-ghost" onClick={clear}>
              Edit names
            </button>
          ) : (
            <button
              className="btn btn-ghost"
              onClick={() => confirm('Put every name back in the box and start the draw over?') && reset()}
            >
              Restart draw
            </button>
          )}
          <button
            className="btn btn-ghost"
            onClick={() => confirm('Delete all names and the draw? This cannot be undone.') && clear()}
          >
            Clear everything
          </button>
        </div>
      </details>
    </div>
  )
}

function Setup({ onStart }: { onStart: (names: string[], noSelf: boolean) => void }) {
  const [text, setText] = useState('')
  const [noSelf, setNoSelf] = useState(true)
  const names = cleanNames(text)
  const min = 2
  return (
    <div className="gd">
      <div className="gd-stage">
        <GiftBox />
      </div>
      <div className="gd-setup">
        <label className="gd-label" htmlFor="gd-names">
          Who's in the gift exchange?
        </label>
        <textarea
          id="gd-names"
          rows={6}
          placeholder={'One name per line\nAiko\nBea\nCass'}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label className="gd-check">
          <input type="checkbox" checked={noSelf} onChange={(e) => setNoSelf(e.target.checked)} />
          People can't draw their own name (everyone picks who they are before drawing)
        </label>
        <button className="btn btn-primary" disabled={names.length < min} onClick={() => onStart(names, noSelf)}>
          Put {names.length || ''} {names.length === 1 ? 'name' : 'names'} in the box ✦
        </button>
      </div>
    </div>
  )
}

function GiftBox({ opening = false }: { opening?: boolean }) {
  return (
    <div className={`gd-box${opening ? ' is-opening' : ''}`} aria-hidden="true">
      <div className="gd-lid">
        <span className="gd-bow">🎀</span>
      </div>
      <div className="gd-body">
        <span className="gd-ribbon" />
      </div>
    </div>
  )
}
