import { useCallback, useEffect, useRef, useState } from 'react'

const INTERVAL = 6000

interface UseCarouselResult {
  current: number
  playing: boolean
  next: () => void
  prev: () => void
  goTo: (i: number) => void
  play: () => void
  pause: () => void
  togglePlayPause: () => void
  /** Attach to the carousel root — pauses on hover/focus, resumes on leave/blur, handles keyboard arrows. */
  bind: {
    onMouseEnter: () => void
    onMouseLeave: () => void
    onFocus: () => void
    onBlur: () => void
    onKeyDown: (e: React.KeyboardEvent) => void
  }
}

/**
 * Carousel state machine. Auto-advances every 6s, pauses on
 * hover/focus/reduced-motion, exposes prev/next/goTo/togglePlayPause.
 * Does nothing (no timers, playing=false) if `count <= 1`.
 */
export function useCarousel(count: number): UseCarouselResult {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(count > 1)
  const timerRef = useRef<number | null>(null)
  const hoveredRef = useRef(false)
  const focusedRef = useRef(false)

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % count)
  }, [count])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + count) % count)
  }, [count])

  const goTo = useCallback(
    (i: number) => {
      setCurrent(((i % count) + count) % count)
    },
    [count],
  )

  const startTimer = useCallback(() => {
    clearTimer()
    if (count <= 1) return
    if (hoveredRef.current || focusedRef.current) return
    timerRef.current = window.setInterval(() => {
      setCurrent((c) => (c + 1) % count)
    }, INTERVAL)
  }, [count])

  const play = useCallback(() => {
    setPlaying(true)
  }, [])

  const pause = useCallback(() => {
    setPlaying(false)
  }, [])

  const togglePlayPause = useCallback(() => {
    setPlaying((p) => !p)
  }, [])

  // Manage the auto-advance timer whenever playing/count changes.
  useEffect(() => {
    if (count <= 1 || !playing) {
      clearTimer()
      return
    }
    // Honor reduced motion — leave the current slide visible.
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      clearTimer()
      return
    }
    startTimer()
    return clearTimer
  }, [playing, count, startTimer])

  const bind = {
    onMouseEnter: () => {
      hoveredRef.current = true
      clearTimer()
    },
    onMouseLeave: () => {
      hoveredRef.current = false
      if (playing) startTimer()
    },
    onFocus: () => {
      focusedRef.current = true
      clearTimer()
    },
    onBlur: () => {
      focusedRef.current = false
      if (playing) startTimer()
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPlaying(false)
        prev()
      } else if (e.key === 'ArrowRight') {
        setPlaying(false)
        next()
      }
    },
  }

  return { current, playing, next, prev, goTo, play, pause, togglePlayPause, bind }
}
