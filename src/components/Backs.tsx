import { useState } from 'react'
import type { Experience, Highlight, Leadership, Link as LinkData, PersonalCard, PersonalEntry, Project } from '../data'
import { personalExtras, projects } from '../data'
import { Link } from '../lib/router'
import { SEP } from '../lib/sep'
import { LiveDot } from './LiveDot'
import { FragranceShelf } from './FragranceShelf'
import { PlacesMap } from './PlacesMap'
import { PosterRow } from './PosterRow'

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
      {h.related && (
        <p className="card__related">
          <span className="mono mono--sm">{h.related.label}</span>
          {h.related.links.map((link) => (
            <Link key={link.to} to={link.to} className="tlink">
              {link.label}
              <Arrow />
            </Link>
          ))}
        </p>
      )}
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
      {p.pairing && (
        <p className="card__related">
          <span className="mono mono--sm">{p.pairing.label}</span>
          <Link to={`/projects/${p.pairing.slug}`} className="tlink">
            {projects.find((x) => x.slug === p.pairing?.slug)?.title}
            <Arrow />
          </Link>
        </p>
      )}
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
      {e.address && <Address e={e} />}
      <Order e={e} />
      <p className="entry__note">{e.note}</p>
    </>
  )
}

function Address({ e }: { e: PersonalEntry }) {
  if (!e.address) return null
  return (
    <p className="entry__line mono mono--sm">
      <a className="entry__map" href={mapsHref(e.name, e.address)} target="_blank" rel="noreferrer">
        {e.address}
        <span className="sr-only"> (Google Maps)</span>
      </a>
    </p>
  )
}

function Order({ e }: { e: PersonalEntry }) {
  if (!e.pick) return null
  return (
    <p className="entry__line">
      <span className="entry__key mono mono--sm">Order</span>
      {e.pick}
    </p>
  )
}

/**
 * Favorite Tables, laid out like a Beli list: one tab-style label over the
 * rows, each row its rank, the place, its address, and his Beli score in a
 * ring on the right. A row is chosen like a poster or a bottle; what to
 * order and the note sit beside the list.
 */
function RankedEntries({ entries, open, onPick }: { entries: PersonalEntry[]; open: number; onPick: (i: number) => void }) {
  return (
    <div className="rankedlist">
      <p className="ranked__tabs mono mono--sm">
        <span className="ranked__tab">Ranked on Beli</span>
        <span className="ranked__hint">Click a place to read why</span>
      </p>
      <ol className="ranked">
        {entries.map((e, i) => (
          <li key={e.name} className={`ranked__row${open === i ? ' is-on' : ''}`} onClick={() => onPick(i)}>
            <span className="ranked__rank" aria-hidden="true">
              {i + 1}
            </span>
            <div className="ranked__body">
              <button type="button" className="ranked__pick entry__name" aria-pressed={open === i}>
                {e.name}
              </button>
              <Address e={e} />
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
    </div>
  )
}

/** The chosen place, film, or bottle: its name, and why. */
function Chosen({ e, view }: { e: PersonalEntry; view: PersonalCard['view'] }) {
  return (
    <div className="pback__pick" aria-live="polite">
      <p className="pback__title">
        <span className="entry__name">{e.name}</span>
        {view !== 'ranked' && e.detail && <span className="pback__detail">{e.detail}</span>}
      </p>
      {view === 'ranked' && <Order e={e} />}
      <p className="entry__note">{e.note}</p>
    </div>
  )
}

/**
 * A personal card's back. Where it has the room (an open card on a wide
 * screen), its words sit in a column on the left (the intro, the chosen
 * favorite's note, the credit) and its picture fills the right: the map,
 * the posters, the shelf, or the ranked list. So the whole card fits on
 * screen like every other. Narrow, it is one column again, the note under
 * the picture it belongs to.
 */
export function PersonalBack({ c }: { c: PersonalCard }) {
  const [pick, setPick] = useState(0)
  const picks = c.view === 'ranked' || c.view === 'posters' || c.view === 'shelf'
  const chosen = picks ? c.entries[pick] : undefined
  return (
    <div className="pback">
      <div className="pback__grid">
        <div className="pback__text">
          {c.intro && <p className="card__summary pback__intro">{c.intro}</p>}
          {chosen && <Chosen key={pick} e={chosen} view={c.view} />}
          <Links links={c.links} />
          {c.inspiredBy && <p className="card__credit">{c.inspiredBy}</p>}
        </div>
        <div className="pback__view">
          {c.view === 'map' ? (
            <PlacesMap entries={c.entries} />
          ) : c.view === 'ranked' ? (
            <RankedEntries entries={c.entries} open={pick} onPick={setPick} />
          ) : c.view === 'posters' ? (
            <PosterRow entries={c.entries} open={pick} onPick={setPick} />
          ) : c.view === 'shelf' ? (
            <FragranceShelf entries={c.entries} open={pick} onPick={setPick} />
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
        </div>
      </div>
    </div>
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
