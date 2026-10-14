/**
 * Scroll reveals. Anything marked `.reveal` (one element) or
 * `.reveal-group` (its children, staggered) gets `data-in` the first time it
 * scrolls into view. An attribute, not a class: React rewrites className
 * when a row's state changes, and would wipe a class it did not set. A
 * MutationObserver picks up whatever a route change mounts. Hidden-until-revealed styles hang off `html.js` and a motion
 * preference in motion.css, so without script, or with reduced motion,
 * everything simply shows.
 */

const SELECTOR = '.reveal, .reveal-group'

export function installReveal() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
  document.documentElement.classList.add('js')

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const el = e.target as HTMLElement
        if (el.classList.contains('reveal-group')) {
          Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)))
        }
        el.dataset.in = ''
        io.unobserve(el)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  )

  const watch = (root: ParentNode) => {
    root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
      if (!('in' in el.dataset)) io.observe(el)
    })
  }

  watch(document)
  new MutationObserver((records) => {
    for (const r of records) {
      r.addedNodes.forEach((n) => {
        if (!(n instanceof HTMLElement)) return
        if (n.matches(SELECTOR)) io.observe(n)
        watch(n)
      })
    }
  }).observe(document.body, { childList: true, subtree: true })
}

/** True when the visitor has a fine pointer and has not asked for less motion. */
export function richPointer() {
  return (
    window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
