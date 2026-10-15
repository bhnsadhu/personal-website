import type { Metric } from './types'

/**
 * The thin stat strip. Separate, contextualized figures; never summed.
 * Each figure is
 * the one already stated in experience.ts, projects.ts or leadership.ts,
 * so the wording stays as careful here: "potential" opportunities, and an
 * attendance figure that belongs to the events, not to one person.
 */
/**
 * What the Cambio figure shows before /api/cambio-players answers, and if it
 * never does. The live count replaces it everywhere it appears.
 */
export const CAMBIO_PLAYERS_FALLBACK = 24

export const metrics: Metric[] = [
  { value: '12', label: 'Potential expansion opportunities for a Berkshire Hathaway affiliate' },
  { value: String(CAMBIO_PLAYERS_FALLBACK), label: 'Players on Cambio, live and deployed', live: 'cambioPlayers' },
  { value: '750+', label: 'Contacts in an Ingenio Care outreach pipeline' },
  { value: '3,000+', label: 'Combined Diwali Night and India Night attendance' },
]
