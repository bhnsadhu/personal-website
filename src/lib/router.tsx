import {
  createContext,
  useContext,
  useLayoutEffect,
  useSyncExternalStore,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { flushSync } from 'react-dom'

/**
 * A small client-side router. It does exactly four things this site needs:
 * path matching with :params, <Link> that intercepts plain left-clicks,
 * navigation wrapped in the View Transitions API where available, and
 * scroll restoration keyed per history entry. Nothing else.
 */

type Params = Record<string, string>

interface Route {
  path: string
  element: (params: Params) => ReactNode
}

interface EntryState {
  key: string
}

const listeners = new Set<() => void>()
const positions = new Map<string, number>()
let currentKey = 'initial'
let pendingScroll: number | null = null

function emit() {
  for (const fn of listeners) fn()
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function getPath() {
  return window.location.pathname
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Run a DOM update inside a view transition when the browser offers one. */
function transition(update: () => void) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => unknown
  }
  if (typeof doc.startViewTransition === 'function' && !reducedMotion()) {
    doc.startViewTransition(() => flushSync(update))
  } else {
    update()
  }
}

export function navigate(to: string, options: { replace?: boolean } = {}) {
  if (to === getPath()) return
  positions.set(currentKey, window.scrollY)
  const key = Math.random().toString(36).slice(2, 10)
  const state: EntryState = { key }
  transition(() => {
    if (options.replace) window.history.replaceState(state, '', to)
    else window.history.pushState(state, '', to)
    currentKey = key
    pendingScroll = 0
    emit()
  })
}

function onPopState() {
  positions.set(currentKey, window.scrollY)
  const state = window.history.state as EntryState | null
  currentKey = state?.key ?? 'initial'
  pendingScroll = positions.get(currentKey) ?? 0
  transition(emit)
}

let installed = false
function install() {
  if (installed || typeof window === 'undefined') return
  installed = true
  window.history.scrollRestoration = 'manual'
  const state = window.history.state as EntryState | null
  if (state?.key) currentKey = state.key
  else window.history.replaceState({ key: currentKey } satisfies EntryState, '')
  window.addEventListener('popstate', onPopState)
}

function match(pattern: string, path: string): Params | null {
  if (pattern === '*') return {}
  const a = pattern.split('/').filter(Boolean)
  const b = path.split('/').filter(Boolean)
  if (a.length !== b.length) return null
  const params: Params = {}
  for (let i = 0; i < a.length; i += 1) {
    const seg = a[i]
    if (seg.startsWith(':')) params[seg.slice(1)] = decodeURIComponent(b[i])
    else if (seg !== b[i]) return null
  }
  return params
}

const ParamsContext = createContext<Params>({})

export function useParams() {
  return useContext(ParamsContext)
}

export function usePath() {
  return useSyncExternalStore(subscribe, getPath, getPath)
}

export function Router({ routes }: { routes: Route[] }) {
  install()
  const path = usePath()

  // Restore (or reset) scroll after the new page has committed.
  useLayoutEffect(() => {
    if (pendingScroll === null) return
    window.scrollTo(0, pendingScroll)
    pendingScroll = null
  }, [path])

  for (const route of routes) {
    const params = match(route.path, path)
    if (params) {
      return (
        <ParamsContext.Provider value={params} key={route.path}>
          {route.element(params)}
        </ParamsContext.Provider>
      )
    }
  }
  return null
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  children: ReactNode
}

/** An anchor that stays an anchor: new-tab clicks, middle clicks and modifiers pass through. */
export function Link({ to, children, onClick, ...rest }: LinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      rest.target === '_blank'
    ) {
      return
    }
    event.preventDefault()
    navigate(to)
  }
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
