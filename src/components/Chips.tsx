import { useRef } from 'react'
import type { SkillStack } from '../data'

/**
 * The stack is a rough visual indicator, not a literal count: the largest
 * category sits at MAX_CHIPS and the rest scale down proportionally to
 * MIN_CHIPS, so a long category reads as taller without towering over a
 * short one. The ×N label beside it stays the exact number.
 */
const MAX_CHIPS = 8
const MIN_CHIPS = 4
const COLORS = ['brass', 'wine', 'cream', 'gray', 'wine'] as const

/** Chips to draw for `count`, given the smallest and largest categories on the table. */
export function chipsFor(count: number, min: number, max: number): number {
  if (max <= min) return MAX_CHIPS // every category the same length: draw them alike
  const t = (count - min) / (max - min)
  return MIN_CHIPS + Math.round(t * (MAX_CHIPS - MIN_CHIPS))
}

/**
 * The top chip of a stack can be picked up: it follows the pointer, tilting
 * the way it is pulled, and let go it settles back onto its stack (the
 * bounce is in sections.css). Mouse and pen only, so a finger on a phone
 * still scrolls the page.
 */
function useLiftable() {
  const held = useRef<{ x: number; y: number; lastX: number } | null>(null)
  const place = (chip: HTMLElement, dx: number, dy: number, tilt: number) => {
    chip.style.setProperty('--dx', `${dx}px`)
    chip.style.setProperty('--dy', `${dy}px`)
    chip.style.setProperty('--tilt', `${tilt}deg`)
  }
  const onPointerDown = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (e.button !== 0 || e.pointerType === 'touch') return
    held.current = { x: e.clientX, y: e.clientY, lastX: e.clientX }
    e.currentTarget.setPointerCapture(e.pointerId)
    e.currentTarget.classList.add('is-held')
    e.preventDefault()
  }
  const onPointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const h = held.current
    if (!h) return
    const tilt = Math.max(-16, Math.min(16, (e.clientX - h.lastX) * 1.2))
    h.lastX = e.clientX
    place(e.currentTarget, e.clientX - h.x, e.clientY - h.y, tilt)
  }
  // Up, cancel, or a lost capture all put the chip back, so it is never left held.
  const onPointerUp = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!held.current) return
    held.current = null
    const chip = e.currentTarget
    chip.classList.remove('is-held')
    place(chip, 0, 0, 0)
    if (chip.hasPointerCapture(e.pointerId)) chip.releasePointerCapture(e.pointerId)
  }
  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
    onLostPointerCapture: onPointerUp,
  }
}

export function ChipStack({
  stack,
  index,
  min,
  max,
}: {
  stack: SkillStack
  index: number
  min: number
  max: number
}) {
  const n = chipsFor(stack.skills.length, min, max)
  const color = COLORS[index % COLORS.length]
  const lift = useLiftable()
  return (
    <li className="stack" data-stack={stack.id} style={{ ['--s' as string]: index }}>
      <div className="stack__chips" aria-hidden="true" style={{ ['--max' as string]: MAX_CHIPS }}>
        {Array.from({ length: n }, (_, i) =>
          i === n - 1 ? (
            <span key={i} className={`chip chip--${color} chip--top`} style={{ ['--i' as string]: i }} {...lift} />
          ) : (
            <span key={i} className={`chip chip--${color}`} style={{ ['--i' as string]: i }} />
          ),
        )}
      </div>
      <p className="stack__count mono">×{stack.skills.length}</p>
      <h3 className="stack__label">{stack.label}</h3>
      <ul className="stack__skills" aria-label={`${stack.label} skills`}>
        {stack.skills.map((s) => (
          <li key={s} className="mono mono--sm">
            {s}
          </li>
        ))}
      </ul>
    </li>
  )
}
