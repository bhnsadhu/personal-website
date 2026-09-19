import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { Section } from '../components/Section'
import { experience, rankAt, SPREAD_RANKS } from '../data'

/** The spread: professional and client work. Grows with the data. */
export function Spread() {
  return (
    <Section
      id="spread"
      eyebrow="♠ Experience"
      title={
        <>
          The <em>spread</em>
        </>
      }
      note="Professional and client work, dealt in order. Face cards are reserved for campus leadership."
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
              more={{ label: 'See the full hand', to: `/experience/${e.slug}` }}
            >
              <p className="card__summary">{e.summary}</p>
              {e.via && <p className="card__via mono mono--sm">Client engagement through {e.via}</p>}
              {e.context && <p className="card__context">{e.context}</p>}
              <ul className="card__list">
                {e.body.map((b, j) => (
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
