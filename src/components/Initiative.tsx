import type { Initiative as InitiativeData } from '../content/types'
import { Marked } from './Marked'
import { useReveal } from '../hooks/useReveal'

interface InitiativeProps {
  data: InitiativeData
  index: number
}

/**
 * Alternating split block used on the What We Do page — image on the
 * left for odd items, right for even items.
 */
export function Initiative({ data, index }: InitiativeProps) {
  const flip = (index + 1) % 2 === 0
  const ref = useReveal<HTMLDivElement>(index)
  return (
    <div
      ref={ref}
      className="split reveal"
      style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', alignItems: 'center' }}
    >
      <div className={flip ? 'initiative-media-flip' : undefined}>
        <div className="split-image" style={{ aspectRatio: '5/4' }}>
          <img src={data.image} alt="" />
        </div>
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '0.12em',
            marginBottom: '0.8rem',
            textTransform: 'uppercase',
          }}
        >
          0{index + 1} · {data.label}
        </div>
        <h2 style={{ marginBottom: '1.2rem', maxWidth: '18ch' }}>{data.h3}</h2>
        <p style={{ color: 'var(--ink-2)', fontSize: '1.02rem', marginBottom: '1rem' }}>
          <Marked>{data.para1}</Marked>
        </p>
        {data.para2 ? (
          <p style={{ color: 'var(--ink-2)', fontSize: '1.02rem' }}>
            <Marked>{data.para2}</Marked>
          </p>
        ) : null}
      </div>
    </div>
  )
}
