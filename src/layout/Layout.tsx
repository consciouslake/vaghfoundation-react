import type { PropsWithChildren } from 'react'

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <main id="main">{children}</main>
    </>
  )
}
