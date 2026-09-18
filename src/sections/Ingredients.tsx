import { CourseHead } from '../components/CourseHead'
import { SkillGlyph } from '../components/Icons'
import { courses, pad, skillCategories } from '../lib/content'

export function Ingredients() {
  return (
    <section id="ingredients" className="section">
      <div className="container">
        <CourseHead course={courses.ingredients} />
        {skillCategories.map((cat) => (
          <div className="pantry" key={cat.number}>
            <div className="pantry__rail">
              <p className="pantry__num t-meta">{cat.number}</p>
              <h3 className="pantry__title t-category">{cat.title}</h3>
              <p className="pantry__count t-label">
                {cat.skills.length} {cat.skills.length === 1 ? 'Skill' : 'Skills'}
              </p>
            </div>
            <ul className="skills">
              {cat.skills.map((skill, i) => (
                <li className="skill" key={skill}>
                  <span className="skill__index t-mono">{pad(i + 1)}</span>
                  <span className="skill__icon">
                    <SkillGlyph label={skill} />
                  </span>
                  <span className="skill__name t-label">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
