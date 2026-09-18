import type { CSSProperties } from 'react'
import { Link } from '../lib/router'
import { ArrowRight } from '../components/Glyph'
import { Wordmark } from '../components/Wordmark'
import { site } from '../lib/content'
import { useTitle } from '../lib/useTitle'

const step = (i: number) => ({ ['--i' as string]: i }) as CSSProperties

export function Landing() {
  useTitle()

  return (
    <main className="landing">
      <div className="sheet landing__card page-enter">
        <div className="landing__inner">
          <p className="landing__eyebrow fade-up" style={step(0)}>
            Reservation Confirmed — Party Of One
          </p>
          <Wordmark as="h1" className="landing__name fade-up" />
          <p className="landing__tagline logo-copy fade-up" style={step(2)}>
            {site.tagline}
          </p>
          <div className="landing__cta fade-up" style={step(3)}>
            <Link to="/menu" className="btn">
              View The Menu
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
