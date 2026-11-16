import { useEffect, useState } from 'react'

/** Returns the activity id when the URL is #/play/<id>, otherwise null. */
export function useActivityRoute() {
  const read = () => {
    const m = window.location.hash.match(/^#\/play\/([\w-]+)/)
    return m ? m[1] : null
  }
  const [id, setId] = useState(read)
  useEffect(() => {
    const onHash = () => setId(read())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return id
}

export function openActivity(id: string) {
  window.location.hash = `/play/${id}`
}

export function closeActivity() {
  // Drop the hash without adding a history entry or jumping the page.
  history.pushState(null, '', window.location.pathname + window.location.search)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}
