import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router'
import { ChefsTable } from './pages/ChefsTable'
import { Landing } from './pages/Landing'
import { MainDish } from './pages/MainDish'
import { Menu } from './pages/Menu'
import { NotFound } from './pages/NotFound'
import { SideDish } from './pages/SideDish'
import { SpecialDish } from './pages/SpecialDish'
import { Starters } from './pages/Starters'

function Root() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/menu', element: <Menu /> },
      { path: '/starters', element: <Starters /> },
      { path: '/mains/:slug', element: <MainDish /> },
      { path: '/sides/:slug', element: <SideDish /> },
      { path: '/specials/:slug', element: <SpecialDish /> },
      { path: '/chefs-table', element: <ChefsTable /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
