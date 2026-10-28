import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { certifications, experience, leadership, personal, projects, site, skills } from '../data'
import { deal } from '../lib/deal'
import { navigate, usePath } from '../lib/router'
import { SearchIcon } from './Icons'
import { SUIT_GLYPH } from './Suit'

type Group = 'Sections' | 'Experience' | 'Projects' | 'Leadership' | 'Skills' | 'Personal' | 'Links' | 'Actions'

const GROUPS: Group[] = ['Sections', 'Experience', 'Projects', 'Leadership', 'Skills', 'Personal', 'Links', 'Actions']

/** Shown under the input before anything is typed. Each one finds something. */
const SUGGESTIONS = ['Product', 'Replit', 'Python', 'Resume']

interface Command {
  id: string
  group: Group
  label: string
  hint: string
  /** The left-hand mark: a suit, a face letter, or an arrow. */
  mark: string
  markClass?: 'red' | 'face'
  /** Words that should also find this, beyond the label and hint. */
  keywords?: string[]
  run: () => void
  /** Keep the palette open afterwards, as copying does. */
  stays?: boolean
}

function isEditable(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)
}

function openTab(href: string) {
  window.open(href, '_blank', 'noopener,noreferrer')
}

/** Every word must appear somewhere; a label that starts with the query ranks first. */
function score(c: Command, q: string) {
  const hay = [c.label, c.hint, c.group, ...(c.keywords ?? [])].join(' ').toLowerCase()
  if (!q.split(/\s+/).every((w) => hay.includes(w))) return -1
  const label = c.label.toLowerCase()
  if (label.startsWith(q)) return 3
  if (label.includes(q)) return 2
  return 1
}

/**
 * Search. A pill in the corner and Cmd/Ctrl+K (or "/") open a palette over
 * the page that finds any section, role, project, skill, or link. Picking a
 * leadership or personal card in the card view also flips it open.
 */
