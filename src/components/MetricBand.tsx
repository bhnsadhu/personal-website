import type { Metric } from '../data'

/** A thin stat strip. Deliberately not cards. */
export function MetricBand({ metrics, label }: { metrics: Metric[]; label: string }) {
  return (
    <section className="band" aria-label={label}>
      <dl className="band__inner container">
        {metrics.map((m) => (
          <div className="band__item" key={m.label}>
            <dd className="band__value">{m.value}</dd>
            <dt className="band__label mono mono--sm">{m.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
