import { useEffect, useState } from 'react'

/**
 * The id of the section that holds the middle of the viewport, or null
 * above the first one. Feeds the nav suits and the list view's rail.
 */
export function useScrollSpy(ids: string[], key = '') {
  const [active, setActive] = useState<string | null>(null)
  const joined = ids.join(' ')

  useEffect(() => {
    const els = joined
      .split(' ')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    const seen = new Map<string, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting)
        // The first section, in page order, crossing the middle band wins.
        const hit = els.find((el) => seen.get(el.id))
        setActive(hit ? hit.id : null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [joined, key])

  return active
}
