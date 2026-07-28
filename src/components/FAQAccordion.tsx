import { useRef, useState } from 'react'
import type { FAQItem } from '../content/types'
import { Marked } from './Marked'

function FAQEntry({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)
  const ansRef = useRef<HTMLDivElement | null>(null)
  const maxHeight = open && ansRef.current ? `${ansRef.current.scrollHeight}px` : '0'
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button
        type="button"
        className="faq-q"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.q}
        <span className="pm" />
      </button>
      <div ref={ansRef} className="faq-a" style={{ maxHeight }}>
        <p>
          <Marked>{item.a}</Marked>
        </p>
      </div>
    </div>
  )
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <FAQEntry key={item.q} item={item} />
      ))}
    </div>
  )
}
