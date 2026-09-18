import { useId, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link } from '../lib/router'

/**
 * The indexed editorial row shared by Mains, Sides and Specials:
 * 120px meta | content | 60px end column.
 */

interface ExpandRowProps {
  meta: ReactNode
  organization: string
  title: string
  bullets: string[]
  details: ReactNode
}

export function ExpandRow({ meta, organization, title, bullets, details }: ExpandRowProps) {
  const [open, setOpen] = useState(false)
  const id = useId()

  function onKey(e: KeyboardEvent<HTMLElement>) {
    if (e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }

  return (
    <article
      className={`row row--expand ${open ? 'is-open' : ''}`.trim()}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-controls={id}
      onClick={() => setOpen((o) => !o)}
      onKeyDown={onKey}
    >
      <div className="row__meta t-meta">{meta}</div>
      <div className="row__main">
        <p className="row__org t-label">{organization}</p>
        <h3 className="row__title t-card">{title}</h3>
        <ul className="row__bullets">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="row__details" id={id}>
          <div>{details}</div>
        </div>
      </div>
      <div className="row__end">
        <span className="row__plus" aria-hidden="true" />
      </div>
    </article>
  )
}

interface LinkRowProps {
  to: string
  meta: ReactNode
  title: string
  description: string
  tags: string[]
}

export function LinkRow({ to, meta, title, description, tags }: LinkRowProps) {
  return (
    <Link to={to} className="row row--link">
      <div className="row__meta t-meta">{meta}</div>
      <div className="row__main">
        <h3 className="row__title t-card">{title}</h3>
        <p className="row__desc measure">{description}</p>
        <ul className="tags row__tags">
          {tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="row__end">
        <span className="row__arrow" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  )
}

/** Labelled block inside an expanded row or on a dish page. */
export function Detail({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="detail">
      <h4 className="t-label detail__label">{label}</h4>
      <ul className="row__bullets">
        {items.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  )
}
