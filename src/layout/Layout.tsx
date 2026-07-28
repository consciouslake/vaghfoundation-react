import { Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileDonateFab } from './MobileDonateFab'
import { ScrollToTop } from './ScrollToTop'

/**
 * Root layout — rendered once and preserved across route changes. All
 * page content flows through <Outlet/>. HelmetProvider sits here so
 * per-page <SEO> blocks can update <head> without re-mounting the
 * provider on each navigation.
 */
export function Layout() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <MobileDonateFab />
    </HelmetProvider>
  )
}
