import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Eased wheel scrolling for the whole page. Touch stays native, and visitors
 * who ask for reduced motion get the browser's own scrolling. Everything that
 * scrolls the page by hand (a card sliding under the nav, the nav's scrubber)
 * keeps setting `scrollTop` itself, and Lenis picks the position up from the
 * scroll event, so the two never fight.
 */

let lenis: Lenis | null = null

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

// Fast start, soft landing, like the site's own ease.
const jump = { duration: 0.9, easing: (t: number) => 1 - (1 - t) ** 4 }

/** The opening deal locks the page (`html[data-intro='play']`); Lenis waits with it. */
function syncIntro() {
  if (!lenis) return
  if (document.documentElement.dataset.intro === 'play') lenis.stop()
  else lenis.start()
}

function start() {
  if (lenis || reduced.matches) return
  lenis = new Lenis({
    autoRaf: true,
    // A touch tighter than the default 0.1 so the wheel never feels floaty.
    lerp: 0.12,
    // Modal dialogs (search, enlarged screenshots) scroll their own lists.
    prevent: (node) => node.closest('dialog') !== null,
  })
  syncIntro()
}

function stop() {
  lenis?.destroy()
  lenis = null
}

export function installSmoothScroll() {
  start()
  reduced.addEventListener('change', () => (reduced.matches ? stop() : start()))
  new MutationObserver(syncIntro).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-intro'],
  })
}

/** Scroll the page to `top`, eased when Lenis is on, otherwise as the browser would. */
export function scrollToY(top: number) {
  if (!lenis) {
    window.scrollTo({ top })
    return
  }
  // The browser may have clamped the position if the page just shrank.
  lenis.resize()
  lenis.scrollTo(top, jump)
}

/** Scroll an element to the top of the screen, clear of the nav (its scroll-margin). */
export function scrollToElement(el: HTMLElement) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  scrollToY(el.getBoundingClientRect().top + window.scrollY - margin)
}
