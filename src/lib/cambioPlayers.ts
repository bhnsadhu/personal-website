import { useEffect, useState } from 'react'

/**
 * Cambio's live player count, from /api/cambio-players. One request per page
 * load, shared by everything that shows it. Until it answers, and if it never
 * does (offline, the local dev server where /api does not exist, Cambio down),
 * callers keep the number they were built with.
 */
let request: Promise<number | null> | null = null

function load(): Promise<number | null> {
  request ??= fetch('/api/cambio-players')
    .then((res) => (res.ok ? res.json() : null))
    .then((body: { players?: unknown } | null) =>
      body && typeof body.players === 'number' && Number.isSafeInteger(body.players) && body.players >= 0 ? body.players : null,
    )
    .catch(() => null)
  return request
}

export function useCambioPlayers(fallback: number): number {
  const [players, setPlayers] = useState<number | null>(null)
  useEffect(() => {
    let alive = true
    void load().then((n) => alive && setPlayers(n))
    return () => {
      alive = false
    }
  }, [])
  return players ?? fallback
}
