import { Link } from '../lib/router'
import { useTitle } from '../lib/useTitle'

export function NotFound() {
  useTitle('Not in the deck')
  return (
    <main className="plate">
      <div className="container">
        <article className="plate__card plate__card--empty">
          <p className="eyebrow">404 · Not in the deck</p>
          <h1 className="plate__title">That card was never dealt.</h1>
          <p className="plate__lede">The page you asked for isn’t in this hand. Head back to the table.</p>
          <div className="actions">
            <Link to="/" className="btn">
              Back to the hand
            </Link>
            <Link to="/list" className="btn btn--ghost">
              List view
            </Link>
          </div>
        </article>
      </div>
    </main>
  )
}
