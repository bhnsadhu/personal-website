import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

/** What a word riffles through: ranks, suits, and a few glitch marks. */
const DECK = [...'AKQJ♠♥♣♦!@#$%^&*']
const FRAME_MS = 45
const FRAMES = 18

export interface RiffleHandle {
  play: () => void
}

/**
 * A word that riffles like a deck: on `play()` every letter shuffles through
 * ranks, suits, and glitch marks, then settles back left to right (about
 * 0.8s). Red suits show in wine, black in brass. The box is held at its
 * resting width so nothing beside it moves. A play already running is not
 * restarted. Skipped under reduced motion.
 */
export const Riffle = forwardRef<RiffleHandle, { text: string; className?: string }>(function Riffle(
  { text, className },
  ref,
) {
  const box = useRef<HTMLSpanElement>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => () => window.clearInterval(timer.current ?? undefined), [])

  useImperativeHandle(ref, () => ({
    play() {
      const el = box.current
      if (!el || timer.current !== null || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const letters = [...el.children] as HTMLElement[]
      el.style.width = `${el.getBoundingClientRect().width}px`
      let frame = 0
      timer.current = window.setInterval(() => {
        const settled = Math.floor((frame / FRAMES) * letters.length)
        letters.forEach((s, i) => {
          const c = i < settled ? text[i] : DECK[(Math.random() * DECK.length) | 0]
          s.textContent = c
          s.dataset.suit = c === '♥' || c === '♦' ? 'red' : c === '♠' || c === '♣' ? 'black' : ''
        })
        if (frame++ >= FRAMES) {
          window.clearInterval(timer.current!)
          timer.current = null
          letters.forEach((s, i) => {
            s.textContent = text[i]
            s.dataset.suit = ''
          })
          el.style.width = ''
        }
      }, FRAME_MS)
    },
  }))

  return (
    <span ref={box} className={`riffle ${className ?? ''}`.trim()} aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i}>{ch}</span>
      ))}
    </span>
  )
})
