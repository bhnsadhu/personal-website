import type { ReactNode } from 'react'
import { BackToMenu } from '../components/BackToMenu'
import { Link } from '../lib/router'

interface PlateProps {
  eyebrow: string
  meta: ReactNode
  title: string
  lede?: string
  children: ReactNode
  nextTo: string
  nextLabel: string
}

/** Layout for a dish's own page. */
export function Plate({ eyebrow, meta, title, lede, children, nextTo, nextLabel }: PlateProps) {
  return (
    <main className="plate">
      <div className="container">
        <BackToMenu />
        <header className="plate__head">
          <p className="course-head__eyebrow t-label">{eyebrow}</p>
          <div className="plate__meta">{meta}</div>
          <h1 className="plate__title">{title}</h1>
          {lede && <p className="plate__lede t-lead measure">{lede}</p>}
        </header>
        {children}
        <nav className="plate__nav" aria-label="Menu navigation">
          <BackToMenu />
          <Link to={nextTo} className="arrow-link">
            <span className="plate__next-label">Next On The Menu</span>
            {nextLabel}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </nav>
      </div>
    </main>
  )
}

export function PlateSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="plate__section">
      <h2 className="t-label plate__label">{label}</h2>
      <div className="plate__body">{children}</div>
    </section>
  )
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="row__bullets plate__bullets">
      {items.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  )
}

export function Prose({ items }: { items: string[] }) {
  return (
    <div className="plate__prose">
      {items.map((t, i) => (
        <p key={i} className="t-lead measure">
          {t}
        </p>
      ))}
    </div>
  )
}

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags">
      {items.map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  )
}
