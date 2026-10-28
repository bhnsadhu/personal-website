import { useEffect, useRef } from 'react'
import { Link, usePath } from '../lib/router'
import { useScrollSpy } from '../lib/useScrollSpy'
import { setTheme, useTheme } from '../lib/theme'
import { experience, site, type Suit } from '../data'
import { MoonIcon, SunIcon } from './Icons'
import { LiveDot } from './LiveDot'
import { ResumeLink } from './ResumeDrawer'
import { SUIT_GLYPH } from './Suit'

interface SuitLink {
  suit: Suit
  anchor: string
  label: string
}

/**
 * Suits are the nav. Each announces the section it leads to. The anchor is
 * the section's id, which the card view and the list view both use, so a
 * suit scrolls within whichever view you are already in.
 */
export const SUIT_NAV: SuitLink[] = [
  { suit: 'spades', anchor: 'spread', label: 'Experience' },
  { suit: 'diamonds', anchor: 'fan', label: 'Projects' },
  { suit: 'clubs', anchor: 'chips', label: 'Skills' },
  { suit: 'hearts', anchor: 'flop', label: 'Personal' },
]

/** Six inlays around the chip's edge, one every 60 degrees. */
const INLAYS = [0, 60, 120, 180, 240, 300]

/**
 * His chip: the favicon's brass Fraunces B on an ink chip, with brass
 * inlays round the edge and a dashed inner ring. Drawn on a 32-unit grid,
 * the same as favicon.svg, so the B is the very same path.
 */
function ChipMark() {
  return (
    <svg className="nav__chip-face" viewBox="0 0 32 32" focusable="false">
      <circle className="nav__chip-body" cx="16" cy="16" r="15.5" />
      <g className="nav__chip-inlay">
        {INLAYS.map((deg) => (
          <rect key={deg} x="14.2" y="0.5" width="3.6" height="3.4" rx="0.6" transform={`rotate(${deg} 16 16)`} />
        ))}
      </g>
      <circle className="nav__chip-rim" cx="16" cy="16" r="15.5" />
      <circle className="nav__chip-ring" cx="16" cy="16" r="11.4" />
      <path
        className="nav__chip-b"
        transform="translate(16 16) scale(0.74) translate(-16 -16)"
        d="M23.27 20.17Q23.27 21.89 21.79 22.97Q20.31 24.05 17.36 24.05H9.4Q9.05 24.05 8.89 23.91Q8.73 23.76 8.73 23.53Q8.73 23.12 9.2 22.97L9.87 22.82Q10.15 22.74 10.29 22.58Q10.43 22.42 10.43 22.16V9.82Q10.43 9.57 10.29 9.42Q10.15 9.26 9.87 9.18L9.2 9.03Q8.73 8.88 8.73 8.47Q8.73 8.23 8.89 8.09Q9.05 7.95 9.4 7.95H15.6Q17.74 7.95 19.24 8.54Q20.75 9.12 21.55 10.16Q22.35 11.2 22.35 12.6Q22.35 13.75 21.7 14.65Q21.05 15.56 19.78 16.09Q18.51 16.62 16.64 16.62L17.28 16.26Q19.09 16.26 20.44 16.76Q21.78 17.270 22.53 18.14Q23.27 19.02 23.27 20.17ZM16.06 17.04H13.01V16.13H15.78Q16.8 16.13 17.52 15.74Q18.23 15.36 18.6 14.6Q18.97 13.85 18.97 12.78Q18.97 11.63 18.51 10.78Q18.05 9.93 17.17 9.46Q16.3 8.99 15.03 8.99H13.99V21.92Q13.99 22.47 14.33 22.74Q14.68 23.02 15.34 23.02H16.59Q17.61 23.02 18.31 22.65Q19 22.29 19.36 21.63Q19.71 20.97 19.71 20.08Q19.71 18.69 18.78 17.86Q17.84 17.04 16.06 17.04Z"
      />
    </svg>
  )
}

