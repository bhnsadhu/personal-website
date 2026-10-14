import { PersonalBack, PersonalExtras } from '../components/Backs'
import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { Section } from '../components/Section'
import { FLOP_RANKS, personal, personalIntro, rankAt, sectionNotes } from '../data'

/** The flop, plus the turn: four community cards for life outside work, five favorites each. */
export function Flop() {
  const cards = personal.slice(0, FLOP_RANKS.length)
  return (
    <Section
      id="flop"
      note={sectionNotes.flop}
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
                <PersonalBack c={c} />
              </Card>
            ))
          }
        </CardRow>
      </div>
      <PersonalExtras />
    </Section>
  )
}
