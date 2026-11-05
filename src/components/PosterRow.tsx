import type { PersonalEntry } from '../data'

/**
 * Indian Cinema: a row of posters with always-visible names underneath.
 * The selected name becomes bold and its poster lifts, matching the
 * fragrance shelf. The back that holds it (PersonalBack) owns which film is
 * chosen and shows its title, year, and note beside the posters.
 */
export function PosterRow({ entries, open, onPick }: { entries: PersonalEntry[]; open: number; onPick: (i: number) => void }) {
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
              onClick={() => onPick(i)}
            >
              <span className="posters__frame">
                {e.poster && <img src={e.poster} alt="" width={342} height={513} loading="lazy" decoding="async" />}
              </span>
              <span className="posters__label" aria-hidden="true">{e.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
