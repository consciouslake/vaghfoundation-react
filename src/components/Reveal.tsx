import { type PropsWithChildren, type ElementType } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  /** Element to render — defaults to a div. */
  as?: ElementType
  /** Optional extra classes on the wrapper. */
  className?: string
  /** Stagger index used for CSS transition-delay: (i % 4) * 70ms. */
  index?: number
}

/**
 * Convenience wrapper — renders a div (or any HTML element) with the
 * `reveal` class and hooks up the scroll-reveal behavior. For a
 * <Link>, <NavLink> or any non-HTML component, use the useReveal()
 * hook directly on the element ref.
 */
export function Reveal({
  as: Tag = 'div',
  className,
  index = 0,
  children,
}: PropsWithChildren<RevealProps>) {
  const ref = useReveal(index)
  const cls = className ? `reveal ${className}` : 'reveal'
  return (
    <Tag ref={ref} className={cls}>
      {children}
    </Tag>
  )
}
