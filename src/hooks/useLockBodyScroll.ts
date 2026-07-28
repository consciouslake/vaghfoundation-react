import { useEffect } from 'react'

/** Locks <body> scroll while `locked` is true. SSR-safe. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
