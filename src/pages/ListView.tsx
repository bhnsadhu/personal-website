import type { ReactNode } from 'react'
import { ExperienceBack, HandBack, LeadershipBack, PersonalBack, PersonalExtras, ProjectBack } from '../components/Backs'
import { Certifications } from '../components/Certifications'
import { ContactBody } from '../components/ContactBody'
import { HeroPhoto } from '../components/HeroPhoto'
import { IndexGroup, IndexRow } from '../components/IndexList'
import { MetricBand } from '../components/MetricBand'
import { SectionTitle } from '../components/Section'
import { SplitText } from '../components/SplitText'
import { SuitGlyph } from '../components/Suit'
import {
  experience,
  faceSuitAt,
  FAN_RANKS,
  FLOP_RANKS,
  hand,
  HAND_SUITS,
  leadership,
  metrics,
  moreLabel,
  personal,
  personalIntro,
  projects,
  rankAt,
  sectionHeads,
  sectionNotes,
  site,
  skills,
  SPREAD_RANKS,
  type SectionKey,
  type Suit,
} from '../data'
import { Link } from '../lib/router'
import { SEP } from '../lib/sep'
import { useScrollSpy } from '../lib/useScrollSpy'
import { useTitle } from '../lib/useTitle'

/** The rail, in page order. Same sections, same order, as the card view. */
const RAIL: { k: SectionKey; suit: Suit }[] = [
  { k: 'spread', suit: 'spades' },
  { k: 'face', suit: 'spades' },
  { k: 'fan', suit: 'diamonds' },
  { k: 'chips', suit: 'clubs' },
  { k: 'flop', suit: 'hearts' },
  { k: 'contact', suit: 'hearts' },
]

/** The eyebrow's words without its leading suit glyph. */
function railLabel(k: SectionKey) {
  return sectionHeads[k].eyebrow.replace(/^\S+\s/, '')
}

/** A home-page anchor ("/#face") points at the same anchor in this view. */
function inList(to: string) {
  return to.startsWith('/#') ? `/list${to.slice(1)}` : to
}

function ListSection({ k, note, children }: { k: SectionKey; note?: string; children: ReactNode }) {
  return (
    <section id={k} className="section list__section" aria-labelledby={`l-${k}`} data-suit={sectionHeads[k].eyebrow.charAt(0)}>
      <header className="section__head reveal">
        <div>
          <p className="eyebrow">{sectionHeads[k].eyebrow}</p>
          <h2 id={`l-${k}`} className="section__title">
            <SectionTitle k={k} />
          </h2>
        </div>
        {note && <p className="section__note">{note}</p>}
      </header>
      {children}
    </section>
  )
}

/**
 * The card view laid flat. Same sections in the same order, the same words,
 * and every card kept as a row with its own rank and suit. A row opens to
 * the same back its card flips to.
 */
