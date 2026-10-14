/**
 * Ask whichever CardRow holds a card to open it, from outside the row (the
 * search palette). The request is kept until a row claims it, so it still
 * lands when the row mounts after a page change.
 */

const EVENT = 'deal'
let pending: string | null = null

export function deal(id: string) {
  pending = id
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: id }))
}

/** The pending card id if it belongs to `ids`, cleared once taken. */
export function takeDeal(ids: string[]) {
  if (pending === null || !ids.includes(pending)) return null
  const id = pending
  pending = null
  return id
}

export function onDeal(fn: () => void) {
  window.addEventListener(EVENT, fn)
  return () => window.removeEventListener(EVENT, fn)
}
