import { useFormSubmit } from '../hooks/useFormSubmit'

export function VolunteerForm() {
  const { sending, sent, error, onSubmit } = useFormSubmit()
  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_KEY ?? ''} />
      <input type="hidden" name="subject" value="New volunteer application — Vagh Foundation" />
      <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className="field-row">
        <div className="field">
          <label htmlFor="v-first">First name</label>
          <input id="v-first" name="first_name" type="text" required />
        </div>
        <div className="field">
          <label htmlFor="v-last">Last name</label>
          <input id="v-last" name="last_name" type="text" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="v-email">Email</label>
        <input id="v-email" name="email" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="v-phone">Phone (optional)</label>
        <input id="v-phone" name="phone" type="tel" />
      </div>
      <div className="field">
        <label htmlFor="v-area">Where would you like to help?</label>
        <select id="v-area" name="area" defaultValue="">
          <option value="" disabled>Choose an area</option>
          <option>On-ground support</option>
          <option>Resource coordination</option>
          <option>Awareness &amp; outreach</option>
          <option>Skill-based volunteering</option>
          <option>Wherever I&rsquo;m needed most</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="v-msg">Anything you&rsquo;d like to share? (optional)</label>
        <textarea id="v-msg" name="message" />
      </div>
      <button
        type="submit"
        className="btn btn--primary btn--block"
        disabled={sending || sent}
      >
        {sent ? 'Thank you ✓' : sending ? 'Sending…' : 'Submit application'}
      </button>
      {error ? (
        <p className="form-note form-note--error">
          Something went wrong sending that — please try again, or email us directly.
        </p>
      ) : (
        <p className="form-note">
          We&rsquo;ll only use your details to coordinate volunteering. No spam, ever.
        </p>
      )}
    </form>
  )
}
