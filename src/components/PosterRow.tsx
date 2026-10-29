import { useState } from 'react'
import type { PersonalEntry } from '../data'

/**
 * Indian Cinema, laid out like Letterboxd's favorite films: a label over a
 * rule, the posters in one row with the title and year along the foot of
 * each on hover, and the chosen film's note beneath. Hover only lifts a
 * poster; the chosen one carries the ring and a bar under it, so it is
 * clear a click is what changes the note. The first film starts chosen.
 */
export function PosterRow({ entries }: { entries: PersonalEntry[] }) {
  const [open, setOpen] = useState(0)
  const film = entries[open]

  return (
    <div className="posters">
      <p className="posters__head mono mono--sm">
        <span>Favorite films</span>
        <span className="posters__hint">Click a poster to read why</span>
      </p>
      <div className="posters__row">
        {entries.map((e, i) => {
          const label = [e.name, e.detail].filter(Boolean).join(' ')
          return (
            <button
              key={e.name}
              type="button"
              className="posters__item"
              aria-label={label}
              aria-pressed={open === i}
              onClick={() => setOpen(i)}
            >
              <span className="posters__frame">
                {e.poster && <img src={e.poster} alt="" width={342} height={513} loading="lazy" decoding="async" />}
                <span className="posters__cap mono" aria-hidden="true">
                  {label}
                </span>
              </span>
            </button>
          )
        })}
      </div>
      {film && (
        <div key={open} className="posters__review" aria-live="polite">
          <p className="posters__title">
            <span className="entry__name">{film.name}</span>
            {film.detail && <span className="posters__year">{film.detail}</span>}
          </p>
          <p className="entry__note">{film.note}</p>
        </div>
      )}
    </div>
  )
}
