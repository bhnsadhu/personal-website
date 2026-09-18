import { Router } from './lib/router'
import { ChefsTable } from './pages/ChefsTable'
import { Landing } from './pages/Landing'
import { MainDish } from './pages/MainDish'
import { Menu } from './pages/Menu'
import { NotFound } from './pages/NotFound'
import { SideDish } from './pages/SideDish'
import { SpecialDish } from './pages/SpecialDish'
import { Starters } from './pages/Starters'

const routes = [
  { path: '/', element: () => <Landing /> },
  { path: '/menu', element: () => <Menu /> },
  { path: '/starters', element: () => <Starters /> },
  { path: '/mains/:slug', element: () => <MainDish /> },
  { path: '/sides/:slug', element: () => <SideDish /> },
  { path: '/specials/:slug', element: () => <SpecialDish /> },
  { path: '/chefs-table', element: () => <ChefsTable /> },
  { path: '*', element: () => <NotFound /> },
]

export function App() {
  return <Router routes={routes} />
}
