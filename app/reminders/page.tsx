'use client'
import { useState } from 'react'
import { Bell, Trash2, Plus, CheckCircle } from 'lucide-react'

type ReminderType = 'academic' | 'event' | 'personal' | 'deadline'

interface Reminder {
  id: number
  title: string
  detail: string
  date: string
  time: string
  type: ReminderType
  done: boolean
}

const initialReminders: Reminder[] = [
  { id: 1, title: 'Assignment 1 Due', detail: 'CS1001 – Introduction to Programming', date: '2026-10-25', time: '23:59', type: 'deadline', done: false },
  { id: 2, title: 'Coding Hackathon Sign-Up Deadline', detail: 'Register at SU office before 5pm', date: '2026-10-12', time: '17:00', type: 'event', done: true },
  { id: 3, title: 'Study Group – Discrete Maths', detail: 'Room C302 with Niamh & Cormac', date: '2026-10-22', time: '14:00', type: 'academic', done: false },
  { id: 4, title: 'Library Books Due Back', detail: 'Avoid late fees – return by closing time', date: '2026-10-28', time: '21:00', type: 'personal', done: false },
  { id: 5, title: 'CA3 Design Report Draft', detail: 'Nature of Enterprise Computing – Group 33', date: '2026-11-01', time: '17:00', type: 'deadline', done: false },
]

const typeColors: Record<ReminderType, string> = {
  academic: 'badge-blue',
  event: 'badge-green',
  personal: 'badge-cyan',
  deadline: 'badge-red',
}

const typeLabels: Record<ReminderType, string> = {
  academic: 'Academic',
  event: 'Event',
  personal: 'Personal',
  deadline: 'Deadline',
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('active')
  const [form, setForm] = useState({ title: '', detail: '', date: '', time: '09:00', type: 'academic' as ReminderType })

  const filtered = reminders.filter(r => {
    if (filter === 'active') return !r.done
    if (filter === 'done') return r.done
    return true
  })

  function toggleDone(id: number) {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r))
  }

  function deleteReminder(id: number) {
    setReminders(prev => prev.filter(r => r.id !== id))
  }

  function addReminder(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.date) return
    const newR: Reminder = {
      id: Date.now(),
      ...form,
      done: false,
    }
    setReminders(prev => [...prev, newR])
    setForm({ title: '', detail: '', date: '', time: '09:00', type: 'academic' })
    setShowForm(false)
  }

  const active = reminders.filter(r => !r.done).length
  const today = new Date().toISOString().split('T')[0]
  const overdue = reminders.filter(r => !r.done && r.date < today).length

  return (
    <div className="fade-in">
      {/* Stats */}
      <div className="grid-2" style={{ marginBottom: '24px', maxWidth: '480px' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(255,214,10,0.15)', color: '#7a5c00' }}>
            <Bell size={22} aria-hidden="true" />
          </div>
          <div>
            <div className="stat-label">Active Reminders</div>
            <div className="stat-value">{active}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(239,35,60,0.1)', color: 'var(--tud-red)' }}>
            <Bell size={22} aria-hidden="true" />
          </div>
          <div>
            <div className="stat-label">Overdue</div>
            <div className="stat-value" style={{ color: overdue > 0 ? 'var(--tud-red)' : undefined }}>{overdue}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        {(['active', 'all', 'done'] as const).map(f => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <button
          className="btn btn-primary btn-sm"
          style={{ marginLeft: 'auto' }}
          onClick={() => setShowForm(!showForm)}
          aria-expanded={showForm}
        >
          <Plus size={15} aria-hidden="true" />
          {showForm ? 'Cancel' : 'Add Reminder'}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card card-padded fade-in" style={{ marginBottom: '24px', borderTop: '3px solid var(--tud-yellow)' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>New Reminder</h2>
          <form onSubmit={addReminder} noValidate>
            <div className="grid-2" style={{ marginBottom: '12px' }}>
              <div className="form-group">
                <label htmlFor="rem-title" className="form-label">Title <span aria-hidden="true" style={{ color: 'var(--tud-red)' }}>*</span></label>
                <input id="rem-title" className="input" type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Assignment due" aria-required="true" />
              </div>
              <div className="form-group">
                <label htmlFor="rem-type" className="form-label">Type</label>
                <select id="rem-type" className="select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as ReminderType })}>
                  {(Object.keys(typeLabels) as ReminderType[]).map(t => (
                    <option key={t} value={t}>{typeLabels[t]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label htmlFor="rem-detail" className="form-label">Detail</label>
              <input id="rem-detail" className="input" type="text" value={form.detail} onChange={e => setForm({ ...form, detail: e.target.value })} placeholder="Optional extra info" />
            </div>
            <div className="grid-2" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label htmlFor="rem-date" className="form-label">Date <span aria-hidden="true" style={{ color: 'var(--tud-red)' }}>*</span></label>
                <input id="rem-date" className="input" type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} aria-required="true" />
              </div>
              <div className="form-group">
                <label htmlFor="rem-time" className="form-label">Time</label>
                <input id="rem-time" className="input" type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!form.title || !form.date}>Save Reminder</button>
          </form>
        </div>
      )}

      {/* Reminders list */}
      <section aria-label="Reminders list">
        {filtered.length === 0 ? (
          <div className="empty-state card card-padded">
            <Bell size={36} />
            <h3>No reminders here</h3>
            <p>Add a reminder to get started.</p>
          </div>
        ) : (
          <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[...filtered].sort((a, b) => a.date.localeCompare(b.date)).map(rem => {
              const isOverdue = !rem.done && rem.date < today
              return (
                <li key={rem.id}>
                  <div
                    className="card card-padded"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      opacity: rem.done ? 0.55 : 1,
                      borderLeft: `4px solid ${isOverdue ? 'var(--tud-red)' : rem.done ? 'var(--tud-green)' : 'var(--tud-yellow)'}`,
                    }}
                  >
                    <button
                      className="btn btn-ghost btn-icon"
                      onClick={() => toggleDone(rem.id)}
                      aria-label={rem.done ? `Mark ${rem.title} as not done` : `Mark ${rem.title} as done`}
                      style={{ color: rem.done ? 'var(--tud-green)' : 'var(--text-muted)', flexShrink: 0 }}
                    >
                      <CheckCircle size={22} aria-hidden="true" />
                    </button>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: rem.done ? 400 : 700, fontSize: '14px', textDecoration: rem.done ? 'line-through' : 'none' }}>
                          {rem.title}
                        </span>
                        <span className={`badge ${typeColors[rem.type]}`}>{typeLabels[rem.type]}</span>
                        {isOverdue && <span className="badge badge-red">Overdue</span>}
                      </div>
                      {rem.detail && <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{rem.detail}</div>}
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {new Date(rem.date).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })} at {rem.time}
                      </div>
                    </div>
                    <button
                      className="btn btn-ghost btn-icon"
                      onClick={() => deleteReminder(rem.id)}
                      aria-label={`Delete reminder: ${rem.title}`}
                      style={{ color: 'var(--text-muted)', flexShrink: 0 }}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
