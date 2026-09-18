import type { ReactNode } from 'react'
import { Link } from '../lib/router'

interface RowProps {
  to: string
  title: string
  inline?: string
  description?: string
  note?: string
  action: ReactNode
}

/**
 * One line item on the menu. The whole row is the link; the action
 * ("View" or a status) sits flush right like a price.
 */
export function Row({ to, title, inline, description, note, action }: RowProps) {
  return (
    <Link to={to} className="row row--link">
      <span className="row__head">
        <span className="row__title">{title}</span>
        {inline && <span className="row__inline">{inline}</span>}
      </span>
      <span className="row__action">{action}</span>
      {description && <span className="row__desc">{description}</span>}
      {note && <span className="row__note">{note}</span>}
    </Link>
  )
}

export function View() {
  return <span className="row__view">View</span>
}
