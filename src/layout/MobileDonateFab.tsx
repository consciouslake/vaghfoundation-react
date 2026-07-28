import { Link, useLocation } from 'react-router-dom'

export function MobileDonateFab() {
  const { pathname } = useLocation()
  if (pathname === '/donate') return null
  return (
    <Link to="/donate" className="mobile-donate-fab" aria-label="Donate">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8Z" />
      </svg>
      Donate
    </Link>
  )
}
