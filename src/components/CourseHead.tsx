import type { ReactNode } from 'react'
import type { Course } from '../lib/content'

interface CourseHeadProps {
  course: Course
  /** 56px statement instead of the 80px heading (Starters, Chef's Table). */
  statement?: string
  lede?: ReactNode
}

export function CourseHead({ course, statement, lede }: CourseHeadProps) {
  const eyebrow = `${course.name} — ${course.sub}`
  return (
    <header className="course-head">
      <p className="course-head__eyebrow t-label">{eyebrow}</p>
      {statement ? (
        <h2 className="course-head__title t-statement">{statement}</h2>
      ) : (
        <h2 className="course-head__title t-section">{course.heading}</h2>
      )}
      {lede && <div className="course-head__lede measure">{lede}</div>}
    </header>
  )
}
