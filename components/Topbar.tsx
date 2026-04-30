'use client'
import { usePathname } from 'next/navigation'
import { LogOut, Menu, Sun, Moon } from 'lucide-react'
import type { StudentProfile } from './AppShell'
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

export default function Topbar({
  onMenuClick,
  student,
  onLogout,
}: {
  onMenuClick: () => void
  student: StudentProfile
  onLogout: () => void
}) {
  const pathname = usePathname()
  const { settings, updateSetting } = useA11y()
  const page = titles[pathname] ?? { title: 'Campus Companion', subtitle: '' }

  return (
    <header className="topbar" role="banner">
      <div className="topbar-heading">
        <button
          className="btn btn-ghost btn-icon mobile-menu-btn"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-controls="main-sidebar"
        >
          <Menu size={18} aria-hidden="true" />
        </button>
        <div>
          <h1 className="topbar-title">{page.title}</h1>
          {page.subtitle && <p className="topbar-subtitle">{page.subtitle}</p>}
        </div>
      </div>
      <div className="topbar-actions">
        <div className="student-chip" title={`${student.full_name} · ${student.course}`}>
          <span>{student.full_name}</span>
          <small>{student.student_number}</small>
        </div>
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
        <button className="btn btn-ghost btn-icon" onClick={onLogout} aria-label="Log out" title="Log out">
          <LogOut size={18} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
