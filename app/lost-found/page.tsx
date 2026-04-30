'use client'
import { useState } from 'react'
import { Search, Package, CheckCircle, Clock } from 'lucide-react'

type LostItem = {
  id: number
  name: string
  description: string
  dateReported: string
  location: string
  status: 'unclaimed' | 'claimed'
}

const initialItems: LostItem[] = [
  { id: 1, name: 'Black Laptop Bag', description: 'Black Nike laptop bag with a yellow keyring. Contains charger.', dateReported: '2026-10-14', location: 'Library, 2nd Floor', status: 'unclaimed' },
  { id: 2, name: 'Student ID Card', description: 'TUD student card for a student in the Computing faculty.', dateReported: '2026-10-16', location: 'Canteen', status: 'unclaimed' },
  { id: 3, name: 'Blue Water Bottle', description: 'Hydroflask blue water bottle with stickers on it.', dateReported: '2026-10-18', location: 'Sports Hall', status: 'claimed' },
  { id: 4, name: 'Glasses Case', description: 'Brown leather glasses case, empty.', dateReported: '2026-10-20', location: 'Block A Corridor', status: 'unclaimed' },
  { id: 5, name: 'Scientific Calculator', description: 'Casio fx-85GT, name written inside lid.', dateReported: '2026-10-21', location: 'Maths Lecture Hall C3', status: 'unclaimed' },
  { id: 6, name: 'Umbrella', description: 'Black folding umbrella.', dateReported: '2026-10-22', location: 'Main Reception', status: 'unclaimed' },
  { id: 7, name: 'Airpods Case', description: 'White AirPods case, no earbuds inside.', dateReported: '2026-10-23', location: 'Library Ground Floor', status: 'unclaimed' },
  { id: 8, name: 'Green Hoodie', description: 'Green college hoodie, size M.', dateReported: '2026-10-24', location: 'Gym Changing Room', status: 'claimed' },
]

type FormState = { name: string; description: string; location: string; email: string }

