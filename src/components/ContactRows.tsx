import type { ContactItem } from '../content/types'

export function ContactRows({ items }: { items: ContactItem[] }) {
  return (
    <>
      {items.map((i) => (
        <div key={i.label} className="contact-item">
          <div>
            <h4>{i.label}</h4>
            <p>
              {i.href ? (
                <a
                  href={i.href}
                  style={{ borderBottom: '1px solid var(--accent)', color: 'var(--ink)' }}
                >
                  {i.value}
                </a>
              ) : (
                i.value
              )}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}
