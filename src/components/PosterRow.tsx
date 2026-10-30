import { useState } from 'react'
import type { PersonalEntry } from '../data'

/**
 * Indian Cinema: a row of posters with always-visible names underneath.
 * The selected name becomes bold and its poster lifts, matching the
 * fragrance shelf. The chosen film's full title, year, and note sit below.
 * The first film starts chosen.
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
              </span>
              <span className="posters__label" aria-hidden="true">{e.name}</span>
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
