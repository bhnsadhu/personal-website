import { MetricBand } from '../components/MetricBand'
import { Status } from '../components/Status'
import { useParams } from '../lib/router'
import { courses, findBySlug, nextOf, specials } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import { NotFound } from './NotFound'
import { Bullets, Plate, PlateSection, Prose, Tags } from './Plate'

export function SpecialDish() {
  const { slug } = useParams()
  const special = findBySlug(specials, slug)
  useTitle(special ? special.name : 'Not On The Menu')
  if (!special) return <NotFound />
  const next = nextOf(specials, special.slug)

  return (
    <Plate
      eyebrow={`${courses.specials.name} — ${courses.specials.sub}`}
      meta={
        <>
          <span className="t-meta">{special.year}</span>
          <Status kind={special.status} />
          <Tags items={special.tags} />
        </>
      }
      title={special.name}
      lede={special.description}
      nextTo={`/specials/${next.slug}`}
      nextLabel={next.name}
    >
      <div className="plate__grid">
        <div>
          <PlateSection label="The Situation">
            <Prose items={special.situation} />
          </PlateSection>
          <PlateSection label="The Ask">
            <Prose items={special.ask} />
          </PlateSection>
          <PlateSection label="How It Came Together">
            <Bullets items={special.how} />
          </PlateSection>
          <PlateSection label="The Result">
            <Prose items={special.result} />
          </PlateSection>
        </div>
        <aside className="plate__side">
          <PlateSection label="Ingredients Used">
            <Tags items={special.ingredients} />
          </PlateSection>
          <PlateSection label="Order">
            <div className="plate__links">
              {special.siteUrl && (
                <a className="btn" href={special.siteUrl} target="_blank" rel="noreferrer">
                  Visit The Site
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              )}
              {special.codeUrl && (
                <a className="arrow-link" href={special.codeUrl} target="_blank" rel="noreferrer">
                  View The Code
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              )}
            </div>
          </PlateSection>
        </aside>
      </div>
      <div className="plate__metrics">
        <MetricBand stats={special.stats} label="Results" />
      </div>
    </Plate>
  )
}
