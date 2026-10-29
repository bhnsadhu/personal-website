import { useState } from 'react'
import type { PersonalEntry } from '../data'

/**
 * The Fragrance Shelf: photographs of the five bottles, cut out and stood on
 * a brass shelf at their real heights against one another, each house's name
 * on the ledge beneath. Hover lifts a bottle; the chosen one rises with a
 * glow and a bar under its name, its shadow stays on the shelf, and its note
 * fades in below. The first bottle starts chosen.
 */
export function FragranceShelf({ entries }: { entries: PersonalEntry[] }) {
  const [open, setOpen] = useState(0)
  const tallest = Math.max(...entries.map((e) => e.cm ?? 0)) || 1
  const pick = entries[open]

  return (
    <div className="shelf">
      <p className="shelf__head mono mono--sm">
        <span>On my shelf</span>
        <span className="shelf__hint">Click a bottle to read why</span>
      </p>
      <div className="shelf__bottles">
        {entries.map((e, i) => (
          <button
            key={e.name}
            type="button"
            className="shelf__slot"
            aria-label={[e.name, e.detail].filter(Boolean).join(', ')}
            aria-pressed={open === i}
            onClick={() => setOpen(i)}
          >
            <span className="shelf__glow" aria-hidden="true" />
            <span className="shelf__shadow" aria-hidden="true" />
            {e.photo && (
              <img
                className="shelf__bottle"
                src={e.photo}
                alt=""
                style={{ height: `${((e.cm ?? tallest) / tallest) * 94}%` }}
                loading="lazy"
                decoding="async"
              />
            )}
          </button>
        ))}
      </div>
      <div className="shelf__plank" aria-hidden="true" />
      <div className="shelf__labels" aria-hidden="true">
        {entries.map((e, i) => (
          <span key={e.name} className={`shelf__label mono${open === i ? ' is-on' : ''}`}>
            {e.detail}
          </span>
        ))}
      </div>
      {pick && (
        <div key={open} className="shelf__review" aria-live="polite">
          <p className="shelf__title">
            <span className="entry__name">{pick.name}</span>
            {pick.detail && <span className="entry__detail">{pick.detail}</span>}
          </p>
          <p className="entry__note">{pick.note}</p>
        </div>
      )}
    </div>
  )
}
