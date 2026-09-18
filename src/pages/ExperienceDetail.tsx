import { experience, findBySlug, nextOf, rankAt, SPREAD_RANKS } from '../data'
import { useParams } from '../lib/router'
import { useTitle } from '../lib/useTitle'
import { NotFound } from './NotFound'
import { Plate, PlateSection } from './Plate'

export function ExperienceDetail() {
  const { slug } = useParams()
  const item = findBySlug(experience, slug)
  useTitle(item ? `${item.role} · ${item.company}` : 'Not in the deck')
  if (!item) return <NotFound />
  const i = experience.indexOf(item)
  const next = nextOf(experience, item.slug)

  return (
    <Plate
      eyebrow="♠ Experience · The spread"
      rank={rankAt(SPREAD_RANKS, i)}
      suit="spades"
      title={item.role}
      subtitle={`${item.company} · ${item.location}`}
      meta={item.dates}
      tags={item.tags}
      nextTo={`/experience/${next.slug}`}
      nextLabel={`${next.role} · ${next.company}`}
    >
      <PlateSection label="In one line">
        <p className="plate__lede">{item.summary}</p>
      </PlateSection>
      <PlateSection label="What I did">
        <ul className="card__list">
          {item.body.map((b, j) => (
            <li key={j}>{b}</li>
          ))}
        </ul>
      </PlateSection>
    </Plate>
  )
}
