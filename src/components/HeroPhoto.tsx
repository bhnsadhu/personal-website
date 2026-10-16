import { useEffect, useRef } from 'react'
import { site } from '../data'
import { richPointer } from '../lib/motion'

/**
 * The photo beside the name: a Polaroid on the same cream stock as the
 * cards. Both views render this one component. The print is glossy and the
 * frame is matte, so only the picture catches the light: a soft band of
 * shine slides across it as the pointer moves over the page.
 */
export function HeroPhoto() {
  const { src, width, height, alt } = site.photo
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const fig = ref.current
    if (!fig || !richPointer()) return
    let frame = 0
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        fig.style.setProperty('--shine-x', (e.clientX / window.innerWidth).toFixed(3))
        fig.style.setProperty('--shine-y', (e.clientY / window.innerHeight).toFixed(3))
      })
    }
    // Only while the photo is on screen.
    const seen = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) window.addEventListener('pointermove', move, { passive: true })
      else window.removeEventListener('pointermove', move)
    })
    seen.observe(fig)
    return () => {
      cancelAnimationFrame(frame)
      seen.disconnect()
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return (
    <figure ref={ref} className="hero__photo">
      <span className="hero__print">
        <img src={src} width={width} height={height} alt={alt} decoding="async" />
      </span>
    </figure>
  )
}
