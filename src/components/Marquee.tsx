/**
 * Scrolling ink band with rainbow edges. The list is rendered twice so
 * the translate loop is seamless, and it pauses when pointed at. It
 * restates headings that appear below, so it is hidden from assistive
 * tech rather than read out a second time.
 */
export function Marquee({ items }: { items: string[] }) {
  const run = (key: string) => (
    <span className="marquee__run" key={key}>
      {items.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
          <span className="marquee__star">✦</span>
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
