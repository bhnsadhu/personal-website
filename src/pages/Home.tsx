import { MetricBand } from '../components/MetricBand'
import { headlineStats } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import { ChefsTable } from '../sections/ChefsTable'
import { Hero } from '../sections/Hero'
import { Ingredients } from '../sections/Ingredients'
import { Mains } from '../sections/Mains'
import { Reservations } from '../sections/Reservations'
import { Sides } from '../sections/Sides'
import { Specials } from '../sections/Specials'
import { Starters } from '../sections/Starters'

export function Home() {
  useTitle()
  return (
    <main>
      <Hero />
      <MetricBand stats={headlineStats} label="Headline numbers" />
      <Starters />
      <Mains />
      <Sides />
      <Specials />
      <ChefsTable />
      <Ingredients />
      <Reservations />
    </main>
  )
}
