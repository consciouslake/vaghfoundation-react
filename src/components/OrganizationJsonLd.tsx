import { Helmet } from 'react-helmet-async'
import { site } from '../content/site'

const SITE_URL = 'https://vaghfoundation.org'

/**
 * Emits schema.org NGO JSON-LD so Google can surface Vagh Foundation
 * in the Knowledge Panel + rich results. Rendered once on the Home
 * page — Google treats the site's homepage as the canonical org root.
 */
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: site.brand,
    alternateName: 'Vagh Foundation',
    url: SITE_URL,
    logo: `${SITE_URL}${site.logoDark}`,
    description: site.footerTagline,
    email: site.contactEmail,
    telephone: site.contactPhone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'A-609, Siddhivinayak Tower, Makarba',
      addressLocality: 'Ahmedabad',
      postalCode: '380051',
      addressCountry: 'IN',
    },
    sameAs: site.socials
      .filter((s) => s.href && s.href !== '#')
      .map((s) => s.href),
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}
