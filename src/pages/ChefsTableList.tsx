import { BackToMenu } from '../components/BackToMenu'
import { chefsTable, courses, pad } from '../lib/content'
import { useTitle } from '../lib/useTitle'

export function ChefsTableList() {
  const course = courses['chefs-table']
  useTitle(chefsTable.listTitle)
  return (
    <main className="plate">
      <div className="container">
        <BackToMenu />
        <header className="plate__head">
          <p className="course-head__eyebrow t-label">
            {course.name} — {course.sub}
          </p>
          <h1 className="plate__title">{chefsTable.listTitle}</h1>
          <p className="plate__lede t-lead measure">{chefsTable.description}</p>
        </header>
        <ol className="ranked">
          {chefsTable.items.map((item) => (
            <li key={item.rank} className="ranked__row">
              <span className="ranked__rank">{pad(item.rank)}</span>
              <div>
                <a href={item.url} target="_blank" rel="noreferrer" className="ranked__name t-card">
                  {item.name}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
                <p className="ranked__meta t-mono">
                  {item.category} · {item.location}
                </p>
                <p className="ranked__note measure">{item.note}</p>
              </div>
              <span className="ranked__score t-meta">{item.score}</span>
            </li>
          ))}
        </ol>
        <nav className="plate__nav" aria-label="Menu navigation">
          <BackToMenu />
        </nav>
      </div>
    </main>
  )
}
