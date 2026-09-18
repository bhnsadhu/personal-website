import { CourseHead } from '../components/CourseHead'
import { Link } from '../lib/router'
import { courses, mains } from '../lib/content'
import { Detail, ExpandRow } from './Rows'

export function Mains() {
  return (
    <section id="mains" className="section">
      <div className="container">
        <CourseHead course={courses.mains} />
        <div className="rows">
          {mains.map((main) => (
            <ExpandRow
              key={main.slug}
              meta={
                <>
                  <span>{main.dates}</span>
                  <span className="row__meta-sub">{main.duration}</span>
                </>
              }
              organization={main.organization}
              title={main.role}
              bullets={main.bullets}
              details={
                <>
                  <Detail label="What I Owned" items={main.owned} />
                  <Detail label="What Came Of It" items={main.cameOf} />
                  <Link
                    to={`/mains/${main.slug}`}
                    className="arrow-link row__more"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View The Full Plate
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </>
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
