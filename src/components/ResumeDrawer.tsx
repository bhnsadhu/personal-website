import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { site } from '../data'
import { drawerFits, onResume, openResume } from '../lib/resume'
import { CloseIcon } from './Icons'

/**
 * Every "Resume" link. A plain click opens the drawer; a modified click, or
 * any click on a phone, follows the link to the PDF in a new tab.
 */
export function ResumeLink({ className, children }: { className?: string; children: ReactNode }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || !drawerFits()) return
    e.preventDefault()
    openResume()
  }
  return (
    <a className={className} href={site.resume} target="_blank" rel="noreferrer" onClick={onClick}>
      {children}
      <span className="sr-only">(PDF)</span>
    </a>
  )
}

/**
 * The resume, slid in from the right over the page: the PDF, Download, and
 * Close. Escape or a click outside closes it, and focus goes back to the
 * link that opened it.
 */
export function ResumeDrawer() {
  const ref = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  // The PDF loads on first open, not with the page.
  const [loaded, setLoaded] = useState(false)

  useEffect(
    () =>
      onResume(() => {
        setLoaded(true)
        const d = ref.current
        if (d && !d.open) d.showModal()
        // Focus on Close, not Download, so nothing looks picked.
        closeRef.current?.focus()
      }),
    [],
  )

  // Slide out, then close; at once when motion is reduced.
  const close = () => {
    const d = ref.current
    if (!d?.open || d.classList.contains('is-closing')) return
    const done = () => {
      d.classList.remove('is-closing')
      if (d.open) d.close()
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return done()
    d.classList.add('is-closing')
    // A timer in case the slide never runs.
    const timer = window.setTimeout(done, 700)
    const onEnd = (e: AnimationEvent) => {
      if (e.target !== d) return
      d.removeEventListener('animationend', onEnd)
      window.clearTimeout(timer)
      done()
    }
    d.addEventListener('animationend', onEnd)
  }

  return (
    <dialog
      ref={ref}
      className="resumebox"
      aria-label="Resume"
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
      onClick={(e) => {
        // The dialog box itself, not its content, is the backdrop.
        if (e.target === e.currentTarget) close()
      }}
    >
      <div className="resumebox__bar">
        <p className="eyebrow resumebox__label">Resume</p>
        <a className="btn btn--ghost resumebox__download" href={site.resume} download>
          Download
        </a>
        <button type="button" className="shotbox__btn" aria-label="Close" onClick={close} ref={closeRef}>
          <CloseIcon className="icon--brass" />
        </button>
      </div>
      {loaded && <iframe className="resumebox__pdf" src={`${site.resume}#toolbar=0&view=FitH`} title="Resume (PDF)" />}
    </dialog>
  )
}
