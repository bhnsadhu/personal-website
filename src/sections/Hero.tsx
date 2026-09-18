import { Link } from '../lib/router'
import { site, tagline } from '../lib/content'

export function Hero() {
  return (
    <section className="hero" aria-label="Welcome">
      <div className="container">
        <div className="hero__grid">
          <div>
            <h1 className="hero__title">{site.name}</h1>
            <p className="hero__carte">
              <span>À La Carte</span>
            </p>
          </div>
          <dl className="hero__meta">
            <div>
              <dt>Service</dt>
              <dd>{site.title}</dd>
            </div>
            <div>
              <dt>Seating</dt>
              <dd>{site.city}</dd>
            </div>
            <div>
              <dt>Est.</dt>
              <dd>{site.established}</dd>
            </div>
          </dl>
        </div>

        <figure className="hero__media">
          <img src="/placeholder-hero.svg" alt="" width="1600" height="700" />
          <figcaption className="hero__phrase">{tagline}</figcaption>
        </figure>

        <div className="hero__actions">
          <Link to="/#reservations" className="arrow-link">
            Book A Table
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
          <Link to="/#starters" className="btn">
            View The Menu
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
