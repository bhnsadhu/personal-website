import type { Metric } from './types'

/**
 * The thin stat strip. Separate, contextualized figures; never summed.
 * Each figure is the one already stated in experience.ts or projects.ts,
 * so the wording stays as careful here. The funding belongs to CatchBack
 * Cards, not to him: the label says whose it is and what his role is.
 */
/**
 * What the Cambio figure shows before /api/cambio-players answers, and if it
 * never does. The live count replaces it everywhere it appears.
 */
export const CAMBIO_PLAYERS_FALLBACK = 24

export const metrics: Metric[] = [
  { value: '24,642', label: 'Fragrances ScentLens can name from one bottle photo' },
  { value: '140+', label: 'Rounds played to the finish on Cambio' },
  { value: '8', label: "Feature areas redesigned from web to mobile for Ingenio Care's App Store launch" },
  { value: '$7.8M', label: 'Seed raised by CatchBack Cards (YC), where I lead a product team' },
]
