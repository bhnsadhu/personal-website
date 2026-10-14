import type { ReactNode } from 'react'
import { sectionHeads, type SectionKey } from '../data'

/** A section's title from `sectionHeads`, accent word in italics. Both views use it. */
export function SectionTitle({ k }: { k: SectionKey }) {
  const h = sectionHeads[k]
  return (
    <>
      {h.pre} <em>{h.em}</em>
    </>
  )
}

interface SectionProps {
  id: SectionKey
  note?: string
  children: ReactNode
  className?: string
}

export function Section({ id, note, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`.trim()} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="section__head reveal">
          <div>
            <p className="eyebrow">{sectionHeads[id].eyebrow}</p>
            <h2 id={`${id}-title`} className="section__title">
              <SectionTitle k={id} />
            </h2>
          </div>
          {note && <p className="section__note">{note}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
