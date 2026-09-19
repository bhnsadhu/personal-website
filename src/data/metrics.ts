import type { Metric } from './types'

/**
 * The thin stat strip. Separate, contextualized figures; never summed.
 * The "as of" date beside the band comes from site.asOf. Each figure is
 * the one already stated in experience.ts, projects.ts or leadership.ts,
 * so the wording stays as careful here: "potential" opportunities, and an
 * attendance figure that belongs to the events, not to one person.
 */
export const metrics: Metric[] = [
  { value: '12', label: 'Potential expansion opportunities for a Berkshire Hathaway affiliate' },
  { value: '~18', label: 'Active players testing Cambio' },
  { value: '750+', label: 'Contacts in an Ingenio Care outreach pipeline' },
  { value: '3,000+', label: 'Combined Diwali Night and India Night attendance' },
]
