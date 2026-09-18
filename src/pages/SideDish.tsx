import { useParams } from 'react-router'
import { CourseLabel } from '../components/Course'
import { PageNav, Prose, Section } from '../components/Detail'
import { Sheet } from '../components/Sheet'
import { courses, findBySlug, nextOf, sides } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import { NotFound } from './NotFound'

export function SideDish() {
  const { slug } = useParams()
  const side = findBySlug(sides, slug)
  useTitle(side ? `${side.position} · ${side.organization}` : 'Not On The Menu')
  if (!side) return <NotFound />

  const next = nextOf(sides, side.slug)

  return (
    <Sheet withTop pageKey={side.slug}>
      <header className="page__head">
        <CourseLabel meta={courses.sides} />
        <h1 className="page__title">{side.position}</h1>
        <p className="page__meta">
          <span>{side.organization}</span>
          <span>·</span>
          <span>{side.dates}</span>
        </p>
      </header>

      <div className="page__body">
        <Section label="In Brief">
          <Prose items={side.paragraphs} />
        </Section>
      </div>

      <PageNav
        nextTo={`/sides/${next.slug}`}
        nextLabel={`${next.position} · ${next.organization}`}
      />
    </Sheet>
  )
}
