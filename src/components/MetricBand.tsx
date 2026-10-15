import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CAMBIO_PLAYERS_FALLBACK, type Metric } from '../data'
import { useCambioPlayers } from '../lib/cambioPlayers'
import { useReducedMotion } from '../lib/useReducedMotion'

/**
 * A figure that counts up from zero the first time it scrolls into view.
 * The prefix and suffix ("~", "+") and the thousands comma are kept; the
 * real value is what assistive tech reads, and what shows without motion.
 */
function CountUp({ value }: { value: string }) {
  const reduced = useReducedMotion()
  const m = /^(\D*)([\d,]+)(.*)$/.exec(value)
  const target = m ? Number(m[2].replace(/,/g, '')) : NaN
  const animate = !reduced && Number.isFinite(target) && typeof IntersectionObserver !== 'undefined'
  const [n, setN] = useState(animate ? 0 : target)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!animate || !el) return
    let frame = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400)
          setN(Math.round(target * (1 - Math.pow(1 - t, 4))))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [animate, target])

  if (!m) return <>{value}</>
  // Without motion the count is simply its target, so a live figure that
  // arrives late replaces the built-in one instead of staying behind.
  const current = animate ? n : target
  const shown = m[2].includes(',') ? current.toLocaleString('en-US') : String(current)
  return (
    <>
      <span ref={ref} aria-hidden="true">
        {m[1]}
        {shown}
        {m[3]}
      </span>
      <span className="sr-only">{value}</span>
    </>
  )
}

/** The width of the widest line a block of text actually sets. */
function inkWidth(el: HTMLElement): number {
  const range = document.createRange()
  range.selectNodeContents(el)
  const rects = [...range.getClientRects()]
  if (!rects.length) return 0
  return Math.max(...rects.map((r) => r.right)) - Math.min(...rects.map((r) => r.left))
}

/** Room left between two stats, at the least, when the strip is tight. */
const MIN_SEP = 40

/**
 * Fits the strip to its words. Each label wraps to two balanced lines (more
 * only if four across would not fit), then its box is drawn in to the
 * widest of those lines, so a stat is exactly as wide as its text. The CSS
 * spreads the stats from edge to edge, and --band-sep tells it the gap
 * between them, so each rule sits at the gap's midpoint. On phones the
 * strip wraps two by two in equal columns and none of this runs.
 */
function fitBand(dl: HTMLElement) {
  const items = [...dl.children] as HTMLElement[]
  const labels = items.map((i) => i.querySelector<HTMLElement>('.band__label')).filter((l): l is HTMLElement => !!l)
  for (const l of labels) l.style.width = l.style.maxWidth = ''
  dl.style.removeProperty('--band-sep')
  if (items.length < 2 || window.matchMedia('(max-width: 720px)').matches) return

  const avail = dl.clientWidth
  const column = (avail - (items.length - 1) * MIN_SEP) / items.length
  for (const l of labels) {
    l.style.maxWidth = 'none'
    l.style.width = 'max-content'
    const oneLine = l.getBoundingClientRect().width
    l.style.width = `${Math.floor(Math.min(column, (oneLine / 2) * 1.12))}px`
  }
  for (const l of labels) l.style.width = `${Math.ceil(inkWidth(l)) + 1}px`
  const used = items.reduce((sum, i) => sum + i.getBoundingClientRect().width, 0)
  dl.style.setProperty('--band-sep', `${(avail - used) / (items.length - 1)}px`)
}

/** A thin stat strip. Deliberately not cards. Figures stay separate; never summed. */
export function MetricBand({ metrics, label }: { metrics: Metric[]; label: string }) {
  const players = useCambioPlayers(CAMBIO_PLAYERS_FALLBACK)
  const ref = useRef<HTMLDListElement>(null)

  useLayoutEffect(() => {
    const dl = ref.current
    if (!dl) return
    let frame = 0
    const fit = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => fitBand(dl))
    }
    fitBand(dl)
    void document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(dl)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [metrics, players])

  return (
    <section className="band" aria-label={label}>
      <div className="container">
        <dl ref={ref} className="band__inner reveal-group">
          {metrics.map((m) => (
            <div className="band__item" key={m.label}>
              <dd className="band__value">
                <CountUp value={m.live === 'cambioPlayers' ? String(players) : m.value} />
              </dd>
              <dt className="band__label mono mono--sm">{m.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
