import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls the window to top on every route change. Skips the initial
 * mount (browser already positions correctly from the URL fragment or
 * saved scroll position).
 */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}
