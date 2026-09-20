import { useEffect, useRef, useState } from 'react'
import { Card } from '../components/Card'
import { CardRow } from '../components/CardRow'
import { Section } from '../components/Section'
import { FAN_RANKS, projects, rankAt } from '../data'

/** The fan: independent projects. Live and shipped are face up; ideas are face down. */
export function Fan() {
  const [toast, setToast] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  function notDealt(title: string) {
    window.clearTimeout(timer.current)
    setToast(`${title} is still in the deck. Not dealt yet.`)
    timer.current = window.setTimeout(() => setToast(null), 1800)
  }

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <Section
      id="fan"
      eyebrow="♦ Projects"
      title={
        <>
          The <em>fan</em>
        </>
      }
      note="Independent work. Face up means live; face down would mean still in the deck."
    >
      <CardRow ids={projects.map((p) => p.slug)} ariaLabel="Projects">
        {(row) =>
          projects.map((p, i) => {
            const down = p.status === 'idea'
            return (
              <Card
                key={p.slug}
                id={p.slug}
                rank={rankAt(FAN_RANKS, i)}
                suit="diamonds"
                faceDown={down}
                title={p.title}
                subtitle={down ? undefined : p.subtitle}
                meta={p.meta}
                tags={p.tags}
                corner={down ? undefined : p.status === 'live' ? 'Live' : 'Shipped'}
                open={row.isOpen(p.slug)}
                aside={row.isAside(p.slug)}
                onOpen={() => row.open(p.slug)}
                onClose={row.close}
                onFaceDownClick={() => notDealt(p.title)}
                more={down ? undefined : { label: 'See the full hand', to: `/projects/${p.slug}` }}
              >
                <p className="card__summary">{p.summary}</p>
                <ul className="dlist">
                  {p.body.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
                <div className="card__links">
                  {p.siteUrl && (
                    <a className="tlink" href={p.siteUrl} target="_blank" rel="noreferrer">
                      Live Demo
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  )}
                  {p.codeUrl && (
                    <a className="tlink" href={p.codeUrl} target="_blank" rel="noreferrer">
                      GitHub
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  )}
                </div>
              </Card>
            )
          })
        }
      </CardRow>
      <p className={`toast mono ${toast ? 'is-visible' : ''}`.trim()} role="status" aria-live="polite">
        {toast}
      </p>
    </Section>
  )
}
