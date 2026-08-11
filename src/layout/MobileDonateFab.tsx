import { Link, useLocation } from 'react-router-dom'
import { Doodle } from '../components/Doodle'

export function MobileDonateFab() {
  const { pathname } = useLocation()
  if (pathname === '/donate') return null
  return (
    <Link to="/donate" className="mobile-donate-fab" aria-label="Donate">
      Donate
      <Doodle name="heart" />
    </Link>
  )
}
