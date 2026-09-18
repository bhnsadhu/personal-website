import type { Rank, Suit } from './types'

export * from './types'
export { site } from './site'
export { hand } from './hand'
export { experience } from './experience'
export { leadership, LEADERSHIP_CAP } from './leadership'
export { projects } from './projects'
export { skills } from './skills'
export { personal } from './personal'
export { metrics } from './metrics'

/** Experience ranks: Ace first, then 10 downward. Face cards are reserved for leadership. */
export const SPREAD_RANKS: Rank[] = ['A', '10', '9', '8', '7', '6', '5', '4', '3', '2']

/** Project ranks: Ace and the face cards first, then numbers. */
export const FAN_RANKS: Rank[] = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']

/** Community cards read left to right. */
export const FLOP_RANKS: Rank[] = ['7', '8', '9']

export const HAND_SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs']

export function rankAt(list: Rank[], i: number): Rank {
  return list[Math.min(i, list.length - 1)]
}

export function findBySlug<T extends { slug: string }>(list: T[], slug: string | undefined) {
  return list.find((item) => item.slug === slug)
}

export function nextOf<T extends { slug: string }>(list: T[], slug: string) {
  const i = list.findIndex((item) => item.slug === slug)
  return list[(i + 1) % list.length]
}
