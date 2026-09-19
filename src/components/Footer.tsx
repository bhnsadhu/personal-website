import { site } from '../data'
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import { SUIT_GLYPH } from './Suit'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__suits" aria-hidden="true">
          {SUIT_GLYPH.spades} {SUIT_GLYPH.hearts} {SUIT_GLYPH.diamonds} {SUIT_GLYPH.clubs}
        </p>
        <nav className="footer__links" aria-label="Elsewhere">
          <a className="tlink" href={`mailto:${site.email}`}>
            <MailIcon className="icon--brass" />
            Email
          </a>
          <a className="tlink" href={site.linkedin} target="_blank" rel="noreferrer">
            <LinkedInIcon className="icon--brass" />
            LinkedIn
          </a>
          <a className="tlink" href={site.github} target="_blank" rel="noreferrer">
            <GitHubIcon className="icon--brass" />
            GitHub
          </a>
          <a className="tlink" href={site.resume} download>
            <FileIcon className="icon--brass" />
            Resume
          </a>
        </nav>
        <p className="footer__note mono mono--sm">
          © {year} {site.name} · Shuffled, not stirred
        </p>
      </div>
    </footer>
  )
}
