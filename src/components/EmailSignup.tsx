import { useState, type PropsWithChildren } from 'react'
import { Marked } from './Marked'
import { Doodle } from './Doodle'
import { ArrowRight } from './ArrowRight'
import type { Tone } from './PageHeader'

interface EmailSignupProps {
  /** Title string with optional <em>...</em> for the italic emphasis. */
  titleWithEm: string
  body: string
  tone?: Tone | 'dark'
}

/**
 * Closing band on most inner pages — a solid colour slab carrying a
 * display heading, a line of copy, and either the subscribe form or
 * arbitrary children (typically a pair of buttons).
 */
export function EmailSignup({
  titleWithEm,
  body,
  tone = 'amber',
  children,
}: PropsWithChildren<EmailSignupProps>) {
  return (
    <section className={`email-signup band band--${tone}`}>
      <div className="email-signup__inner">
        <div>
          <Doodle name="rays" className={tone === 'dark' ? 'doodle--light' : undefined} />
          <h2 className="email-signup__title">
            <Marked>{titleWithEm}</Marked>
          </h2>
          <p className="email-signup__body">{body}</p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

/** Actual subscribe form — used on the About page only. */
export function EmailSignupForm() {
  const [state, setState] = useState<'idle' | 'sent'>('idle')
  return (
    <form
      className="email-signup__form"
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.currentTarget
        setState('sent')
        window.setTimeout(() => {
          setState('idle')
          form.reset()
        }, 2600)
      }}
    >
      <input type="email" placeholder="Email" aria-label="Email address" required />
      <button type="submit" disabled={state === 'sent'}>
        {state === 'sent' ? 'Thank you ✓' : <>Sign Up <ArrowRight /></>}
      </button>
    </form>
  )
}
