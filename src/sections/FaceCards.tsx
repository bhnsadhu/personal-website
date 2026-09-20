import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { Section } from '../components/Section'
import { SUIT_NAME } from '../components/Suit'
import { FACES, faceSuitAt, leadership, type Leadership } from '../data'
import { Link } from '../lib/router'

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
      eyebrow="♠ Leadership"
      title={
        <>
          The <em>face cards</em>
        </>
      }
      note="Bringing people together, helping teams find direction, and making things happen across campus. A different kind of strong hand."
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
                    <p className="card__summary">{l.summary}</p>
                    <p className="card__context mono mono--sm">{l.location}</p>
                    {l.progression && (
                      <ol className="card__steps" aria-label="Roles held">
                        {l.progression.map((s) => (
                          <li key={s.role}>
                            <span className="card__step-role">{s.role}</span>
                            <span className="card__step-dates mono mono--sm">{s.dates}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                    <ul className="dlist">
                      {l.body.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                    {l.related && (
                      <p className="card__related">
                        <span className="mono mono--sm">Engagements</span>
                        {l.related.map((link) => (
                          <Link key={link.to} to={link.to} className="tlink">
                            {link.label}
                            <span className="arrow" aria-hidden="true">
                              →
                            </span>
                          </Link>
                        ))}
                      </p>
                    )}
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
