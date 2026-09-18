import { IconFileText, IconGithub, IconLinkedin, IconMail } from './Icons'
import { site } from '../lib/content'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <nav className="footer__links" aria-label="Contact">
        <a className="footer__link" href={site.email} aria-label="Email" title="Email">
          <IconMail />
        </a>
        <a
          className="footer__link"
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <IconLinkedin />
        </a>
        <a
          className="footer__link"
          href={site.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <IconGithub />
        </a>
        <a
          className="footer__link footer__link--accent"
          href={site.resume}
          target="_blank"
          rel="noreferrer"
          aria-label="Resume"
          title="Resume"
        >
          <IconFileText />
        </a>
      </nav>
      <p className="footer__note">
        Menu Subject To Change · © {year} {site.name}
      </p>
    </footer>
  )
}
