import { CourseLabel } from '../components/Course'
import { Prose, Section } from '../components/Detail'
import { Sheet } from '../components/Sheet'
import { courses, starter } from '../lib/content'
import { useTitle } from '../lib/useTitle'

export function Starters() {
  useTitle(courses.starters.sub)

  return (
    <Sheet withTop>
      <header className="page__head">
        <CourseLabel meta={courses.starters} />
        <h1 className="page__title">{starter.heading}</h1>
        <p className="page__meta">{starter.subtitle}</p>
      </header>

      <div className="page__body">
        <Section label="In Brief">
          <Prose items={starter.paragraphs} />
        </Section>
        <Section label="At A Glance">
          <dl className="facts">
            {starter.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </div>
    </Sheet>
  )
}
