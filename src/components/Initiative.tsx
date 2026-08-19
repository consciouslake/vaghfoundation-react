import type { Initiative as InitiativeData } from '../content/types'
import { Marked } from './Marked'
import { useReveal } from '../hooks/useReveal'

interface InitiativeProps {
  data: InitiativeData
  index: number
  /** Anchor id — lets other pages deep-link to this section. */
  id?: string
}

/**
 * Alternating split block used on the What We Do page — arch-cornered
 * photo on the left for odd items, on the right for even ones. The
 * flip is desktop-only so mobile keeps each image above its own copy.
 */
export function Initiative({ data, index, id }: InitiativeProps) {
  const flip = (index + 1) % 2 === 0
  const ref = useReveal<HTMLDivElement>(index)
  return (
    <div
      ref={ref}
      id={id}
      className={`split reveal initiative${flip ? ' initiative--flip' : ''}`}
    >
      <div className="initiative__col-media">
        <div className="split-image initiative__media">
          <img src={data.image} alt="" />
        </div>
      </div>
      <div>
        <div className="initiative__label">
          0{index + 1} · {data.label}
        </div>
        <h2>{data.h3}</h2>
        <p>
          <Marked>{data.para1}</Marked>
        </p>
        {data.para2 ? (
          <p>
            <Marked>{data.para2}</Marked>
          </p>
        ) : null}
      </div>
    </div>
  )
}
