import { useEffect, useState } from 'react'
import { Link } from '../lib/router'
import { courses, navCourses, site } from '../lib/content'
import { useScrolled } from '../lib/useScrolled'
import { IconClose, IconMenu } from './Icons'

export function Nav() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const links = navCourses.map((id) => (
    <li key={id}>
      <Link to={`/#${id}`} className="nav__link" onClick={() => setOpen(false)}>
        {courses[id].name}
      </Link>
    </li>
  ))

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`.trim()}>
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label={`${site.name}, back to the menu`}>
          <span className="nav__mark" aria-hidden="true" />
          <span className="nav__word">{site.name}</span>
        </Link>

        <nav className="nav__links" aria-label="Courses">
          <ul>{links}</ul>
        </nav>

        <div className="nav__end">
          <span className="nav__status">
            <span className="status status--live">
              <span className="status__dot" />
            </span>
            Currently @ {site.currentCompany}
          </span>
          <a className="nav__cta" href={site.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="nav__menu" hidden={!open}>
        <nav className="container" aria-label="Courses">
          <ul>{links}</ul>
          <a className="btn nav__menu-cta" href={site.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
        </nav>
      </div>
    </header>
  )
}
