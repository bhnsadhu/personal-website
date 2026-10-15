import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

/** The browser chrome color for each theme, matching `--bg`. */
const CHROME: Record<Theme, string> = { dark: '#100E0C', light: '#F5F0E8' }

const listeners = new Set<() => void>()

/** The inline script in index.html sets this before first paint. */
function read(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', CHROME[theme])
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Private mode: the choice lasts until the tab closes.
  }
  listeners.forEach((cb) => cb())
}

/**
 * Switch themes. Hover and focus transitions would otherwise fade some
 * colors and snap others, so they are held for the swap, and the page
 * cross-fades instead where the browser offers a view transition.
 */
export function setTheme(theme: Theme) {
  const root = document.documentElement
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  root.classList.add('theme-swap')
  const release = () => requestAnimationFrame(() => root.classList.remove('theme-swap'))
  if (typeof doc.startViewTransition === 'function' && !calm) {
    doc.startViewTransition(() => {
      apply(theme)
      release()
    })
  } else {
    apply(theme)
    release()
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

export function useTheme() {
  return useSyncExternalStore(subscribe, read, () => 'dark' as Theme)
}
