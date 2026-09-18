import { useParams } from '../lib/router'
import { CourseLabel } from '../components/Course'
import { Bullets, PageNav, Pills, Section } from '../components/Detail'
import { Sheet } from '../components/Sheet'
import { courses, findBySlug, mains, nextOf } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import { NotFound } from './NotFound'

export function MainDish() {
  const { slug } = useParams()
  const main = findBySlug(mains, slug)
  useTitle(main ? `${main.role} · ${main.company}` : 'Not On The Menu')
  if (!main) return <NotFound />

  const next = nextOf(mains, main.slug)

  return (
    <Sheet withTop pageKey={main.slug}>
      <header className="page__head">
        <CourseLabel meta={courses.mains} />
        <h1 className="page__title">{main.role}</h1>
        <p className="page__meta">
          <span>{main.company}</span>
          <span>·</span>
          <span>{main.location}</span>
          <span>·</span>
          <span>{main.dates}</span>
        </p>
        <p className="page__lede">{main.summary}</p>
      </header>

      <div className="page__body">
        <Section label="What I Owned">
          <Bullets items={main.owned} />
        </Section>
        <Section label="What I Actually Did">
          <Bullets items={main.did} />
        </Section>
        <Section label="What Came Of It">
          <Bullets items={main.cameOf} />
        </Section>
        <Section label="Ingredients Used">
          <Pills items={main.ingredients} />
        </Section>
      </div>

      <PageNav nextTo={`/mains/${next.slug}`} nextLabel={`${next.role} · ${next.company}`} />
    </Sheet>
  )
}
