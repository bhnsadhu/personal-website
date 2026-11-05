import { LeadershipBack } from '../components/Backs'
import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { Section } from '../components/Section'
import { faceSuitAt, leadership, sectionNotes } from '../data'

/**
 * Face cards: campus leadership, dealt three to a suit (King, Queen, Jack),
 * spades then clubs, in one row like every other section's.
 */
export function FaceCards() {
  return (
    <Section id="face" note={sectionNotes.face} className="section--face">
      <CardRow ids={leadership.map((l) => l.slug)} ariaLabel="Leadership roles">
        {(row) =>
          leadership.map((l, i) => (
            <Card
              key={l.slug}
              id={l.slug}
              rank={l.face}
              suit={faceSuitAt(i)}
              face={l.face}
              title={l.role}
              subtitle={l.organization}
              meta={l.dates}
              tags={l.tags}
              open={row.isOpen(l.slug)}
              aside={row.isAside(l.slug)}
              onOpen={() => row.open(l.slug)}
              onClose={row.close}
            >
              <LeadershipBack l={l} />
            </Card>
          ))
        }
      </CardRow>
    </Section>
  )
}
