import { contact } from '../content/contact'
import { SEO } from '../components/SEO'
import { SectionHead } from '../components/SectionHead'
import { FAQAccordion } from '../components/FAQAccordion'
import { ContactRows } from '../components/ContactRows'
import { ContactForm } from '../components/ContactForm'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Vagh Foundation. Whether you want to volunteer, contribute, collaborate, or simply learn more about our work."
        path="/contact"
      />

      {/* Hero — a plain full-bleed colour strip, same as the About
          page's own: a heading and a subtitle on solid colour,
          nothing else. Teal — one of the home page's four pillar
          colours (amber/coral/blue/teal). */}
      <section className="page-header band band--teal">
        <div className="wrap">
          <h1>
            <Marked>{contact.header.h1Marked}</Marked>
          </h1>
          <p>
            <Marked>{contact.header.lede}</Marked>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            <Reveal>
              <span className="kicker">{contact.section.eyebrow}</span>
              <h2 className="contact-heading">
                <Marked>{contact.section.headingMarked}</Marked>
              </h2>
              <ContactRows items={contact.items} />
            </Reveal>
            <Reveal className="form-card form-card--teal" id="contact-form">
              <h3>Send us a message</h3>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
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
