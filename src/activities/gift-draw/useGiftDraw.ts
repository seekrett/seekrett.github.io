import { useCallback, useEffect, useState } from 'react'

export type DrawState = {
  names: string[] // everyone in the exchange
  pool: string[] // names still in the box
  drawn: string[] // people who have already drawn (only tracked when noSelf is on)
  noSelf: boolean // stop people from drawing their own name
}

const KEY = 'gift-draw:v1'
const EMPTY: DrawState = { names: [], pool: [], drawn: [], noSelf: true }

function load(): DrawState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...EMPTY, ...JSON.parse(raw) }
  } catch {
    /* storage unavailable: start fresh */
  }
  return EMPTY
}

function randomIndex(n: number) {
  const a = new Uint32Array(1)
  crypto.getRandomValues(a)
  return a[0] % n
}

export function cleanNames(text: string) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const line of text.split(/[\n,]/)) {
    const n = line.trim()
    if (n && !seen.has(n.toLowerCase())) {
      seen.add(n.toLowerCase())
      out.push(n)
    }
  }
  return out
}

/**
 * Picks a name for `drawer` and removes it from the box.
 * With noSelf on, nobody draws themselves, and we make sure the last person
 * is never left with only their own name in the box.
 */
export function pickName(state: DrawState, drawer: string | null): string | null {
  const { pool, noSelf, names, drawn } = state
  if (pool.length === 0) return null
  if (!noSelf || !drawer) return pool[randomIndex(pool.length)]

  const stillToDraw = names.filter((n) => !drawn.includes(n) && n !== drawer)
  // If exactly one other person still has to draw and their name is still in the box,
  // this drawer must take it, or that person would end up drawing themselves.
  if (stillToDraw.length === 1 && pool.includes(stillToDraw[0]) && pool.length === 2) return stillToDraw[0]

  const options = pool.filter((n) => n !== drawer)
  return options.length ? options[randomIndex(options.length)] : null
}

export function useGiftDraw() {
  const [state, setState] = useState<DrawState>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* ignore: the draw still works for this visit */
    }
  }, [state])

  const start = useCallback((names: string[], noSelf: boolean) => {
    setState({ names, pool: [...names], drawn: [], noSelf })
  }, [])

  const draw = useCallback(
    (drawer: string | null) => {
      const name = pickName(state, drawer)
      if (!name) return null
      setState({
        ...state,
        pool: state.pool.filter((n) => n !== name),
        drawn: drawer ? [...state.drawn, drawer] : state.drawn,
      })
      return name
    },
    [state],
  )

  const reset = useCallback(() => setState((s) => ({ ...s, pool: [...s.names], drawn: [] })), [])
  const clear = useCallback(() => setState(EMPTY), [])

  return { state, start, draw, reset, clear }
}
