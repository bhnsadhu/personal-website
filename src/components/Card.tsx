import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from 'react'
import type { Face, Rank, Suit } from '../data'
import { Link } from '../lib/router'
import { SUIT_NAME, SuitGlyph } from './Suit'

export interface CardProps {
  id: string
  rank: Rank
  suit: Suit
  /** Face-card styling (K, Q, J) for leadership. */
  face?: Face
  /** "Not dealt yet": renders the card back and never expands. */
  faceDown?: boolean
  title: string
  subtitle?: string
  meta?: string
  tags?: string[]
  /** Small label in the top-right corner of the face, e.g. "Current role". */
  corner?: string
  open: boolean
  aside: boolean
  onOpen: () => void
  onClose: () => void
  onFaceDownClick?: () => void
  /** Link to the dedicated page, shown on the back. */
  more?: { label: string; to: string }
  /** Back-face body. Always in the DOM. */
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

/**
 * One playing card. The front is a button; the back is a region with the
 * full content, present in the DOM from the start and made inert until the
 * card is open. Flip is a rotateY; reduced motion swaps it for a fade (CSS).
 */
export function Card({
  id,
  rank,
  suit,
  face,
  faceDown = false,
  title,
  subtitle,
  meta,
  tags,
  corner,
  open,
  aside,
  onOpen,
  onClose,
  onFaceDownClick,
  more,
  children,
  style,
  className = '',
}: CardProps) {
  const backId = useId()
  const frontRef = useRef<HTMLButtonElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const wasOpen = useRef(open)

  // Move focus with the flip: into the back when opening, back to the face when closing.
  useEffect(() => {
    if (open && !wasOpen.current) titleRef.current?.focus({ preventScroll: true })
    if (!open && wasOpen.current) frontRef.current?.focus({ preventScroll: true })
    wasOpen.current = open
  }, [open])

  const label = `${rank} of ${SUIT_NAME[suit]}`
  const cls = [
    'card',
    open ? 'is-open' : '',
    aside ? 'is-aside' : '',
    faceDown ? 'is-down' : '',
    face ? 'card--face' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={cls} data-card={id} style={style}>
      <div className="card__inner">
        <button
          ref={frontRef}
          type="button"
          className="card__front"
          aria-expanded={faceDown ? undefined : open}
          aria-controls={faceDown ? undefined : backId}
          aria-disabled={faceDown || undefined}
          aria-label={faceDown ? `${label}: ${title}, not dealt yet` : `${label}: ${title}. Flip to read more.`}
          onClick={faceDown ? onFaceDownClick : onOpen}
          inert={open}
        >
          <span className="card__corner card__corner--tl" aria-hidden="true">
            <span className="card__rank">{rank}</span>
            <SuitGlyph suit={suit} />
          </span>
          <span className="card__corner card__corner--br" aria-hidden="true">
            <span className="card__rank">{rank}</span>
            <SuitGlyph suit={suit} />
          </span>

          {faceDown ? (
            <span className="card__down" aria-hidden="true">
              <span className="card__down-mark">
                <SuitGlyph suit={suit} />
              </span>
              <span className="card__down-label">Not dealt yet</span>
            </span>
          ) : (
            <span className="card__face-body">
              {corner && <span className="card__tag-corner mono mono--sm">{corner}</span>}
              {face && (
                <span className="card__portrait" data-face={face} aria-hidden="true">
                  <span>{face}</span>
                </span>
              )}
              <span className="card__title">{title}</span>
              {subtitle && <span className="card__subtitle">{subtitle}</span>}
              {meta && <span className="card__meta mono mono--sm">{meta}</span>}
              <span className="card__hint mono mono--sm" aria-hidden="true">
                Tap to flip
              </span>
            </span>
          )}
        </button>

        <div
          id={backId}
          className="card__back"
          role="region"
          aria-label={faceDown ? undefined : title}
          inert={!open}
        >
          <header className="card__back-head">
            <span className="card__back-pip" aria-hidden="true">
              <span className="card__rank">{rank}</span>
              <SuitGlyph suit={suit} />
            </span>
            {subtitle && <p className="eyebrow">{subtitle}</p>}
            <h3 className="card__back-title" ref={titleRef} tabIndex={-1}>
              {title}
            </h3>
            {meta && <p className="card__back-meta mono">{meta}</p>}
          </header>
          <div className="card__body">{children}</div>
          {tags && tags.length > 0 && (
            <ul className="tags card__tags" aria-label="Tags">
              {tags.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
          )}
          <footer className="card__back-foot">
            <button type="button" className="tlink tlink--back" onClick={onClose}>
              <span className="arrow" aria-hidden="true">
                ←
              </span>
              Back to the hand
            </button>
            {more && (
              <Link to={more.to} className="tlink">
                {more.label}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            )}
          </footer>
        </div>
      </div>
    </article>
  )
}
