import type { Stat } from '../lib/content'

/** Black band of large numbers. Used for headline stats and project results. */
export function MetricBand({ stats, label }: { stats: Stat[]; label: string }) {
  return (
    <section className="metrics" aria-label={label}>
      <dl className="metrics__grid container" style={{ ['--n' as string]: stats.length }}>
        {stats.map((stat) => (
          <div className="metric" key={stat.label}>
            <dt className="metric__label t-label">{stat.label}</dt>
            <dd className="metric__value">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
