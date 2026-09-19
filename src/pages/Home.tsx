import { MetricBand } from '../components/MetricBand'
import { metrics, site } from '../data'
import { useTitle } from '../lib/useTitle'
import { CallOrFold } from '../sections/CallOrFold'
import { ChipsSection } from '../sections/ChipsSection'
import { FaceCards } from '../sections/FaceCards'
import { Fan } from '../sections/Fan'
import { Flop } from '../sections/Flop'
import { Hand } from '../sections/Hand'
import { Spread } from '../sections/Spread'

export function Home() {
  useTitle()
  return (
    <main>
      <Hand />
      <MetricBand metrics={metrics} label="Headline numbers" note={`As of ${site.asOf}`} />
      <Spread />
      <FaceCards />
      <Fan />
      <ChipsSection />
      <Flop />
      <CallOrFold />
    </main>
  )
}
