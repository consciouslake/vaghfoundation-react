import { useState } from 'react'
import type { AboutPage } from '../content/types'
import { Marked } from './Marked'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

interface HistoryTimelineProps {
  data: AboutPage['timeline']
}

/** Cycles through the brand palette, one tone per era. */
const TONES = ['amber', 'coral', 'teal', 'blue', 'green'] as const

/**
 * An interactive year-by-year record — a row of coloured era tabs
 * (one per timeline entry) above a single detail panel that swaps to
 * match whichever tab is selected. Defaults to the earliest entry, so
 * the story opens at the beginning the way it happened.
 */
export function HistoryTimeline({ data }: HistoryTimelineProps) {
  const [active, setActive] = useState(0)
  const entry = data.entries[active]
  const tone = TONES[active % TONES.length]

  return (
    <section className="section--tight history">
      <div className="wrap">
        <SectionHead
          eyebrow={data.eyebrow}
          heading="Milestones along the way"
          headingMarked={data.headingMarked}
          intro={data.intro}
        />

        <div className="history__tabs" role="tablist" aria-label="Foundation timeline">
          {data.entries.map((e, i) => {
            const t = TONES[i % TONES.length]
            return (
              <button
                key={e.year + e.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`history__tab history__tab--${t}${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="history__tab-year">{e.year}</span>
                <span className="history__tab-title">{e.title}</span>
              </button>
            )
          })}
        </div>

        <Reveal key={active} className={`history__panel history__panel--${tone}`}>
          <span className="history__panel-year">{entry.year}</span>
          <h3 className="history__panel-title">{entry.title}</h3>
          <p className="history__panel-body">
            <Marked>{entry.body}</Marked>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
