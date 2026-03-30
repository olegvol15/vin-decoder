import { NavLink, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/variables">Variables</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
