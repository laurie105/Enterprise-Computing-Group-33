import Link from 'next/link'
import { BookOpen, Calendar, Map, UtensilsCrossed, Search, HelpCircle, Bell, Settings } from 'lucide-react'

// Fictional today summary data (no real data used)
const quickStats = [
  { label: "Today's Classes", value: '3', sub: 'Mon 9am–4pm', color: '#003087', bg: 'rgba(0,48,135,0.08)', icon: BookOpen },
  { label: 'Upcoming Events', value: '5', sub: 'This week', color: '#06d6a0', bg: 'rgba(6,214,160,0.1)', icon: Calendar },
  { label: 'Open Tickets', value: '2', sub: 'Awaiting response', color: '#fb8500', bg: 'rgba(251,133,0,0.1)', icon: HelpCircle },
  { label: 'Lost Items', value: '6', sub: 'Awaiting claim', color: '#00b4d8', bg: 'rgba(0,180,216,0.1)', icon: Search },
]

const quickLinks = [
  { href: '/timetable', label: 'Timetable', desc: 'View your weekly schedule', icon: BookOpen, color: '#003087' },
  { href: '/events', label: 'Events', desc: 'Discover campus activities', icon: Calendar, color: '#06d6a0' },
  { href: '/map', label: 'Campus Map', desc: 'Find rooms and services', icon: Map, color: '#0050c8' },
  { href: '/canteen', label: 'Canteen', desc: "See today's menu", icon: UtensilsCrossed, color: '#fb8500' },
  { href: '/lost-found', label: 'Lost & Found', desc: 'Report or search items', icon: Search, color: '#00b4d8' },
  { href: '/helpdesk', label: 'Helpdesk', desc: 'Raise a support ticket', icon: HelpCircle, color: '#ef233c' },
  { href: '/reminders', label: 'Reminders', desc: 'Manage your alerts', icon: Bell, color: '#ffd60a' },
  { href: '/accessibility-settings', label: 'Accessibility', desc: 'Customise your experience', icon: Settings, color: '#8b93a7' },
]

const todaysClasses = [
  { time: '09:00–11:00', module: 'Introduction to Programming', room: 'B201', type: 'Lecture' },
  { time: '13:00–15:00', module: 'Computer Architecture', room: 'A104', type: 'Lecture' },
  { time: '15:00–16:00', module: 'Discrete Mathematics (Tutorial)', room: 'C302', type: 'Tutorial' },
]

const upcomingEvents = [
  { date: 'Mon 15 Oct', title: 'Coding Hackathon 2025', location: 'Computer Lab Block B', category: 'Society' },
  { date: 'Mon 20 Oct', title: 'Mental Health Awareness Seminar', location: 'Lecture Hall C1', category: 'Wellbeing' },
  { date: 'Mon 3 Nov', title: 'Campus Art Exhibition', location: 'Atrium, Block D', category: 'Culture' },
]

export default function DashboardPage() {
  return (
    <div className="fade-in">
      {/* Welcome banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--tud-blue) 0%, var(--tud-blue-mid) 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 32px',
        color: 'white',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} aria-hidden="true" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '13px', opacity: 0.75, marginBottom: '6px', fontWeight: 500 }}>Good morning 👋</p>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>Welcome to Campus Companion</h2>
          <p style={{ opacity: 0.8, fontSize: '14px', maxWidth: '480px' }}>
            Your one-stop portal for all TUD Tallaght campus services — timetables, events, canteen, and more.
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Quick statistics</h2>
        <div className="grid-4" style={{ marginBottom: '24px' }}>
          {quickStats.map(stat => {
            const Icon = stat.icon
            return (
              <div className="stat-card" key={stat.label}>
                <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>
                  <Icon size={22} aria-hidden="true" />
                </div>
                <div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="stat-sub">{stat.sub}</div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Quick links grid */}
      <section aria-labelledby="quicklinks-heading" style={{ marginBottom: '28px' }}>
        <h2 id="quicklinks-heading" className="section-heading">Quick Access</h2>
        <div className="grid-4">
          {quickLinks.map(link => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="card card-padded"
                style={{ display: 'flex', alignItems: 'center', gap: '14px', transition: 'all 0.15s', textDecoration: 'none' }}
                aria-label={`${link.label}: ${link.desc}`}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', flexShrink: 0,
                  background: `color-mix(in srgb, ${link.color} 10%, transparent)`,
                  color: link.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>{link.label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{link.desc}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Two columns: today's classes + upcoming events */}
      <div className="grid-2">
        {/* Today's classes */}
        <section aria-labelledby="today-heading">
          <h2 id="today-heading" className="section-heading">
            <BookOpen size={20} aria-hidden="true" />
            Today's Classes
          </h2>
          <div className="card">
            {todaysClasses.map((cls, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 18px',
                borderBottom: i < todaysClasses.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ width: '80px', flexShrink: 0 }}>
                  <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--tud-blue)', fontWeight: 600 }}>{cls.time.split('–')[0]}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>–{cls.time.split('–')[1]}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{cls.module}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Room {cls.room}</div>
                </div>
                <span className={`badge ${cls.type === 'Tutorial' ? 'badge-cyan' : 'badge-blue'}`}>{cls.type}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming events */}
        <section aria-labelledby="events-heading">
          <h2 id="events-heading" className="section-heading">
            <Calendar size={20} aria-hidden="true" />
            Upcoming Events
          </h2>
          <div className="card">
            {upcomingEvents.map((evt, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 18px',
                borderBottom: i < upcomingEvents.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  background: 'color-mix(in srgb, var(--tud-green) 12%, transparent)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 10px',
                  textAlign: 'center',
                  flexShrink: 0,
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#005040',
                  minWidth: '72px',
                }}>
                  {evt.date}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{evt.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{evt.location}</div>
                </div>
                <span className="badge badge-gray">{evt.category}</span>
              </div>
            ))}
            <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)' }}>
              <Link href="/events" className="btn btn-ghost btn-sm" style={{ fontSize: '13px' }}>
                View all events →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
