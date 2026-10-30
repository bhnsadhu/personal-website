import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { PersonalEntry } from '../data'
import { DOT_STEP, DOT_TOP, WORLD_DOTS } from '../lib/worldDots'

const COLS = WORLD_DOTS[0].length
const ROWS = WORLD_DOTS.length
/** Drawn in a space as wide as the open card's body, then scaled to fit. */
const REF_W = 720
const CELL = REF_W / COLS
const REF_H = ROWS * CELL
/** Dots fill a third of their spacing, as on Gauri Menon's map. */
const DOT_R = CELL * 0.33
const DOT_ALPHA = 0.4
/** In screen pixels. */
const PIN_R = 3
const HALO_R = 6
const HALO_HOT = 10
const LINE_W = 2
const DASH: [number, number] = [6, 4]
/** The dashes drift toward the west end of the route, in px per second. */
const FLOW = 12.5
/** The cursor nudges dots within this radius out of its way. */
const PUSH_R = 34
const PUSH_MAX = 9

type Place = { entry: PersonalEntry; x: number; y: number; t: number }
type RGB = [number, number, number]

function hex(v: string): RGB {
  const n = parseInt(v.trim().replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function lerp(a: RGB, b: RGB, t: number): RGB {
  return a.map((v, k) => Math.round(v + (b[k] - v) * t)) as RGB
}

const css = (c: RGB) => `rgb(${c.join(',')})`

function luminance(c: RGB) {
  const [r, g, b] = c.map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** The pin's color, darkened toward ink only as far as cream text needs to hold 4.5:1. */
function bubbleColor(pin: RGB, ink: RGB, text: RGB) {
  const lt = luminance(text)
  for (let k = 0; k <= 1; k += 0.05) {
    const c = lerp(pin, ink, k)
    if ((lt + 0.05) / (luminance(c) + 0.05) >= 4.5) return css(c)
  }
  return css(ink)
}

/** The land cell nearest a point, so every pin sits exactly on a dot. */
function snap(col: number, row: number): [number, number] {
  let best: [number, number] = [Math.floor(col), Math.floor(row)]
  let bestD = Infinity
  for (let r = Math.floor(row) - 3; r <= Math.floor(row) + 3; r++) {
    for (let c = Math.floor(col) - 3; c <= Math.floor(col) + 3; c++) {
      if (WORLD_DOTS[r]?.[c] !== '#') continue
      const d = (c + 0.5 - col) ** 2 + (r + 0.5 - row) ** 2
      if (d < bestD) {
        bestD = d
        best = [c, r]
      }
    }
  }
  return best
}

/** Places on the grid, west to east, each with its share of the way along. */
function layout(entries: PersonalEntry[]): Place[] {
  const placed = entries.flatMap((entry) => {
    if (!entry.at) return []
    const [lat, lon] = entry.at
    const [c, r] = snap((lon + 180) / DOT_STEP, (DOT_TOP - lat) / DOT_STEP)
    return [{ entry, x: (c + 0.5) * CELL, y: (r + 0.5) * CELL, t: 0 }]
  })
  placed.sort((a, b) => a.x - b.x)
  const x0 = placed[0]?.x ?? 0
  const span = (placed[placed.length - 1]?.x ?? 0) - x0 || 1
  for (const p of placed) p.t = (p.x - x0) / span
  return placed
}

/**
 * The dashed route: a gentle wave between each pair of neighbours. The wave
 * eases to nothing at both ends, so the line runs straight into the centre
 * of every pin instead of glancing off its side.
 */
function route(places: Place[]) {
  const pts: [number, number][] = []
  for (let i = 0; i < places.length - 1; i++) {
    const a = places[i]
    const b = places[i + 1]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy)
    const waves = Math.max(1, Math.round(len / 70))
    const amp = len > 24 ? 9 : 0
    for (let s = i ? 1 : 0; s <= 48; s++) {
      const t = s / 48
      const off = amp * Math.sin(2 * Math.PI * waves * t) * Math.sin(Math.PI * t)
      pts.push([a.x + dx * t - (dy / len) * off, a.y + dy * t + (dx / len) * off])
    }
  }
  return pts
}

function readColors(el: Element) {
  const cs = getComputedStyle(el)
  const v = (k: string) => hex(cs.getPropertyValue(k))
  return { west: v('--map-west'), east: v('--map-east'), dot: v('--pmap-dot'), ink: v('--ink'), text: v('--cream') }
}

/**
 * Places I Keep Thinking About, drawn after Gauri Menon's "Where" map: the
 * world in dots, a dashed route flowing west through every place, brass to
 * wine, and a pin on each with a slowly breathing halo. Hovering, tapping,
 * or tabbing to a pin opens a bubble above it in the pin's color: flag,
 * place, note. Dots shy away from the cursor. Under reduced motion nothing
 * moves; the map is drawn once.
 */
export function PlacesMap({ entries }: { entries: PersonalEntry[] }) {
  const places = useMemo(() => layout(entries), [entries])
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(-1)
  const [pinned, setPinned] = useState(-1)
  const [width, setWidth] = useState(0)
  const [colors, setColors] = useState<ReturnType<typeof readColors> | null>(null)
  const active = hover >= 0 ? hover : pinned
  const activeRef = useRef(active)
  const redrawRef = useRef(() => {})
  // The bubble keeps its last place while it fades out.
  const [shown, setShown] = useState(-1)
  if (active >= 0 && active !== shown) setShown(active)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!stage || !canvas || !ctx) return

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const path = route(places)
    const dots = WORLD_DOTS.flatMap((row, r) =>
      [...row].flatMap((ch, c) => (ch === '#' ? [{ x: (c + 0.5) * CELL, y: (r + 0.5) * CELL, ox: 0, oy: 0 }] : [])),
    )
    let palette = readColors(canvas)
    setColors(palette)
    let scale = 1
    let raf = 0
    let onScreen = false
    const pointer = { x: 0, y: 0, in: false }

    const draw = (now: number) => {
      const px = 1 / scale // one screen pixel, in drawing units
      ctx.clearRect(0, 0, REF_W, REF_H)

      ctx.fillStyle = css(palette.dot)
      ctx.globalAlpha = DOT_ALPHA
      ctx.beginPath()
      const r = Math.max(DOT_R, 0.8 * px)
      for (const d of dots) {
        let tx = 0
        let ty = 0
        if (pointer.in) {
          const dx = d.x - pointer.x
          const dy = d.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist > 0 && dist < PUSH_R) {
            const k = ((PUSH_R - dist) / PUSH_R) * PUSH_MAX
            tx = (dx / dist) * k
            ty = (dy / dist) * k
          }
        }
        d.ox += (tx - d.ox) * 0.18
        d.oy += (ty - d.oy) * 0.18
        ctx.moveTo(d.x + d.ox + r, d.y + d.oy)
        ctx.arc(d.x + d.ox, d.y + d.oy, r, 0, Math.PI * 2)
      }
      ctx.fill()
      ctx.globalAlpha = 1

      if (places.length > 1) {
        const grad = ctx.createLinearGradient(places[0].x, 0, places[places.length - 1].x, 0)
        grad.addColorStop(0, css(palette.west))
        grad.addColorStop(1, css(palette.east))
        ctx.strokeStyle = grad
        ctx.lineWidth = LINE_W * px
        ctx.lineCap = 'round'
        ctx.setLineDash([DASH[0] * px, DASH[1] * px])
        ctx.lineDashOffset = ((now / 1000) * FLOW * px) % ((DASH[0] + DASH[1]) * px)
        ctx.beginPath()
        path.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
        ctx.stroke()
        ctx.setLineDash([])
      }

      places.forEach((p, i) => {
        const color = css(lerp(palette.west, palette.east, p.t))
        const breathe = still ? 0 : ((Math.sin(now / 450 + i * 1.3) + 1) / 2) * 1.5
        const halo = i === activeRef.current ? HALO_HOT : HALO_R + breathe
        ctx.fillStyle = color
        ctx.globalAlpha = 0.24
        ctx.beginPath()
        ctx.arc(p.x, p.y, halo * px, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.arc(p.x, p.y, PIN_R * px, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // A closed card keeps its back in the DOM, inert; nothing to draw there.
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!canvas.closest('[inert]')) draw(now)
    }
    const start = () => {
      if (still) draw(0)
      else if (!raf && onScreen) raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    redrawRef.current = () => still && draw(0)

    // Layout width, not the on-screen box: the card measures mid-flip, when
    // its turn narrows the box.
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      if (!w) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      scale = w / REF_W
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(REF_H * scale * dpr)
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0)
      setWidth(w)
      draw(still ? 0 : performance.now())
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      if (onScreen) start()
      else stop()
    })
    io.observe(canvas)

    // Read against the box as it stands on screen, so a tilted card still
    // pushes the right dots.
    const onMove = (e: PointerEvent) => {
      if (still || e.pointerType !== 'mouse') return
      const box = canvas.getBoundingClientRect()
      const k = REF_W / (box.width || 1)
      pointer.x = (e.clientX - box.left) * k
      pointer.y = (e.clientY - box.top) * k
      pointer.in = true
    }
    const onLeave = () => (pointer.in = false)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)

    // The theme button swaps tokens on <html>; pick the new colors up.
    const mo = new MutationObserver(() => {
      palette = readColors(canvas)
      setColors(palette)
      if (still) draw(0)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [places])

  useEffect(() => {
    activeRef.current = active
    redrawRef.current()
  }, [active])

  // Above its pin, like hers, sliding sideways to stay inside the map.
  useLayoutEffect(() => {
    const tip = tipRef.current
    if (!tip || shown < 0 || !width) return
    const p = places[shown]
    const scale = width / REF_W
    const box = tip.getBoundingClientRect()
    const half = box.width / 2
    const x = Math.min(Math.max(p.x * scale, half), width - half)
    tip.style.left = `${x - half}px`
    tip.style.top = `${p.y * scale - box.height - 12}px`
  }, [shown, width, places])

  const place = shown >= 0 ? places[shown] : null
  const scale = width / REF_W

  return (
    <div className="pmap">
      <p className="pmap__label mono mono--sm">Where</p>
      <div ref={stageRef} className="pmap__stage" onClick={(e) => e.target === canvasRef.current && setPinned(-1)}>
        <canvas ref={canvasRef} className="pmap__map" style={{ aspectRatio: `${COLS} / ${ROWS}` }} aria-hidden="true" />
        {width > 0 &&
          places.map((p, i) => (
            <button
              key={p.entry.name}
              type="button"
              className="pmap__pin"
              style={{ left: p.x * scale, top: p.y * scale }}
              aria-label={[p.entry.name, p.entry.detail].filter(Boolean).join(', ')}
              aria-pressed={pinned === i}
              onClick={() => setPinned((cur) => (cur === i ? -1 : i))}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(i)}
              onPointerLeave={() => setHover(-1)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(-1)}
            />
          ))}
        <div
          ref={tipRef}
          className={`pmap__tip${active >= 0 ? ' is-on' : ''}`}
          style={
            place && colors
              ? { background: bubbleColor(lerp(colors.west, colors.east, place.t), colors.ink, colors.text) }
              : undefined
          }
          aria-live="polite"
        >
          {place && (
            <>
              {place.entry.flag && (
                <span className="pmap__flag" aria-hidden="true">
                  {place.entry.flag}
                </span>
              )}
              <span className="pmap__place">
                {place.entry.name}
                {place.entry.detail && `, ${place.entry.detail}`}
              </span>
              <span className="pmap__note">{place.entry.note}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
