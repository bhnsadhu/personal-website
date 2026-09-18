import type { ReactNode } from 'react'
import type { CourseMeta } from '../lib/content'

interface CourseProps {
  meta: CourseMeta
  children: ReactNode
}

/** A course on the menu: uppercase name, plain-English sub-label, rule, rows. */
export function Course({ meta, children }: CourseProps) {
  return (
    <section className="course" aria-label={`${meta.name}: ${meta.sub}`}>
      <header className="course__head">
        <h2 className="label">{meta.name}</h2>
        <span className="course__sub">{meta.sub}</span>
      </header>
      {children}
    </section>
  )
}

interface CourseLabelProps {
  meta: CourseMeta
}

/** The same pairing, used at the top of a dish's own page. */
export function CourseLabel({ meta }: CourseLabelProps) {
  return (
    <p className="page__course">
      <span className="label">{meta.name}</span>
      <span className="course__sub">{meta.sub}</span>
    </p>
  )
}
