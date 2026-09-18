import { Link } from '../lib/router'

export function BackToMenu() {
  return (
    <Link to="/" className="back">
      <span className="back__mark" aria-hidden="true" />
      <span className="arrow" aria-hidden="true">
        ←
      </span>
      Back To The Menu
    </Link>
  )
}
