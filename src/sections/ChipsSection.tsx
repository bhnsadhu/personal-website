import { Certifications } from '../components/Certifications'
import { ChipStack } from '../components/Chips'
import { Section } from '../components/Section'
import { sectionNotes, skills } from '../data'
import { useEffect, useRef } from 'react'
import { playChipDrops } from '../lib/sound'

/** The chips: one stack per skill category, product first. Certifications sit beneath. */
export function ChipsSection() {
  const stacksRef = useRef<HTMLUListElement>(null)
  // When the stacks are revealed, the chips land with a clack, stack by stack.
  useEffect(() => {
    const el = stacksRef.current
    if (!el) return
    const mo = new MutationObserver(() => {
      if (!el.hasAttribute('data-in')) return
      mo.disconnect()
      playChipDrops([...el.querySelectorAll('.stack__chips')].map((s) => s.childElementCount))
    })
    mo.observe(el, { attributes: true, attributeFilter: ['data-in'] })
    return () => mo.disconnect()
  }, [])
  // The stacks are sized against each other, so the extremes come first.
  const lengths = skills.map((s) => s.skills.length)
  const shortest = Math.min(...lengths)
  const longest = Math.max(...lengths)

  return (
    <Section
      id="chips"
      note={sectionNotes.chips}
    >
      <ul ref={stacksRef} className="stacks reveal-group">
        {skills.map((s, i) => (
          <ChipStack key={s.id} stack={s} index={i} min={shortest} max={longest} />
        ))}
      </ul>

      <Certifications />
    </Section>
  )
}
