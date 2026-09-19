import type { Metric } from '../data'

/** A thin stat strip. Deliberately not cards. Figures stay separate; never summed. */
export function MetricBand({ metrics, label, note }: { metrics: Metric[]; label: string; note?: string }) {
  return (
    <section className="band" aria-label={label}>
      <div className="container">
        <dl className="band__inner">
          {metrics.map((m) => (
            <div className="band__item" key={m.label}>
              <dd className="band__value">{m.value}</dd>
              <dt className="band__label mono mono--sm">{m.label}</dt>
            </div>
          ))}
        </dl>
        {note && <p className="band__note mono mono--sm">{note}</p>}
      </div>
    </section>
  )
}
