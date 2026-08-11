import { Fragment, type ReactNode } from 'react'

/**
 * Renders a string that may contain inline <mark>...</mark> or
 * <em>...</em> tags. <mark> paints the yellow highlight behind a
 * phrase; <em> carries the email-signup title accents. Any other
 * markup passes through as plain text (no dangerouslySetInnerHTML).
 */
export function Marked({ children }: { children: string }) {
  const nodes: ReactNode[] = []
  const re = /<(mark|em)>([\s\S]*?)<\/\1>/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(children)) !== null) {
    if (m.index > last) nodes.push(children.slice(last, m.index))
    const tag = m[1]
    const inner = m[2]
    if (tag === 'mark') nodes.push(<mark key={nodes.length}>{inner}</mark>)
    else nodes.push(<em key={nodes.length}>{inner}</em>)
    last = m.index + m[0].length
  }
  if (last < children.length) nodes.push(children.slice(last))
  return (
    <>
      {nodes.map((n, i) => (
        <Fragment key={i}>{n}</Fragment>
      ))}
    </>
  )
}
