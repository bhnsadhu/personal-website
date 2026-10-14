import type { Experience, Highlight, Leadership, PersonalCard, Project } from '../data'
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

export function HandBack({ h }: { h: Highlight }) {
  return (
    <>
      <p className="card__summary">{h.summary}</p>
      <Bullets items={h.body} />
      {h.links && h.links.length > 0 && (
        <div className="linkrow">
          {h.links.map((l) => (
            <a key={l.href} className="tlink" href={l.href} target="_blank" rel="noreferrer">
              {l.label === 'Live Demo' && <LiveDot />}
              {l.label}
              <Arrow />
            </a>
          ))}
        </div>
      )}
    </>
  )
}

export function ExperienceBack({ e }: { e: Experience }) {
  return (
    <>
      <p className="card__summary">{e.summary}</p>
      {e.context && <p className="card__context">{e.context}</p>}
      <Bullets items={e.body} />
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
    <>
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
    </>
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
            {e.address && <p className="entry__line mono mono--sm">{e.address}</p>}
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
    </>
  )
}

/**
 * The line under the flop: interests that did not get a card. The card view
 * sets it as a pill centred under the cards, the list view (`flat`) as a
 * panel the width of the rows, its text on the rows' pip edge.
 */
export function PersonalExtras({ flat = false }: { flat?: boolean }) {
  return (
    <p className={`flop__extras ${flat ? 'flop__extras--flat' : ''}`.trim()}>
      <span className="flop__extras-label mono mono--sm">
        Also in rotation<span className="sr-only">:</span>
      </span>
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
