import { useState, type FormEvent } from 'react'
import { CourseHead } from '../components/CourseHead'
import { IconFile, IconGithub, IconLinkedin, IconMail } from '../components/Icons'
import { courses, reservations, site } from '../lib/content'

const icons = {
  email: <IconMail />,
  linkedin: <IconLinkedin />,
  github: <IconGithub />,
  resume: <IconFile />,
}

export function Reservations() {
  const [sent, setSent] = useState(false)

  // Static site, no backend: the form composes an email in the visitor's client.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(String(data.get('subject') || 'Reservation request'))
    const body = encodeURIComponent(
      `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`,
    )
    window.location.href = `${site.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="reservations" className="section">
      <div className="container">
        <CourseHead course={courses.reservations} />
        <div className="book">
          <div>
            <h3 className="book__title t-category">Now Seating</h3>
            <p className="book__note t-lead measure-narrow">{reservations.availability}</p>
            <ul className="methods">
              {reservations.methods.map((m) => (
                <li key={m.kind}>
                  <a
                    className="method"
                    href={m.href}
                    target={m.kind === 'email' ? undefined : '_blank'}
                    rel="noreferrer"
                  >
                    <span className="method__icon">{icons[m.kind]}</span>
                    <span>
                      <span className="method__label t-label">{m.label}</span>
                      <span className="method__value">{m.value}</span>
                    </span>
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form className="form" onSubmit={onSubmit}>
            <div className="form__row">
              <label className="field">
                <span className="t-label">Name</span>
                <input name="name" type="text" required placeholder="[Your Name]" autoComplete="name" />
              </label>
              <label className="field">
                <span className="t-label">Email</span>
                <input name="email" type="email" required placeholder="[you]@[domain].com" autoComplete="email" />
              </label>
            </div>
            <label className="field">
              <span className="t-label">Subject</span>
              <input name="subject" type="text" placeholder="[Reservation For A Conversation]" />
            </label>
            <label className="field">
              <span className="t-label">Message</span>
              <textarea name="message" required placeholder="[What you would like to talk about.]" />
            </label>
            <div className="form__actions">
              <button type="submit" className="btn">
                Send Message
              </button>
              {sent && <p className="form__note t-mono">Opening your mail client…</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
