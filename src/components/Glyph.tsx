interface GlyphProps {
  className?: string
}

/** Arrow glyphs drawn inline so they match PT Serif's weight on every platform. */
export function ArrowRight({ className = '' }: GlyphProps) {
  return (
    <svg
      className={`glyph glyph--right ${className}`.trim()}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8h11" />
      <path d="M9.5 4l4 4-4 4" />
    </svg>
  )
}

export function ArrowLeft({ className = '' }: GlyphProps) {
  return (
    <svg
      className={`glyph glyph--left ${className}`.trim()}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13.5 8h-11" />
      <path d="M6.5 4l-4 4 4 4" />
    </svg>
  )
}
