import { experience, findBySlug, nextOf, rankAt, SPREAD_RANKS } from '../data'
import { LiveDot } from '../components/LiveDot'
import { useParams } from '../lib/router'
import { SEP } from '../lib/sep'
import { useTitle } from '../lib/useTitle'
import { NotFound } from './NotFound'
import { Plate, PlateSection, PlateShots } from './Plate'

export function ExperienceDetail() {
  const { slug } = useParams()
  const item = findBySlug(experience, slug)
  useTitle(item ? `${item.role} · ${item.company}` : 'Not in the deck')
  if (!item) return <NotFound />
  const i = experience.indexOf(item)
  const next = nextOf(experience, item.slug)
  const ongoing = item.dates.endsWith('Present')

  return (
    <Plate
      eyebrow={`♠ Experience${SEP}The spread`}
      rank={rankAt(SPREAD_RANKS, i)}
      suit="spades"
      title={item.role}
      subtitle={`${item.company}${SEP}${item.location}`}
      meta={item.dates}
      tags={item.tags}
      nextTo={`/experience/${next.slug}`}
      nextLabel={`${next.role}${SEP}${next.company}`}
    >
      <PlateSection label="In one line">
        <p className="plate__lede">{item.summary}</p>
      </PlateSection>
      {item.links && item.links.length > 0 && (
        <PlateSection label="Links">
          <div className="actions">
            {item.links.map((l) => (
              <a
                key={l.href}
                className={l.label === 'Live Demo' ? 'btn' : 'btn btn--ghost'}
                href={l.href}
                target="_blank"
                rel="noreferrer"
              >
                {l.label === 'Live Demo' && <LiveDot />}
                {l.label}
              </a>
            ))}
          </div>
        </PlateSection>
      )}
      {item.shots && <PlateShots shots={item.shots} />}
      {item.context && (
        <PlateSection label="The engagement">
          <p className="plate__p">{item.context}</p>
        </PlateSection>
      )}
      <PlateSection label={ongoing ? 'What I do' : 'What I did'}>
        <ul className="dlist">
          {item.body.map((b, j) => (
            <li key={j}>{b}</li>
          ))}
        </ul>
      </PlateSection>
    </Plate>
  )
}
