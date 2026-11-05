import { useSyncExternalStore } from 'react'

/**
 * Table sounds, synthesized with Web Audio: no files, no library. Short and
 * quiet, and silent until the visitor's first click, tap or key, because
 * browsers only start audio after a gesture (the opening deal asks early and
 * sounds only where the browser allows it). The speaker button in the nav
 * turns them off, saved in `localStorage` `sound`.
 */

export type Sfx = 'flip' | 'close' | 'deal' | 'chips' | 'stack' | 'tink' | 'pop' | 'click' | 'thud' | 'riffle'

/** Master volume. The sounds sit under conversation in a quiet room. */
const VOLUME = 0.32

const listeners = new Set<() => void>()

function readOn(): boolean {
  try {
    return localStorage.getItem('sound') !== 'off'
  } catch {
    return true
  }
}

let on = readOn()

export function setSound(next: boolean) {
  on = next
  try {
    localStorage.setItem('sound', next ? 'on' : 'off')
  } catch {
    // Private mode: the choice lasts until the tab closes.
  }
  listeners.forEach((cb) => cb())
  if (next) play('chips')
}

export function useSound(): boolean {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => on,
  )
}

let ctx: AudioContext | null = null
let out: GainNode | null = null
let noise: AudioBuffer | null = null

function context(): AudioContext | null {
  if (ctx) return ctx
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  ctx = new AC()
  out = ctx.createGain()
  out.gain.value = VOLUME
  out.connect(ctx.destination)
  noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
  const data = noise.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  return ctx
}

/* The first gesture anywhere wakes the audio; until then every sound is a no-op. */
function unlock() {
  const c = context()
  if (c && c.state === 'suspended') void c.resume()
}
window.addEventListener('pointerdown', unlock, { capture: true, passive: true })
window.addEventListener('keydown', unlock, { capture: true })

/* The opening deal plays before any gesture. Ask for audio anyway: browsers
   that already trust the site (Chrome, for a returning visitor) let it start,
   and the rest keep the context suspended, so the deal is silent there. */
if (document.documentElement.dataset.intro === 'play') {
  const c = context()
  if (c) c.resume().catch(() => undefined)
}

const jitter = (v: number, by = 0.08) => v * (1 + (Math.random() * 2 - 1) * by)

/** A filtered breath of noise: paper, felt, a card's edge. */
function burst(c: AudioContext, at: number, freq: number, q: number, dur: number, gain: number) {
  const src = c.createBufferSource()
  src.buffer = noise
  src.playbackRate.value = jitter(1, 0.1)
  const band = c.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.value = jitter(freq)
  band.Q.value = q
  const env = c.createGain()
  env.gain.setValueAtTime(0.0001, at)
  env.gain.exponentialRampToValueAtTime(gain, at + 0.003)
  env.gain.exponentialRampToValueAtTime(0.0001, at + dur)
  src.connect(band).connect(env).connect(out!)
  src.start(at, Math.random() * 0.5, dur + 0.02)
}

/** A struck partial: a chip's clack, glass ringing, a pop. */
function tone(c: AudioContext, at: number, freq: number, dur: number, gain: number, type: OscillatorType = 'sine', to?: number) {
  const osc = c.createOscillator()
  osc.type = type
  osc.frequency.setValueAtTime(jitter(freq, 0.03), at)
  if (to) osc.frequency.exponentialRampToValueAtTime(to, at + dur)
  const env = c.createGain()
  env.gain.setValueAtTime(0.0001, at)
  env.gain.exponentialRampToValueAtTime(gain, at + 0.002)
  env.gain.exponentialRampToValueAtTime(0.0001, at + dur)
  osc.connect(env).connect(out!)
  osc.start(at)
  osc.stop(at + dur + 0.02)
}

function clack(c: AudioContext, at: number, gain = 1) {
  tone(c, at, 3150, 0.045, 0.22 * gain, 'triangle')
  tone(c, at, 4480, 0.03, 0.12 * gain, 'triangle')
  burst(c, at, 6200, 1.5, 0.02, 0.18 * gain)
}

const SOUNDS: Record<Sfx, (c: AudioContext, t: number) => void> = {
  // A card turned over on the felt: a quick paper snap.
  flip: (c, t) => {
    burst(c, t, 2400, 0.9, 0.08, 0.55)
    burst(c, t + 0.014, 5200, 1.2, 0.05, 0.22)
  },
  // Laid back down: softer and lower.
  close: (c, t) => burst(c, t, 1500, 0.8, 0.06, 0.4),
  // One card slid off the deck.
  deal: (c, t) => burst(c, t, 3400, 1.1, 0.045, 0.35),
  // Two chips set down together.
  chips: (c, t) => {
    clack(c, t)
    clack(c, t + 0.07, 0.7)
  },
  // A stack of chips pushed across the table: the form is sent.
  stack: (c, t) => {
    burst(c, t, 900, 0.6, 0.18, 0.25)
    for (let i = 0; i < 5; i++) clack(c, t + 0.05 + i * 0.045, 0.8 - i * 0.1)
  },
  // A fingernail on a bottle.
  tink: (c, t) => {
    tone(c, t, 2780, 0.6, 0.16)
    tone(c, t, 4170, 0.4, 0.07)
    tone(c, t, 6950, 0.22, 0.035)
  },
  // A pin dropped on the map.
  pop: (c, t) => tone(c, t, 620, 0.09, 0.3, 'sine', 210),
  // A switch.
  click: (c, t) => burst(c, t, 3600, 3, 0.018, 0.35),
  // A card that stays face down.
  thud: (c, t) => {
    burst(c, t, 420, 0.7, 0.1, 0.5)
    tone(c, t, 150, 0.08, 0.15, 'sine', 90)
  },
  // A riffle: many small card edges falling together.
  riffle: (c, t) => {
    for (let i = 0; i < 22; i++) burst(c, t + i * 0.018 + Math.random() * 0.006, 2000 + Math.random() * 2400, 1.4, 0.03, 0.22)
  },
}

/**
 * Plays one sound now, or `delay` seconds from now. Silent when off, hidden, or
 * not yet unlocked. `ifRunning` drops the sound unless the audio is already
 * live, so a timed sequence (the opening deal) never queues up behind a locked
 * context and bursts out when the first gesture finally wakes it.
 */
export function play(sfx: Sfx, delay = 0, ifRunning = false) {
  if (!on || document.hidden) return
  const c = ctx
  if (!c || c.state === 'closed') return
  if (ifRunning && c.state !== 'running') return
  // The gesture that woke the audio is still resuming it; play once it has.
  if (c.state === 'suspended') {
    void c.resume().then(() => c.state === 'running' && SOUNDS[sfx](c, c.currentTime + 0.005 + delay))
    return
  }
  SOUNDS[sfx](c, c.currentTime + 0.005 + delay)
}

/** Chips landing on their stacks, timed to the CSS chip-drop in motion.css. */
export function playChipDrops(stacks: number[]) {
  if (!on || !ctx || ctx.state !== 'running') return
  const c = ctx
  let n = 0
  stacks.forEach((count, s) => {
    for (let i = 0; i < count && n < 48; i++, n++) {
      // The drop's bounce lands about 0.32s into its 0.6s animation.
      clack(c, c.currentTime + s * 0.11 + i * 0.055 + 0.32, 0.35)
    }
  })
}
