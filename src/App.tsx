import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import WhatWeDo from './pages/WhatWeDo'
import GetInvolved from './pages/GetInvolved'
import Volunteer from './pages/Volunteer'
import Contact from './pages/Contact'
import Donate from './pages/Donate'

// Pages are imported directly (not React.lazy) — the whole site is a
// handful of small pages, so bundling them together avoids the extra
// network round-trip a lazy chunk would add when a visitor navigates
// between pages client-side.
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/layout/Layout.tsx',
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'what-we-do', Component: WhatWeDo },
      { path: 'get-involved', Component: GetInvolved },
      { path: 'volunteer', Component: Volunteer },
      { path: 'contact', Component: Contact },
      { path: 'donate', Component: Donate },
    ],
  },
]
