import type { Experience, Highlight, Leadership, Link as LinkData, PersonalCard, PersonalEntry, Project } from '../data'
import { personalExtras } from '../data'
import { Link } from '../lib/router'
import { SEP } from '../lib/sep'
import { LiveDot } from './LiveDot'
import { PlacesMap } from './PlacesMap'

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

/** A favorite's address (to Google Maps), what to order, and the note. */
function EntryDetails({ e }: { e: PersonalEntry }) {
  return (
    <>
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
    </>
  )
}

/**
 * Favorite Tables, laid out like a Beli list: one tab-style label over the
 * rows, each row its rank, the place, and his Beli score in a ring on the right.
 */
function RankedEntries({ entries }: { entries: PersonalEntry[] }) {
  return (
    <>
      <p className="ranked__tabs mono mono--sm">
        <span className="ranked__tab">Ranked on Beli</span>
      </p>
      <ol className="ranked">
        {entries.map((e, i) => (
          <li key={e.name} className="ranked__row">
            <span className="ranked__rank" aria-hidden="true">
              {i + 1}
            </span>
            <div className="ranked__body">
              <p className="entry__name">{e.name}</p>
              <EntryDetails e={e} />
            </div>
            {e.score !== undefined && (
              <span className="ranked__score mono">
                {e.score.toFixed(1)}
                <span className="sr-only"> out of 10 on Beli</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </>
  )
}

export function PersonalBack({ c }: { c: PersonalCard }) {
  return (
    <>
      {c.intro && <p className="card__summary">{c.intro}</p>}
      {c.view === 'map' ? (
        <PlacesMap entries={c.entries} />
      ) : c.view === 'ranked' ? (
        <RankedEntries entries={c.entries} />
      ) : (
        <ol className="card__entries">
          {c.entries.map((e) => (
            <li key={e.name} className="entry">
              <p className="entry__head">
                <span className="entry__name">{e.name}</span>
                {e.detail && <span className="entry__detail">{e.detail}</span>}
              </p>
              <EntryDetails e={e} />
            </li>
          ))}
        </ol>
      )}
      <Links links={c.links} />
      {c.inspiredBy && <p className="card__credit">{c.inspiredBy}</p>}
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
