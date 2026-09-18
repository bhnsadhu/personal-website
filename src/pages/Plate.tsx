import { useEffect, type ReactNode } from 'react'
import { SuitGlyph } from '../components/Suit'
import type { Rank, Suit } from '../data'
import { goBack, Link } from '../lib/router'

interface PlateProps {
  eyebrow: string
  rank: Rank
  suit: Suit
  title: string
  subtitle?: string
  meta?: string
  tags?: string[]
  children: ReactNode
  nextTo?: string
  nextLabel?: string
}

/**
 * A dish's own page: one large card laid on the table. "Back to the hand"
 * uses browser history when we have it and falls back to the home page
 * for shared links. Escape does the same.
 */
export function Plate({ eyebrow, rank, suit, title, subtitle, meta, tags, children, nextTo, nextLabel }: PlateProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') goBack('/')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <main className="plate">
      <div className="container">
        <button type="button" className="tlink tlink--back plate__back" onClick={() => goBack('/')}>
          <span className="arrow" aria-hidden="true">
            ←
          </span>
          Back to the hand
        </button>

        <article className="plate__card">
          <span className="card__corner card__corner--tl" aria-hidden="true">
            <span className="card__rank">{rank}</span>
            <SuitGlyph suit={suit} />
          </span>
          <span className="card__corner card__corner--br" aria-hidden="true">
            <span className="card__rank">{rank}</span>
            <SuitGlyph suit={suit} />
          </span>
          <header className="plate__head">
            <p className="eyebrow plate__eyebrow">{eyebrow}</p>
            <h1 className="plate__title">{title}</h1>
            {subtitle && <p className="plate__subtitle">{subtitle}</p>}
            {meta && <p className="plate__meta mono">{meta}</p>}
          </header>
          <div className="plate__body">{children}</div>
          {tags && tags.length > 0 && (
            <ul className="tags plate__tags" aria-label="Tags">
              {tags.map((t, i) => (
                <li key={`${t}-${i}`} className="tag">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </article>

        <nav className="plate__nav" aria-label="Deck navigation">
          <button type="button" className="tlink tlink--back" onClick={() => goBack('/')}>
            <span className="arrow" aria-hidden="true">
              ←
            </span>
            Back to the hand
          </button>
          {nextTo && nextLabel && (
            <Link to={nextTo} className="tlink">
              Next card: {nextLabel}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          )}
        </nav>
      </div>
    </main>
  )
}

export function PlateSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="plate__section">
      <h2 className="mono plate__label">{label}</h2>
      {children}
    </section>
  )
}
