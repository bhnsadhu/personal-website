import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, PinIcon } from '../components/Icons'
import { MetricBand } from '../components/MetricBand'
import { RoleList } from '../components/RoleList'
import {
  certifications,
  education,
  experience,
  hand,
  leadership,
  metrics,
  personal,
  personalExtras,
  personalIntro,
  personalNote,
  projects,
  site,
  skills,
} from '../data'
import { Link } from '../lib/router'
import { useTitle } from '../lib/useTitle'

/**
 * The whole table laid flat: every section, all of the same content,
 * no cards and nothing to click through. Built for a fast scan.
 */
export function ListView() {
  useTitle('List view')
  return (
    <main className="list">
      <div className="container">
        <header className="list__head">
          <p className="eyebrow">List view · Same content, no cards</p>
          <h1 className="display">
            {site.name}, <em>laid flat</em>
          </h1>
          <p className="lede">{site.tagline}</p>
          <div className="actions list__actions">
            <Link to="/" className="btn btn--ghost">
              Back to the hand
            </Link>
            <a className="btn" href={site.resume} target="_blank" rel="noreferrer">
              View Resume
              <span className="sr-only">(opens PDF in a new tab)</span>
            </a>
          </div>
        </header>

        <section className="list__section" aria-labelledby="l-about">
          <h2 id="l-about" className="list__title">
            About
          </h2>
          <p className="list__meta mono">
            {site.title} · {site.location}
          </p>
          {site.about.map((p, i) => (
            <p key={i} className="list__p">
              {p}
            </p>
          ))}
          <p className="list__p list__p--muted">{site.workingStyle}</p>
          <p className="list__p">{site.availability}</p>
          <RoleList className="list__roles" />
        </section>

        <section className="list__section" aria-labelledby="l-hand">
          <h2 id="l-hand" className="list__title">
            Your hand
          </h2>
          {hand.map((h) => (
            <article key={h.slug} className="list__item">
              <h3 className="list__item-title">{h.title}</h3>
              <p className="list__meta mono">
                {h.subtitle} · {h.meta}
              </p>
              <p className="list__p">{h.summary}</p>
              {h.body.length > 0 && (
                <ul className="dlist list__bullets">
                  {h.body.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
              <div className="linkrow list__links">
                {h.links?.map((l) => (
                  <a key={l.href} className="tlink" href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                ))}
                {h.more && (
                  <Link to={h.more.to} className="tlink">
                    {h.more.label}
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>

      <MetricBand metrics={metrics} label="Headline numbers" note={`As of ${site.asOf}`} />

      <div className="container">
        <section className="list__section" aria-labelledby="l-exp">
          <h2 id="l-exp" className="list__title">
            Experience
          </h2>
          {experience.map((e) => (
            <article key={e.slug} className="list__item">
              <h3 className="list__item-title">
                {e.role} · {e.company}
              </h3>
              <p className="list__meta mono">
                {e.dates} · {e.location}
                {e.via && ` · via ${e.via}`}
              </p>
              <p className="list__p">{e.summary}</p>
              {e.context && <p className="list__p list__p--muted">{e.context}</p>}
              <ul className="dlist list__bullets">
                {e.body.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              <p className="list__meta mono">{e.tags.join(' · ')}</p>
              <Link to={`/experience/${e.slug}`} className="tlink">
                See the full hand
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </article>
          ))}
        </section>

        <section className="list__section" aria-labelledby="l-lead">
          <h2 id="l-lead" className="list__title">
            Leadership
          </h2>
          {leadership.map((l) => (
            <article key={l.slug} className="list__item">
              <h3 className="list__item-title">
                {l.role} · {l.organization}
              </h3>
              <p className="list__meta mono">
                {l.dates} · {l.location}
              </p>
              {l.progression && (
                <p className="list__meta mono">
                  {l.progression.map((s) => `${s.role} (${s.dates})`).join(' ← ')}
                </p>
              )}
              <p className="list__p">{l.summary}</p>
              <ul className="dlist list__bullets">
                {l.body.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              <p className="list__meta mono">{l.tags.join(' · ')}</p>
              {l.related && (
                <div className="linkrow list__links">
                  {l.related.map((r) => (
                    <Link key={r.to} to={r.to} className="tlink">
                      {r.label}
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>

        <section className="list__section" aria-labelledby="l-proj">
          <h2 id="l-proj" className="list__title">
            Projects
          </h2>
          {projects.map((p) => (
            <article key={p.slug} className="list__item">
              <h3 className="list__item-title">{p.title}</h3>
              <p className="list__meta mono">{p.meta}</p>
              {p.status === 'idea' ? (
                <p className="list__p list__p--muted">Not dealt yet. Still in the deck.</p>
              ) : (
                <>
                  <p className="list__p">{p.summary}</p>
                  {p.ownership && <p className="list__p">{p.ownership}</p>}
                  <ul className="dlist list__bullets">
                    {p.body.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                  <p className="list__meta mono">{p.stack.join(' · ')}</p>
                  <div className="linkrow list__links">
                    <Link to={`/projects/${p.slug}`} className="tlink">
                      See the full hand
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                    {p.siteUrl && (
                      <a className="tlink" href={p.siteUrl} target="_blank" rel="noreferrer">
                        Live Demo
                      </a>
                    )}
                    {p.codeUrl && (
                      <a className="tlink" href={p.codeUrl} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    )}
                  </div>
                </>
              )}
            </article>
          ))}
        </section>

        <section id="education" className="list__section" aria-labelledby="l-edu">
          <h2 id="l-edu" className="list__title">
            Education
          </h2>
          <article className="list__item">
            <h3 className="list__item-title">
              {education.degree} · {education.school}
            </h3>
            <p className="list__meta mono">
              {education.dates} · {education.location}
            </p>
            <p className="list__p">
              {education.expected}. Declared minors in {education.minors.join(' and ')}.
            </p>
            <p className="list__meta mono">{education.courseworkNote}</p>
            <ul className="dlist list__bullets">
              {education.coursework.map((c) => (
                <li key={c.code}>
                  {c.code} · {c.name} · {c.status}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="list__section" aria-labelledby="l-skills">
          <h2 id="l-skills" className="list__title">
            Skills
          </h2>
          <dl className="list__skills">
            {skills.map((s) => (
              <div key={s.id}>
                <dt className="list__item-title">{s.label}</dt>
                <dd className="list__meta mono">{s.skills.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="list__section" aria-labelledby="l-certs">
          <h2 id="l-certs" className="list__title">
            Certifications
          </h2>
          {certifications.map((c) => (
            <article key={c.url} className="list__item">
              <h3 className="list__item-title">{c.name}</h3>
              <p className="list__meta mono">
                {c.issuer} · Issued {c.issued}
              </p>
              <a className="tlink" href={c.url} target="_blank" rel="noreferrer">
                View Credential
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </article>
          ))}
        </section>

        <section className="list__section" aria-labelledby="l-personal">
          <h2 id="l-personal" className="list__title">
            Personal
          </h2>
          <p className="list__p">{personalIntro}</p>
          <p className="list__meta mono">{personalNote}</p>
          {personal.map((c) => (
            <article key={c.slug} className="list__item">
              <h3 className="list__item-title">{c.title}</h3>
              <p className="list__meta mono">{c.subtitle}</p>
              {c.intro && <p className="list__p">{c.intro}</p>}
              <ol className="list__entries">
                {c.entries.map((e) => (
                  <li key={e.name}>
                    <p className="list__p">
                      <strong>{e.name}</strong>
                      {e.detail && <span className="list__p--muted"> · {e.detail}</span>}
                    </p>
                    {e.address && <p className="list__meta mono">{e.address}</p>}
                    {e.pick && <p className="list__p list__p--muted">Order: {e.pick}</p>}
                    <p className="list__p">{e.note}</p>
                  </li>
                ))}
              </ol>
            </article>
          ))}
          <p className="list__meta mono">Also in rotation: {personalExtras.join(' · ')}</p>
        </section>

        <section className="list__section" aria-labelledby="l-contact">
          <h2 id="l-contact" className="list__title">
            Contact
          </h2>
          <p className="list__p">{site.contactLede}</p>
          <p className="list__p">{site.availability}</p>
          <div className="linkrow list__links">
            <span className="tlink">
              <PinIcon className="icon--brass" />
              {site.location}
            </span>
            <a className="tlink" href={`mailto:${site.email}`}>
              <MailIcon className="icon--brass" />
              {site.email}
            </a>
            <a className="tlink" href={site.phoneHref}>
              <PhoneIcon className="icon--brass" />
              {site.phone}
            </a>
            <a className="tlink" href={site.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon className="icon--brass" />
              LinkedIn
            </a>
            <a className="tlink" href={site.github} target="_blank" rel="noreferrer">
              <GitHubIcon className="icon--brass" />
              GitHub
            </a>
            <a className="tlink" href={site.resume} target="_blank" rel="noreferrer">
              <FileIcon className="icon--brass" />
              Resume
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
