import { Link } from '../lib/router'
import { ArrowRight } from '../components/Glyph'
import { Sheet } from '../components/Sheet'
import { useTitle } from '../lib/useTitle'

export function NotFound() {
  useTitle('Not On The Menu')

  return (
    <Sheet withTop>
      <div className="missing">
        <p className="label">Not On The Menu</p>
        <h1 className="page__title">That Dish Isn’t Served Here</h1>
        <p className="page__lede">
          The page you ordered isn’t on the menu. Ask for the menu and order again.
        </p>
        <Link to="/menu" className="btn">
          View The Menu
          <ArrowRight />
        </Link>
      </div>
    </Sheet>
  )
}
