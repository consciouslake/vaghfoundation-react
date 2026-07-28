import type { ReactNode } from 'react'
import type { SocialLink } from '../content/types'

const paths: Record<SocialLink['icon'], ReactNode> = {
  twitter: (
    <path d="M22 5.9a8 8 0 01-2.4.7 4.2 4.2 0 001.8-2.3 8.4 8.4 0 01-2.6 1A4.1 4.1 0 0011.7 9a11.6 11.6 0 01-8.4-4.3 4.1 4.1 0 001.3 5.5A4 4 0 013 9.6v.1a4.1 4.1 0 003.3 4 4.1 4.1 0 01-1.8.1 4.1 4.1 0 003.8 2.8A8.2 8.2 0 012 18.3 11.6 11.6 0 008.3 20c7.5 0 11.7-6.3 11.7-11.7v-.5A8 8 0 0022 5.9z" />
  ),
  facebook: (
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
}

export function SocialIcon({ icon }: { icon: SocialLink['icon'] }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {paths[icon]}
    </svg>
  )
}
