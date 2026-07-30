import type { ValueItem } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

export function ValuesGrid({ items }: { items: ValueItem[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2.8rem 2.3rem',
        borderTop: '1px solid var(--line)',
        paddingTop: '2.8rem',
      }}
    >
      {items.map((v, i) => (
        <Reveal key={v.title} index={i}>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--accent)',
              letterSpacing: '0.1em',
              marginBottom: '0.8rem',
            }}
          >
            0{i + 1}
          </div>
          <h4 style={{ marginBottom: '0.5rem' }}>{v.title}</h4>
          <p style={{ color: 'var(--ink-2)', fontSize: '0.95rem' }}>
            <Marked>{v.body}</Marked>
          </p>
        </Reveal>
      ))}
    </div>
  )
}
