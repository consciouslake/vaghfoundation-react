import { useCallback, useState, type FormEvent } from 'react'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

type FormState = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Submits a <form> to Web3Forms (https://web3forms.com) — a static-
 * site-friendly form backend, no server of our own required. Needs
 * VITE_WEB3FORMS_KEY set (see .env.example); every field with a
 * `name` attribute in the form is included automatically via
 * FormData, so new fields never need code changes here.
 */
export function useFormSubmit(onSuccess?: () => void) {
  const [state, setState] = useState<FormState>('idle')

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const form = e.currentTarget
      const data = new FormData(form)

      if (!import.meta.env.VITE_WEB3FORMS_KEY) {
        console.error(
          'VITE_WEB3FORMS_KEY is not set — see .env.example. Form submissions will fail until it is.',
        )
      }

      setState('sending')
      fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
        .then((res) => res.json())
        .then((json) => {
          if (!json.success) throw new Error(json.message ?? 'Submission failed')
          setState('sent')
          window.setTimeout(() => {
            setState('idle')
            form.reset()
            onSuccess?.()
          }, 3200)
        })
        .catch(() => setState('error'))
    },
    [onSuccess],
  )

  return { state, onSubmit, sending: state === 'sending', sent: state === 'sent', error: state === 'error' }
}
