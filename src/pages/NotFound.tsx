import { Link } from 'react-router'
import { ArrowLeft } from '../components/Glyph'
import { Sheet } from '../components/Sheet'
import { useTitle } from '../lib/useTitle'

export function NotFound() {
  useTitle('Not On The Menu')

  return (
    <Sheet withTop>
      <div className="missing">
        <p className="label">Not On The Menu</p>
        <h1 className="page__title">That Dish Isn't Served Here</h1>
        <p className="page__lede">
          The page you ordered doesn't exist. Ask for the menu and try again.
        </p>
        <Link to="/menu" viewTransition className="btn">
          <ArrowLeft />
          Back To The Menu
        </Link>
      </div>
    </Sheet>
  )
}
