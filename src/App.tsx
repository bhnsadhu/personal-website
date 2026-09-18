import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { ScrollTop } from './components/ScrollTop'
import { Router } from './lib/router'
import { ChefsTableList } from './pages/ChefsTableList'
import { Home } from './pages/Home'
import { MainDish } from './pages/MainDish'
import { NotFound } from './pages/NotFound'
import { SpecialDish } from './pages/SpecialDish'

const routes = [
  { path: '/', element: () => <Home /> },
  { path: '/mains/:slug', element: () => <MainDish /> },
  { path: '/specials/:slug', element: () => <SpecialDish /> },
  { path: '/chefs-table', element: () => <ChefsTableList /> },
  { path: '*', element: () => <NotFound /> },
]

export function App() {
  return (
    <>
      <Nav />
      <Router routes={routes} />
      <Footer />
      <ScrollTop />
    </>
  )
}
