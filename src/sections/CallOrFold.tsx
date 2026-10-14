import { ContactBody } from '../components/ContactBody'
import { Section } from '../components/Section'
import { site } from '../data'

/** Contact: let's talk. The body is shared with the list view. */
export function CallOrFold() {
  return (
    <Section id="contact" note={site.availability}>
      <ContactBody />
    </Section>
  )
}
