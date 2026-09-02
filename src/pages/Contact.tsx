import { contact } from '../content/contact'
import { SEO } from '../components/SEO'
import { SectionHead } from '../components/SectionHead'
import { FAQAccordion } from '../components/FAQAccordion'
import { ContactRows } from '../components/ContactRows'
import { ContactForm } from '../components/ContactForm'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'
import { ArrowRight } from '../components/ArrowRight'

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Vagh Foundation. Whether you want to volunteer, contribute, collaborate, or simply learn more about our work."
        path="/contact"
      />

      {/* Hero — custom editorial layout matching reference */}
      <section className="contact-hero">
        <div className="contact-hero__grid wrap">
          <Reveal className="contact-hero__left">
            {contact.header.tag && (
              <span className="contact-hero__tag">{contact.header.tag}</span>
            )}
            <h1 className="contact-hero__title">
              <Marked>{contact.header.h1Marked}</Marked>
            </h1>
            <p className="contact-hero__lede">
              <Marked>{contact.header.lede}</Marked>
            </p>
            <div className="contact-hero__cta">
              <a href="#contact-form" className="btn btn--primary btn--pill">
                {contact.header.btnText || 'Send a message'} <ArrowRight />
              </a>
            </div>
          </Reveal>

          <Reveal className="contact-hero__right">
            <div className="contact-hero__card-wrap">
              <figure className="contact-hero__card">
                <div className="contact-hero__card-inner">
                  <div className="contact-hero__card-photo">
                    <img src={contact.header.image} alt="Contact Vagh Foundation" />
                  </div>
                </div>
              </figure>

              {/* Floating dark badge at bottom-left */}
              <div className="contact-hero__badge">
                <div className="contact-hero__badge-num">{contact.header.badgeNumber || 'Let’s talk'}</div>
              </div>
            </div>
          </Reveal>
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
