import { CourseHead } from '../components/CourseHead'
import { Status } from '../components/Status'
import { courses, specials } from '../lib/content'
import { LinkRow } from './Rows'

export function Specials() {
  return (
    <section id="specials" className="section">
      <div className="container">
        <CourseHead course={courses.specials} />
        <div className="rows">
          {specials.map((special) => (
            <LinkRow
              key={special.slug}
              to={`/specials/${special.slug}`}
              meta={
                <>
                  <span>{special.year}</span>
                  <Status kind={special.status} />
                </>
              }
              title={special.name}
              description={special.description}
              tags={special.tags}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
