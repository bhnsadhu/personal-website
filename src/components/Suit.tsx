import type { Suit } from '../data'

export const SUIT_GLYPH: Record<Suit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
}

export const SUIT_NAME: Record<Suit, string> = {
  spades: 'Spades',
  hearts: 'Hearts',
  diamonds: 'Diamonds',
  clubs: 'Clubs',
}

export function isRed(suit: Suit) {
  return suit === 'hearts' || suit === 'diamonds'
}

export function SuitGlyph({ suit, className = '' }: { suit: Suit; className?: string }) {
  return (
    <span className={`suit ${isRed(suit) ? 'suit--red' : 'suit--black'} ${className}`.trim()} aria-hidden="true">
      {SUIT_GLYPH[suit]}
    </span>
  )
}
