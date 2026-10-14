import { LeadershipBack } from '../components/Backs'
import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { Section } from '../components/Section'
import { SUIT_NAME } from '../components/Suit'
import { FACES, faceSuitAt, leadership, sectionNotes, type Leadership } from '../data'

/**
 * Face cards: campus leadership. Dealt three to a suit (King, Queen, Jack),
 * one row per suit, so the list can run past three without changing shape.
 */
export function FaceCards() {
  const rows: Leadership[][] = []
  for (let i = 0; i < leadership.length; i += FACES.length) rows.push(leadership.slice(i, i + FACES.length))

  return (
    <Section
      id="face"
      note={sectionNotes.face}
      className="section--face"
    >
      <div className="face-rows">
        {rows.map((cards, r) => {
          const suit = faceSuitAt(r * FACES.length)
          return (
            <CardRow
              key={suit}
              ids={cards.map((l) => l.slug)}
              layout="flop"
              ariaLabel={`Leadership roles, ${SUIT_NAME[suit].toLowerCase()}`}
            >
              {(row) =>
                cards.map((l) => (
                  <Card
                    key={l.slug}
                    id={l.slug}
                    rank={l.face}
                    suit={suit}
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
          )
        })}
      </div>
    </Section>
  )
}
