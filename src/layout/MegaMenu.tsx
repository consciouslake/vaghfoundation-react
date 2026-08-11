import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { nav } from '../content/nav'
import { Brand } from '../components/Brand'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { useEscapeKey } from '../hooks/useEscapeKey'

const FOCUSABLE = 'a, button, input, [tabindex]:not([tabindex="-1"])'

interface MegaMenuProps {
  open: boolean
  onClose: () => void
  /** Element to return focus to when the menu closes. */
  returnFocusTo?: HTMLElement | null
}

export function MegaMenu({ open, onClose, returnFocusTo }: MegaMenuProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLockBodyScroll(open)
  useEscapeKey(open, onClose)

  // Focus first link on open, restore focus on close.
  useEffect(() => {
    if (!open) return
    const first = rootRef.current?.querySelector<HTMLElement>('.mega-menu__links a')
    const timer = window.setTimeout(() => first?.focus(), 100)
    return () => {
      window.clearTimeout(timer)
      returnFocusTo?.focus()
    }
  }, [open, returnFocusTo])

  // Focus trap.
  useEffect(() => {
    if (!open) return
    const root = rootRef.current
    if (!root) return
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = root.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    root.addEventListener('keydown', handler)
    return () => root.removeEventListener('keydown', handler)
  }, [open])

  return (
    <div
      ref={rootRef}
      className={`mega-menu${open ? ' open' : ''}`}
      id="mega-menu"
      role="dialog"
      aria-label="Main menu"
      aria-modal="true"
    >
      <div className="mega-menu__header">
        <Brand onClick={onClose} />
        <button
          type="button"
          className="mega-menu__close"
          aria-label="Close menu"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mega-menu__body">
        <ul className="mega-menu__links">
          {nav.mega.map((link) => (
            <li key={link.href}>
              <Link to={link.href} onClick={onClose}>
                <span>
                  {link.label}
                  <span className="mm-desc">{link.desc}</span>
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mega-menu__footer">
        {nav.megaFooterLinks.map((l) =>
          l.href.startsWith('mailto:') || l.href.startsWith('tel:') ? (
            <a key={l.href} href={l.href} onClick={onClose}>
              {l.label}
            </a>
          ) : (
            <Link key={l.href} to={l.href} onClick={onClose}>
              {l.label}
            </Link>
          ),
        )}
      </div>
    </div>
  )
}
