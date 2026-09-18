import { CourseHead } from '../components/CourseHead'
import { courses, sides } from '../lib/content'
import { Detail, ExpandRow } from './Rows'

export function Sides() {
  return (
    <section id="sides" className="section">
      <div className="container">
        <CourseHead course={courses.sides} />
        <div className="rows">
          {sides.map((side) => (
            <ExpandRow
              key={side.slug}
              meta={<span>{side.dates}</span>}
              organization={side.organization}
              title={side.position}
              bullets={side.bullets}
              details={<Detail label="In Brief" items={side.details} />}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
