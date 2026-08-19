import { Link } from 'react-router-dom'
import { Soup, HeartHandshake, BookOpen, Sprout, type LucideIcon } from 'lucide-react'
import { CAUSE_SLUGS } from '../content/causes'

const ICONS: LucideIcon[] = [Soup, HeartHandshake, BookOpen, Sprout]

interface CauseBandProps {
  items: string[]
  href: string
}

/**
 * Full-bleed band split into one panel per cause. Panels sit equal at
 * rest and the one you point at takes room from the others, so the
 * band reads as four parts of a single whole rather than a list.
 *
 * Each panel deep-links to its own section on What We Do — items and
 * CAUSE_SLUGS are authored in the same order, so they line up by index.
 *
 * Keyboard and touch users get the same thing: the panels are links,
 * and :focus-within expands them exactly as hover does.
 */
export function CauseBand({ items, href }: CauseBandProps) {
  return (
    <nav className="causeband" aria-label="What we do">
      {items.map((label, i) => {
        const Icon = ICONS[i % ICONS.length]
        const to = CAUSE_SLUGS[i] ? `${href}#${CAUSE_SLUGS[i]}` : href
        return (
          <Link key={label} to={to} className="causeband__panel">
            <Icon className="causeband__icon" size={26} strokeWidth={1.7} aria-hidden="true" />
            <span className="causeband__label">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
