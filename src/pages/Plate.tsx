import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '../components/Icons'
import { SuitGlyph } from '../components/Suit'
import type { Rank, Shot, Suit } from '../data'
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
      // Escape inside an open dialog (search, a screenshot) closes only that.
      if (e.key === 'Escape' && !document.querySelector('dialog[open]')) goBack('/')
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

/**
 * Screenshots of the live product. A click enlarges one in place over the
 * page; arrows step through the set, Escape or a click outside closes.
 * Each thumbnail stays a real link, so a modified click still opens the
 * file in a new tab.
 */
export function PlateShots({ shots }: { shots: Shot[] }) {
  const [at, setAt] = useState<number | null>(null)
  const boxRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = boxRef.current
    if (!d) return
    if (at !== null && !d.open) d.showModal()
    else if (at === null && d.open) d.close()
  }, [at])

  const step = (by: number) => setAt((i) => (i === null ? i : (i + by + shots.length) % shots.length))
  const shot = at === null ? null : shots[at]

  return (
    <PlateSection label="What it looks like">
      <ul className="plate__shots">
        {shots.map((s, i) => (
          <li key={s.src}>
            <figure className="plate__shot">
              <a
                href={s.src}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                  e.preventDefault()
                  setAt(i)
                }}
              >
                <img src={s.src} alt={s.alt} width={1408} height={827} loading="lazy" decoding="async" />
                <span className="sr-only">(enlarge)</span>
              </a>
              <figcaption className="mono plate__shot-caption">{s.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={boxRef}
        className="shotbox"
        aria-label="Screenshot"
        onClose={() => setAt(null)}
        onClick={(e) => {
          // The dialog box itself, not its content, is the backdrop.
          if (e.target === e.currentTarget) boxRef.current?.close()
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') step(-1)
          if (e.key === 'ArrowRight') step(1)
        }}
      >
        {shot && (
          <figure className="shotbox__figure">
            <div className="shotbox__bar">
              <figcaption className="mono shotbox__caption">{shot.caption}</figcaption>
              <button type="button" className="shotbox__btn" aria-label="Close" onClick={() => setAt(null)}>
                <CloseIcon className="icon--brass" />
              </button>
            </div>
            <img className="shotbox__img" src={shot.src} alt={shot.alt} width={1408} height={827} />
            {shots.length > 1 && (
              <div className="shotbox__bar">
                <button type="button" className="shotbox__btn" aria-label="Previous screenshot" onClick={() => step(-1)}>
                  <ArrowLeftIcon className="icon--brass" />
                </button>
                <span className="mono shotbox__count" aria-live="polite">
                  {at! + 1} / {shots.length}
                </span>
                <button type="button" className="shotbox__btn" aria-label="Next screenshot" onClick={() => step(1)}>
                  <ArrowRightIcon className="icon--brass" />
                </button>
              </div>
            )}
          </figure>
        )}
      </dialog>
    </PlateSection>
  )
}
