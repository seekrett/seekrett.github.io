import { useState } from 'react'
import draw from './draw.json'
import './GiftDraw.css'

// The draw is made ahead of time by `npm run gift-draw` (see generate.mjs).
// Each person's giftee is locked with their own secret code, so anyone can open
// this page from any computer and only see their own result.

type Locked = { salt: string; iv: string; data: string }
const DRAW = draw as { names: string[]; entries: Record<string, Locked> }

type Phase = 'pick' | 'opening' | 'hidden' | 'revealed'

const CONFETTI = ['✦', '♡', '❄', '✧', '🎀']

const fromB64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0))
const normalize = (code: string) => code.toUpperCase().replace(/[^A-Z0-9]/g, '')

// Must match lock() in generate.mjs
async function unlock(code: string, box: Locked): Promise<string | null> {
  try {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(normalize(code)), 'PBKDF2', false, [
      'deriveKey',
    ])
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: fromB64(box.salt), iterations: 200_000, hash: 'SHA-256' },
      base,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt'],
    )
    const out = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(box.iv) }, key, fromB64(box.data))
    return new TextDecoder().decode(out)
  } catch {
    return null // wrong code
  }
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function GiftDraw() {
  const [phase, setPhase] = useState<Phase>('pick')
  const [me, setMe] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [giftee, setGiftee] = useState<string | null>(null)

  if (DRAW.names.length === 0) {
    return (
      <div className="gd">
        <div className="gd-stage">
          <GiftBox />
          <p className="gd-count">The box isn't ready yet. Check back once the host has added everyone's names!</p>
        </div>
      </div>
    )
  }

  const open = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!me || busy) return
    setBusy(true)
    setError('')
    const result = await unlock(code, DRAW.entries[me])
    if (!result) {
      setBusy(false)
      setError("That code doesn't match. Check the code the host sent you.")
      return
    }
    setGiftee(result)
    setPhase('opening')
    await wait(1500)
    setPhase('hidden')
    setBusy(false)
  }

  const done = () => {
    setGiftee(null)
    setCode('')
    setMe(null)
    setPhase('pick')
  }

  if (phase !== 'pick' && giftee) {
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
                  <span className="gd-slip-label">{me}, you're gifting</span>
                  <span className="gd-slip-name">{giftee}</span>
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
                  style={{ '--x': `${(i / 17 - 0.5) * 340}px`, '--d': `${(i % 5) * 0.06}s` } as React.CSSProperties}
                >
                  {CONFETTI[i % CONFETTI.length]}
                </span>
              ))}
            </div>
          )}
        </div>
        {phase === 'revealed' && (
          <div className="gd-center">
            <p className="gd-hint">Keep it secret! You can come back with your code any time if you forget.</p>
            <button className="btn btn-primary" onClick={done}>
              Got it, close the box
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
          <strong>{DRAW.names.length}</strong> names are in the box
        </p>
      </div>

      <div className="gd-center">
        <p className="gd-label">Who are you?</p>
        <div className="gd-chips" role="radiogroup" aria-label="Who are you">
          {DRAW.names.map((n) => (
            <button
              key={n}
              role="radio"
              aria-checked={me === n}
              className={`gd-chip${me === n ? ' is-on' : ''}`}
              onClick={() => {
                setMe(n)
                setError('')
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {me && (
        <form className="gd-center gd-code" onSubmit={open}>
          <label className="gd-label" htmlFor="gd-code">
            Your secret code
          </label>
          <input
            id="gd-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="XXXX-XXXX"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-invalid={!!error}
            aria-describedby={error ? 'gd-error' : undefined}
          />
          {error && (
            <p className="gd-error" id="gd-error" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn-primary gd-draw" type="submit" disabled={busy || normalize(code).length < 8}>
            🎁 {busy ? 'Opening…' : 'Open the box'}
          </button>
        </form>
      )}
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
