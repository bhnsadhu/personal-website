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
  const next = dealt[(dealt.indexOf(item) + 1) % dealt.length]

  return (
    <Plate
      eyebrow="♦ Projects · The fan"
      rank={rankAt(FAN_RANKS, i)}
      suit="diamonds"
      title={item.title}
      subtitle={item.subtitle}
      meta={item.meta}
      tags={item.stack}
      nextTo={`/projects/${next.slug}`}
      nextLabel={next.title}
    >
      <PlateSection label="In one line">
        <p className="plate__lede">{item.summary}</p>
      </PlateSection>
      <PlateSection label="The build">
        <ul className="card__list">
          {item.body.map((b, j) => (
            <li key={j}>{b}</li>
          ))}
        </ul>
      </PlateSection>
      {(item.siteUrl || item.codeUrl) && (
        <PlateSection label="Links">
          <div className="plate__links">
            {item.siteUrl && (
              <a className="btn" href={item.siteUrl} target="_blank" rel="noreferrer">
                Visit the site
              </a>
            )}
            {item.codeUrl && (
              <a className="btn btn--ghost" href={item.codeUrl} target="_blank" rel="noreferrer">
                View the code
              </a>
            )}
          </div>
        </PlateSection>
      )}
    </Plate>
  )
}
