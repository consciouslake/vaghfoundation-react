import type { PropsWithChildren } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileDonateFab } from './MobileDonateFab'

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <MobileDonateFab />
    </>
  )
}
