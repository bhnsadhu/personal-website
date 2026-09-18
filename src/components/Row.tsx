import type { ReactNode } from 'react'
import { Link } from '../lib/router'

interface RowProps {
  to: string
  /** Bold lead: the dish name, role, or position. */
  title: string
  /** Regular weight, joined to the title with a middle dot. */
  subtitle?: string
  /** Sits after a thin bar: a date range or one-line description. */
  meta?: string
  /** Italic muted line underneath (tech stack). */
  note?: string
  action: ReactNode
}

/**
 * One line item on the menu. The whole row is the link; the action
 * ("View" or a status) sits flush right like a price.
 */
export function Row({ to, title, subtitle, meta, note, action }: RowProps) {
  return (
    <Link to={to} className="row row--link">
      <span className="row__head">
        <span className="row__title">
          <strong>{title}</strong>
          {subtitle && <span className="row__subtitle"> · {subtitle}</span>}
        </span>
        {meta && (
          <>
            <span className="row__sep" aria-hidden="true" />
            <span className="row__meta">{meta}</span>
          </>
        )}
      </span>
      <span className="row__action">{action}</span>
      {note && <span className="row__note">{note}</span>}
    </Link>
  )
}

export function View() {
  return <span className="row__view">View</span>
}