export function CommandPalette() {
  const path = usePath()
  const onList = path === '/list'
  const base = onList ? '/list' : '/'

  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [status, setStatus] = useState('')
  const listId = useId()
  const optId = (i: number) => `${listId}-${i}`

  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)
  const shortcut = isMac ? '⌘K' : 'Ctrl K'

  const commands = useMemo<Command[]>(() => {
    const go = (anchor: string) => () => navigate(`${base}#${anchor}`)
    // A picked card flips open in the card view and its row opens in the list view.
    const flip = (slug: string, anchor: string) => () => {
      deal(slug)
      navigate(`${base}#${anchor}`)
    }

    return [
      { id: 's-hand', group: 'Sections', label: 'Your hand', hint: 'The top', mark: '♠', run: go('hand') },
      { id: 's-spread', group: 'Sections', label: 'Experience', hint: 'The spread', mark: '♠', run: go('spread') },
      { id: 's-fan', group: 'Sections', label: 'Projects', hint: 'The fan', mark: '♦', markClass: 'red', run: go('fan') },
      { id: 's-face', group: 'Sections', label: 'Leadership', hint: 'The face cards', mark: 'K', markClass: 'face', run: go('face') },
      { id: 's-chips', group: 'Sections', label: 'Skills', hint: 'The chips', mark: '♣', run: go('chips') },
      { id: 's-flop', group: 'Sections', label: 'Personal', hint: 'The flop', mark: '♥', markClass: 'red', run: go('flop') },
      {
        id: 's-education',
        group: 'Sections',
        label: 'Education',
        hint: 'University of Illinois Urbana-Champaign',
        mark: '♠',
        keywords: [site.major],
        run: flip('education', 'hand'),
      },
      { id: 's-contact', group: 'Sections', label: 'Contact', hint: 'Let’s talk', mark: '♥', markClass: 'red', run: go('contact') },

      ...experience.map<Command>((e) => ({
        id: `e-${e.slug}`,
        group: 'Experience',
        label: e.role,
        hint: e.company,
        mark: SUIT_GLYPH.spades,
        keywords: [e.via ?? '', ...e.tags],
        run: () => navigate(`/experience/${e.slug}`),
      })),

      ...leadership.map<Command>((l) => ({
        id: `l-${l.slug}`,
        group: 'Leadership',
        label: l.role,
        hint: l.organization,
        mark: l.face,
        markClass: 'face',
        keywords: l.tags,
        run: flip(l.slug, 'face'),
      })),

      ...projects.map<Command>((p) =>
        p.status === 'idea'
          ? { id: `p-${p.slug}`, group: 'Projects', label: p.title, hint: 'Not dealt yet', mark: SUIT_GLYPH.diamonds, markClass: 'red', run: go('fan') }
          : {
              id: `p-${p.slug}`,
              group: 'Projects',
              label: p.title,
              hint: p.subtitle,
              mark: SUIT_GLYPH.diamonds,
              markClass: 'red',
              keywords: [...p.tags, ...p.stack],
              run: () => navigate(`/projects/${p.slug}`),
            },
      ),

      ...skills.map<Command>((s) => ({
        id: `k-${s.id}`,
        group: 'Skills',
        label: s.label,
        hint: `${s.skills.length} skills`,
        mark: SUIT_GLYPH.clubs,
        keywords: s.skills,
        run: go('chips'),
      })),
      ...certifications.map<Command>((c) => ({
        id: `c-${c.url}`,
        group: 'Skills',
        label: c.name,
        hint: `${c.issuer} credential`,
        mark: SUIT_GLYPH.clubs,
        run: () => openTab(c.url),
      })),

      ...personal.map<Command>((c) => ({
        id: `f-${c.slug}`,
        group: 'Personal',
        label: c.title,
        hint: c.subtitle,
        mark: SUIT_GLYPH.hearts,
        markClass: 'red',
        keywords: [...c.tags, ...c.entries.flatMap((x) => [x.name, x.detail ?? ''])],
        run: flip(c.slug, 'flop'),
      })),

      { id: 'x-resume', group: 'Links', label: 'Resume', hint: 'PDF', mark: '↗', run: () => openTab(site.resume) },
      { id: 'x-linkedin', group: 'Links', label: 'LinkedIn', hint: `in/${site.linkedinHandle}`, mark: '↗', run: () => openTab(site.linkedin) },
      { id: 'x-github', group: 'Links', label: 'GitHub', hint: `@${site.githubHandle}`, mark: '↗', run: () => openTab(site.github) },
      {
        id: 'x-beli',
        group: 'Links',
        label: 'Beli',
        hint: `@${site.beliHandle}`,
        mark: '↗',
        keywords: ['food', 'restaurants'],
        run: () => openTab(site.beli),
      },
      {
        id: 'x-email',
        group: 'Links',
        label: 'Email',
        hint: site.email,
        mark: '↗',
        run: () => {
          window.location.href = `mailto:${site.email}`
        },
      },

      {
        id: 'a-copy',
        group: 'Actions',
        label: 'Copy email',
        hint: site.email,
        mark: '→',
        run: () => {
          navigator.clipboard.writeText(site.email).then(
            () => setStatus('Email copied'),
            () => setStatus('Copy failed'),
          )
        },
        stays: true,
      },
      {
        id: 'a-view',
        group: 'Actions',
        label: onList ? 'Card view' : 'List view',
        hint: onList ? 'The cards' : 'Everything on one page',
        mark: '→',
        run: () => navigate(onList ? '/' : '/list'),
      },
    ]
  }, [base, onList])

  const q = query.trim().toLowerCase()

  const groups = useMemo(() => {
    const scored = commands
      .map((c) => ({ c, s: q ? score(c, q) : 0 }))
      .filter((x) => x.s >= 0)
    return GROUPS.map((g) => ({
      group: g,
      items: scored
        .filter((x) => x.c.group === g)
        .sort((a, b) => b.s - a.s)
        .map((x) => x.c),
    })).filter((g) => g.items.length > 0)
  }, [commands, q])

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups])

  // Cmd/Ctrl+K toggles from anywhere; "/" opens when not typing in a field.
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !isEditable(e.target)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) {
      setQuery('')
      setActive(0)
      setStatus('')
      d.showModal()
      inputRef.current?.focus()
    } else if (!open && d.open) {
      d.close()
    }
  }, [open])

  useEffect(() => setActive(0), [q])

  useEffect(() => {
    document.getElementById(optId(active))?.scrollIntoView({ block: 'nearest' })
    // optId is derived from a stable id.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  function pickAt(i: number) {
    const c = flat[i]
    if (!c) return
    // Close before running, so focus is back on the page when a card flips open.
    if (!c.stays) dialogRef.current?.close()
    c.run()
  }

  function onInputKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, flat.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      pickAt(active)
    }
  }

  let index = -1

  return (
    <>
      <button
        type="button"
        className="fab palette-hint"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K /"
      >
        <SearchIcon className="icon--brass" />
        <span className="palette-hint__label">Search</span>
        <kbd className="palette-hint__kbd" aria-hidden="true">
          {shortcut}
        </kbd>
      </button>

      <dialog
        ref={dialogRef}
        className="palette"
        aria-label="Search the site"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // A click on the dialog box itself, not its content, is a click on the backdrop.
          if (e.target === e.currentTarget) dialogRef.current?.close()
        }}
      >
        <div className="palette__inner">
          <div className="palette__search">
            <SearchIcon className="icon--brass palette__search-icon" />
            <input
              ref={inputRef}
              className="palette__input"
              type="text"
              placeholder="Search the deck…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={flat[active] ? optId(active) : undefined}
              aria-label="Search"
              autoComplete="off"
              spellCheck={false}
            />
            <kbd className="palette__kbd">Esc</kbd>
          </div>

          {!q && (
            <div className="palette__try">
              <span className="palette__try-label">Try</span>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="palette__chip"
                  onClick={() => {
                    setQuery(s)
                    inputRef.current?.focus()
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="palette__results" id={listId} role="listbox" aria-label="Results">
            {flat.length === 0 && <p className="palette__empty">Not in the deck: “{query.trim()}”</p>}
            {groups.map((g) => (
              <div key={g.group} role="group" aria-labelledby={`${listId}-${g.group}`}>
                <p className="palette__group" id={`${listId}-${g.group}`}>
                  {g.group}
                </p>
                {g.items.map((c) => {
                  index += 1
                  const i = index
                  const on = i === active
                  return (
                    <div
                      key={c.id}
                      id={optId(i)}
                      role="option"
                      aria-selected={on}
                      className={`palette__item ${on ? 'is-active' : ''}`.trim()}
                      onMouseMove={() => on || setActive(i)}
                      onClick={() => pickAt(i)}
                    >
                      <span className={`palette__mark ${c.markClass ? `palette__mark--${c.markClass}` : ''}`.trim()} aria-hidden="true">
                        {c.mark}
                      </span>
                      <span className="palette__label">{c.label}</span>
                      <span className="palette__hint">{c.hint}</span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="palette__foot">
            <span className="palette__keys" aria-hidden="true">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> Move
              </span>
              <span>
                <kbd>↵</kbd> Open
              </span>
              <span>
                <kbd>Esc</kbd> Close
              </span>
            </span>
            <span className="palette__status" role="status">
              {status || `${flat.length} ${flat.length === 1 ? 'result' : 'results'}`}
            </span>
          </div>
        </div>
      </dialog>
    </>
  )
}
