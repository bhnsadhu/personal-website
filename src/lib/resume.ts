/**
 * Open the resume drawer from anywhere: a resume link or the search palette.
 * Phones show a PDF badly inside a page, so there it opens in a new tab.
 */

const EVENT = 'resume'

export function drawerFits() {
  return !window.matchMedia('(max-width: 720px)').matches
}

export function openResume() {
  window.dispatchEvent(new Event(EVENT))
}

export function onResume(fn: () => void) {
  window.addEventListener(EVENT, fn)
  return () => window.removeEventListener(EVENT, fn)
}
