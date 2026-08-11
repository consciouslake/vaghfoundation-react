/**
 * Scrolling dark band carrying the four causes. The list is rendered
 * twice so the translate loop is seamless; the whole thing is one
 * decorative restatement of content that already appears as headings
 * below, so it is hidden from assistive tech.
 */
export function Marquee({ items }: { items: string[] }) {
  const run = (key: string) => (
    <span className="marquee__run" key={key}>
      {items.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
          <svg viewBox="0 0 24 24" className="marquee__star" aria-hidden="true">
            <path
              d="M12 2.5l2.1 6.9 7.2.9-5.3 4.2 1.2 7.1-6.2-3.9-6.2 3.9 1.2-7.1L.7 10.3l7.2-.9z"
              fill="currentColor"
            />
          </svg>
        </span>
      ))}
    </span>
  )
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {run('a')}
        {run('b')}
      </div>
    </div>
  )
}
