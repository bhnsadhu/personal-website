import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * One tooltip for the whole site, for the few things that show a symbol in
 * place of a word: an element with `data-tip` gets a small tag naming it, on
 * hover (a real hover, never a tap) and on keyboard focus. With
 * `data-tip-unless`, the tag stays away while that part of the element is
 * on screen, so a card sliver or a nav suit is named only when its own words
 * are hidden. Decorative: every trigger already carries its accessible name.
 */

const DELAY = 140
const GAP = 8
/** The corner buttons' inset (palette.css). */
const EDGE = 24

/** On a whole device pixel, so the words render the same crisp way wherever the tag lands. */
const snap = (v: number) => Math.round(v * devicePixelRatio) / devicePixelRatio

/** `l`/`r` are the trigger's edges, for a tag too wide to centre near the screen's edge. */
type Tip = { text: string; x: number; l: number; r: number; y: number; below: boolean; shown: boolean }

function wordsShown(el: HTMLElement) {
  const sel = el.dataset.tipUnless
  if (!sel) return false
  return Array.from(el.querySelectorAll<HTMLElement>(sel)).some((n) => {
    const s = getComputedStyle(n)
    return s.display !== 'none' && s.visibility !== 'hidden' && Number(s.opacity) > 0.1
  })
}

export function Tooltip() {
  const [tip, setTip] = useState<Tip | null>(null)
  const ref = useRef<HTMLSpanElement>(null)
  const target = useRef<HTMLElement | null>(null)
  const timer = useRef(0)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')

    const place = (el: HTMLElement) => {
      const text = el.dataset.tip
      if (!text || wordsShown(el)) return hide()
      // Measure against the part of the element on screen, under the nav,
      // so a tall card scrolled half out of view still gets its tag.
      const r = el.getBoundingClientRect()
      const nav = document.querySelector('.nav')
      const inNav = !!nav?.contains(el)
      const navBottom = nav ? nav.getBoundingClientRect().bottom : 0
      const navH = inNav ? 0 : navBottom
      const top = Math.max(r.top, navH)
      const bottom = Math.min(r.bottom, window.innerHeight)
      if (bottom <= top) return hide()
      // The nav's own controls drop their tag onto the page, under the bar.
      const below = inNav || top - GAP - 32 < navH
      // A run of tracked text ends in tracking after its last letter; centre
      // on the letters, not on that trailing space.
      const cs = getComputedStyle(el)
      const trail = cs.display === 'inline' ? parseFloat(cs.letterSpacing) || 0 : 0
      const x = r.left + (r.width - trail) / 2
      // Below the nav's hairline, not across it, so the nav's tags hang on one
      // line; the chip rides on that line, so its own tag clears the chip.
      const under = inNav ? Math.max(bottom, navBottom) : bottom
      setTip({ text, x, l: r.left, r: r.right - trail, y: snap(below ? under + GAP : top - GAP), below, shown: true })
    }

    const show = (el: HTMLElement, now: boolean) => {
      window.clearTimeout(timer.current)
      target.current = el
      // Moving from one tag to the next swaps at once; a fresh hover waits a beat.
      if (now) place(el)
      else timer.current = window.setTimeout(() => place(el), DELAY)
    }

    const hide = () => {
      window.clearTimeout(timer.current)
      target.current = null
      // Keep the words while the tag fades, rather than shrinking it empty.
      setTip((t) => (t && t.shown ? { ...t, shown: false } : t))
    }

    const tipOf = (n: EventTarget | null) => (n instanceof Element ? n.closest<HTMLElement>('[data-tip]') : null)

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !canHover.matches) return
      const el = tipOf(e.target)
      if (el === target.current) return
      if (el) show(el, target.current !== null)
      else if (target.current) hide()
    }
    const onFocus = (e: FocusEvent) => {
      const el = tipOf(e.target)
      if (el && (e.target as Element).matches(':focus-visible')) show(el, true)
    }
    const onBlur = (e: FocusEvent) => {
      if (tipOf(e.target) === target.current) hide()
    }
    const onLeave = (e: PointerEvent) => {
      if (!e.relatedTarget) hide()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide()
    }

    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerdown', hide, true)
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.addEventListener('focusin', onFocus)
    document.addEventListener('focusout', onBlur)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', hide, { passive: true })
    window.addEventListener('resize', hide)
    return () => {
      window.clearTimeout(timer.current)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerdown', hide, true)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('focusin', onFocus)
      document.removeEventListener('focusout', onBlur)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', hide)
      window.removeEventListener('resize', hide)
    }
  }, [])

  // Centred on its trigger once its width is known. A tag that would come
  // nearer the screen's edge than the corner buttons (24px) lines up with
  // its trigger's edge instead: the theme button's right, the eyebrow's left,
  // back to top's right, so it reads as placed rather than pushed.
  useEffect(() => {
    const el = ref.current
    if (!el || !tip?.shown) return
    const w = el.getBoundingClientRect().width
    const max = document.documentElement.clientWidth - EDGE
    let left = tip.x - w / 2
    if (left < EDGE) left = Math.max(tip.l, EDGE)
    else if (left + w > max) left = Math.min(tip.r, max) - w
    el.style.left = `${snap(left)}px`
  }, [tip])

  return createPortal(
    <span
      ref={ref}
      className={`tip mono ${tip?.shown ? 'is-shown' : ''} ${tip?.below ? 'is-below' : ''}`.trim()}
      style={tip ? { top: tip.y } : undefined}
      aria-hidden="true"
    >
      {tip?.text}
    </span>,
    document.body,
  )
}
