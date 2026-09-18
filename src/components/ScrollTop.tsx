import { useScrolled } from '../lib/useScrolled'
import { IconArrowUp } from './Icons'

export function ScrollTop() {
  const show = useScrolled(600)
  return (
    <button
      type="button"
      className={`to-top ${show ? 'is-visible' : ''}`.trim()}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <IconArrowUp size={22} />
    </button>
  )
}
