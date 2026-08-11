import type { ValueItem } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

export function ValuesGrid({ items }: { items: ValueItem[] }) {
  return (
    <div className="values-grid">
      {items.map((v, i) => (
        <Reveal key={v.title} className="value-item" index={i}>
          <div className="value-item__num">0{i + 1}</div>
          <h4>{v.title}</h4>
          <p>
            <Marked>{v.body}</Marked>
          </p>
        </Reveal>
      ))}
    </div>
  )
}
