import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { onDeal, takeDeal } from '../lib/deal'
import { animateSizes, boxOf, type Box } from '../lib/cardSize'
import { slideMs, tween } from '../lib/ease'
import { scrollToY } from '../lib/smoothScroll'

export interface RowState {
  openId: string | null
  open: (id: string) => void
  close: () => void
  isOpen: (id: string) => boolean
  isAside: (id: string) => boolean
}

interface CardRowProps {
  ids: string[]
  /** 'row' for every section; 'fan' is the hero's overlapped hand. */
  layout?: 'row' | 'fan'
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
  const dealt = useRef(false)

  // Every card's box just before a change, so each can travel from it to its
  // new box instead of ballooning or snapping (see cardSize.ts).
  const boxes = useRef(new Map<Element, Box>())
  const prevOpen = useRef<string | null>(null)
  const stopScroll = useRef<(() => void) | null>(null)
  const change = useCallback((id: string | null) => {
    boxes.current.clear()
    rowRef.current?.querySelectorAll<HTMLElement>(':scope > .card').forEach((c) => boxes.current.set(c, boxOf(c)))
    setOpenId(id)
  }, [])
  useLayoutEffect(() => {
    const row = rowRef.current
    const before = prevOpen.current
    prevOpen.current = openId
    if (!row || before === openId || boxes.current.size === 0) return
    const items = [...row.querySelectorAll<HTMLElement>(':scope > .card')]
      .filter((el) => boxes.current.has(el))
      .map((el) => ({ el, from: boxes.current.get(el)! }))
    boxes.current.clear()
    // The opened card's final place is read while the final layout is in
    // place, so the row and the page can start moving with the card rather
    // than after it: one gesture. A card dealt from search scrolls itself.
    const opened = openId ? row.querySelector<HTMLElement>(`:scope > [data-card="${CSS.escape(openId)}"]`) : null
    const out: { plan?: Plan } = {}
    animateSizes(items, () => {
      if (opened && !dealt.current) out.plan = planScroll(row, opened)
    })
    stopScroll.current?.()
    stopScroll.current = out.plan ? runScroll(row, out.plan) : null
  }, [openId])

  const open = useCallback((id: string) => change(id), [change])
  const close = useCallback(() => change(null), [change])
  const isOpen = useCallback((id: string) => openId === id, [openId])
  // Only the hero fan slides its other cards back to slivers; scrolling rows keep them whole.
  const isAside = useCallback((id: string) => layout === 'fan' && openId !== null && openId !== id, [layout, openId])

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
        scrollToY(card.getBoundingClientRect().top + window.scrollY - nav - 16)
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

  // Once an opened card has finished widening, re-read the count and fades.
  useEffect(() => {
    if (!openId) return
    const t = window.setTimeout(measure, 560)
    return () => window.clearTimeout(t)
  }, [openId, measure])

  // A page of cards at a time, leaving the last one in view as a landmark.
  const step = useCallback((dir: -1 | 1): number => {
    const row = rowRef.current
    const card = row?.querySelector<HTMLElement>('.card:not(.is-open)')
    if (!row || !card) return 0
    const w = card.offsetWidth + GAP
    const by = Math.max(1, Math.floor(row.clientWidth / w) - 1)
    row.scrollBy({ left: dir * w * by, behavior: 'smooth' })
    return by
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
      const dir = e.key === 'ArrowRight' ? 1 : -1
      const by = step(dir)
      // Focus goes with the page, so it never sits on a card scrolled out of view.
      const cards = [...(rowRef.current?.children ?? [])] as HTMLElement[]
      const at = cards.findIndex((c) => c.contains(e.target as Node))
      const next = cards[Math.max(0, Math.min(cards.length - 1, at + dir * by))]
      next?.querySelector<HTMLElement>('.card__front')?.focus({ preventScroll: true })
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
        style={{ ['--n' as string]: ids.length }}
        role="group"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
      >
        {children({ openId, open, close, isOpen, isAside })}
      </div>
    </div>
  )
}

/** Where an opened card needs the row and the page to go: [from, to] each. */
interface Plan {
  left?: [number, number]
  top?: [number, number]
}

/**
 * Measured in the card's final layout. Sideways: a card not wholly inside a
 * scrolling row is brought to its start edge, a snap point, so the snap that
 * resumes afterwards has nothing to correct. Down the page: a card that ends
 * under the nav or past the bottom of the screen is brought up to sit under
 * the nav, or just far enough that its foot (and "Back to the hand") shows.
 */
function planScroll(row: HTMLElement, card: HTMLElement): Plan {
  const plan: Plan = {}
  const cs = getComputedStyle(row)
  const rb = row.getBoundingClientRect()
  const cb = card.getBoundingClientRect()
  if (cs.overflowX !== 'visible') {
    const pad = parseFloat(cs.scrollPaddingLeft) || 0
    const from = row.scrollLeft
    const left = cb.left - rb.left + from
    const right = left + cb.width
    if (left < from + pad - 1 || right > from + row.clientWidth - pad + 1) {
      const to = Math.max(0, Math.min(row.scrollWidth - row.clientWidth, left - pad))
      if (Math.abs(to - from) > 1) plan.left = [from, to]
    }
  }
  const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0
  const top = nav + 16
  const bottom = window.innerHeight - 24
  let dy = 0
  if (cb.top < top || cb.height > bottom - top) dy = cb.top - top
  else if (cb.bottom > bottom) dy = cb.bottom - bottom
  if (Math.abs(dy) > 1) plan.top = [window.scrollY, window.scrollY + dy]
  return plan
}

/** Runs the plan on the card's own curve and duration; a wheel or touch takes over. */
function runScroll(row: HTMLElement, plan: Plan): (() => void) | null {
  const set = (p: number) => {
    if (plan.left) row.scrollLeft = plan.left[0] + (plan.left[1] - plan.left[0]) * p
    if (plan.top) window.scrollTo({ top: plan.top[0] + (plan.top[1] - plan.top[0]) * p, behavior: 'instant' })
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    set(1)
    return null
  }
  // Snapping would pull each frame's position to a card edge.
  row.style.scrollSnapType = 'none'
  const stop = tween(slideMs(), set, () => {
    row.style.scrollSnapType = ''
    window.removeEventListener('wheel', stop)
    window.removeEventListener('touchstart', stop)
  })
  window.addEventListener('wheel', stop, { passive: true })
  window.addEventListener('touchstart', stop, { passive: true })
  return stop
}
