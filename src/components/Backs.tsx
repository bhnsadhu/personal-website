import type { ReactNode } from 'react'
import type { Experience, Highlight, Leadership, Link as LinkData, PersonalCard, Project, Shot } from '../data'
import { personalExtras } from '../data'
import { Link } from '../lib/router'
import { SEP } from '../lib/sep'
import { LiveDot } from './LiveDot'

/**
 * What each entry says when it opens. One component per kind, rendered on
 * the back of its card in the card view and inside its row in the list
 * view, so the two views can never say different things.
 */

function Bullets({ items }: { items: string[] }) {
  if (items.length === 0) return null
  return (
    <ul className="dlist">
      {items.map((b, j) => (
        <li key={j}>{b}</li>
      ))}
    </ul>
  )
}

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  )
}

function Links({ links }: { links?: LinkData[] }) {
  if (!links || links.length === 0) return null
  return (
    <div className="linkrow">
      {links.map((l) => (
        <a key={l.href} className="tlink" href={l.href} target="_blank" rel="noreferrer">
          {l.label === 'Live Demo' && <LiveDot />}
          {l.label}
          <Arrow />
        </a>
      ))}
    </div>
  )
}

/**
 * A project with screenshots opens with the first one beside what it says,
 * a print on the card stock that leads to its page. The back's own
 * "Explore the project" link says the same in words, so the print stays
 * out of the tab order and the accessibility tree. Where the back is too
 * narrow to sit them side by side, the print drops. Roles keep theirs to
 * their pages: an open card in the spread is never wide enough.
 */
function Cover({ shots, to, children }: { shots?: Shot[]; to: string; children: ReactNode }) {
  if (!shots || shots.length === 0) return <>{children}</>
  return (
    <div className="cover">
      <div className="cover__grid">
        <div className="cover__text">{children}</div>
        <Link to={to} className="cover__print" tabIndex={-1} aria-hidden="true">
          <img src={shots[0].src} alt="" loading="lazy" decoding="async" />
        </Link>
      </div>
    </div>
  )
}

/** A restaurant's address, opened in Google Maps. */
function mapsHref(name: string, address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`
}

export function HandBack({ h }: { h: Highlight }) {
  return (
    <>
      <p className="card__summary">{h.summary}</p>
      <Bullets items={h.body} />
      <Links links={h.links} />
    </>
  )
}

export function ExperienceBack({ e }: { e: Experience }) {
  return (
    <>
      <p className="card__summary">{e.summary}</p>
      {e.context && <p className="card__context">{e.context}</p>}
      <Bullets items={e.body} />
      <Links links={e.links} />
    </>
  )
}

export function LeadershipBack({ l }: { l: Leadership }) {
  return (
    <>
      <p className="card__summary">{l.summary}</p>
      <p className="card__context mono mono--sm">{l.location}</p>
      {l.progression && (
        <ol className="card__steps" aria-label="Roles held">
          {l.progression.map((s) => (
            <li key={s.role}>
              <span className="card__step-role">{s.role}</span>
              <span className="card__step-dates mono mono--sm">{s.dates}</span>
            </li>
          ))}
        </ol>
      )}
      <Bullets items={l.body} />
      {l.related && (
        <p className="card__related">
          <span className="mono mono--sm">Engagements</span>
          {l.related.map((link) => (
            <Link key={link.to} to={link.to} className="tlink">
              {link.label}
              <Arrow />
            </Link>
          ))}
        </p>
      )}
    </>
  )
}

export function ProjectBack({ p }: { p: Project }) {
  return (
    <Cover shots={p.shots} to={`/projects/${p.slug}`}>
      <p className="card__summary">{p.summary}</p>
      <Bullets items={p.body} />
      <div className="linkrow">
        {p.siteUrl && (
          <a className="tlink" href={p.siteUrl} target="_blank" rel="noreferrer">
            <LiveDot />
            Live Demo
            <Arrow />
          </a>
        )}
        {p.codeUrl && (
          <a className="tlink" href={p.codeUrl} target="_blank" rel="noreferrer">
            Repository
            <Arrow />
          </a>
        )}
      </div>
    </Cover>
  )
}

export function PersonalBack({ c }: { c: PersonalCard }) {
  return (
    <>
      {c.intro && <p className="card__summary">{c.intro}</p>}
      <ol className="card__entries">
        {c.entries.map((e) => (
          <li key={e.name} className="entry">
            <p className="entry__head">
              <span className="entry__name">{e.name}</span>
              {e.detail && <span className="entry__detail">{e.detail}</span>}
            </p>
            {e.address && (
              <p className="entry__line mono mono--sm">
                <a className="entry__map" href={mapsHref(e.name, e.address)} target="_blank" rel="noreferrer">
                  {e.address}
                  <span className="sr-only"> (Google Maps)</span>
                </a>
              </p>
            )}
            {e.pick && (
              <p className="entry__line">
                <span className="entry__key mono mono--sm">Order</span>
                {e.pick}
              </p>
            )}
            <p className="entry__note">{e.note}</p>
          </li>
        ))}
      </ol>
      <Links links={c.links} />
    </>
  )
}

/**
 * The line under the flop: interests that did not get a card. Centred under
 * the cards in the card view and under the rows in the list view, set the
 * same in both.
 */
export function PersonalExtras() {
  return (
    <p className="flop__extras mono mono--sm">
      <span className="flop__extras-label">Also in rotation:</span>{' '}
      <span className="flop__extras-items">
        {personalExtras.map((x, i) => (
          <span key={x}>
            {i > 0 && <span className="flop__extras-sep">{SEP}</span>}
            {x}
          </span>
        ))}
      </span>
    </p>
  )
}
