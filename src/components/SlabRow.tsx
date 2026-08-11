import type { ImpactItem } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

/**
 * Impact row — a skewed colour slab above each item, then a heavy
 * ordinal, a display heading and the body copy.
 *
 * The reference site puts a headline figure under each slab. This site
 * publishes no impact numbers, so the ordinal stands in rather than
 * inventing statistics for a charity.
 */
export function SlabRow({ items }: { items: ImpactItem[] }) {
  return (
    <div className="stat-row">
      {items.map((item, i) => (
        <Reveal key={item.title} className="stat" index={i}>
          <div className="stat__slab" aria-hidden="true" />
          <div className="stat__fig">0{i + 1}</div>
          <h3 className="stat__label">{item.title}</h3>
          <p className="stat__body">
            <Marked>{item.body}</Marked>
          </p>
        </Reveal>
      ))}
    </div>
  )
}
