import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Router } from './lib/router'
import { ExperienceDetail } from './pages/ExperienceDetail'
import { Home } from './pages/Home'
import { ListView } from './pages/ListView'
import { NotFound } from './pages/NotFound'
import { ProjectDetail } from './pages/ProjectDetail'

const routes = [
  { path: '/', element: () => <Home /> },
  { path: '/list', element: () => <ListView /> },
  { path: '/experience/:slug', element: () => <ExperienceDetail /> },
  { path: '/projects/:slug', element: () => <ProjectDetail /> },
  { path: '*', element: () => <NotFound /> },
]

export function App() {
  return (
    <>
      <Nav />
      <Router routes={routes} />
      <Footer />
    </>
  )
}
