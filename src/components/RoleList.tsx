import { site } from '../data'

/**
 * The recruiting order. site.roles is already in priority order and is never
 * re-sorted here; the lead role is marked, not moved. One component behind
 * the hero's seeking line and the list view's about section, so the two
 * cannot drift apart.
 */
export function RoleList({ className }: { className?: string }) {
  return (
    <ol className={`roles mono mono--sm${className ? ` ${className}` : ''}`} aria-label="Roles, in priority order">
      {site.roles.map((r, i) => (
        <li key={r} className={i === 0 ? 'roles__role roles__role--lead' : 'roles__role'}>
          {r}
        </li>
      ))}
    </ol>
  )
}
