import { useCallback, useState, type FormEvent } from 'react'

/**
 * Client-only demo submit — matches the WP `data-demo` behavior: swap
 * submit-button text to "Thank you ✓", disable, reset the form after
 * 2.6s. No network request; forms are placeholders until wired up in
 * Phase 7.
 */
export function useDemoForm(onReset?: () => void) {
  const [state, setState] = useState<'idle' | 'sent'>('idle')

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const form = e.currentTarget
      setState('sent')
      window.setTimeout(() => {
        setState('idle')
        form.reset()
        onReset?.()
      }, 2600)
    },
    [onReset],
  )

  return { state, onSubmit, sent: state === 'sent' }
}
