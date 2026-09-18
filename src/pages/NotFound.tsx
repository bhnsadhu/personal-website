import { BackToMenu } from '../components/BackToMenu'
import { Link } from '../lib/router'
import { useTitle } from '../lib/useTitle'

export function NotFound() {
  useTitle('Not On The Menu')
  return (
    <main className="plate">
      <div className="container">
        <BackToMenu />
        <header className="plate__head">
          <p className="course-head__eyebrow t-label">404 — Not On The Menu</p>
          <h1 className="plate__title">That Dish Isn’t Served Here</h1>
          <p className="plate__lede t-lead measure">
            The page you ordered isn’t on the menu. Ask for the menu and order again.
          </p>
        </header>
        <Link to="/" className="btn">
          View The Menu
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </main>
  )
}
