import { Certifications } from '../components/Certifications'
import { ChipStack } from '../components/Chips'
import { Section } from '../components/Section'
import { sectionNotes, skills } from '../data'

/** The chips: one stack per skill category, product first. Certifications sit beneath. */
export function ChipsSection() {
  // The stacks are sized against each other, so the extremes come first.
  const lengths = skills.map((s) => s.skills.length)
  const shortest = Math.min(...lengths)
  const longest = Math.max(...lengths)

  return (
    <Section
      id="chips"
      note={sectionNotes.chips}
    >
      <ul className="stacks reveal-group">
        {skills.map((s, i) => (
          <ChipStack key={s.id} stack={s} index={i} min={shortest} max={longest} />
        ))}
      </ul>

      <Certifications />
    </Section>
  )
}
