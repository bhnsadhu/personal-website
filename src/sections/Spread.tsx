import { ExperienceBack } from '../components/Backs'
import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { Section } from '../components/Section'
import { experience, moreLabel, rankAt, sectionNotes, SPREAD_RANKS } from '../data'

/** The spread: professional and client work. Grows with the data. */
export function Spread() {
  return (
    <Section
      id="spread"
      note={sectionNotes.spread}
    >
      <CardRow ids={experience.map((e) => e.slug)} ariaLabel="Work experience">
        {(row) =>
          experience.map((e, i) => (
            <Card
              key={e.slug}
              id={e.slug}
              rank={rankAt(SPREAD_RANKS, i)}
              suit="spades"
              title={e.role}
              subtitle={e.company}
              meta={e.dates}
              tags={e.tags}
              corner={e.location}
              open={row.isOpen(e.slug)}
              aside={row.isAside(e.slug)}
              onOpen={() => row.open(e.slug)}
              onClose={row.close}
              more={{ label: moreLabel.experience, to: `/experience/${e.slug}` }}
            >
              <ExperienceBack e={e} />
            </Card>
          ))
        }
      </CardRow>
    </Section>
  )
}
