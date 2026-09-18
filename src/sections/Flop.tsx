import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { Section } from '../components/Section'
import { FLOP_RANKS, personal, rankAt } from '../data'

/** The flop: up to three community cards for life outside work. */
export function Flop() {
  const cards = personal.slice(0, 3)
  return (
    <Section
      id="flop"
      eyebrow="♥ Personal"
      title={
        <>
          The <em>flop</em>
        </>
      }
      note={`Community cards. ${cards.length} of 3 on the table.`}
      className="section--flop"
    >
      <div className="table">
        <CardRow ids={cards.map((c) => c.slug)} layout="flop" ariaLabel="Personal interests">
          {(row) =>
            cards.map((c, i) => (
              <Card
                key={c.slug}
                id={c.slug}
                rank={rankAt(FLOP_RANKS, i)}
                suit="hearts"
                title={c.title}
                subtitle={c.subtitle}
                meta={c.meta}
                tags={c.tags}
                open={row.isOpen(c.slug)}
                aside={row.isAside(c.slug)}
                onOpen={() => row.open(c.slug)}
                onClose={row.close}
              >
                <p className="card__summary">{c.summary}</p>
                <ul className="card__list">
                  {c.body.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </Card>
            ))
          }
        </CardRow>
      </div>
    </Section>
  )
}
