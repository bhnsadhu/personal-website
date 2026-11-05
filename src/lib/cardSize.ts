/**
 * A card that opens or closes changes width and height together, but its
 * natural height is a function of its width at that instant: an open back
 * laid out 248px wide is over 1,500px tall, and a closed face laid out 860px
 * wide is 1,200px tall (its 5:7 shape). Left to CSS, the card balloons for a
 * few frames at the start of every open and close and shoves the page about.
 *
 * So the size is animated explicitly. `from` is the card's box before the
 * change; the destination is measured with the transition off, then width and
 * height travel together on the same curve. While it runs (`is-sizing`), the
 * faces are clipped to the moving box; afterwards the card is back to auto.
 */

export interface Box {
  w: number
  h: number
}

const live = new WeakMap<HTMLElement, () => void>()

/** Most a transition can run: --slide is 0.5s. */
const LIMIT_MS = 700

export function boxOf(el: HTMLElement): Box {
  return { w: el.offsetWidth, h: el.offsetHeight }
}

export function animateSize(el: HTMLElement, from: Box) {
  live.get(el)?.()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // The destination, at its final width.
  el.style.transition = 'none'
  const to = boxOf(el)
  if (Math.abs(from.h - to.h) < 2 && Math.abs(from.w - to.w) < 2) {
    el.style.transition = ''
    return
  }

  el.classList.add('is-sizing')
  el.style.flexBasis = `${from.w}px`
  el.style.height = `${from.h}px`
  void el.offsetWidth

  let timer = 0
  const end = () => {
    window.clearTimeout(timer)
    el.removeEventListener('transitionend', onEnd)
    el.style.transition = ''
    el.style.flexBasis = ''
    el.style.height = ''
    el.classList.remove('is-sizing')
    live.delete(el)
  }
  const onEnd = (e: TransitionEvent) => {
    if (e.target === el && e.propertyName === 'height') end()
  }
  live.set(el, end)
  el.addEventListener('transitionend', onEnd)
  timer = window.setTimeout(end, LIMIT_MS)

  el.style.transition = 'flex-basis var(--slide) var(--ease), height var(--slide) var(--ease)'
  void el.offsetWidth
  el.style.flexBasis = ''
  el.style.height = `${to.h}px`
}
