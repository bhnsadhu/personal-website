/**
 * The line beside each section's title. One source, so the card view and
 * the list view say the same thing.
 */
export const sectionNotes = {
  spread:
    'Working across product, technology, and strategy to understand problems and turn research into useful next steps.',
  face:
    'Bringing people together, helping teams find direction, and making things happen across campus. A different kind of strong hand.',
  fan:
    'Ideas taken beyond the ‘what if.’ Things I’ve built to solve everyday problems, try something new, or make time with friends more fun.',
  chips:
    'The tools and approaches I bring to the table, from understanding users and setting priorities to building software and making sense of data.',
  flop:
    'A little of what fills my time outside of work. Favorite meals, fragrances, films, and places, each with a story behind it.',
}

/**
 * Each section's eyebrow and title, so the card view and the list view
 * head every section with the same words. `em` is the italic accent word.
 */
export const sectionHeads = {
  spread: { eyebrow: '♠ Experience', pre: 'The', em: 'spread' },
  face: { eyebrow: '♠ Leadership', pre: 'The', em: 'face cards' },
  fan: { eyebrow: '♦ Projects', pre: 'The', em: 'fan' },
  chips: { eyebrow: '♣ Skills', pre: 'The', em: 'chips' },
  flop: { eyebrow: '♥ Personal', pre: 'The', em: 'flop' },
  contact: { eyebrow: '♥ Contact', pre: 'Let’s', em: 'talk' },
} as const

export type SectionKey = keyof typeof sectionHeads
