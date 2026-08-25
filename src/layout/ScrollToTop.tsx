import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to the element named by a URL hash (or to the top when
 * there isn't one).
 *
 * Two race conditions to guard against:
 *  - The hash target may not exist yet on the frame this runs (e.g.
 *    it's rendered by a component still mounting). We poll for it
 *    with requestAnimationFrame rather than scrolling immediately.
 *  - Display fonts (Plus Jakarta Sans, Inter) load with font-display:
 *    swap, so headings above the target can still reflow after the
 *    element is found. We wait on document.fonts first so the layout
 *    we scroll against is the settled one.
 */
function scrollToHash(hash: string) {
  if (typeof window === 'undefined') return

  if (!hash) {
    window.scrollTo({ top: 0, behavior: 'auto' })
    return
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth'
  const id = hash.slice(1)

  const waitForFonts = 'fonts' in document ? document.fonts.ready : Promise.resolve()

  waitForFonts.then(() => {
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
        window.requestAnimationFrame(tryScroll)
      }
    }
    window.requestAnimationFrame(tryScroll)
  })
}

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  // Route changes — covers first load and navigating in from another page.
  useEffect(() => {
    scrollToHash(hash)
  }, [pathname, hash])

  // A click on a same-page hash link (e.g. clicking "Donate" again while
  // already on /donate#donate-form) doesn't change the location, so the
  // effect above never re-fires. Catch those directly: if the clicked
  // link's hash matches one already in the URL, re-run the scroll by hand.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      if (anchor.pathname !== window.location.pathname || !anchor.hash) return
      if (anchor.hash !== window.location.hash) return
      scrollToHash(anchor.hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
