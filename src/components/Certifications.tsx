import { certifications } from '../data'
import { SEP } from '../lib/sep'

/** Certifications, beneath the chips in both views. */
export function Certifications() {
  return (
    <div className="certs" aria-labelledby="certs-title">
      <h3 id="certs-title" className="eyebrow">
        Certifications
      </h3>
      <ul className="certs__list">
        {certifications.map((c) => (
          <li key={c.url} className="cert">
            <span className="cert__name">{c.name}</span>
            <span className="cert__meta mono mono--sm">
              {c.issuer}{SEP}Issued {c.issued}
            </span>
            <a className="tlink" href={c.url} target="_blank" rel="noreferrer">
              View Credential
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
