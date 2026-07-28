import { useEffect, useRef, type PropsWithChildren, type ElementType } from 'react'

interface RevealProps {
  /** Element to render — defaults to a div. */
  as?: ElementType
  /** Optional extra classes on the wrapper. */
  className?: string
  /** Stagger index used for CSS transition-delay: (i % 4) * 70ms. */
  index?: number
}

/**
 * Wraps children in an element with the `reveal` class, then adds `in`
 * once the element scrolls into view. Falls back to `in` immediately if
 * IntersectionObserver is unavailable or the user prefers reduced
 * motion.
 */
export function Reveal({
  as: Tag = 'div',
  className,
  index = 0,
  children,
}: PropsWithChildren<RevealProps>) {
  const ref = useRef<HTMLElement | null>(null)

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

  const cls = className ? `reveal ${className}` : 'reveal'
  return (
    <Tag ref={ref} className={cls}>
      {children}
    </Tag>
  )
}
