import { useEffect, useRef } from 'react'

/** Low to high: the swell is drawn in these, and its crests throw up suits. */
const RAMP = ' .·:;+*%#'
const SUITS = ['♠', '♥', '♦', '♣'] as const
const RED = new Set(['♥', '♦'])

const FONT_PX = 11
const ROW_PX = 13
const FPS = 30

type Colors = { dim: string; brass: string; red: string; ink: string; font: string }

function readColors(): Colors {
  const cs = getComputedStyle(document.documentElement)
  const v = (k: string) => cs.getPropertyValue(k).trim()
  return { dim: v('--gray'), brass: v('--brass'), red: v('--wine-text'), ink: v('--fg'), font: v('--mono') }
}

/** A cheap, stable per-cell hash in [0, 1). */
function hash(c: number, r: number) {
  const s = Math.sin(c * 127.1 + r * 311.7) * 43758.5453
  return s - Math.floor(s)
}

/** Smooth value noise in [0, 1): the hash, interpolated between grid points. */
function noise(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const top = hash(xi, yi) + (hash(xi + 1, yi) - hash(xi, yi)) * u
  const bottom = hash(xi, yi + 1) + (hash(xi + 1, yi + 1) - hash(xi, yi + 1)) * u
  return top + (bottom - top) * v
}

/**
 * The felt: a swell of monospace characters along the foot of every page,
 * rolling slowly, with suits riding the crests. The cursor sends a ripple
 * through it. Decorative only: aria-hidden, paused off screen and in a
 * hidden tab, and a single still frame under reduced motion.
 */
export function Felt() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    let colors = readColors()
    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    let cellW = 7
    let raf = 0
    let last = 0
    let onScreen = false
    const pointer = { x: -1e4, y: -1e4, energy: 0 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const box = canvas.getBoundingClientRect()
      w = box.width
      h = box.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${FONT_PX}px ${colors.font}`
      cellW = ctx.measureText('M').width || 7
      cols = Math.ceil(w / cellW)
      rows = Math.ceil(h / ROW_PX)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      ctx.font = `${FONT_PX}px ${colors.font}`
      ctx.textBaseline = 'top'

      // Bucket by color so fillStyle changes four times a frame, not per cell.
      const dim: [string, number, number][] = []
      const brass: [string, number, number][] = []
      const red: [string, number, number][] = []
      const ink: [string, number, number][] = []

      const rowDepth = 1 / rows

      for (let c = 0; c < cols; c++) {
        const x = c / cols
        // The waterline: three slow swells laid over one another. `peak`
        // is how high this column stands, 0 in a trough and 1 at the top.
        const big = Math.sin(x * 4.3 + t * 0.3)
        const surface = 0.36 - big * 0.14 + Math.sin(x * 9.7 - t * 0.5) * 0.07 + Math.sin(x * 21 + t * 0.85) * 0.03
        const peak = (big + 1) / 2
        const px = c * cellW

        for (let r = 0; r < rows; r++) {
          const py = r * ROW_PX
          let depth = r / rows - surface

          if (pointer.energy > 0.01) {
            const dx = px - pointer.x
            const dy = py - pointer.y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < 240) depth -= pointer.energy * Math.exp(-d / 90) * Math.sin(d / 14 - t * 7) * 0.12
          }

          const n = hash(c, r)
          if (depth < 0) {
            // Spray just above the line, sparse and flickering.
            if (depth > -rowDepth * 1.5 && n > 0.9 + Math.sin(t * 3 + c) * 0.06) dim.push(['·', px, py])
            continue
          }

          // Crest: one row along the line, suits thickest where the swell is highest.
          if (depth < rowDepth) {
            if (n > 0.93 - peak * 0.2) {
              const s = SUITS[Math.floor(hash(r, c) * 4)]
              ;(RED.has(s) ? red : ink).push([s, px, py])
            } else if (n > 0.45) {
              brass.push([RAMP[RAMP.length - 1 - Math.floor(n * 3)], px, py])
            }
            continue
          }

          // Body: patches of noise drifting along with the swell, densest
          // just under the line and thinning toward the bottom.
          const flow = noise(c * 0.07 + t * 0.3, r * 0.3 - t * 0.08) * 0.65 + noise(c * 0.19 - t * 0.5, r * 0.6 + t * 0.15) * 0.35
          const level = flow * 0.8 + Math.max(0, 1 - depth * 1.5) * 0.35 + (n - 0.5) * 0.2 - 0.18
          if (level < 0.2) continue
          const i = Math.max(1, Math.min(RAMP.length - 1, Math.floor(level * RAMP.length)))
          ;(level > 0.78 ? brass : dim).push([RAMP[i], px, py])
        }
      }

      const paint = (cells: [string, number, number][], color: string, alpha: number) => {
        ctx.globalAlpha = alpha
        ctx.fillStyle = color
        for (const [ch, x, y] of cells) ctx.fillText(ch, x, y)
      }
      paint(dim, colors.dim, 0.5)
      paint(brass, colors.brass, 0.75)
      paint(red, colors.red, 1)
      paint(ink, colors.ink, 0.9)
      ctx.globalAlpha = 1
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (now - last < 1000 / FPS) return
      last = now
      pointer.energy *= 0.96
      draw(now / 1000)
    }

    const start = () => {
      if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    resize()
    draw(still ? 12 : performance.now() / 1000)
    if (still) {
      const redraw = () => {
        colors = readColors()
        resize()
        draw(12)
      }
      const ro = new ResizeObserver(redraw)
      ro.observe(canvas)
      const mo = new MutationObserver(redraw)
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
      return () => {
        ro.disconnect()
        mo.disconnect()
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      if (onScreen) start()
      else stop()
    })
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    const onMove = (e: PointerEvent) => {
      const box = canvas.getBoundingClientRect()
      const x = e.clientX - box.left
      const y = e.clientY - box.top
      if (y < -60 || y > h + 60) return
      pointer.x = x
      pointer.y = y
      pointer.energy = Math.min(1, pointer.energy + 0.25)
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    // The theme button swaps tokens on <html>; pick the new colors up.
    const mo = new MutationObserver(() => (colors = readColors()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} className="felt" aria-hidden="true" />
}
