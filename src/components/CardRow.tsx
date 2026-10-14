import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { onDeal, takeDeal } from '../lib/deal'

export interface RowState {
  openId: string | null
  open: (id: string) => void
  close: () => void
  isOpen: (id: string) => boolean
  isAside: (id: string) => boolean
}

interface CardRowProps {
  ids: string[]
  /** 'fan' overlaps cards until one opens; 'row' is a flat spread; 'flop' centers a short set. */
  layout?: 'row' | 'fan' | 'flop'
  className?: string
  ariaLabel: string
  children: (state: RowState) => ReactNode
}

/**
 * Owns which card in a row is open. Columns animate so the open card
 * fills the row and the others slide back. Escape closes. A card picked in
 * the search palette opens through `deal`.
 */
export function CardRow({ ids, layout = 'row', className = '', ariaLabel, children }: CardRowProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const open = useCallback((id: string) => setOpenId(id), [])
  const close = useCallback(() => setOpenId(null), [])
  const isOpen = useCallback((id: string) => openId === id, [openId])
  const isAside = useCallback((id: string) => openId !== null && openId !== id, [openId])

  const rowRef = useRef<HTMLDivElement>(null)
  const dealt = useRef(false)
  const key = ids.join(' ')
  useEffect(() => {
    const claim = () => {
      const id = takeDeal(key.split(' '))
      if (!id) return
      dealt.current = true
      setOpenId(id)
    }
    claim()
    return onDeal(claim)
  }, [key])

  // A dealt card is brought into view under the nav, after any anchor scroll has landed.
  useEffect(() => {
    if (!dealt.current || !openId) return
    dealt.current = false
    const card = rowRef.current?.querySelector(`[data-card="${openId}"]`)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!card) return
        const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0
        window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - nav - 16 })
      }),
    )
  }, [openId])

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape' && openId !== null) {
      e.stopPropagation()
      close()
    }
  }

  const columns = openId
    ? ids.map((id) => (id === openId ? 'minmax(0, 7fr)' : 'minmax(0, 1fr)')).join(' ')
    : `repeat(${ids.length}, minmax(0, 1fr))`

  return (
    <div
      ref={rowRef}
      className={`row row--${layout} ${openId ? 'has-open' : ''} ${className}`.trim()}
      style={{ gridTemplateColumns: columns, ['--n' as string]: ids.length }}
      role="group"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      {children({ openId, open, close, isOpen, isAside })}
    </div>
  )
}
