import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../components/Icons'
import { MetricBand } from '../components/MetricBand'
import {
  experience,
  hand,
  leadership,
  LEADERSHIP_CAP,
  metrics,
  personal,
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
          <div className="list__actions">
            <Link to="/" className="btn btn--ghost">
              Back to the cards
            </Link>
            <a className="btn" href={site.resume} download>
              Draw a card
              <span className="sr-only">(download résumé PDF)</span>
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
          <p className="list__p">{site.availability}</p>
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
              <ul className="list__bullets">
                {h.body.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>

      <MetricBand metrics={metrics} label="Headline numbers" />

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
              </p>
              <p className="list__p">{e.summary}</p>
              <ul className="list__bullets">
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
          {leadership.slice(0, LEADERSHIP_CAP).map((l) => (
            <article key={l.slug} className="list__item">
              <h3 className="list__item-title">
                {l.role} · {l.organization}
              </h3>
              <p className="list__meta mono">{l.dates}</p>
              <p className="list__p">{l.summary}</p>
              <ul className="list__bullets">
                {l.body.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
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
                  <ul className="list__bullets">
                    {p.body.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                  <p className="list__meta mono">{p.stack.join(' · ')}</p>
                  <div className="list__links">
                    <Link to={`/projects/${p.slug}`} className="tlink">
                      See the full hand
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                    {p.siteUrl && (
                      <a className="tlink" href={p.siteUrl} target="_blank" rel="noreferrer">
                        Visit the site
                      </a>
                    )}
                    {p.codeUrl && (
                      <a className="tlink" href={p.codeUrl} target="_blank" rel="noreferrer">
                        View the code
                      </a>
                    )}
                  </div>
                </>
              )}
            </article>
          ))}
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

        <section className="list__section" aria-labelledby="l-personal">
          <h2 id="l-personal" className="list__title">
            Personal
          </h2>
          {personal.map((c) => (
            <article key={c.slug} className="list__item">
              <h3 className="list__item-title">{c.title}</h3>
              <p className="list__meta mono">
                {c.subtitle} · {c.meta}
              </p>
              <p className="list__p">{c.summary}</p>
              <ul className="list__bullets">
                {c.body.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="list__section" aria-labelledby="l-contact">
          <h2 id="l-contact" className="list__title">
            Contact
          </h2>
          <p className="list__p">{site.availability}</p>
          <div className="list__links">
            <a className="tlink" href={`mailto:${site.email}`}>
              <MailIcon className="icon--brass" />
              {site.email}
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
              Resume PDF
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
