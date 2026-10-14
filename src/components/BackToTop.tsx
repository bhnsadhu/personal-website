import { useEffect, useState } from 'react'
import { useReducedMotion } from '../lib/useReducedMotion'
import { ArrowUpIcon } from './Icons'

/** The corner arrow. Shows once a screen of the page has scrolled past. */
export function BackToTop() {
  const [shown, setShown] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    let frame = 0
    function check() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setShown(window.scrollY > window.innerHeight))
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  return (
    <button
      type="button"
      className={`fab to-top ${shown ? 'is-shown' : ''}`.trim()}
      aria-label="Back to top"
      title="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
    >
      <ArrowUpIcon className="icon--brass" />
    </button>
  )
}
