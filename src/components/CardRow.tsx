import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { onDeal, takeDeal } from '../lib/deal'
import { animateSizes, boxOf, type Box } from '../lib/cardSize'

export interface RowState {
  openId: string | null
  open: (id: string) => void
  close: () => void
  isOpen: (id: string) => boolean
  isAside: (id: string) => boolean
}

interface CardRowProps {
  ids: string[]
  /** 'fan' overlaps cards until one opens; 'row' is a flat spread; 'flop' centers a short set. */
  layout?: 'row' | 'fan' | 'flop'
  className?: string
  ariaLabel: string
  children: (state: RowState) => ReactNode
}

/** What the rail shows about its row: whether it scrolls, and which cards are in view. */
interface View {
  fits: boolean
  left: boolean
  right: boolean
  first: number
  last: number
}

const GAP = 20

/**
 * Owns which card in a row is open. Every card in a row keeps one size;
 * a row with more cards than fit scrolls sideways, snapping card by card,
 * with a count and ← → buttons above it and a fade on the side that has
 * more to show. Opening a card widens it in place and brings it fully into
 * view. The hero's fan is the exception on wide screens: it always fits,
 * so it keeps its overlap and, when a card opens, its slivers. Escape
 * closes. A card picked in the search palette opens through `deal`.
 */
