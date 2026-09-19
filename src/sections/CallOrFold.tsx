import { useState, type FormEvent } from 'react'
import { Section } from '../components/Section'
import { GitHubIcon, LinkedInIcon, MailIcon } from '../components/Icons'
import { site } from '../data'

/** Contact. Static site: the form composes an email in the visitor's client. */
export function CallOrFold() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Deal me in — ${data.get('name')}`)
    const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <Section
      id="contact"
      eyebrow="♥ Contact"
      title={
        <>
          Call or <em>fold</em>
        </>
      }
      note={site.availability}
    >
      <div className="contact">
        <div className="contact__aside">
          <p className="lede">Your move. Reach out and I’ll deal you in.</p>
          <ul className="contact__links">
            <li>
              <span className="mono mono--sm contact__label">
                <MailIcon className="icon--brass" />
                Email
              </span>
              <a className="tlink" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <span className="mono mono--sm contact__label">
                <LinkedInIcon className="icon--brass" />
                LinkedIn
              </span>
              <a className="tlink" href={site.linkedin} target="_blank" rel="noreferrer">
                in/{site.handle}
              </a>
            </li>
            <li>
              <span className="mono mono--sm contact__label">
                <GitHubIcon className="icon--brass" />
                GitHub
              </span>
              <a className="tlink" href={site.github} target="_blank" rel="noreferrer">
                @{site.handle}
              </a>
            </li>
          </ul>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <div className="form__row">
            <label className="field">
              <span className="mono mono--sm">Name</span>
              <input name="name" type="text" required autoComplete="name" placeholder="[Your Name]" />
            </label>
            <label className="field">
              <span className="mono mono--sm">Email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="[you]@[domain].com" />
            </label>
          </div>
          <label className="field">
            <span className="mono mono--sm">Message</span>
            <textarea name="message" required placeholder="[What you would like to talk about.]" />
          </label>
          <div className="form__actions">
            <button type="submit" className="btn btn--wine">
              Deal me in
            </button>
            <p className="mono mono--sm form__note" role="status">
              {sent ? 'Opening your mail client…' : 'Opens your mail client. No data stored.'}
            </p>
          </div>
        </form>
      </div>
    </Section>
  )
}
