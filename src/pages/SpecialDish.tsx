import { useParams } from '../lib/router'
import { CourseLabel } from '../components/Course'
import { Bullets, PageNav, Pills, Prose, Section, Stats } from '../components/Detail'
import { ArrowRight } from '../components/Glyph'
import { Sheet } from '../components/Sheet'
import { Status } from '../components/Status'
import { courses, findBySlug, nextOf, specials } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import { NotFound } from './NotFound'

export function SpecialDish() {
  const { slug } = useParams()
  const special = findBySlug(specials, slug)
  useTitle(special ? special.name : 'Not On The Menu')
  if (!special) return <NotFound />

  const next = nextOf(specials, special.slug)

  return (
    <Sheet withTop pageKey={special.slug}>
      <header className="page__head">
        <CourseLabel meta={courses.specials} />
        <h1 className="page__title">{special.name}</h1>
        <p className="page__meta">
          <Status kind={special.status} />
          <span>·</span>
          <span className="row__note">{special.stack.join(', ')}</span>
        </p>
        <p className="page__lede">{special.description}</p>
      </header>

      <div className="page__body">
        <Section label="The Situation">
          <Prose items={special.situation} />
        </Section>
        <Section label="The Ask">
          <Prose items={special.ask} />
        </Section>
        <Section label="How It Came Together">
          <Bullets items={special.how} />
        </Section>
        <Section label="The Result">
          <Prose items={special.result} />
          <Stats items={special.stats} />
        </Section>
        <Section label="Ingredients Used">
          <Pills items={special.ingredients} />
        </Section>
        <div className="actions">
          {special.siteUrl && (
            <a className="btn" href={special.siteUrl} target="_blank" rel="noreferrer">
              Visit The Site
              <ArrowRight />
            </a>
          )}
          {special.codeUrl && (
            <a className="btn" href={special.codeUrl} target="_blank" rel="noreferrer">
              View The Code
              <ArrowRight />
            </a>
          )}
        </div>
      </div>

      <PageNav nextTo={`/specials/${next.slug}`} nextLabel={next.name} />
    </Sheet>
  )
}
