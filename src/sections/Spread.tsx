import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { Section } from '../components/Section'
import { experience, moreLabel, rankAt, SPREAD_RANKS } from '../data'

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
      note="Working across product, technology, and strategy to understand problems and turn research into useful next steps."
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
              <p className="card__summary">{e.summary}</p>
              {e.context && <p className="card__context">{e.context}</p>}
              <ul className="dlist">
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
