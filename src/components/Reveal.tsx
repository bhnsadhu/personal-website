import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Fades a block up when it scrolls into view. One shared observer;
 * blocks that enter together are staggered so the first paint reads
 * as one gesture rather than a pile-up.
 */

let observer: IntersectionObserver | null = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      let i = 0
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        el.style.transitionDelay = `${i * 70}ms`
        el.classList.add('is-in')
        observer?.unobserve(el)
        i += 1
      }
    },
    { threshold: 0.06, rootMargin: '0px 0px -6% 0px' },
  )
  return observer
}

interface RevealProps {
  as?: 'section' | 'div' | 'header' | 'footer'
  className?: string
  children: ReactNode
}

export function Reveal({ as = 'div', className = '', children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-in')
      return
    }
    const io = getObserver()
    io.observe(el)
    return () => io.unobserve(el)
  }, [])

  const Tag = as as 'div'
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  )
}
