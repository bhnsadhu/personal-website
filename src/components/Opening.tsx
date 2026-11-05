import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'

/**
 * The opening deal. A deck riffle-shuffles in the middle of the screen, then
 * the four aces are dealt off the top to the exact places the hero's hand
 * occupies, turning face up as they land. The dealt cards are clones of the
 * real ones, so when the overlay fades the hand is already there.
 *
 * index.html decides whether it plays (`data-intro="play"`): once per visit,
 * on the home page only, never for a section link or reduced motion. It is
 * the way in, so a stray click or key does not end it. One thing does: a
 * hold, of space or of a press anywhere, while the quiet line at the top
 * fills with brass; let go early and it drains back. While it plays,
 * motion.css holds the hero's own entrance until it hands over.
 */

const DECK = 10
const CARD_W = 152
const DEAL_MS = 920
const DEAL_GAP = 190
/** Matches the --lift transition in motion.css. */
const LIFT_MS = 620
const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)'
/** How long a hold takes to skip; the line's fill runs over the same time. */
const HOLD_MS = 800
/** --cap-gap in motion.css: the caption keeps it below the skip line too. */
const CAP_GAP = 28

const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

export function Opening() {
  const [on, setOn] = useState(() => document.documentElement.dataset.intro === 'play')
  const [leaving, setLeaving] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const hintRef = useRef<HTMLParagraphElement>(null)
  const [holding, setHolding] = useState(false)
  const [hint] = useState(() => (window.matchMedia('(pointer: coarse)').matches ? 'Hold to skip' : 'Hold space to skip'))
  const [dealt, setDealt] = useState(false)
  const [caption, setCaption] = useState('Shuffling…')
  const stageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!on) return
    const root = document.documentElement
    const stageEl = stageRef.current
    if (!stageEl) return
    const stage: HTMLDivElement = stageEl
    const overlay = overlayRef.current
    try {
      sessionStorage.setItem('dealt', '1')
    } catch {
      /* private mode: it may replay, which is harmless */
    }
    window.scrollTo(0, 0)
    // The page under the overlay is out of reach until it hands over: no
    // tabbing onto links nobody can see.
    const app = document.getElementById('root')
    app?.setAttribute('inert', '')

    let done = false
    let alive = true
    const anims: Animation[] = []
    const clones: HTMLElement[] = []
    const play = (el: Element, frames: Keyframe[], opts: KeyframeAnimationOptions) => {
      const a = el.animate(frames, { fill: 'both', easing: EASE, ...opts })
      anims.push(a)
      return a.finished.catch(() => undefined)
    }

    const finish = (skip = false) => {
      if (done) return
      done = true
      root.dataset.intro = 'done'
      app?.removeAttribute('inert')
      if (skip) {
        // The hand is already in place under the overlay; the aces in flight
        // go at once so they never sit beside it, and the rest fades quickly.
        clones.forEach((c) => (c.style.visibility = 'hidden'))
        setSkipped(true)
      }
      setLeaving(true)
      window.setTimeout(() => setOn(false), skip ? 340 : 720)
    }

    // Hold to skip: space, or a press anywhere (mouse or finger), held for
    // HOLD_MS. A tap, a click, or any other key does nothing; letting go
    // early drains the line back.
    let holdTimer = 0
    const hold = () => {
      if (done || holdTimer) return
      setHolding(true)
      holdTimer = window.setTimeout(() => finish(true), HOLD_MS)
    }
    const release = () => {
      window.clearTimeout(holdTimer)
      holdTimer = 0
      if (!done) setHolding(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== ' ') return
      e.preventDefault()
      if (!e.repeat) hold()
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') release()
    }
    const onDown = (e: PointerEvent) => {
      if (e.button === 0) hold()
    }
    // A long press on a phone would otherwise open a menu or select text.
    const noMenu = (e: Event) => e.preventDefault()
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
    window.addEventListener('blur', release)
    window.addEventListener('contextmenu', noMenu)

    const deck = Array.from(stage.querySelectorAll<HTMLElement>('.opening__card'))

    async function run() {
      // 1. The riffle: cut into two halves, then let them fall back in turn.
      const half = Math.ceil(DECK / 2)
      await Promise.all(
        deck.map((c, i) =>
          play(c, [{ transform: rest(i) }, { transform: i < half ? cut(-1, i) : cut(1, i - half) }], {
            duration: 560,
            delay: 100 + (i % half) * 18,
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
            { duration: 440, delay: 80 + slot * 66 },
          )
        }),
      )
      if (done || !alive) return
      await play(stage, [{ transform: 'scale(1)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], {
        duration: 380,
      })
      if (done || !alive) return

      // 2. The deal: the top four go to where the hero's aces sit. First the
      // deck and its caption rise clear of where the hand lands, so no ace
      // comes to rest on the deck; never past the top of the screen.
      setCaption('Dealing your hand')
      const targets = Array.from(document.querySelectorAll<HTMLElement>('.hero__fan > .card'))
      const fit = fitHand(targets.map((t) => t.getBoundingClientRect()))
      const handTop = fit.top
      const pile = stage.getBoundingClientRect()
      const capTop = pile.top - 60
      // Never past the skip line at the top: the caption keeps the same gap
      // below it that it keeps above the deck.
      const ceiling = (hintRef.current?.getBoundingClientRect().bottom ?? 4) + CAP_GAP
      const lift = Math.min(0, Math.max(handTop - 40 - pile.bottom, ceiling - capTop))
      if (lift < 0 && overlay) {
        overlay.style.setProperty('--lift', `${lift}px`)
        await wait(LIFT_MS)
      } else {
        await wait(240)
      }
      if (done || !alive) return
      const deckBox = stage.getBoundingClientRect()
      const dcx = deckBox.left + deckBox.width / 2
      const dcy = deckBox.top + deckBox.height / 2
      const byStack = deck.slice().sort((a, b) => Number(b.style.zIndex) - Number(a.style.zIndex))

      // What is left of the deck, and the caption, clear away as the last ace
      // leaves it, so the hand comes to rest alone before the page comes in.
      const lastLands = (targets.length - 1) * DEAL_GAP + 160
      window.setTimeout(() => {
        if (!alive || done) return
        setDealt(true)
        byStack.slice(targets.length).forEach((c, k) =>
          play(c, [{ opacity: 1 }, { opacity: 0 }], { duration: 420, delay: k * 24 }),
        )
      }, lastLands)

      await Promise.all(
        targets.map(async (card, i) => {
          await wait(i * DEAL_GAP)
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
          const [ox, oy] = cs.transformOrigin.split(' ').map(parseFloat)
          // Where the hand is not wholly on screen (a phone, a short laptop),
          // the same fan is dealt scaled into the lower part of the screen:
          // the card's own transform, scaled by fit.s about the screen and
          // moved by fit.x/y, re-expressed about the clone's origin.
          const m = new DOMMatrix(cs.transform === 'none' ? undefined : cs.transform)
          const { s: k, x: ux, y: uy } = fit
          const fe = k * (box.left + ox + m.e) + ux - box.left - ox
          const ff = k * (box.top + oy + m.f) + uy - box.top - oy
          const finalTransform = `matrix(${k * m.a}, ${k * m.b}, ${k * m.c}, ${k * m.d}, ${fe}, ${ff})`

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
              { duration: DEAL_MS },
            ),
            inner &&
              play(
                inner,
                [
                  { transform: 'rotateY(180deg)' },
                  { transform: 'rotateY(180deg)', offset: 0.35 },
                  { transform: 'rotateY(0deg)' },
                ],
                { duration: DEAL_MS },
              ),
          ])
        }),
      )
      if (done || !alive) return
      await wait(440)
      if (alive) finish()
    }
    run()

    return () => {
      // Development mounts twice; the first run must leave nothing behind.
      alive = false
      app?.removeAttribute('inert')
      window.clearTimeout(holdTimer)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
      window.removeEventListener('blur', release)
      window.removeEventListener('contextmenu', noMenu)
      anims.forEach((a) => a.cancel())
      clones.forEach((c) => c.remove())
      deck.forEach((c) => (c.style.opacity = ''))
    }
  }, [on])

  if (!on) return null

  return createPortal(
    <div
      ref={overlayRef}
      className={['opening', dealt && 'is-dealt', leaving && 'is-leaving', skipped && 'is-skipped'].filter(Boolean).join(' ')}
      style={{ '--hold': `${HOLD_MS}ms` } as CSSProperties}
    >
      <div className="opening__deck" ref={stageRef} aria-hidden="true">
        {Array.from({ length: DECK }, (_, i) => (
          <span key={i} className="opening__card" style={{ transform: rest(i), zIndex: i + 1 }} />
        ))}
      </div>
      <p key={caption} className="opening__caption" aria-hidden="true">
        {caption}
      </p>
      <p ref={hintRef} className={`opening__hint ${holding ? 'is-holding' : ''}`.trim()} aria-hidden="true">
        <span className="opening__hint-base">{hint}</span>
        <span className="opening__hint-fill">{hint}</span>
      </p>
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

/**
 * Where the dealt hand comes to rest. Where the real hand is wholly on
 * screen, exactly there (scale 1, no shift), so the overlay fades onto a hand
 * already in place. Where it is not (on a phone it sits below the screen and
 * runs off its right edge; on a short laptop its foot is cut), the same fan,
 * scaled to fit the width and the lower 42% of the screen, centred, with a
 * margin at the foot. `top` is the top of the hand as dealt.
 */
function fitHand(rects: DOMRect[]): { s: number; x: number; y: number; top: number } {
  const left = Math.min(...rects.map((r) => r.left))
  const right = Math.max(...rects.map((r) => r.right))
  const top = Math.min(...rects.map((r) => r.top))
  const bottom = Math.max(...rects.map((r) => r.bottom))
  const vw = window.innerWidth
  const vh = window.innerHeight
  const margin = 16
  if (left >= margin && right <= vw - margin && bottom <= vh - margin) return { s: 1, x: 0, y: 0, top }
  const w = right - left
  const h = bottom - top
  const s = Math.min(1, (vw - 2 * margin) / w, (vh * 0.42) / h)
  const foot = Math.max(margin, vh * 0.06)
  const newLeft = (vw - s * w) / 2
  const newTop = vh - foot - s * h
  return { s, x: newLeft - s * left, y: newTop - s * top, top: newTop }
}
