import { useCallback, useEffect, useRef, useState } from 'react'
import type { HomePage } from '../content/types'

interface VitruvianDialProps {
  dial: HomePage['hero']['dial']
  caption: string
}

const POSITIONS = ['top', 'right', 'bottom', 'left'] as const
const DWELL = 4000

/**
 * The hero construction: a square inscribed with a circle, the four
 * causes marked off at the cardinal points, a photograph held at the
 * centre.
 *
 * It is also a viewer. A compass arm sweeps round to whichever cause
 * is selected, the centre photograph and the ring take that cause's
 * image and colour, and the plate caption names it. It advances on its
 * own, and pointing at it or tabbing into it hands control over.
 *
 * `step` only ever increases so the arm always sweeps clockwise —
 * tracking the index alone would make it spin backwards from west to
 * north.
 */
export function VitruvianDial({ dial, caption }: VitruvianDialProps) {
  const count = dial.length
  const [step, setStep] = useState(0)
  const [held, setHeld] = useState(false)
  const active = ((step % count) + count) % count

  const go = useCallback(
    (target: number) => {
      // shortest forward distance, so a click never rewinds the arm
      setStep((s) => s + (((target - (s % count)) % count) + count) % count)
    },
    [count],
  )

  const reduced = useRef(false)
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (held || reduced.current || count < 2) return
    const id = window.setInterval(() => setStep((s) => s + 1), DWELL)
    return () => window.clearInterval(id)
  }, [held, count])

  const hold = { onMouseEnter: () => setHeld(true), onMouseLeave: () => setHeld(false) }

  return (
    <div
      className="vitruv"
      {...hold}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <span className="vitruv__square" aria-hidden="true" />
      <span className="vitruv__ring" aria-hidden="true" />

      {/* Graduations, like the rim of a protractor */}
      <svg className="vitruv__grads" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="92" fill="none" strokeWidth="5" strokeDasharray="0.6 8.2" />
      </svg>

      {/* The compass arm, swinging to the selected cause */}
      <span
        className={`vitruv__arm vitruv__arm--${dial[active].tone}`}
        style={{ rotate: `${(step - 1) * 90}deg` }}
        aria-hidden="true"
      />

      <div className={`vitruv__circle vitruv__circle--${dial[active].tone}`}>
        <div className="vitruv__photo">
          {dial.map((d, i) => (
            <img key={d.image} src={d.image} alt="" className={i === active ? 'is-on' : undefined} />
          ))}
        </div>
      </div>

      {dial.slice(0, 4).map((d, i) => (
        <button
          key={d.label}
          type="button"
          className={`vitruv__mark vitruv__mark--${POSITIONS[i]}${i === active ? ' is-active' : ''}`}
          aria-pressed={i === active}
          onClick={() => go(i)}
        >
          <span className={`vitruv__dot vitruv__dot--${d.tone}`} aria-hidden="true" />
          <span className="vitruv__tick" aria-hidden="true" />
          <span className="vitruv__label">{d.label}</span>
        </button>
      ))}

      <span className="vitruv__caption" aria-live="off">
        {held ? dial[active].title : caption}
      </span>
    </div>
  )
}
