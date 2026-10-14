import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import type { Face, Rank, Suit } from '../data'
import { onDeal, takeDeal } from '../lib/deal'
import { Link } from '../lib/router'
import { SEP } from '../lib/sep'
import { SuitGlyph } from './Suit'

/**
 * The list view's rows. Each row is a card laid flat: the same rank and
 * suit, title, italic subtitle, and dates as the card's face, and the same
 * back (from Backs.tsx) sliding open beneath it. A group owns which rows
 * are open, offers "Open all", and claims cards dealt from search.
 */

interface GroupState {
  isOpen: (id: string) => boolean
  toggle: (id: string) => void
}

const GroupContext = createContext<GroupState>({ isOpen: () => false, toggle: () => {} })

export function IndexGroup({ ids, label, children }: { ids: string[]; label: string; children: ReactNode }) {
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set())
  const listRef = useRef<HTMLOListElement>(null)
  const dealt = useRef<string | null>(null)
  const key = ids.join(' ')

  useEffect(() => {
    const claim = () => {
      const id = takeDeal(key.split(' '))
      if (!id) return
      dealt.current = id
      setOpen((s) => new Set(s).add(id))
    }
    claim()
    return onDeal(claim)
  }, [key])

  // A row opened from search is brought under the nav once any anchor scroll has landed.
  useEffect(() => {
    const id = dealt.current
    if (!id) return
    dealt.current = null
    const row = listRef.current?.querySelector(`[data-row="${id}"]`)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!row) return
        const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0
        window.scrollTo({ top: row.getBoundingClientRect().top + window.scrollY - nav - 16 })
        row.querySelector<HTMLElement>('.ix__btn')?.focus({ preventScroll: true })
      }),
    )
  }, [open])

  const all = ids.length > 0 && ids.every((id) => open.has(id))
  const state: GroupState = {
    isOpen: (id) => open.has(id),
    toggle: (id) =>
      setOpen((s) => {
        const next = new Set(s)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      }),
  }

  return (
    <GroupContext.Provider value={state}>
      <div className="ix__bar">
        <button type="button" className="tlink ix__all" onClick={() => setOpen(all ? new Set() : new Set(ids))}>
          {all ? 'Close all' : 'Open all'}
          <span className="sr-only"> {label}</span>
        </button>
      </div>
      <ol className="ix reveal-group" ref={listRef} aria-label={label}>
        {children}
      </ol>
    </GroupContext.Provider>
  )
}

interface IndexRowProps {
  id: string
  rank: Rank | Face
  suit: Suit
  title: string
  subtitle?: string
  meta?: string
  /** The small label in the card's top corner. */
  corner?: string
  tags?: string[]
  more?: { label: string; to: string }
  /** Face down: shown, never opens. */
  down?: boolean
  /** The back. Without one the row is static. */
  children?: ReactNode
}

export function IndexRow({ id, rank, suit, title, subtitle, meta, corner, tags, more, down = false, children }: IndexRowProps) {
  const { isOpen, toggle } = useContext(GroupContext)
  const bodyId = useId()
  const open = isOpen(id)
  const expandable = !down && children !== undefined

  const label = (
    <>
      <span className="ix__name">{title}</span>
      {subtitle && (
        <span className="ix__sub">
          <span aria-hidden="true">{SEP}</span>
          {subtitle}
        </span>
      )}
    </>
  )

  return (
    <li className={`ix__row ${open ? 'is-open' : ''} ${down ? 'is-down' : ''}`.trim()} data-row={id}>
      <div className="ix__head">
        <span className="ix__pip" aria-hidden="true">
          <span className="ix__rank">{rank}</span>
          <SuitGlyph suit={suit} />
        </span>
        <h3 className="ix__title">
          {expandable ? (
            <button type="button" className="ix__btn" aria-expanded={open} aria-controls={bodyId} onClick={() => toggle(id)}>
              {label}
            </button>
          ) : (
            label
          )}
        </h3>
        <span className="ix__meta mono mono--sm">
          {corner && <span className="ix__corner">{corner}</span>}
          {down ? 'Not dealt yet' : meta}
        </span>
        {expandable && <span className="ix__plus" aria-hidden="true" />}
      </div>

      {expandable && (
        <div className="ix__body" id={bodyId} role="region" aria-label={title} inert={!open}>
          <div className="ix__inner">
            <div className="ix__back">
              {children}
              {tags && tags.length > 0 && (
                <ul className="tags ix__tags" aria-label="Tags">
                  {tags.map((t, i) => (
                    <li key={`${t}-${i}`} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {more && (
                <Link to={more.to} className="tlink ix__more">
                  {more.label}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  )
}
