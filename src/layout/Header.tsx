import { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav } from '../content/nav'
import { site } from '../content/site'
import { MegaMenu } from './MegaMenu'

export function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link to="/" className="brand" aria-label={`${site.brand} home`}>
            <img src={site.logoDark} alt={site.brand} />
          </Link>

          <nav aria-label="Primary navigation">
            <ul className="nav-links">
              {nav.primary.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    end={link.href === '/'}
                    className={({ isActive }) => {
                      const parts: string[] = []
                      if (link.cta) parts.push('nav-cta')
                      if (isActive) parts.push('active')
                      return parts.join(' ')
                    }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              ref={toggleRef}
              type="button"
              className="nav-toggle"
              aria-label="Menu"
              aria-expanded={open}
              aria-haspopup="true"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <MegaMenu open={open} onClose={() => setOpen(false)} returnFocusTo={toggleRef.current} />
    </>
  )
}
