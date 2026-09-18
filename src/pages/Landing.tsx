import { useEffect, type CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowRight } from '../components/Glyph'
import { Wordmark } from '../components/Wordmark'
import { site } from '../lib/content'
import { useTitle } from '../lib/useTitle'

const step = (i: number) => ({ ['--i' as string]: i }) as CSSProperties

export function Landing() {
  useTitle()
  const navigate = useNavigate()

  // "Scroll or tap to be seated": a wheel, a swipe up, or a down key seats you.
  useEffect(() => {
    let seated = false
    let touchY = 0
    const seat = () => {
      if (seated) return
      seated = true
      navigate('/menu', { viewTransition: true })
    }
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 8) seat()
    }
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchY
      if (touchY - y > 48) seat()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') seat()
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKey)
    }
  }, [navigate])

  return (
    <main className="landing">
      <div className="landing__inner">
        <p className="landing__eyebrow fade-up" style={step(0)}>
          Reservation Confirmed — Party Of One
        </p>
        <Wordmark as="h1" className="landing__name fade-up" />
        <p className="landing__tagline fade-up" style={step(2)}>
          {site.tagline}
        </p>
        <div className="landing__cta fade-up" style={step(3)}>
          <Link to="/menu" viewTransition className="btn">
            View The Menu
            <ArrowRight />
          </Link>
        </div>
        <p className="landing__hint fade-up" style={step(4)}>
          Scroll or tap to be seated
        </p>
      </div>
    </main>
  )
}
