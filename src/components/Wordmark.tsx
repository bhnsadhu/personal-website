import { Link } from '../lib/router'
import { site } from '../lib/content'

interface WordmarkProps {
  className?: string
  as?: 'h1' | 'span'
  to?: string
}

export function Wordmark({ className = '', as = 'span', to }: WordmarkProps) {
  const cls = `wordmark ${className}`.trim()
  if (to) {
    return (
      <Link to={to} className={cls} aria-label={`${site.name}, back to the menu`}>
        {site.name}
      </Link>
    )
  }
  const Tag = as
  return <Tag className={cls}>{site.name}</Tag>
}
