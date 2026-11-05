/**
 * A card that opens or closes changes width and height together, but its
 * natural height is a function of its width at that instant: an open back
 * laid out 248px wide is over 1,500px tall, and a closed face laid out 860px
 * wide is 1,200px tall (its 5:7 shape). Left to CSS, the card balloons for a
 * few frames at the start of every open and close and shoves the page about.
 *
 * So the box is animated explicitly. `from` is each card's box before the
 * change; the destination is measured with transitions off, then width,
 * height, margin and angle travel together on the same curve. While it runs
 * (`is-sizing`), the faces are clipped to the moving box; afterwards the card
 * is back to its stylesheet.
 */

export interface Box {
  w: number
  h: number
  /** margin-left: the hero fan overlaps its closed cards. */
  ml: string
  /** transform: the hero fan's tilt (and hover lift) on a closed card. */
  tf: string
}

const live = new WeakMap<HTMLElement, () => void>()

/** Most a transition can run: --slide is 0.5s. */
const LIMIT_MS = 700

const MOVE = ['flex-basis', 'height', 'margin-left', 'transform'].map((p) => `${p} var(--slide) var(--ease)`).join(', ')

export function boxOf(el: HTMLElement): Box {
  const cs = getComputedStyle(el)
  return { w: el.offsetWidth, h: el.offsetHeight, ml: cs.marginLeft, tf: cs.transform }
}

/**
 * Animates every card from its box before the change to its box now. All
 * destinations are measured before any card is pinned to its old size: a
 * pinned card props up a row's height, and a sibling measured after it would
 * read that instead of its own (the hero's slivers stretch to the tallest
 * card). `atFinal` runs while the final layout is in place, before anything
 * moves, so a caller can measure where things will end up.
 */
export function animateSizes(items: { el: HTMLElement; from: Box }[], atFinal?: () => void) {
  items.forEach(({ el }) => live.get(el)?.())
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    atFinal?.()
    return
  }

  items.forEach(({ el }) => (el.style.transition = 'none'))
  const moves = items
    .map(({ el, from }) => ({ el, from, to: boxOf(el) }))
    .filter(({ el, from, to }) => {
      const still = Math.abs(from.h - to.h) < 2 && Math.abs(from.w - to.w) < 2 && from.ml === to.ml && from.tf === to.tf
      if (still) el.style.transition = ''
      return !still
    })
  atFinal?.()

  moves.forEach(({ el, from }) => {
    el.classList.add('is-sizing')
    el.style.flexBasis = `${from.w}px`
    el.style.height = `${from.h}px`
    el.style.marginLeft = from.ml
    el.style.transform = from.tf
  })
  if (moves.length) void moves[0].el.offsetWidth

  moves.forEach(({ el, to }) => {
    let timer = 0
    const end = () => {
      window.clearTimeout(timer)
      el.removeEventListener('transitionend', onEnd)
      el.style.transition = ''
      el.style.flexBasis = ''
      el.style.height = ''
      el.style.marginLeft = ''
      el.style.transform = ''
      el.classList.remove('is-sizing')
      live.delete(el)
    }
    const onEnd = (e: TransitionEvent) => {
      if (e.target === el && e.propertyName === 'height') end()
    }
    live.set(el, end)
    el.addEventListener('transitionend', onEnd)
    timer = window.setTimeout(end, LIMIT_MS)
    el.style.transition = MOVE
    void el.offsetWidth
    el.style.flexBasis = ''
    el.style.height = `${to.h}px`
    el.style.marginLeft = ''
    el.style.transform = ''
  })
}
