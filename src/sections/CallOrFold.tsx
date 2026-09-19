import { useState, type FormEvent } from 'react'
import { Section } from '../components/Section'
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, PinIcon } from '../components/Icons'
import { site } from '../data'

type Status = { state: 'idle' } | { state: 'sending' } | { state: 'sent' } | { state: 'error'; message: string }

/**
 * Contact. The form posts to /api/contact, which delivers by email from the
 * server. Success shows only after the server confirms delivery.
 */
export function CallOrFold() {
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      company: String(data.get('company') ?? ''),
    }
    setStatus({ state: 'sending' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (!res.ok || !body?.ok) throw new Error(body?.error || `the server answered ${res.status}`)
      setStatus({ state: 'sent' })
      form.reset()
    } catch (err) {
      setStatus({ state: 'error', message: err instanceof Error ? err.message : 'something went wrong' })
    }
  }

  const sending = status.state === 'sending'

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
          <p className="lede">{site.contactLede}</p>
          <ul className="contact__links">
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
              </a>
            </li>
            <li>
              <span className="mono mono--sm contact__label">
                <PhoneIcon className="icon--brass" />
                Phone
              </span>
              <a className="tlink" href={site.phoneHref}>
                {site.phone}
              </a>
            </li>
            <li>
              <span className="mono mono--sm contact__label">
                <LinkedInIcon className="icon--brass" />
                LinkedIn
              </span>
              <a className="tlink" href={site.linkedin} target="_blank" rel="noreferrer">
                in/{site.linkedinHandle}
              </a>
            </li>
            <li>
              <span className="mono mono--sm contact__label">
                <GitHubIcon className="icon--brass" />
                GitHub
              </span>
              <a className="tlink" href={site.github} target="_blank" rel="noreferrer">
                @{site.githubHandle}
              </a>
            </li>
          </ul>
        </div>

        <form className="form" onSubmit={onSubmit}>
          {/* Honeypot: hidden from people, filled by bots. The server drops anything that fills it. */}
          <label className="form__hp" aria-hidden="true">
            Company
            <input name="company" type="text" tabIndex={-1} autoComplete="off" />
          </label>
          <div className="form__row">
            <label className="field">
              <span className="mono mono--sm">Name</span>
              <input name="name" type="text" required autoComplete="name" placeholder="Your name" disabled={sending} />
            </label>
            <label className="field">
              <span className="mono mono--sm">Email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" disabled={sending} />
            </label>
          </div>
          <label className="field">
            <span className="mono mono--sm">Message</span>
            <textarea
              name="message"
              required
              placeholder="Tell me about the opportunity or what you'd like to build together."
              disabled={sending}
            />
          </label>
          <div className="form__actions">
            <button type="submit" className="btn btn--wine" disabled={sending}>
              {sending ? 'Sending…' : 'Send Message'}
            </button>
            <p
              className={`mono mono--sm form__note ${status.state === 'error' ? 'form__note--error' : ''} ${
                status.state === 'sent' ? 'form__note--ok' : ''
              }`.trim()}
              role="status"
              aria-live="polite"
            >
              {status.state === 'idle' && 'Goes straight to my inbox.'}
              {status.state === 'sending' && 'Sending your message…'}
              {status.state === 'sent' && "Sent. Thanks, I'll get back to you soon."}
              {status.state === 'error' && `Couldn't send: ${status.message}. Email me directly at ${site.email}.`}
            </p>
          </div>
        </form>
      </div>
    </Section>
  )
}
