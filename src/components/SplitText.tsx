import { Fragment } from 'react'

/**
 * A headline that rises in letter by letter. The letters are decoration
 * (aria-hidden); the plain text beside them is what assistive tech reads.
 * Each word clips its own letters, so they come up from behind a line.
 */
export function SplitText({ text }: { text: string }) {
  let n = 0
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="split" aria-hidden="true">
        {text.split(' ').map((word, w) => (
          <Fragment key={w}>
            {w > 0 && ' '}
            <span className="split__word">
              {Array.from(word).map((ch, c) => (
                <span key={c} className="split__ch" style={{ ['--c' as string]: n++ }}>
                  {ch}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  )
}
