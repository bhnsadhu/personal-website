import type { Metric } from './types'

/**
 * The thin stat strip. Separate, contextualized figures; never summed.
 * The "as of" date beside the band comes from site.asOf.
 */
export const metrics: Metric[] = [
  { value: '~18', label: 'Active players testing Cambio' },
  { value: '750+', label: 'Contacts in an Ingenio Care outreach pipeline' },
  { value: '4+', label: 'UIUC colleges in the Replit research scope' },
  { value: '$500+', label: 'Raised through Ghungroo Dance Company fundraisers' },
]
