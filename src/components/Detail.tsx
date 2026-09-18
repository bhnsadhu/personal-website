import type { ReactNode } from 'react'
import { Link } from '../lib/router'
import { ArrowRight } from './Glyph'
import { BackToMenu } from './Sheet'
import type { Stat } from '../lib/content'

interface SectionProps {
  label: string
  children: ReactNode
}

/** A labelled block on a dish's page: "What I Owned", "The Ask", and so on. */
export function Section({ label, children }: SectionProps) {
  return (
    <section>
      <h2 className="label section__label">{label}</h2>
      <div className="section__body">{children}</div>
    </section>
  )
}

export function Prose({ items }: { items: string[] }) {
  return (
    <div className="prose">
      {items.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  )
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list">
      {items.map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  )
}

export function Stats({ items }: { items: Stat[] }) {
  return (
    <dl className="stats" style={{ ['--n' as string]: items.length }}>
      {items.map((stat) => (
        <div className="stat" key={stat.label}>
          <dd className="stat__value">{stat.value}</dd>
          <dt className="stat__label">{stat.label}</dt>
        </div>
      ))}
    </dl>
  )
}

export function Pills({ items }: { items: string[] }) {
  return (
    <ul className="pills">
      {items.map((item) => (
        <li className="pill" key={item}>
          {item}
        </li>
      ))}
    </ul>
  )
}

interface PageNavProps {
  nextTo: string
  nextLabel: string
}

/** Bottom of every dish page: back to the menu, and the next plate in the course. */
export function PageNav({ nextTo, nextLabel }: PageNavProps) {
  return (
    <nav className="page__nav" aria-label="Menu navigation">
      <BackToMenu />
      <Link to={nextTo} className="link">
        <em>Next On The Menu</em> {nextLabel}
        <ArrowRight />
      </Link>
    </nav>
  )
}
