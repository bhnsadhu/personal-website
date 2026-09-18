import { CourseHead } from '../components/CourseHead'
import { Link } from '../lib/router'
import { chefsTable, courses, pad } from '../lib/content'

export function ChefsTable() {
  const course = courses['chefs-table']
  return (
    <section id="chefs-table" className="section">
      <div className="container">
        <CourseHead
          course={course}
          statement={`${course.name} — ${course.heading}`}
          lede={
            <p>
              <strong>{chefsTable.listTitle}.</strong> {chefsTable.description}
            </p>
          }
        />
        <dl className="chefs__metrics">
          {chefsTable.metrics.map((m) => (
            <div key={m.label}>
              <dd className="chefs__value t-category">{m.value}</dd>
              <dt className="t-label">{m.label}</dt>
            </div>
          ))}
        </dl>
      </div>
      <div className="rail-wrap">
        <ul className="rail container">
          {chefsTable.items.map((item) => (
            <li key={item.rank} className="card">
              <a href={item.url} target="_blank" rel="noreferrer" className="card__link">
                <img src={item.image} alt="" loading="lazy" width="680" height="500" />
                <span className="card__rank" aria-hidden="true">
                  {pad(item.rank)}
                </span>
                <span className="card__score t-meta">{item.score}</span>
                <span className="card__ext" aria-hidden="true">
                  ↗
                </span>
                <span className="card__body">
                  <span className="card__name t-card">
                    <span className="sr-only">Number {item.rank}: </span>
                    {item.name}
                  </span>
                  <span className="card__meta t-mono">
                    {item.category} · {item.location}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="container chefs__more">
        <Link to="/chefs-table" className="arrow-link">
          See The Full List
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
