import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { hand, HAND_SUITS, site } from '../data'

/** Hero: name plus a fanned hand of four aces, one per top highlight. */
export function Hand() {
  return (
    <section id="hand" className="hero" aria-labelledby="hand-title">
      <div className="container">
        <div className="hero__head">
          <p className="eyebrow">Your hand · {site.title} · {site.location}</p>
          <h1 id="hand-title" className="display hero__title">
            {site.name}
          </h1>
          <p className="lede">{site.tagline}</p>
        </div>

        <CardRow ids={hand.map((h) => h.slug)} layout="fan" className="hero__fan" ariaLabel="Top highlights">
          {(row) =>
            hand.map((h, i) => (
              <Card
                key={h.slug}
                id={h.slug}
                rank="A"
                suit={HAND_SUITS[i % HAND_SUITS.length]}
                title={h.title}
                subtitle={h.subtitle}
                meta={h.meta}
                tags={h.tags}
                open={row.isOpen(h.slug)}
                aside={row.isAside(h.slug)}
                onOpen={() => row.open(h.slug)}
                onClose={row.close}
                className="deal"
                style={{ ['--i' as string]: i, ['--rot' as string]: `${(i - 1.5) * 9}deg` }}
              >
                <p className="card__summary">{h.summary}</p>
                <ul className="card__list">
                  {h.body.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
                {h.links?.map((l) => (
                  <a key={l.href} className="tlink card__extlink" href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                ))}
              </Card>
            ))
          }
        </CardRow>

        <p className="hero__hint mono mono--sm" aria-hidden="true">
          Four aces. Tap any card to flip it.
        </p>
      </div>
    </section>
  )
}
