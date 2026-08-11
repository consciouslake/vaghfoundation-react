import { Link } from 'react-router-dom'
import { site } from '../content/site'
import { SocialIcon } from '../components/SocialIcon'
import { ArrowRight } from '../components/ArrowRight'
import { Doodle } from '../components/Doodle'

const phoneTelHref = 'tel:' + site.contactPhone.replace(/[^0-9+]/g, '')

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img src={site.logoLight} alt={site.brand} className="f-logo" />
            <p className="f-tagline">{site.footerTagline}</p>
            <Link to="/donate" className="btn btn--donate footer-donate">
              Donate <ArrowRight />
            </Link>
            <div className="footer-social">
              {site.socials.map((s) => (
                <a key={s.icon} href={s.href} aria-label={s.label}>
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>{site.footerExploreHeading}</h4>
            <ul>
              {site.footerExplore.map((l) => (
                <li key={l.href}>
                  <Link to={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{site.footerActHeading}</h4>
            <ul>
              {site.footerAct.map((l) => (
                <li key={l.href}>
                  <Link to={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{site.footerContactHeading}</h4>
            <ul>
              <li>
                <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              </li>
              <li>
                <a href={phoneTelHref}>{site.contactPhone}</a>
              </li>
              <li className="f-address">{site.contactAddress}</li>
            </ul>
          </div>
        </div>

        <Doodle name="separator" className="footer-sep" />

        <div className="footer-base">
          <span>{site.footerCopyright}</span>
          <span>{site.footerSlogan}</span>
        </div>
      </div>
    </footer>
  )
}
