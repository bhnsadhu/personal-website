import { useId, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { ArrowRight } from './Glyph'
import { skillGroups, skillHighlights } from '../lib/content'

/**
 * One clipped line of tags, then "See All". Expanding swaps the line
 * for the grouped list and animates the container's height between
 * the two measured states so nothing jumps.
 */
export function Ingredients() {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const id = useId()

  function toggle() {
    const el = box.current
    if (!el) return
    const from = el.offsetHeight
    el.style.height = `${from}px`
    flushSync(() => setOpen((o) => !o))
    const to = el.scrollHeight
    requestAnimationFrame(() => {
      el.style.height = `${to}px`
    })
    const done = (e: TransitionEvent) => {
      if (e.propertyName !== 'height') return
      el.style.height = ''
      el.removeEventListener('transitionend', done)
    }
    el.addEventListener('transitionend', done)
  }

  return (
    <div className="ingredients">
      <div className="ingredients__box" ref={box} id={id}>
        {open ? (
          <dl className="ingredients__groups">
            {skillGroups.map((group) => (
              <div className="ingredients__group" key={group.label}>
                <dt>{group.label}</dt>
                <dd>
                  {group.items.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="ingredients__line">
            {skillHighlights.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </p>
        )}
      </div>
      <button
        type="button"
        className="link ingredients__more"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
      >
        {open ? 'See Fewer' : 'See All'}
        {!open && <ArrowRight />}
      </button>
    </div>
  )
}
