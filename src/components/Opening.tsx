import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * The opening deal. A deck riffle-shuffles in the middle of the screen, then
 * the four aces are dealt off the top to the exact places the hero's hand
 * occupies, turning face up as they land. The dealt cards are clones of the
 * real ones, so when the overlay fades the hand is already there.
 *
 * index.html decides whether it plays (`data-intro="play"`): once per visit,
 * on the home page only, never for a section link or reduced motion. Any
 * click, key, or scroll skips it. While it plays, motion.css holds the
 * hero's own entrance until it hands over.
 */

const DECK = 10
const CARD_W = 152
const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)'

const SCROLL_KEYS = new Set([' ', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'])

const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

export function Opening() {
  const [on, setOn] = useState(() => document.documentElement.dataset.intro === 'play')
  const [leaving, setLeaving] = useState(false)
  const [caption, setCaption] = useState('Shuffling…')
  const stageRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<() => void>(() => {})

  useEffect(() => {
    if (!on) return
    const root = document.documentElement
    const stageEl = stageRef.current
    if (!stageEl) return
    const stage: HTMLDivElement = stageEl
    try {
      sessionStorage.setItem('dealt', '1')
    } catch {
      /* private mode: it may replay, which is harmless */
    }
    window.scrollTo(0, 0)

    let done = false
    let alive = true
    const anims: Animation[] = []
    const clones: HTMLElement[] = []
    const play = (el: Element, frames: Keyframe[], opts: KeyframeAnimationOptions) => {
      const a = el.animate(frames, { fill: 'both', easing: EASE, ...opts })
      anims.push(a)
      return a.finished.catch(() => undefined)
    }

    const finish = (quick: boolean) => {
      if (done) return
      done = true
      root.dataset.intro = 'done'
      setLeaving(true)
      window.setTimeout(() => setOn(false), quick ? 260 : 620)
    }

    const skip = (e?: Event) => {
      if (done) return
      // A key that skips should not also scroll the page it reveals.
      if (e instanceof KeyboardEvent && SCROLL_KEYS.has(e.key)) e.preventDefault()
      anims.forEach((a) => a.finish())
      finish(true)
    }
    skipRef.current = skip
    window.addEventListener('keydown', skip)
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchmove', skip, { passive: true })

    const deck = Array.from(stage.querySelectorAll<HTMLElement>('.opening__card'))

    async function run() {
      // 1. The riffle: cut into two halves, then let them fall back in turn.
      const half = Math.ceil(DECK / 2)
      await Promise.all(
        deck.map((c, i) =>
          play(c, [{ transform: rest(i) }, { transform: i < half ? cut(-1, i) : cut(1, i - half) }], {
            duration: 380,
            delay: 80 + (i % half) * 12,
          }),
        ),
      )
      const order: number[] = []
      for (let k = 0; k < half; k += 1) {
        if (k < DECK - half) order.push(half + k)
        order.push(k)
      }
      await Promise.all(
        order.map((i, slot) => {
          deck[i].style.zIndex = String(slot + 1)
          return play(
            deck[i],
            [
              { transform: i < half ? cut(-1, i) : cut(1, i - half) },
              { transform: `translate(${i < half ? -24 : 24}px, -28px) rotate(0deg)`, offset: 0.5 },
              { transform: rest(slot) },
            ],
            { duration: 300, delay: slot * 52 },
          )
        }),
      )
      if (done || !alive) return
      await play(stage, [{ transform: 'scale(1)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], {
        duration: 260,
      })
      if (done || !alive) return

      // 2. The deal: the top four go to where the hero's aces sit.
      setCaption('Dealing your hand')
      window.setTimeout(() => alive && setCaption(''), 700)
      const targets = Array.from(document.querySelectorAll<HTMLElement>('.hero__fan > .card'))
      const deckBox = stage.getBoundingClientRect()
      const dcx = deckBox.left + deckBox.width / 2
      const dcy = deckBox.top + deckBox.height / 2
      const byStack = deck.slice().sort((a, b) => Number(b.style.zIndex) - Number(a.style.zIndex))

      await Promise.all(
        targets.map(async (card, i) => {
          await wait(i * 130)
          if (done || !alive) return
          // The card's own box, without the fan's rotation. The fan eases its
          // transform, so the transition is off while it is measured.
          const saved = { transform: card.style.transform, transition: card.style.transition }
          card.style.transition = 'none'
          card.style.transform = 'none'
          const box = card.getBoundingClientRect()
          card.style.transform = saved.transform
          void card.offsetWidth
          card.style.transition = saved.transition
          // Land on whatever the card really shows at this width: the fan's
          // tilt on a desktop, straight in a column on a phone.
          const cs = getComputedStyle(card)
          const finalTransform = cs.transform === 'none' ? 'matrix(1, 0, 0, 1, 0, 0)' : cs.transform
          const [ox, oy] = cs.transformOrigin.split(' ').map(parseFloat)

          const clone = card.cloneNode(true) as HTMLElement
          clone.querySelector('.card__back')?.remove()
          clone.classList.remove('deal', 'is-tilting')
          clone.removeAttribute('data-card')
          clone.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'))
          const back = document.createElement('div')
          back.className = 'opening__back'
          clone.querySelector('.card__inner')?.appendChild(back)
          Object.assign(clone.style, {
            position: 'fixed',
            left: `${box.left}px`,
            top: `${box.top}px`,
            width: `${box.width}px`,
            height: `${box.height}px`,
            margin: '0',
            zIndex: String(40 + i),
            transformOrigin: `${ox}px ${oy}px`,
            visibility: 'visible',
          })
          stage.parentElement?.appendChild(clone)
          clones.push(clone)
          byStack[i].style.opacity = '0'

          // Start small and square on the deck: scaled about the card's own
          // transform origin, then shifted so its centre sits on the deck's.
          const s = CARD_W / box.width
          const cx = box.width / 2
          const cy = box.height / 2
          const dx = dcx - box.left - (ox + s * (cx - ox))
          const dy = dcy - box.top - (oy + s * (cy - oy))
          const inner = clone.querySelector('.card__inner')
          await Promise.all([
            play(
              clone,
              [
                { transform: `matrix(${s}, 0, 0, ${s}, ${dx}, ${dy})` },
                { transform: finalTransform },
              ],
              { duration: 680 },
            ),
            inner &&
              play(
                inner,
                [
                  { transform: 'rotateY(180deg)' },
                  { transform: 'rotateY(180deg)', offset: 0.35 },
                  { transform: 'rotateY(0deg)' },
                ],
                { duration: 680 },
              ),
          ])
        }),
      )
      if (done || !alive) return
      await wait(140)
      if (alive) finish(false)
    }
    run()

    return () => {
      // Development mounts twice; the first run must leave nothing behind.
      alive = false
      anims.forEach((a) => a.cancel())
      clones.forEach((c) => c.remove())
      deck.forEach((c) => (c.style.opacity = ''))
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
    }
  }, [on])

  if (!on) return null

  return createPortal(
    <div className={`opening ${leaving ? 'is-leaving' : ''}`.trim()} aria-hidden="true" onClick={() => skipRef.current()}>
      <div className="opening__deck" ref={stageRef}>
        {Array.from({ length: DECK }, (_, i) => (
          <span key={i} className="opening__card" style={{ transform: rest(i), zIndex: i + 1 }} />
        ))}
      </div>
      <p className="opening__caption">{caption}</p>
      <span className="opening__skip">Skip</span>
    </div>,
    document.body,
  )
}

/** A card squared up in the deck: each sits a hair above the one below. */
function rest(i: number) {
  return `translate(${-i * 0.4}px, ${-i * 1.2}px) rotate(0deg)`
}

/** A card in the left (-1) or right (1) half of the cut. */
function cut(side: -1 | 1, k: number) {
  return `translate(${side * 92 - k * 0.4}px, ${-k * 1.2 + 6}px) rotate(${side * 7}deg)`
}
