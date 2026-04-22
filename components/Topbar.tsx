'use client'
import { usePathname } from 'next/navigation'
import { Sun, Moon } from 'lucide-react'
import { useA11y } from './AccessibilityWrapper'

const titles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Welcome back to Campus Companion' },
  '/timetable': { title: 'My Timetable', subtitle: 'Weekly class schedule' },
  '/events': { title: 'Events', subtitle: 'Campus events and society activities' },
  '/map': { title: 'Campus Map', subtitle: 'Find buildings, services and rooms' },
  '/canteen': { title: 'Canteen Menu', subtitle: "Today's food and drink options" },
  '/lost-found': { title: 'Lost & Found', subtitle: 'Report or find lost items' },
  '/helpdesk': { title: 'Helpdesk', subtitle: 'Raise a support ticket' },
  '/reminders': { title: 'Reminders', subtitle: 'Your personal campus reminders' },
  '/accessibility-settings': { title: 'Accessibility Settings', subtitle: 'Customise your experience' },
}

export default function Topbar() {
  const pathname = usePathname()
  const { settings, updateSetting } = useA11y()
  const page = titles[pathname] ?? { title: 'Campus Companion', subtitle: '' }

  return (
    <header className="topbar" role="banner">
      <div>
        <h1 className="topbar-title">{page.title}</h1>
        {page.subtitle && <p className="topbar-subtitle">{page.subtitle}</p>}
      </div>
      <div className="topbar-actions">
        <button
          className="btn btn-ghost btn-icon"
          onClick={() => updateSetting('theme', settings.theme === 'light' ? 'dark' : 'light')}
          aria-label={settings.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={settings.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {settings.theme === 'light'
            ? <Moon size={18} aria-hidden="true" />
            : <Sun size={18} aria-hidden="true" />
          }
        </button>
      </div>
    </header>
  )
}
