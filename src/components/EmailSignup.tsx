import { useState, type PropsWithChildren } from 'react'
import { Marked } from './Marked'

interface EmailSignupBaseProps {
  /** Title string with optional <em>...</em> for the italic emphasis. */
  titleWithEm: string
  body: string
}

/**
 * Dark section used at the bottom of most inner pages. Renders a title
 * with optional <em>, an intro paragraph, and either an email form
 * (subscribe pattern) or arbitrary children (typically buttons).
 */
export function EmailSignup({
  titleWithEm,
  body,
  children,
}: PropsWithChildren<EmailSignupBaseProps>) {
  return (
    <section className="email-signup">
      <h2 className="email-signup__title">
        <Marked>{titleWithEm}</Marked>
      </h2>
      <p
        style={{
          color: 'rgba(255,255,255,0.9)',
          maxWidth: '44ch',
          margin: '0 auto 1.6rem',
          fontSize: '0.98rem',
        }}
      >
        {body}
      </p>
      {children}
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
        setState('sent')
        window.setTimeout(() => {
          setState('idle')
          e.currentTarget?.reset?.()
        }, 2600)
      }}
    >
      <input type="email" placeholder="Your email address" aria-label="Email" required />
      <button type="submit" disabled={state === 'sent'}>
        {state === 'sent' ? 'Thank you ✓' : 'Subscribe'}
      </button>
    </form>
  )
}
