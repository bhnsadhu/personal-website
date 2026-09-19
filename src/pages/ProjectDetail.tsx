import { FAN_RANKS, findBySlug, projects, rankAt } from '../data'
import { useParams } from '../lib/router'
import { useTitle } from '../lib/useTitle'
import { NotFound } from './NotFound'
import { Plate, PlateSection } from './Plate'

export function ProjectDetail() {
  const { slug } = useParams()
  const item = findBySlug(projects, slug)
  useTitle(item ? item.title : 'Not in the deck')
  // Ideas are face down: no page to show.
  if (!item || item.status === 'idea') return <NotFound />
  const i = projects.indexOf(item)
  const dealt = projects.filter((p) => p.status !== 'idea')
  const next = dealt.length > 1 ? dealt[(dealt.indexOf(item) + 1) % dealt.length] : undefined

  return (
    <Plate
      eyebrow="♦ Projects · The fan"
      rank={rankAt(FAN_RANKS, i)}
      suit="diamonds"
      title={item.title}
      subtitle={item.subtitle}
      meta={item.meta}
      tags={item.stack}
      nextTo={next && `/projects/${next.slug}`}
      nextLabel={next?.title}
    >
      <PlateSection label="In one line">
        <p className="plate__lede">{item.summary}</p>
      </PlateSection>
      {(item.siteUrl || item.codeUrl) && (
        <PlateSection label="Links">
          <div className="plate__links">
            {item.siteUrl && (
              <a className="btn" href={item.siteUrl} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            )}
            {item.codeUrl && (
              <a className="btn btn--ghost" href={item.codeUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
          </div>
        </PlateSection>
      )}
      {item.origin && (
        <PlateSection label="Why it exists">
          <p className="plate__p">{item.origin}</p>
        </PlateSection>
      )}
      {item.ownership && (
        <PlateSection label="Who built it">
          <p className="plate__p">{item.ownership}</p>
        </PlateSection>
      )}
      {item.usage && (
        <PlateSection label="Who uses it">
          <p className="plate__p">{item.usage}</p>
        </PlateSection>
      )}
      {item.features && (
        <PlateSection label="What it does">
          <ul className="card__list">
            {item.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </PlateSection>
      )}
      {item.decisions && (
        <PlateSection label="Product decisions">
          <ul className="card__list">
            {item.decisions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </PlateSection>
      )}
      {!item.origin && item.body.length > 0 && (
        <PlateSection label="The build">
          <ul className="card__list">
            {item.body.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </PlateSection>
      )}
      {item.technical && (
        <PlateSection label="Under the hood">
          <ul className="card__list">
            {item.technical.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </PlateSection>
      )}
    </Plate>
  )
}
