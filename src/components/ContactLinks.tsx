import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, PinIcon } from './Icons'
import { site } from '../data'

/** The contact details, one list for the card view and the list view so they never drift. */
export function ContactLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`contact__links ${className}`.trim()}>
      <li>
        <span className="mono mono--sm contact__label">
          <PinIcon className="icon--brass" />
          Location
        </span>
        <span className="contact__value">{site.location}</span>
      </li>
      <li>
        <span className="mono mono--sm contact__label">
          <MailIcon className="icon--brass" />
          Email
        </span>
        <a className="tlink" href={`mailto:${site.email}`}>
          {site.email}
          <span className="contact__go" aria-hidden="true">
            ↗
          </span>
        </a>
      </li>
      <li>
        <span className="mono mono--sm contact__label">
          <PhoneIcon className="icon--brass" />
          Phone
        </span>
        <a className="tlink" href={site.phoneHref}>
          {site.phone}
          <span className="contact__go" aria-hidden="true">
            ↗
          </span>
        </a>
      </li>
      <li>
        <span className="mono mono--sm contact__label">
          <LinkedInIcon className="icon--brass" />
          LinkedIn
        </span>
        <a className="tlink" href={site.linkedin} target="_blank" rel="noreferrer">
          in/{site.linkedinHandle}
          <span className="contact__go" aria-hidden="true">
            ↗
          </span>
        </a>
      </li>
      <li>
        <span className="mono mono--sm contact__label">
          <GitHubIcon className="icon--brass" />
          GitHub
        </span>
        <a className="tlink" href={site.github} target="_blank" rel="noreferrer">
          @{site.githubHandle}
          <span className="contact__go" aria-hidden="true">
            ↗
          </span>
        </a>
      </li>
    </ul>
  )
}
