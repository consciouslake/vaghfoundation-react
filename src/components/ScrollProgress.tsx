import { useEffect, useRef } from 'react'

/**
 * Reading-progress hairline across the top of the page. Written
 * straight to the element's transform on rAF so it never triggers a
 * React render per scroll frame.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      el.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div ref={ref} className="scroll-progress" style={{ transform: 'scaleX(0)' }} aria-hidden="true" />
}
