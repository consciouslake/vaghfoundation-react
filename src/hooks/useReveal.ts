import { useRef } from 'react'

/**
 * Ref used by <Reveal> elements throughout the site. Elements render
 * fully visible immediately — this no longer hides/animates them in
 * on scroll (it used to, via an IntersectionObserver + a `reveal`
 * CSS class); kept as a hook so every call site didn't need touching
 * when that behavior was removed.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(_index = 0) {
  const ref = useRef<T | null>(null)
  return ref
}