export function ListView() {
  useTitle('List view')
  const active = useScrollSpy(RAIL.map((r) => r.k))
  const flop = personal.slice(0, FLOP_RANKS.length)

  return (
    <main className="list">
      <section id="hand" className="hero" aria-labelledby="l-hand">
        <div className="container">
          <div className="hero__top">
            <div className="hero__head intro">
              <p className="eyebrow">
                Your hand{SEP}{site.schoolShort}{SEP}{site.major}{SEP}{site.focus}
              </p>
              <h1 id="l-hand" className="display hero__title">
                <SplitText text={site.name} />
              </h1>
              <p className="lede">{site.tagline}</p>
              <div className="actions">
                <Link to="/list#spread" className="btn">
                  Explore My Work
                </Link>
                <a className="btn btn--ghost" href={site.resume} target="_blank" rel="noreferrer">
                  View Resume
                  <span className="sr-only">(opens PDF in a new tab)</span>
                </a>
                <Link to="/list#contact" className="btn btn--ghost">
                  Contact Me
                </Link>
              </div>
              <p className="hero__seeking mono mono--sm">
                <span className="hero__seeking-lead">Seeking {site.seeking}</span> in{' '}
                <span className="hero__seeking-focus">{site.interests.lead}</span>, {site.interests.rest}
              </p>
            </div>
            <HeroPhoto />
          </div>

          <div className="list__hand">
            <IndexGroup ids={hand.map((h) => h.slug)} label="Top highlights">
              {hand.map((h, i) => (
                <IndexRow
                  key={h.slug}
                  id={h.slug}
                  rank="A"
                  suit={HAND_SUITS[i % HAND_SUITS.length]}
                  title={h.title}
                  subtitle={h.subtitle}
                  meta={h.meta}
                  corner={h.corner}
                  tags={h.tags}
                  more={h.more && { label: h.more.label, to: inList(h.more.to) }}
                >
                  <HandBack h={h} />
                </IndexRow>
              ))}
            </IndexGroup>
          </div>
        </div>
      </section>

      <MetricBand metrics={metrics} label="Headline numbers" note={`As of ${site.asOf}`} />

      <div className="container list__body">
        <nav className="list__rail" aria-label="Sections">
          <ol>
            {RAIL.map((r) => (
              <li key={r.k}>
                <Link
                  to={`/list#${r.k}`}
                  className={`list__rail-link ${active === r.k ? 'is-active' : ''}`.trim()}
                  aria-current={active === r.k ? 'location' : undefined}
                >
                  <SuitGlyph suit={r.suit} />
                  <span className="list__rail-label">{railLabel(r.k)}</span>
                  <span className="list__rail-title">
                    <SectionTitle k={r.k} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="list__main">
          <ListSection k="spread" note={sectionNotes.spread}>
            <IndexGroup ids={experience.map((e) => e.slug)} label="Work experience">
              {experience.map((e, i) => (
                <IndexRow
                  key={e.slug}
                  id={e.slug}
                  rank={rankAt(SPREAD_RANKS, i)}
                  suit="spades"
                  title={e.role}
                  subtitle={e.company}
                  meta={e.dates}
                  corner={e.location}
                  tags={e.tags}
                  more={{ label: moreLabel.experience, to: `/experience/${e.slug}` }}
                >
                  <ExperienceBack e={e} />
                </IndexRow>
              ))}
            </IndexGroup>
          </ListSection>

          <ListSection k="face" note={sectionNotes.face}>
            <IndexGroup ids={leadership.map((l) => l.slug)} label="Leadership roles">
              {leadership.map((l, i) => (
                <IndexRow
                  key={l.slug}
                  id={l.slug}
                  rank={l.face}
                  suit={faceSuitAt(i)}
                  title={l.role}
                  subtitle={l.organization}
                  meta={l.dates}
                  tags={l.tags}
                >
                  <LeadershipBack l={l} />
                </IndexRow>
              ))}
            </IndexGroup>
          </ListSection>

          <ListSection k="fan" note={sectionNotes.fan}>
            <IndexGroup ids={projects.map((p) => p.slug)} label="Projects">
              {projects.map((p, i) => {
                const down = p.status === 'idea'
                return (
                  <IndexRow
                    key={p.slug}
                    id={p.slug}
                    rank={rankAt(FAN_RANKS, i)}
                    suit="diamonds"
                    title={p.title}
                    subtitle={down ? undefined : p.subtitle}
                    meta={p.meta}
                    corner={down ? undefined : p.status === 'live' ? 'Live' : 'Shipped'}
                    tags={p.tags}
                    down={down}
                    more={down ? undefined : { label: moreLabel.project, to: `/projects/${p.slug}` }}
                  >
                    <ProjectBack p={p} />
                  </IndexRow>
                )
              })}
            </IndexGroup>
          </ListSection>

          <ListSection k="chips" note={sectionNotes.chips}>
            <ul className="list__skills">
              {skills.map((s) => (
                <li key={s.id} className="list__skill reveal">
                  <span className="list__skill-pip" aria-hidden="true">
                    <SuitGlyph suit="clubs" />
                  </span>
                  <span className="list__skill-label">{s.label}</span>
                  <span className="list__skill-count mono mono--sm">×{s.skills.length}</span>
                  <p className="list__skill-items">{s.skills.join(SEP)}</p>
                </li>
              ))}
            </ul>
            <Certifications />
          </ListSection>

          <ListSection k="flop" note={sectionNotes.flop}>
            <p className="lede list__intro">{personalIntro}</p>
            <IndexGroup ids={flop.map((c) => c.slug)} label="Personal interests">
              {flop.map((c, i) => (
                <IndexRow
                  key={c.slug}
                  id={c.slug}
                  rank={rankAt(FLOP_RANKS, i)}
                  suit="hearts"
                  title={c.title}
                  subtitle={c.subtitle}
                  meta={c.meta}
                  tags={c.tags}
                >
                  <PersonalBack c={c} />
                </IndexRow>
              ))}
            </IndexGroup>
            <PersonalExtras />
          </ListSection>

          <ListSection k="contact" note={site.availability}>
            <ContactBody />
          </ListSection>
        </div>
      </div>
    </main>
  )
}