export function Nav() {
  const path = usePath()
  const onList = path === '/list'
  const current = experience.find((e) => e.slug === site.currently)
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  const active = useScrollSpy(
    SUIT_NAV.map((s) => s.anchor),
    path,
  )

  // A brass line under the nav fills as the page scrolls, with his chip
  // rolling at its head: it turns exactly as far as it travels, so it rolls
  // rather than slides.
  const barRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const bar = barRef.current
        if (!bar) return
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
        const width = bar.clientWidth
        // From the CSS, not the chip's box: a turned chip's box is wider.
        const chip = parseFloat(getComputedStyle(bar).getPropertyValue('--chip')) || 0
        const x = p * (width - chip)
        bar.style.setProperty('--x', `${x}px`)
        bar.style.setProperty('--fill', String(width > 0 ? (x + chip / 2) / width : 0))
        bar.style.setProperty('--roll', `${chip > 0 ? (x / (Math.PI * chip)) * 360 : 0}deg`)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    // The page grows and shrinks without a scroll (a card opens, a row
    // unfolds, "Open all"), which moves the same scroll to a new fraction.
    const grow = new ResizeObserver(update)
    grow.observe(document.body)
    return () => {
      cancelAnimationFrame(frame)
      grow.disconnect()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [path])

  // The chip can be pulled: drag it along the line and the page scrolls to
  // match, as a scrubber. The scroll listener above then rolls it, so the
  // chip follows the pointer by the same path as it follows the wheel. The
  // offset keeps the grab point under the pointer, so it never jumps.
  const grab = useRef<number | null>(null)
  const onChipDown = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (e.button !== 0) return
    const box = e.currentTarget.getBoundingClientRect()
    grab.current = e.clientX - (box.left + box.width / 2)
    e.currentTarget.setPointerCapture(e.pointerId)
    barRef.current?.classList.add('is-dragging')
    e.preventDefault()
  }
  const onChipMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const bar = barRef.current
    if (grab.current === null || !bar) return
    const box = bar.getBoundingClientRect()
    const chip = parseFloat(getComputedStyle(bar).getPropertyValue('--chip')) || 0
    const travel = box.width - chip
    const p = travel > 0 ? Math.min(1, Math.max(0, (e.clientX - grab.current - box.left - chip / 2) / travel)) : 0
    const max = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: p * max, behavior: 'instant' })
  }
  // Up, cancel, or a capture lost some other way (a window switch, a
  // dialog) all put the chip down, so it is never left held.
  const onChipUp = (e: React.PointerEvent<HTMLSpanElement>) => {
    grab.current = null
    barRef.current?.classList.remove('is-dragging')
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
  }

  return (
    <header className="nav">
      <div className="nav__inner container">
        <div className="nav__start">
          <Link to="/" className="nav__brand" aria-label={`${site.shortName}, back to your hand`}>
            {site.shortName}
          </Link>
          {current && (
            <Link to={`/experience/${current.slug}`} className="nav__now mono" aria-label={`Currently at ${current.company}`}>
              <LiveDot />
              Currently @ {current.company}
            </Link>
          )}
        </div>

        <nav className="nav__suits" aria-label="Sections">
          <ul>
            {SUIT_NAV.map((s) => (
              <li key={s.suit}>
                <Link
                  to={`${onList ? '/list' : '/'}#${s.anchor}`}
                  className={`nav__suit nav__suit--${s.suit} ${active === s.anchor ? 'is-active' : ''}`.trim()}
                  aria-current={active === s.anchor ? 'location' : undefined}
                  aria-label={`${s.label} (${s.suit})`}
                  title={s.label}
                >
                  <span aria-hidden="true">{SUIT_GLYPH[s.suit]}</span>
                  <span className="nav__suit-label mono mono--sm" aria-hidden="true">
                    {s.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__end">
          <Link to={onList ? '/' : '/list'} className="btn btn--ghost nav__toggle" aria-current={onList ? 'page' : undefined}>
            {onList ? 'Card view' : 'List view'}
          </Link>
          <ResumeLink className="btn nav__resume">Resume</ResumeLink>
          <button
            type="button"
            className="btn btn--ghost nav__theme"
            aria-label={`Switch to ${next} theme`}
            title={`Switch to ${next} theme`}
            onClick={() => setTheme(next)}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
      <span ref={barRef} className="nav__progress" aria-hidden="true">
        <span className="nav__progress-fill" />
        <span
          className="nav__chip"
          title="Drag to scroll"
          onPointerDown={onChipDown}
          onPointerMove={onChipMove}
          onPointerUp={onChipUp}
          onPointerCancel={onChipUp}
          onLostPointerCapture={onChipUp}
        >
          <ChipMark />
        </span>
      </span>
    </header>
  )
}
