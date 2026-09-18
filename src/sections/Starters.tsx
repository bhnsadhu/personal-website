import { CourseHead } from '../components/CourseHead'
import { courses, starters } from '../lib/content'

export function Starters() {
  return (
    <section id="starters" className="section">
      <div className="container">
        <CourseHead course={courses.starters} statement={starters.statement} />
        <div className="starters">
          <div className="starters__bio">
            {starters.paragraphs.map((text, i) => (
              <p key={i} className="t-lead measure">
                {text}
              </p>
            ))}
          </div>
          <aside className="starters__side">
            <div className="starters__block">
              <h3 className="t-label">Expertise</h3>
              <ul className="tags">
                {starters.expertise.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="starters__block">
              <h3 className="t-label">Now</h3>
              <dl className="starters__now">
                {starters.now.map((row) => (
                  <div key={row.label}>
                    <dt className="t-mono">{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="starters__block">
              <h3 className="t-label">Off The Clock</h3>
              <ol className="starters__list">
                {starters.interests.map((item, i) => (
                  <li key={item}>
                    <span className="t-mono">{String(i + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
            <p className="starters__avail status status--live">
              <span className="status__dot" aria-hidden="true" />
              {starters.availability}
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
