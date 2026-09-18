import { ChipStack } from '../components/Chips'
import { Section } from '../components/Section'
import { skills } from '../data'

/** The chips: one stack per skill category. Height is depth. */
export function ChipsSection() {
  return (
    <Section
      id="chips"
      eyebrow="♣ Skills"
      title={
        <>
          The <em>chips</em>
        </>
      }
      note="One stack per category. Taller stack, deeper bench."
    >
      <ul className="stacks">
        {skills.map((s, i) => (
          <ChipStack key={s.id} stack={s} index={i} />
        ))}
      </ul>
    </Section>
  )
}
