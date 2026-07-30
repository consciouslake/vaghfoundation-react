import { Helmet } from 'react-helmet-async'
import { site } from '../content/site'

interface SEOProps {
  /** Page-specific title (rendered as "{title} — Vagh Foundation"). */
  title: string
  /** Page-specific meta description. */
  description: string
  /** Optional OpenGraph image path (defaults to logo). */
  image?: string
  /** Optional canonical path — defaults to the current location. */
  path?: string
}

const SITE_URL = 'https://vaghfoundation.org'

export function SEO({ title, description, image, path }: SEOProps) {
  const fullTitle = `${title} | ${site.brand}`
  const ogImage = image ?? site.logoLight
  const url = path ? `${SITE_URL}${path}` : SITE_URL
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={site.brand} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
