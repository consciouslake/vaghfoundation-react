import { useFormSubmit } from '../hooks/useFormSubmit'

export function ContactForm() {
  const { sending, sent, error, onSubmit } = useFormSubmit()
  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_KEY ?? ''} />
      <input type="hidden" name="subject" value="New message from the Vagh Foundation contact form" />
      <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className="field-row">
        <div className="field">
          <label htmlFor="c-name">Name</label>
          <input id="c-name" name="name" type="text" required />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-subject">Subject</label>
        <select id="c-subject" name="enquiry_type" defaultValue="I'd like to volunteer">
          <option>I&rsquo;d like to volunteer</option>
          <option>I&rsquo;d like to donate or support</option>
          <option>Partnership or collaboration</option>
          <option>General enquiry</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-msg">Message</label>
        <textarea id="c-msg" name="message" required />
      </div>
      <button
        type="submit"
        className="btn btn--primary btn--block"
        disabled={sending || sent}
      >
        {sent ? 'Thank you ✓' : sending ? 'Sending…' : 'Send message'}
      </button>
      {error ? (
        <p className="form-note form-note--error">
          Something went wrong sending that — please try again, or email us directly.
        </p>
      ) : (
        <p className="form-note">We aim to respond to every message with care.</p>
      )}
    </form>
  )
}
