import { contact } from '../content/contact'
import { PageHeader } from '../components/PageHeader'
import { SectionHead } from '../components/SectionHead'
import { FAQAccordion } from '../components/FAQAccordion'
import { ContactRows } from '../components/ContactRows'
import { ContactForm } from '../components/ContactForm'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'

export default function Contact() {
  return (
    <>
      <PageHeader data={contact.header} />

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            <Reveal>
              <span className="kicker">{contact.section.eyebrow}</span>
              <h2 style={{ marginBottom: '2rem', maxWidth: '12ch' }}>
                <Marked>{contact.section.headingMarked}</Marked>
              </h2>
              <ContactRows items={contact.items} />
            </Reveal>
            <Reveal className="form-card">
              <h3 style={{ marginBottom: '1.4rem' }}>Send us a message</h3>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap-r">
          <SectionHead eyebrow={contact.faq.eyebrow} heading={contact.faq.heading} />
          <Reveal>
            <FAQAccordion items={contact.faq.items} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
