import type { TimelineEntry } from '../content/types'
import { Marked } from './Marked'

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="timeline">
      {entries.map((e) => (
        <div key={e.title} className="timeline-item">
          <div className="timeline-year">{e.year}</div>
          <div className="timeline-title">{e.title}</div>
          <div className="timeline-body">
            <Marked>{e.body}</Marked>
          </div>
        </div>
      ))}
    </div>
  )
}
