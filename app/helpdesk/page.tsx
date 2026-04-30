'use client'
import { useState } from 'react'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

type Status = 'open' | 'in-progress' | 'resolved'
type Priority = 'low' | 'medium' | 'high'

const existingTickets = [
  { id: 'TKT-001', category: 'IT Support', subject: 'Cannot access Moodle', description: 'I get a login error when trying to access Moodle since yesterday morning.', status: 'in-progress' as Status, priority: 'high' as Priority, created: '2026-10-14' },
  { id: 'TKT-002', category: 'Library', subject: 'Book reservation not showing', description: 'I reserved a book last week but it is not appearing in my account.', status: 'open' as Status, priority: 'medium' as Priority, created: '2026-10-16' },
  { id: 'TKT-003', category: 'Finance', subject: 'Grant payment query', description: 'My SUSI grant has not been reflected in my fees account.', status: 'resolved' as Status, priority: 'high' as Priority, created: '2026-10-10' },
  { id: 'TKT-004', category: 'Academic', subject: 'Timetable clash', description: 'My timetable shows two modules at the same time on Thursday.', status: 'open' as Status, priority: 'medium' as Priority, created: '2026-10-17' },
  { id: 'TKT-005', category: 'IT Support', subject: 'Wi-Fi access issue', description: 'The eduroam Wi-Fi keeps disconnecting in Block B.', status: 'in-progress' as Status, priority: 'low' as Priority, created: '2026-10-18' },
]

const statusConfig: Record<Status, { label: string; badge: string; icon: React.ReactNode }> = {
  'open': { label: 'Open', badge: 'badge-blue', icon: <AlertCircle size={14} aria-hidden="true" /> },
  'in-progress': { label: 'In Progress', badge: 'badge-orange', icon: <Clock size={14} aria-hidden="true" /> },
  'resolved': { label: 'Resolved', badge: 'badge-green', icon: <CheckCircle size={14} aria-hidden="true" /> },
}

const priorityConfig: Record<Priority, { label: string; badge: string }> = {
  high: { label: 'High', badge: 'badge-red' },
  medium: { label: 'Medium', badge: 'badge-yellow' },
  low: { label: 'Low', badge: 'badge-gray' },
}

const categories = ['IT Support', 'Library', 'Finance', 'Academic', 'Facilities', 'Student Services', 'Other']

type FormData = { name: string; number: string; email: string; category: string; subject: string; description: string; priority: Priority }
const emptyForm: FormData = { name: '', number: '', email: '', category: 'IT Support', subject: '', description: '', priority: 'medium' }

