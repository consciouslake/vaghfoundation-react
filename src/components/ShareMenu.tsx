import { useCallback, useEffect, useRef, useState } from 'react'
import { Mail, Link2, Check, Share2 } from 'lucide-react'

const SHARE_URL = 'https://www.vaghfoundation.org'
const SHARE_TEXT = 'Help us spread the word — Vagh Foundation is nurturing lives and nourishing communities with lasting care. Take a look:'

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.3 4.3c-2.2 0-3.71 1.34-3.71 3.8v2.34H8.03v2.96h2.56V21z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 3.5h3.4l4.1 5.6 4.7-5.6h2.1l-5.8 6.8 6.3 8.7h-3.4l-4.5-6.1-5.1 6.1H3.7l6.1-7.3z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.3A8.4 8.4 0 1 0 12 3.5zm0 1.6a6.8 6.8 0 0 1 5.7 10.5 6.8 6.8 0 0 1-9.9 1.8l-.3-.2-2.6.8.8-2.5-.2-.3A6.8 6.8 0 0 1 12 5.1zm-2.9 3.5c-.2 0-.4.1-.6.3-.2.2-.7.7-.7 1.7s.7 2 .8 2.1c.1.1 1.4 2.2 3.4 3 .5.2.9.3 1.2.4.5.2 1 .1 1.3-.1.4-.2.7-.9.8-1.2.1-.2 0-.4-.1-.5l-1.4-.9c-.2-.1-.3-.1-.5 0l-.5.7c-.1.1-.2.1-.4 0-.5-.2-1.3-.7-1.9-1.4-.5-.6-.8-1.2-.9-1.4-.1-.2 0-.3.1-.4l.4-.5c.1-.1.2-.3.1-.4l-.7-1.6c-.1-.3-.3-.3-.5-.3z" />
    </svg>
  )
}

interface ShareMenuProps {
  text?: string
}

/**
 * "Spread the word" needs an action, not a link to elsewhere — this
 * pops a small platform picker instead of navigating. Uses the Web
 * Share API where available (mobile mostly), otherwise a flat popover
 * with the platforms visitors actually use, plus copy-link.
 */
export function ShareMenu({ text = SHARE_TEXT }: ShareMenuProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  const toggle = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: 'Vagh Foundation', text, url: SHARE_URL }).catch(() => {})
      return
    }
    setOpen((o) => !o)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard unavailable — nothing more we can do here
    }
  }

  const links = [
    {
      label: 'Facebook',
      icon: <FacebookIcon />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`,
    },
    {
      label: 'WhatsApp',
      icon: <WhatsAppIcon />,
      href: `https://wa.me/?text=${encodeURIComponent(`${text} ${SHARE_URL}`)}`,
    },
    {
      label: 'X',
      icon: <XIcon />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(text)}`,
    },
    {
      label: 'Email',
      icon: <Mail size={18} strokeWidth={1.8} />,
      href: `mailto:?subject=${encodeURIComponent('Vagh Foundation')}&body=${encodeURIComponent(`${text} ${SHARE_URL}`)}`,
    },
  ]

  return (
    <div className="share-menu" ref={rootRef}>
      <button type="button" className="link" onClick={toggle} aria-haspopup="dialog" aria-expanded={open}>
        Share this page <Share2 size={16} strokeWidth={1.8} />
      </button>

      {open ? (
        <div className="share-menu__backdrop" onClick={close}>
          <div className="share-menu__popover" role="dialog" aria-label="Share this page" onClick={(e) => e.stopPropagation()}>
            <div className="share-menu__title">Share this page</div>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="share-menu__item"
                onClick={close}
              >
                <span className="share-menu__icon">{l.icon}</span>
                {l.label}
              </a>
            ))}
            <button type="button" className="share-menu__item" onClick={copyLink}>
              <span className="share-menu__icon">{copied ? <Check size={18} strokeWidth={2} /> : <Link2 size={18} strokeWidth={1.8} />}</span>
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
