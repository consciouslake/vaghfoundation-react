import { useDemoForm } from '../hooks/useDemoForm'

export function ContactForm() {
  const { sent, onSubmit } = useDemoForm()
  return (
    <form onSubmit={onSubmit}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="c-name">Name</label>
          <input id="c-name" type="text" required />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" type="email" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-subject">Subject</label>
        <select id="c-subject" defaultValue="I'd like to volunteer">
          <option>I&rsquo;d like to volunteer</option>
          <option>I&rsquo;d like to donate or support</option>
          <option>Partnership or collaboration</option>
          <option>General enquiry</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-msg">Message</label>
        <textarea id="c-msg" required />
      </div>
      <button
        type="submit"
        className="btn btn--primary btn--block"
        disabled={sent}
      >
        {sent ? 'Thank you ✓' : 'Send message'}
      </button>
      <p className="form-note">We aim to respond to every message with care.</p>
    </form>
  )
}
