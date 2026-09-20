import { ChipStack } from '../components/Chips'
import { Section } from '../components/Section'
import { certifications, skills } from '../data'

/** The chips: one stack per skill category, product first. Certifications sit beneath. */
export function ChipsSection() {
  // The stacks are sized against each other, so the extremes come first.
  const lengths = skills.map((s) => s.skills.length)
  const shortest = Math.min(...lengths)
  const longest = Math.max(...lengths)

  return (
    <Section
      id="chips"
      eyebrow="♣ Skills"
      title={
        <>
          The <em>chips</em>
        </>
      }
      note="One stack per category."
    >
      <ul className="stacks">
        {skills.map((s, i) => (
          <ChipStack key={s.id} stack={s} index={i} min={shortest} max={longest} />
        ))}
      </ul>

      <div className="certs" aria-labelledby="certs-title">
        <h3 id="certs-title" className="eyebrow">
          Certifications
        </h3>
        <ul className="certs__list">
          {certifications.map((c) => (
            <li key={c.url} className="cert">
              <span className="cert__name">{c.name}</span>
              <span className="cert__meta mono mono--sm">
                {c.issuer} · Issued {c.issued}
              </span>
              <a className="tlink" href={c.url} target="_blank" rel="noreferrer">
                View Credential
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
