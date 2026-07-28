import { useEffect, useRef } from 'react'

/**
 * Attaches the scroll-reveal behavior to any element via ref.
 * Adds the `in` class when the element scrolls into view; sets a
 * (index % 4) * 70ms transition delay for staggered entrance.
 *
 * Usage:
 *   const ref = useReveal(i)
 *   return <Link ref={ref} className="reveal pillar-card">...</Link>
 */
export function useReveal<T extends HTMLElement = HTMLElement>(index = 0) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${(index % 4) * 70}ms`
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [index])

  return ref
}
