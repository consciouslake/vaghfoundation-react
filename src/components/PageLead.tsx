import type { Src } from '../content/types'

interface PageLeadProps {
  image: Src
  /** Which corner carries the convex arch cut. */
  arch?: 'tr' | 'tl' | 'bl'
}

/**
 * Full-bleed lead image sitting directly under an inner page's colour
 * band, with a single asymmetric arch corner biting into the band above.
 */
export function PageLead({ image, arch = 'tr' }: PageLeadProps) {
  if (!image) return null
  return (
    <div className={`page-lead arch-${arch}`}>
      <img src={image} alt="" />
    </div>
  )
}
