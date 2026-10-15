/**
 * GET /api/cambio-players: how many players Cambio has, for the stats band
 * and the Cambio project page.
 *
 * Runs as a Vercel Function. It asks Cambio's public stats route, which
 * answers with a count and nothing else (no names or account data), and
 * passes only that integer on. Calling it from here and not from the
 * browser keeps this site free of cross-origin requests, and the CDN
 * caches the answer for a minute, so visitors never fan out to Cambio.
 * If Cambio is slow, down, or answers with anything but a count, this
 * answers 502 and the pages keep their built-in number.
 */

const SOURCE = 'https://cambio.bhanusadhu.com/api/stats'

function json(status: number, body: Record<string, unknown>, cache: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': cache },
  })
}

export async function GET(): Promise<Response> {
  try {
    const res = await fetch(SOURCE, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(5000) })
    if (!res.ok) return json(502, { error: 'Cambio did not answer with a count' }, 'no-store')
    const { players } = (await res.json()) as { players?: unknown }
    if (typeof players !== 'number' || !Number.isSafeInteger(players) || players < 0) {
      return json(502, { error: 'Cambio did not answer with a count' }, 'no-store')
    }
    return json(200, { players }, 'public, max-age=60, s-maxage=60, stale-while-revalidate=300')
  } catch {
    return json(502, { error: 'Cambio could not be reached' }, 'no-store')
  }
}
