import { useEffect, useRef, useState } from 'react'
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

/** A thin stat strip. Deliberately not cards. Figures stay separate; never summed. */
export function MetricBand({ metrics, label }: { metrics: Metric[]; label: string }) {
  const players = useCambioPlayers(CAMBIO_PLAYERS_FALLBACK)
  return (
    <section className="band" aria-label={label}>
      <div className="container">
        <dl className="band__inner reveal-group">
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
