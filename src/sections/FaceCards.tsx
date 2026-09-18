import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { Section } from '../components/Section'
import { leadership, LEADERSHIP_CAP } from '../data'

/** Face cards: leadership only, capped at K / Q / J. */
export function FaceCards() {
  const cards = leadership.slice(0, LEADERSHIP_CAP)
  if (import.meta.env.DEV && leadership.length > LEADERSHIP_CAP) {
    console.warn(
      `Leadership has ${leadership.length} entries; only ${LEADERSHIP_CAP} face cards are dealt. Move the rest into experience.ts.`,
    )
  }
  return (
    <Section
      id="face"
      eyebrow="♠ Leadership"
      title={
        <>
          The <em>face cards</em>
        </>
      }
      note="Officer and leadership roles only. Three seats: King, Queen, Jack."
      className="section--face"
    >
      <CardRow ids={cards.map((l) => l.slug)} layout="flop" ariaLabel="Leadership roles">
        {(row) =>
          cards.map((l) => (
            <Card
              key={l.slug}
              id={l.slug}
              rank={l.face}
              suit="spades"
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
              <p className="card__summary">{l.summary}</p>
              <ul className="card__list">
                {l.body.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </Card>
          ))
        }
      </CardRow>
    </Section>
  )
}
