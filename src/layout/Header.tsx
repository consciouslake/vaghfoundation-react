import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { nav } from '../content/nav'
import { Brand } from '../components/Brand'
import { Doodle } from '../components/Doodle'
import { ScrollProgress } from '../components/ScrollProgress'
import { MegaMenu } from './MegaMenu'

export function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Brand />

          <nav aria-label="Primary navigation">
            <ul className="nav-links">
              {nav.primary.map((link) => (
                <li key={link.href} className={link.cta ? 'nav-links__cta' : undefined}>
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
                    {link.cta ? <Doodle name="heart" /> : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className={`nav-toggle${open ? ' open' : ''}`}
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

        {/* Flat four-colour rule carrying the palette across the header,
            with the reading-progress fill riding on top of it */}
        <div className="nav-stripe" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <ScrollProgress />
      </header>

      <MegaMenu open={open} onClose={() => setOpen(false)} returnFocusTo={toggleRef.current} />
    </>
  )
}
