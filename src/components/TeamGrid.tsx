import type { TeamMember } from '../content/types'
import { Reveal } from './Reveal'

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2.8rem 2rem',
      }}
    >
      {members.map((m, i) => (
        <Reveal key={m.name} index={i}>
          <div
            style={{
              aspectRatio: '4/5',
              background: 'var(--paper-2)',
              overflow: 'hidden',
              marginBottom: '1rem',
              borderRadius: 'var(--gate-arch)',
            }}
          >
            <img
              src={m.photo}
              alt={m.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: '1.1rem',
            }}
          >
            {m.name}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              color: 'var(--ink-3)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginTop: '0.25rem',
            }}
          >
            {m.role}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
