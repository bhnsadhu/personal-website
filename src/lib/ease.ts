/**
 * The site's one ease, cubic-bezier(0.2, 0.7, 0.2, 1), in JavaScript, for
 * motion CSS cannot drive: scrolling a row and the page in step with a card
 * that opens. `tween` runs a frame callback on that curve and can be stopped.
 */

const bez = (t: number, a: number, b: number) => 3 * (1 - t) * (1 - t) * t * a + 3 * (1 - t) * t * t * b + t * t * t

/** Eased progress at time fraction `x` (0–1). */
export function ease(x: number): number {
  if (x <= 0) return 0
  if (x >= 1) return 1
  let lo = 0
  let hi = 1
  for (let i = 0; i < 20; i += 1) {
    const mid = (lo + hi) / 2
    if (bez(mid, 0.2, 0.2) < x) lo = mid
    else hi = mid
  }
  return bez((lo + hi) / 2, 0.7, 1)
}

/** --slide, in milliseconds, read from the tokens so the two never drift. */
export function slideMs(): number {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--slide').trim()
  const n = parseFloat(v)
  return Number.isFinite(n) ? (v.endsWith('ms') ? n : n * 1000) : 500
}

/** Calls `frame(p)` with eased progress every frame for `ms`; returns a stop. */
export function tween(ms: number, frame: (p: number) => void, done?: () => void): () => void {
  let raf = 0
  let stopped = false
  const t0 = performance.now()
  const step = (now: number) => {
    if (stopped) return
    const x = Math.min(1, (now - t0) / ms)
    frame(ease(x))
    if (x < 1) raf = requestAnimationFrame(step)
    else done?.()
  }
  raf = requestAnimationFrame(step)
  return () => {
    if (stopped) return
    stopped = true
    cancelAnimationFrame(raf)
    done?.()
  }
}
