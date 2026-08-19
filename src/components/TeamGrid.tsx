import { User } from 'lucide-react'
import type { TeamMember } from '../content/types'
import { Reveal } from './Reveal'

/** Cycles through the brand palette for placeholder-avatar cards. */
const TONES = ['amber', 'coral', 'teal', 'blue', 'green', 'plum'] as const

/**
 * Leadership / volunteer grid — square photo, name, role. A member
 * with no `photo` gets a coloured placeholder mark instead, so a
 * roster can be stood up before every headshot exists.
 */
export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="team-grid">
      {members.map((m, i) => (
        <Reveal key={m.name} className="team-card" index={i}>
          <div className="team-card__photo">
            {m.photo ? (
              <img src={m.photo} alt={m.name} />
            ) : (
              <span
                className={`team-card__placeholder team-card__placeholder--${TONES[i % TONES.length]}`}
                aria-hidden="true"
              >
                <User size={28} strokeWidth={1.6} />
              </span>
            )}
          </div>
          <div className="team-card__name">{m.name}</div>
          <div className="team-card__role">{m.role}</div>
        </Reveal>
      ))}
    </div>
  )
}
