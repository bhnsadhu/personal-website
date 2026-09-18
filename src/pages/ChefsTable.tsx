import { CourseLabel } from '../components/Course'
import { Sheet } from '../components/Sheet'
import { chefsTable, courses, interests } from '../lib/content'
import { useTitle } from '../lib/useTitle'

export function ChefsTable() {
  useTitle(courses.chefsTable.name)

  return (
    <Sheet withTop>
      <header className="page__head">
        <CourseLabel meta={courses.chefsTable} />
        <h1 className="page__title">{chefsTable.heading}</h1>
        <p className="page__meta">{chefsTable.description}</p>
      </header>

      <div className="page__body">
        <dl className="entries">
          {interests.map((item) => (
            <div key={item.title}>
              <dt className="entries__title">{item.title}</dt>
              <dd className="entries__text">{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Sheet>
  )
}
