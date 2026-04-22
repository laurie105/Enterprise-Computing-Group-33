'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Calendar, Map, UtensilsCrossed,
  Search, HelpCircle, Settings, BookOpen, Bell
} from 'lucide-react'

const nav = [
  { section: 'Main', links: [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/timetable', label: 'Timetable', icon: BookOpen },
    { href: '/events', label: 'Events', icon: Calendar },
  ]},
  { section: 'Campus', links: [
    { href: '/map', label: 'Campus Map', icon: Map },
    { href: '/canteen', label: 'Canteen Menu', icon: UtensilsCrossed },
    { href: '/lost-found', label: 'Lost & Found', icon: Search },
  ]},
  { section: 'Support', links: [
    { href: '/helpdesk', label: 'Helpdesk', icon: HelpCircle },
    { href: '/reminders', label: 'Reminders', icon: Bell },
    { href: '/accessibility-settings', label: 'Accessibility', icon: Settings },
  ]},
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="sidebar" aria-label="Main navigation">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon" aria-hidden="true">CC</div>
        <div>
          <div className="sidebar-logo-text">Campus Companion</div>
          <div className="sidebar-logo-sub">TUD Tallaght</div>
        </div>
      </div>

      {/* Nav links */}
      <div className="sidebar-nav">
        {nav.map(section => (
          <div key={section.section}>
            <div className="sidebar-section-label" aria-hidden="true">{section.section}</div>
            <ul role="list" style={{ listStyle: 'none' }}>
              {section.links.map(link => {
                const Icon = link.icon
                const active = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`sidebar-link${active ? ' active' : ''}`}
                      aria-current={active ? 'page' : undefined}
                    >
                      <Icon aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
          Group 33 · Nature of Enterprise Computing
        </div>
      </div>
    </nav>
  )
}
