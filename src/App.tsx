import type { RouteRecord } from 'vite-react-ssg'
import React from 'react'
import { Layout } from './layout/Layout'

const withLayout = (Comp: React.ComponentType) => (
  <Layout>
    <Comp />
  </Layout>
)

export const routes: RouteRecord[] = [
  {
    path: '/',
    lazy: async () => {
      const { default: Home } = await import('./pages/Home')
      return { element: withLayout(Home) }
    },
  },
  {
    path: '/about',
    lazy: async () => {
      const { default: About } = await import('./pages/About')
      return { element: withLayout(About) }
    },
  },
  {
    path: '/what-we-do',
    lazy: async () => {
      const { default: WhatWeDo } = await import('./pages/WhatWeDo')
      return { element: withLayout(WhatWeDo) }
    },
  },
  {
    path: '/get-involved',
    lazy: async () => {
      const { default: GetInvolved } = await import('./pages/GetInvolved')
      return { element: withLayout(GetInvolved) }
    },
  },
  {
    path: '/volunteer',
    lazy: async () => {
      const { default: Volunteer } = await import('./pages/Volunteer')
      return { element: withLayout(Volunteer) }
    },
  },
  {
    path: '/contact',
    lazy: async () => {
      const { default: Contact } = await import('./pages/Contact')
      return { element: withLayout(Contact) }
    },
  },
  {
    path: '/donate',
    lazy: async () => {
      const { default: Donate } = await import('./pages/Donate')
      return { element: withLayout(Donate) }
    },
  },
]
