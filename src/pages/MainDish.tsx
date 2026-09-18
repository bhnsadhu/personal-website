import { useParams } from '../lib/router'
import { courses, findBySlug, mains, nextOf } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import { NotFound } from './NotFound'
import { Bullets, Plate, PlateSection, Tags } from './Plate'

export function MainDish() {
  const { slug } = useParams()
  const main = findBySlug(mains, slug)
  useTitle(main ? `${main.role} · ${main.organization}` : 'Not On The Menu')
  if (!main) return <NotFound />
  const next = nextOf(mains, main.slug)

  return (
    <Plate
      eyebrow={`${courses.mains.name} — ${courses.mains.sub}`}
      meta={
        <>
          <span className="t-meta">{main.dates}</span>
          <span className="t-meta plate__meta-sub">{main.duration}</span>
          <span className="t-label">{main.organization}</span>
        </>
      }
      title={main.role}
      nextTo={`/mains/${next.slug}`}
      nextLabel={`${next.role} · ${next.organization}`}
    >
      <div className="plate__grid">
        <div>
          <PlateSection label="What I Owned">
            <Bullets items={main.owned} />
          </PlateSection>
          <PlateSection label="What I Actually Did">
            <Bullets items={[...main.bullets, ...main.did]} />
          </PlateSection>
          <PlateSection label="What Came Of It">
            <Bullets items={main.cameOf} />
          </PlateSection>
        </div>
        <aside className="plate__side">
          <PlateSection label="Ingredients Used">
            <Tags items={main.ingredients} />
          </PlateSection>
        </aside>
      </div>
    </Plate>
  )
}
