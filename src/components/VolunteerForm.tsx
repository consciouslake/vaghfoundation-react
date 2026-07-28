import { useDemoForm } from '../hooks/useDemoForm'

export function VolunteerForm() {
  const { sent, onSubmit } = useDemoForm()
  return (
    <form onSubmit={onSubmit}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="v-first">First name</label>
          <input id="v-first" type="text" required />
        </div>
        <div className="field">
          <label htmlFor="v-last">Last name</label>
          <input id="v-last" type="text" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="v-email">Email</label>
        <input id="v-email" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="v-phone">Phone (optional)</label>
        <input id="v-phone" type="tel" />
      </div>
      <div className="field">
        <label htmlFor="v-area">Where would you like to help?</label>
        <select id="v-area" defaultValue="">
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
        <textarea id="v-msg" />
      </div>
      <button
        type="submit"
        className="btn btn--primary"
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={sent}
      >
        {sent ? 'Thank you ✓' : 'Submit application'}
      </button>
      <p className="form-note">
        We&rsquo;ll only use your details to coordinate volunteering. No spam, ever.
      </p>
    </form>
  )
}
