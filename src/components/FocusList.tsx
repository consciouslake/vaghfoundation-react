import { Link } from 'react-router-dom'
import type { FocusItem } from '../content/types'
import { Marked } from './Marked'
import { useReveal } from '../hooks/useReveal'
import { ArrowRight } from './ArrowRight'

interface FocusRowContentProps {
  item: FocusItem
  index: number
  hasCta: boolean
}

function FocusRowInner({ item, index, hasCta }: FocusRowContentProps) {
  return (
    <>
      <div className="focus-num">0{index + 1}</div>
      <div className="focus-content">
        <h3>{item.title}</h3>
        <p>
          <Marked>{item.body}</Marked>
        </p>
      </div>
      {hasCta ? (
        <span className="focus-arrow">
          {item.btnText} <ArrowRight />
        </span>
      ) : (
        <span />
      )}
    </>
  )
}

function FocusRowLink({ item, index }: { item: FocusItem; index: number }) {
  const ref = useReveal<HTMLAnchorElement>(index)
  return (
    <Link ref={ref} to={item.btnHref!} className="focus-item reveal">
      <FocusRowInner item={item} index={index} hasCta />
    </Link>
  )
}

function FocusRowStatic({ item, index }: { item: FocusItem; index: number }) {
  const ref = useReveal<HTMLDivElement>(index)
  return (
    <div ref={ref} className="focus-item reveal">
      <FocusRowInner item={item} index={index} hasCta={false} />
    </div>
  )
}

export function FocusList({ items }: { items: FocusItem[] }) {
  return (
    <div className="focus-list">
      {items.map((item, i) =>
        item.btnText && item.btnHref ? (
          <FocusRowLink key={item.title} item={item} index={i} />
        ) : (
          <FocusRowStatic key={item.title} item={item} index={i} />
        ),
      )}
    </div>
  )
}
