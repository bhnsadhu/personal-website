import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { Section } from '../components/Section'
import { experience, rankAt, SPREAD_RANKS } from '../data'

/** The spread: work experience, ranked high to low. Grows with the data. */
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
      note="Ranked high to low. Face cards are reserved for leadership."
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