export default function HelpdeskPage() {
  const [tab, setTab] = useState<'new' | 'existing'>('new')
  const [tickets, setTickets] = useState(existingTickets)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  function validate(): boolean {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.number.trim()) e.number = 'Student number is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.description.trim()) e.description = 'Description is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const newTicket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      category: form.category,
      subject: form.subject.trim(),
      description: form.description.trim(),
      status: 'open' as Status,
      priority: form.priority,
      created: new Date().toISOString().split('T')[0],
    }

    setTickets(prev => [newTicket, ...prev])
    setSubmitted(true)
    setTab('existing')
    setForm(emptyForm)
    setErrors({})
  }

  const open = tickets.filter(t => t.status === 'open').length
  const inProgress = tickets.filter(t => t.status === 'in-progress').length
  const resolved = tickets.filter(t => t.status === 'resolved').length

  return (
    <div className="fade-in">
      {/* Stats row */}
      <div className="grid-3" style={{ marginBottom: '24px', maxWidth: '600px' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(0,80,200,0.08)', color: 'var(--tud-blue-mid)' }}><AlertCircle size={22} aria-hidden="true" /></div>
          <div><div className="stat-label">Open</div><div className="stat-value">{open}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(251,133,0,0.1)', color: 'var(--tud-orange)' }}><Clock size={22} aria-hidden="true" /></div>
          <div><div className="stat-label">In Progress</div><div className="stat-value">{inProgress}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6,214,160,0.1)', color: 'var(--tud-green)' }}><CheckCircle size={22} aria-hidden="true" /></div>
          <div><div className="stat-label">Resolved</div><div className="stat-value">{resolved}</div></div>
        </div>
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Helpdesk sections" style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '1px' }}>
        {(['new', 'existing'] as const).map(t => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            style={{
              padding: '10px 20px', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              background: 'none', border: 'none', color: tab === t ? 'var(--tud-blue)' : 'var(--text-muted)',
              borderBottom: tab === t ? '2px solid var(--tud-blue)' : '2px solid transparent',
              marginBottom: '-1px', transition: 'all 0.15s',
            }}
          >
            {t === 'new' ? '+ Raise a Ticket' : 'My Tickets'}
          </button>
        ))}
      </div>

      {tab === 'new' ? (
        <div role="tabpanel" aria-label="Raise a new ticket">
          {submitted && (
            <div className="alert alert-success" role="alert" aria-live="polite">
              <CheckCircle size={16} aria-hidden="true" />
              Your ticket has been added to the demo ticket list.
            </div>
          )}
          <div className="card card-padded" style={{ maxWidth: '640px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '20px' }}>Submit a Support Request</h2>
            <form onSubmit={handleSubmit} noValidate aria-label="Helpdesk ticket form">
              <div className="grid-2" style={{ marginBottom: '16px' }}>
                <div className="form-group">
                  <label htmlFor="hd-name" className="form-label">Full Name <span aria-hidden="true" style={{ color: 'var(--tud-red)' }}>*</span></label>
                  <input id="hd-name" className="input" type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} aria-required="true" aria-describedby={errors.name ? 'hd-name-err' : undefined} aria-invalid={!!errors.name} />
                  {errors.name && <span id="hd-name-err" className="form-hint" style={{ color: 'var(--tud-red)' }} role="alert">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="hd-num" className="form-label">Student Number <span aria-hidden="true" style={{ color: 'var(--tud-red)' }}>*</span></label>
                  <input id="hd-num" className="input" type="text" placeholder="C00XXXXXX" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} aria-required="true" aria-describedby={errors.number ? 'hd-num-err' : undefined} aria-invalid={!!errors.number} />
                  {errors.number && <span id="hd-num-err" className="form-hint" style={{ color: 'var(--tud-red)' }} role="alert">{errors.number}</span>}
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="hd-email" className="form-label">Email Address <span aria-hidden="true" style={{ color: 'var(--tud-red)' }}>*</span></label>
                <input id="hd-email" className="input" type="email" placeholder="you@student.tud.ie" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} aria-required="true" aria-describedby={errors.email ? 'hd-email-err' : undefined} aria-invalid={!!errors.email} />
                {errors.email && <span id="hd-email-err" className="form-hint" style={{ color: 'var(--tud-red)' }} role="alert">{errors.email}</span>}
              </div>
              <div className="grid-2" style={{ marginBottom: '16px' }}>
                <div className="form-group">
                  <label htmlFor="hd-cat" className="form-label">Category</label>
                  <select id="hd-cat" className="select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="hd-priority" className="form-label">Priority</label>
                  <select id="hd-priority" className="select" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as Priority })}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="hd-subject" className="form-label">Subject <span aria-hidden="true" style={{ color: 'var(--tud-red)' }}>*</span></label>
                <input id="hd-subject" className="input" type="text" placeholder="Brief description of the issue" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} aria-required="true" aria-describedby={errors.subject ? 'hd-sub-err' : undefined} aria-invalid={!!errors.subject} />
                {errors.subject && <span id="hd-sub-err" className="form-hint" style={{ color: 'var(--tud-red)' }} role="alert">{errors.subject}</span>}
              </div>
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label htmlFor="hd-desc" className="form-label">Full Description <span aria-hidden="true" style={{ color: 'var(--tud-red)' }}>*</span></label>
                <textarea id="hd-desc" className="textarea" placeholder="Describe the issue in detail, including any error messages or steps to reproduce." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} aria-required="true" aria-describedby={errors.description ? 'hd-desc-err' : undefined} aria-invalid={!!errors.description} />
                {errors.description && <span id="hd-desc-err" className="form-hint" style={{ color: 'var(--tud-red)' }} role="alert">{errors.description}</span>}
              </div>
              <button type="submit" className="btn btn-primary">Submit Ticket</button>
            </form>
          </div>
        </div>
      ) : (
        <div role="tabpanel" aria-label="My tickets">
          {submitted && (
            <div className="alert alert-success" role="alert" aria-live="polite">
              <CheckCircle size={16} aria-hidden="true" />
              Your ticket has been added to the demo ticket list.
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tickets.map(ticket => {
              const st = statusConfig[ticket.status]
              const pr = priorityConfig[ticket.priority]
              return (
                <article key={ticket.id} className="card card-padded" aria-label={`Ticket ${ticket.id}: ${ticket.subject}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{ticket.id}</span>
                      <span className={`badge ${st.badge}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {st.icon} {st.label}
                      </span>
                      <span className={`badge ${pr.badge}`}>{pr.label}</span>
                      <span className="badge badge-gray">{ticket.category}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {new Date(ticket.created).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>{ticket.subject}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{ticket.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
