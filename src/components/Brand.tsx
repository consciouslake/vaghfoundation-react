import { Link } from 'react-router-dom'
import { site } from '../content/site'

interface BrandProps {
  /** `light` swaps to the white mark for dark backgrounds. */
  variant?: 'dark' | 'light'
  onClick?: () => void
}

/**
 * Horizontal brand lockup — the VAGH mark with "Foundation" set beside
 * it, rather than the stacked logo. The aria-label carries the full
 * name, so the mark itself is decorative.
 */
export function Brand({ variant = 'dark', onClick }: BrandProps) {
  return (
    <Link
      to="/"
      className={`brand${variant === 'light' ? ' brand--light' : ''}`}
      aria-label={`${site.brand} home`}
      onClick={onClick}
    >
      <img
        src={variant === 'light' ? site.markLight : site.markDark}
        alt=""
        className="brand__mark"
      />
      <span className="brand__word">Foundation</span>
    </Link>
  )
}
