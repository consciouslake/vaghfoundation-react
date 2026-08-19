import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls on every route change: to the top by default, or to the
 * element named by the URL's hash when one is present.
 *
 * Two race conditions to guard against:
 *  - The hash target may not exist yet on the frame this effect runs
 *    (e.g. it's rendered by a component still mounting). We poll for
 *    it with requestAnimationFrame rather than scrolling immediately.
 *  - Display fonts (Plus Jakarta Sans, Inter) load with font-display:
 *    swap, so headings above the target can still reflow after the
 *    element is found. We wait on document.fonts first so the layout
 *    we scroll against is the settled one.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth'
    const id = hash.slice(1)

    let raf = 0
    let cancelled = false

    const waitForFonts = 'fonts' in document ? document.fonts.ready : Promise.resolve()

    waitForFonts.then(() => {
      if (cancelled) return
      let attempts = 0
      const MAX_ATTEMPTS = 60 // ~1s at 60fps — generous for the target to mount
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior, block: 'start' })
          return
        }
        attempts += 1
        if (attempts < MAX_ATTEMPTS) {
          raf = window.requestAnimationFrame(tryScroll)
        }
      }
      raf = window.requestAnimationFrame(tryScroll)
    })

    return () => {
      cancelled = true
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [pathname, hash])

  return null
}
