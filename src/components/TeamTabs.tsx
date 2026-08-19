import { useState } from 'react'
import type { TeamTab } from '../content/types'
import { TeamGrid } from './TeamGrid'

interface TeamTabsProps {
  tabs: TeamTab[]
}

/**
 * A simple two-way toggle above the team grid — pick a tab, see that
 * group's people. Defaults to the first tab.
 */
export function TeamTabs({ tabs }: TeamTabsProps) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="team-tabs" role="tablist" aria-label="Team">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`team-tab${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <TeamGrid members={tabs[active].members} />
    </div>
  )
}
