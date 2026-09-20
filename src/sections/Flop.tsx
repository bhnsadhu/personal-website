import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { Section } from '../components/Section'
import { FLOP_RANKS, personal, personalExtras, personalIntro, rankAt } from '../data'

/** The flop, plus the turn: four community cards for life outside work, five favorites each. */
export function Flop() {
  const cards = personal.slice(0, FLOP_RANKS.length)
  return (
    <Section
      id="flop"
      eyebrow="♥ Personal"
      title={
        <>
          The <em>flop</em>
        </>
      }
      note="A little of what fills my time outside of work. Favorite meals, fragrances, films, and places, each with a story behind it."
      className="section--flop"
    >
      <p className="lede flop__intro">{personalIntro}</p>
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
                {c.intro && <p className="card__summary">{c.intro}</p>}
                <ol className="card__entries">
                  {c.entries.map((e) => (
                    <li key={e.name} className="entry">
                      <p className="entry__head">
                        <span className="entry__name">{e.name}</span>
                        {e.detail && <span className="entry__detail">{e.detail}</span>}
                      </p>
                      {e.address && <p className="entry__line mono mono--sm">{e.address}</p>}
                      {e.pick && (
                        <p className="entry__line">
                          <span className="entry__key mono mono--sm">Order</span>
                          {e.pick}
                        </p>
                      )}
                      <p className="entry__note">{e.note}</p>
                    </li>
                  ))}
                </ol>
              </Card>
            ))
          }
        </CardRow>
      </div>
      <p className="flop__extras mono mono--sm">Also in rotation: {personalExtras.join(' · ')}</p>
    </Section>
  )
}
