import type { ReactNode } from 'react'
import { Link } from '../lib/router'
import { ArrowLeft } from './Glyph'
import { Wordmark } from './Wordmark'
import { Footer } from './Footer'

interface SheetProps {
  children: ReactNode
  className?: string
  /** Show the back link + small wordmark bar (every page but the menu itself). */
  withTop?: boolean
  pageKey?: string
}

/** The menu card. Framed on wide screens, edge-to-edge on phones. */
export function Sheet({ children, className = '', withTop = false, pageKey }: SheetProps) {
  return (
    <main key={pageKey} className={`sheet page-enter ${className}`.trim()}>
      {withTop && (
        <div className="page__top">
          <BackToMenu />
          <Wordmark className="page__wordmark" to="/menu" />
        </div>
      )}
      {children}
      <Footer />
    </main>
  )
}

export function BackToMenu() {
  return (
    <Link to="/menu" className="link back">
      <ArrowLeft />
      Back To The Menu
    </Link>
  )
}
