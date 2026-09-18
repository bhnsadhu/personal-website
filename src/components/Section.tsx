import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  eyebrow: string
  title: ReactNode
  note?: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, note, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`.trim()} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="section__head">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`${id}-title`} className="section__title">
              {title}
            </h2>
          </div>
          {note && <p className="section__note">{note}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
