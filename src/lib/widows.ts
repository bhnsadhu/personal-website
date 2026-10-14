/**
 * Keeps the last three words of each paragraph together with no-break
 * spaces, so running text never ends on a line of one or two words. The
 * CSS balances headings and short blocks; this catches the long paragraphs
 * the browser will not balance. Before gluing, the tail is measured: if it
 * would take more than half the line, it could not wrap in a narrow column
 * (a card sliver, a phone), so it is left alone rather than pushed past
 * the edge. Runs on every render through a MutationObserver, since React
 * rewrites text when it changes.
 */

const SELECTOR = 'p, li, dd, figcaption'
const NBSP = ' '
/** The share of the line a glued tail may take and still leave room to wrap. */
const MAX_SHARE = 0.5

function lastText(el: Element): Text | null {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  let last: Text | null = null
  let n: Node | null
  while ((n = walker.nextNode())) {
    const t = n as Text
    if (t.data.trim() && !t.parentElement?.closest('.sr-only, [aria-hidden="true"]')) last = t
  }
  return last
}

/** Index of the last space (breaking or not) before `from`, or -1. */
function lastGap(text: string, from: number) {
  return Math.max(text.lastIndexOf(' ', from), text.lastIndexOf(NBSP, from))
}

/** Natural width of `text` from `start` to `end`, summed across any line breaks. */
function widthOf(text: Text, start: number, end: number) {
  const range = document.createRange()
  range.setStart(text, start)
  range.setEnd(text, end)
  let w = 0
  for (const r of range.getClientRects()) w += r.width
  return w
}

/** Glues the last three words (two if three would crowd the line). Idempotent. */
function glue(el: Element) {
  if (el.closest('.split, .palette, [contenteditable]')) return
  const room = (el as HTMLElement).clientWidth * MAX_SHARE
  if (!room) return
  const t = lastText(el)
  if (!t) return
  const data = t.data
  const end = data.trimEnd().length
  const a = lastGap(data, end - 1)
  if (a <= 0) return
  const b = lastGap(data, a - 1)
  const three = b > 0 && data.slice(0, b).trim() !== '' && widthOf(t, b + 1, end) <= room
  const gaps = three ? [b, a] : widthOf(t, a + 1, end) <= room ? [a] : []
  if (gaps.every((i) => data[i] === NBSP)) return
  let next = data
  for (const i of gaps) next = next.slice(0, i) + NBSP + next.slice(i + 1)
  t.data = next
}

export function installWidows() {
  if (typeof window === 'undefined') return
  let queued = false
  const run = () => {
    queued = false
    document.querySelectorAll(SELECTOR).forEach(glue)
  }
  const schedule = () => {
    if (queued) return
    queued = true
    requestAnimationFrame(run)
  }
  schedule()
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, characterData: true })
}
