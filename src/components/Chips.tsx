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
  return (
    <li className="stack">
      <div className="stack__chips" aria-hidden="true" style={{ ['--max' as string]: MAX_CHIPS }}>
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className={`chip chip--${color}`} style={{ ['--i' as string]: i }} />
        ))}
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
