import { site } from '../lib/content'
import { IconFile, IconGithub, IconLinkedin, IconMail } from './Icons'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer__links" aria-label="Contact">
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <IconGithub />
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <IconLinkedin />
          </a>
          <a href={site.email} aria-label="Email" title="Email">
            <IconMail />
          </a>
          <a href={site.resume} target="_blank" rel="noreferrer" aria-label="Résumé" title="Résumé">
            <IconFile />
          </a>
        </nav>
        <p className="footer__note t-mono">
          © {year} {site.name} — Menu Subject To Change
        </p>
      </div>
    </footer>
  )
}
