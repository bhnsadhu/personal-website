import { Course } from '../components/Course'
import { Ingredients } from '../components/Ingredients'
import { Reveal } from '../components/Reveal'
import { Row, View } from '../components/Row'
import { Sheet } from '../components/Sheet'
import { Status } from '../components/Status'
import { Wordmark } from '../components/Wordmark'
import { chefsTable, courses, mains, sides, specials, starter } from '../lib/content'
import { useTitle } from '../lib/useTitle'

export function Menu() {
  useTitle()

  return (
    <Sheet className="menu">
      <Reveal as="header" className="menu__head">
        <Wordmark as="h1" className="menu__name" />
        <p className="menu__carte">
          <span>À La Carte</span>
        </p>
      </Reveal>

      <div className="menu__courses">
        <Reveal>
          <Course meta={courses.starters}>
            <Row
              to="/starters"
              title={starter.title}
              meta={starter.description}
              action={<View />}
            />
          </Course>
        </Reveal>

        <Reveal>
          <Course meta={courses.mains}>
            {mains.map((main) => (
              <Row
                key={main.slug}
                to={`/mains/${main.slug}`}
                title={main.role}
                subtitle={main.company}
                meta={main.dates}
                action={<View />}
              />
            ))}
          </Course>
        </Reveal>

        <Reveal>
          <Course meta={courses.sides}>
            {sides.map((side) => (
              <Row
                key={side.slug}
                to={`/sides/${side.slug}`}
                title={side.position}
                subtitle={side.organization}
                meta={side.dates}
                action={<View />}
              />
            ))}
          </Course>
        </Reveal>

        <Reveal>
          <Course meta={courses.specials}>
            {specials.map((special) => (
              <Row
                key={special.slug}
                to={`/specials/${special.slug}`}
                title={special.name}
                meta={special.description}
                note={special.stack.join(', ')}
                action={<Status kind={special.status} />}
              />
            ))}
          </Course>
        </Reveal>

        <Reveal>
          <Course meta={courses.chefsTable}>
            <Row
              to="/chefs-table"
              title={chefsTable.title}
              meta={chefsTable.description}
              action={<View />}
            />
          </Course>
        </Reveal>

        <Reveal>
          <Course meta={courses.ingredients}>
            <Ingredients />
          </Course>
        </Reveal>
      </div>
    </Sheet>
  )
}