export function CardRow({ ids, layout = 'row', className = '', ariaLabel, children }: CardRowProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [view, setView] = useState<View>({ fits: true, left: false, right: false, first: 1, last: ids.length })

  const rowRef = useRef<HTMLDivElement>(null)

  // The wide-screen hero fan's columns: 7fr for the open ace, 1fr slivers.
  const columns =
    layout !== 'fan'
      ? undefined
      : openId
        ? ids.map((id) => (id === openId ? 'minmax(0, 7fr)' : 'minmax(0, 1fr)')).join(' ')
        : `repeat(${ids.length}, minmax(0, 1fr))`

  // Every card's box just before a change, so the ones that open or close can
  // travel from it to their new size instead of ballooning (see cardSize.ts).
  const boxes = useRef(new Map<Element, Box>())
  const wasGrid = useRef(false)
  const prevOpen = useRef<string | null>(null)
  const prevColumns = useRef(columns)
  const change = useCallback((id: string | null) => {
    const row = rowRef.current
    boxes.current.clear()
    if (row) {
      wasGrid.current = getComputedStyle(row).display === 'grid'
      row.querySelectorAll<HTMLElement>(':scope > .card').forEach((c) => boxes.current.set(c, boxOf(c)))
    }
    setOpenId(id)
  }, [])
  useLayoutEffect(() => {
    const row = rowRef.current
    const before = prevOpen.current
    const fromColumns = prevColumns.current
    prevOpen.current = openId
    prevColumns.current = columns
    if (!row || before === openId || boxes.current.size === 0) return
    const grid = getComputedStyle(row).display === 'grid'
    const cards = [before, openId]
      .map((id) => id && row.querySelector<HTMLElement>(`:scope > [data-card="${CSS.escape(id)}"]`))
      .filter((c): c is HTMLElement => !!c)
    if (!grid && !wasGrid.current) {
      // A flex row (every row, and the hero on a phone): widths and heights travel together.
      animateSizes(cards.map((el) => ({ el, from: boxes.current.get(el)! })))
    } else if (grid && wasGrid.current && fromColumns && columns && fromColumns !== columns) {
      // The wide hero switching aces: its columns ease from the old split to
      // the new one. Measure every card at the new split with that easing
      // held, then start it from the old split, so heights travel with it.
      row.style.transition = 'none'
      animateSizes(cards.map((el) => ({ el, from: boxes.current.get(el)! })))
      row.style.gridTemplateColumns = fromColumns
      void row.offsetWidth
      row.style.transition = ''
      void row.offsetWidth
      row.style.gridTemplateColumns = columns
    }
    // Opening or closing the wide hero swaps the overlapped fan for the
    // column layout in one step, as designed; nothing to travel.
    boxes.current.clear()
  }, [openId, columns])

  const open = useCallback((id: string) => change(id), [change])
  const close = useCallback(() => change(null), [change])
  const isOpen = useCallback((id: string) => openId === id, [openId])
  // Only the hero fan slides its other cards back to slivers; scrolling rows keep them whole.
  const isAside = useCallback((id: string) => layout === 'fan' && openId !== null && openId !== id, [layout, openId])

  const dealt = useRef(false)
  const key = ids.join(' ')
  useEffect(() => {
    const claim = () => {
      const id = takeDeal(key.split(' '))
      if (!id) return
      dealt.current = true
      change(id)
    }
    claim()
    return onDeal(claim)
  }, [key, change])

  // A dealt card is brought into view under the nav, after any anchor scroll has landed.
  useEffect(() => {
    if (!dealt.current || !openId) return
    dealt.current = false
    const card = rowRef.current?.querySelector(`[data-card="${openId}"]`)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!card) return
        const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0
        window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - nav - 16 })
      }),
    )
  }, [openId])

  // Read the row: does it overflow, which way can it scroll, which cards are fully in view.
  const measure = useCallback(() => {
    const row = rowRef.current
    if (!row) return
    // A row that doesn't scroll (the hero fan on a wide screen) always fits, however its cards overlap.
    const cs = getComputedStyle(row)
    const scrolls = cs.overflowX !== 'visible'
    const max = scrolls ? row.scrollWidth - row.clientWidth : 0
    // Whether the row fits is decided by its cards closed, so opening one in
    // a row that fits (face cards, the flop) never brings the bar in above it
    // and drops the row 48px mid-flip. The open card may still overflow; it
    // scrolls into view, and closing it returns the row to centre.
    const n = row.children.length
    const cardW = parseFloat(cs.getPropertyValue('--card-w')) || 0
    const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
    const fits = !scrolls || !cardW || n * cardW + (n - 1) * (parseFloat(cs.columnGap) || GAP) + pad <= row.clientWidth + 2
    // Cards in view, measured on screen against the row's own edges.
    const box = row.getBoundingClientRect()
    const cards = [...row.children].map((c) => c.getBoundingClientRect())
    let first = cards.findIndex((c) => c.right > box.left + 8)
    let last = cards.length - 1
    while (last > 0 && cards[last].right > box.right + 8) last--
    if (first < 0) first = 0
    const from = row.scrollLeft
    const next: View = { fits, left: from > 4, right: from < max - 4, first: first + 1, last: Math.max(first, last) + 1 }
    setView((v) => (v.fits === next.fits && v.left === next.left && v.right === next.right && v.first === next.first && v.last === next.last ? v : next))
  }, [])

  useLayoutEffect(() => {
    const row = rowRef.current
    if (!row) return
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(row)
    row.addEventListener('scroll', measure, { passive: true })
    return () => {
      ro.disconnect()
      row.removeEventListener('scroll', measure)
    }
  }, [measure])

  // Once an opened card has finished widening, slide the row so all of it is in view.
  useEffect(() => {
    const row = rowRef.current
    if (!row || !openId) return
    const t = window.setTimeout(() => {
      const card = row.querySelector<HTMLElement>(`[data-card="${openId}"]`)
      if (!card || row.scrollWidth <= row.clientWidth) return measure()
      const inView = card.offsetLeft >= row.scrollLeft && card.offsetLeft + card.offsetWidth <= row.scrollLeft + row.clientWidth
      if (!inView) row.scrollTo({ left: card.offsetLeft - (row.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' })
      measure()
    }, 520)
    return () => window.clearTimeout(t)
  }, [openId, measure])

  // A page of cards at a time, leaving the last one in view as a landmark.
  const step = useCallback((dir: -1 | 1) => {
    const row = rowRef.current
    const card = row?.querySelector<HTMLElement>('.card:not(.is-open)')
    if (!row || !card) return
    const w = card.offsetWidth + GAP
    row.scrollBy({ left: dir * w * Math.max(1, Math.floor(row.clientWidth / w) - 1), behavior: 'smooth' })
  }, [])

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape' && openId !== null) {
      e.stopPropagation()
      close()
      return
    }
    // Arrow keys page the row while focus is on a card's face.
    if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !view.fits && (e.target as HTMLElement).closest('.card__front')) {
      e.preventDefault()
      step(e.key === 'ArrowRight' ? 1 : -1)
    }
  }

  const rail = ['rail', `rail--${layout}`, view.left && 'more-left', view.right && 'more-right', view.fits && 'fits'].filter(Boolean).join(' ')

  return (
    <div className={rail}>
      <div className="rail__bar" aria-hidden={view.fits || undefined}>
        <span className="rail__count mono mono--sm">
          {view.first === view.last ? view.first : `${view.first}–${view.last}`} of {ids.length}
        </span>
        <button type="button" className="rail__btn" aria-label="Previous cards" disabled={!view.left} onClick={() => step(-1)}>
          ←
        </button>
        <button type="button" className="rail__btn" aria-label="More cards" disabled={!view.right} onClick={() => step(1)}>
          →
        </button>
      </div>
      <div
        ref={rowRef}
        className={`row row--${layout} ${layout === 'fan' ? '' : 'reveal-group'} ${openId ? 'has-open' : ''} ${className}`.trim()}
        style={{ gridTemplateColumns: columns, ['--n' as string]: ids.length }}
        role="group"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
      >
        {children({ openId, open, close, isOpen, isAside })}
      </div>
    </div>
  )
}
