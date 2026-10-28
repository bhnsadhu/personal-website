import { CAMBIO_PLAYERS_FALLBACK, FAN_RANKS, findBySlug, projects, rankAt } from '../data'
import { useCambioPlayers } from '../lib/cambioPlayers'
import { useParams } from '../lib/router'
import { SEP } from '../lib/sep'
import { useTitle } from '../lib/useTitle'
import { LiveDot } from '../components/LiveDot'
import { NotFound } from './NotFound'
import { Plate, PlateSection } from './Plate'

export function ProjectDetail() {
  const { slug } = useParams()
  const item = findBySlug(projects, slug)
  useTitle(item ? item.title : 'Not in the deck')
  const players = useCambioPlayers(CAMBIO_PLAYERS_FALLBACK)
  // Ideas are face down: no page to show.
  if (!item || item.status === 'idea') return <NotFound />
  const i = projects.indexOf(item)
  const dealt = projects.filter((p) => p.status !== 'idea')
  const next = dealt.length > 1 ? dealt[(dealt.indexOf(item) + 1) % dealt.length] : undefined

  return (
    <Plate
      eyebrow={`♦ Projects${SEP}The fan`}
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
          <div className="actions">
            {item.siteUrl && (
              <a className="btn" href={item.siteUrl} target="_blank" rel="noreferrer">
                <LiveDot />
                Live Demo
              </a>
            )}
            {item.codeUrl && (
              <a className="btn btn--ghost" href={item.codeUrl} target="_blank" rel="noreferrer">
                Repository
              </a>
            )}
          </div>
        </PlateSection>
      )}
      {item.shots && (
        <PlateSection label="What it looks like">
          <ul className="plate__shots">
            {item.shots.map((s) => (
              <li key={s.src}>
                <figure className="plate__shot">
                  <a href={s.src} target="_blank" rel="noreferrer">
                    <img src={s.src} alt={s.alt} width={1408} height={827} loading="lazy" decoding="async" />
                    <span className="sr-only">(opens full size in a new tab)</span>
                  </a>
                  <figcaption className="mono plate__shot-caption">{s.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
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
          <p className="plate__p">{item.usage.replace('{cambioPlayers}', String(players))}</p>
        </PlateSection>
      )}
      {item.features && (
        <PlateSection label="What it does">
          <ul className="dlist">
            {item.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </PlateSection>
      )}
      {item.decisions && (
        <PlateSection label="Product decisions">
          <ul className="dlist">
            {item.decisions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </PlateSection>
      )}
      {!item.origin && item.body.length > 0 && (
        <PlateSection label="The build">
          <ul className="dlist">
            {item.body.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </PlateSection>
      )}
      {item.technical && (
        <PlateSection label="Under the hood">
          <ul className="dlist">
            {item.technical.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </PlateSection>
      )}
    </Plate>
  )
}
