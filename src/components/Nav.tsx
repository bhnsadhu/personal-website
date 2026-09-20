import { Link, usePath } from '../lib/router'
import { site, type Suit } from '../data'
import { SUIT_GLYPH } from './Suit'

interface SuitLink {
  suit: Suit
  anchor: string
  label: string
}

/**
 * Suits are the nav. Each announces the section it leads to. The anchor is
 * the section's id, which the card view and the list view both use, so a
 * suit scrolls within whichever view you are already in.
 */
export const SUIT_NAV: SuitLink[] = [
  { suit: 'spades', anchor: 'spread', label: 'Experience' },
  { suit: 'diamonds', anchor: 'fan', label: 'Projects' },
  { suit: 'clubs', anchor: 'chips', label: 'Skills' },
  { suit: 'hearts', anchor: 'flop', label: 'Personal' },
]

export function Nav() {
  const path = usePath()
  const onList = path === '/list'

  return (
    <header className="nav">
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label={`${site.shortName}, back to your hand`}>
          {site.shortName}
        </Link>

        <nav className="nav__suits" aria-label="Sections">
          <ul>
            {SUIT_NAV.map((s) => (
              <li key={s.suit}>
                <Link
                  to={`${onList ? '/list' : '/'}#${s.anchor}`}
                  className={`nav__suit nav__suit--${s.suit}`}
                  aria-label={`${s.label} (${s.suit})`}
                  title={s.label}
                >
                  <span aria-hidden="true">{SUIT_GLYPH[s.suit]}</span>
                  <span className="nav__suit-label mono mono--sm" aria-hidden="true">
                    {s.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__end">
          <Link to={onList ? '/' : '/list'} className="btn btn--ghost nav__toggle" aria-current={onList ? 'page' : undefined}>
            {onList ? 'Card view' : 'List view'}
          </Link>
          <a className="btn nav__resume" href={site.resume} target="_blank" rel="noreferrer">
            Resume
            <span className="sr-only">(opens PDF in a new tab)</span>
          </a>
        </div>
      </div>
    </header>
  )
}
