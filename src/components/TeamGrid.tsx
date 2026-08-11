import type { TeamMember } from '../content/types'
import { Reveal } from './Reveal'

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="team-grid">
      {members.map((m, i) => (
        <Reveal key={m.name} className="team-card" index={i}>
          <div className="team-card__photo">
            <img src={m.photo} alt={m.name} />
          </div>
          <div className="team-card__name">{m.name}</div>
          <div className="team-card__role">{m.role}</div>
        </Reveal>
      ))}
    </div>
  )
}