export default function LostFoundPage() {
  const [items, setItems] = useState<LostItem[]>(initialItems)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'unclaimed' | 'claimed'>('all')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<FormState>({ name: '', description: '', location: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  const filtered = items.filter(item => {
    const matchSearch = search === '' ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || item.status === statusFilter
    return matchSearch && matchStatus
  })

  const unclaimed = items.filter(i => i.status === 'unclaimed').length

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.location.trim() || !form.email.trim()) return

    const today = new Date().toISOString().split('T')[0]
    const newItem: LostItem = {
      id: Date.now(),
      name: form.name.trim(),
      description: form.description.trim() || 'No description provided.',
      dateReported: today,
      location: form.location.trim(),
      status: 'unclaimed',
    }

    setItems(prev => [newItem, ...prev])
    setSubmitted(true)
    setShowForm(false)
    setStatusFilter('all')
    setForm({ name: '', description: '', location: '', email: '' })
  }

  return (
    <div className="fade-in">
      {/* Stats */}
      <div className="grid-2" style={{ marginBottom: '24px', maxWidth: '480px' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(0,180,216,0.1)', color: 'var(--tud-accent)' }}>
            <Package size={22} aria-hidden="true" />
          </div>
          <div>
            <div className="stat-label">Unclaimed Items</div>
            <div className="stat-value">{unclaimed}</div>
            <div className="stat-sub">Awaiting collection</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6,214,160,0.1)', color: 'var(--tud-green)' }}>
            <CheckCircle size={22} aria-hidden="true" />
          </div>
          <div>
            <div className="stat-label">Claimed This Month</div>
            <div className="stat-value">{items.filter(i => i.status === 'claimed').length}</div>
            <div className="stat-sub">Successfully returned</div>
          </div>
        </div>
      </div>

      {/* Success alert */}
      {submitted && (
        <div className="alert alert-success" role="alert" aria-live="polite">
          <CheckCircle size={16} aria-hidden="true" />
          Your item has been added to the demo Lost & Found list.
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <label htmlFor="lf-search" className="sr-only">Search lost and found items</label>
          <Search size={15} aria-hidden="true" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input id="lf-search" type="search" className="input" style={{ paddingLeft: '32px' }} placeholder="Search items, locations…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div>
          <label htmlFor="status-filter" className="sr-only">Filter by status</label>
          <select id="status-filter" className="select" style={{ width: 'auto' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}>
            <option value="all">All items</option>
            <option value="unclaimed">Unclaimed only</option>
            <option value="claimed">Claimed only</option>
          </select>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)} aria-expanded={showForm}>
          {showForm ? '✕ Cancel' : '+ Report Item'}
        </button>
      </div>

      {/* Report form */}
      {showForm && (
        <div className="card card-padded fade-in" style={{ marginBottom: '24px', borderTop: '3px solid var(--tud-blue)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Report a Found Item</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label htmlFor="item-name" className="form-label">Item Name <span aria-hidden="true" style={{ color: 'var(--tud-red)' }}>*</span></label>
                <input id="item-name" className="input" required type="text" placeholder="e.g. Blue water bottle" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} aria-required="true" />
              </div>
              <div className="form-group">
                <label htmlFor="item-location" className="form-label">Where Found <span aria-hidden="true" style={{ color: 'var(--tud-red)' }}>*</span></label>
                <input id="item-location" className="input" required type="text" placeholder="e.g. Library, 2nd floor" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} aria-required="true" />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="item-desc" className="form-label">Description</label>
              <textarea id="item-desc" className="textarea" placeholder="Describe the item (colour, brand, markings…)" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ minHeight: '70px' }} />
            </div>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="item-email" className="form-label">Your Email <span aria-hidden="true" style={{ color: 'var(--tud-red)' }}>*</span></label>
              <input id="item-email" className="input" required type="email" placeholder="your.email@student.tud.ie" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} aria-required="true" />
              <span className="form-hint">Used only to make the demo form feel realistic. No email is sent.</span>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!form.name || !form.location || !form.email}>
              Submit Report
            </button>
          </form>
        </div>
      )}

      {/* Items list */}
      <section aria-label="Lost and found items">
        <h2 className="section-heading">
          <Package size={20} aria-hidden="true" />
          Found Items
          <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)', marginLeft: 'auto' }}>{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
        </h2>

        {filtered.length === 0 ? (
          <div className="empty-state card card-padded">
            <Search size={36} />
            <h3>No items found</h3>
            <p>Try a different search term or status filter.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map(item => (
              <article key={item.id} className="card card-padded" aria-label={item.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', flexShrink: 0,
                  background: item.status === 'claimed' ? 'rgba(6,214,160,0.1)' : 'rgba(0,180,216,0.1)',
                  color: item.status === 'claimed' ? 'var(--tud-green)' : 'var(--tud-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {item.status === 'claimed'
                    ? <CheckCircle size={22} aria-hidden="true" />
                    : <Package size={22} aria-hidden="true" />
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700 }}>{item.name}</h3>
                    <span className={`badge ${item.status === 'claimed' ? 'badge-green' : 'badge-cyan'}`}>
                      {item.status === 'claimed' ? 'Claimed' : 'Unclaimed'}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{item.description}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Search size={12} aria-hidden="true" /> {item.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} aria-hidden="true" />
                      Reported {new Date(item.dateReported).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
                {item.status === 'unclaimed' && (
                  <div style={{ flexShrink: 0 }}>
                    <a
                      href="mailto:reception@fictional-tud.ie?subject=Lost Item Enquiry"
                      className="btn btn-secondary btn-sm"
                      aria-label={`Contact reception about ${item.name}`}
                    >
                      Enquire
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Info */}
      <div className="alert alert-info" style={{ marginTop: '24px' }} role="note">
        All unclaimed items are held at Main Reception (Block A, Ground Floor) for 30 days before being donated to charity.
      </div>
    </div>
  )
}
