import type { RouteRecord } from 'vite-react-ssg'
import React from 'react'
import { Layout } from './layout/Layout'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/layout/Layout.tsx',
    children: [
      {
        index: true,
        Component: React.lazy(() => import('./pages/Home')),
      },
      {
        path: 'about',
        Component: React.lazy(() => import('./pages/About')),
      },
      {
        path: 'what-we-do',
        Component: React.lazy(() => import('./pages/WhatWeDo')),
      },
      {
        path: 'get-involved',
        Component: React.lazy(() => import('./pages/GetInvolved')),
      },
      {
        path: 'volunteer',
        Component: React.lazy(() => import('./pages/Volunteer')),
      },
      {
        path: 'contact',
        Component: React.lazy(() => import('./pages/Contact')),
      },
      {
        path: 'donate',
        Component: React.lazy(() => import('./pages/Donate')),
      },
    ],
  },
]
