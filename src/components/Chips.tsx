import type { SkillStack } from '../data'

const MAX_CHIPS = 8
const COLORS = ['brass', 'wine', 'cream', 'gray', 'wine'] as const

/** One stack of chips: height is the number of skills in the category. */
export function ChipStack({ stack, index }: { stack: SkillStack; index: number }) {
  const n = Math.min(stack.skills.length, MAX_CHIPS)
  const color = COLORS[index % COLORS.length]
  return (
    <li className="stack">
      <div className="stack__chips" aria-hidden="true" style={{ ['--count' as string]: n }}>
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
