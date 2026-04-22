'use client'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Search } from 'lucide-react'

const locations = [
  { id: 1, name: 'Main Library', category: 'Academic', description: 'Full library service with study spaces, printing, and borrowing.', building: 'Block C', floor: 'Ground & 1st', hours: 'Mon–Fri 08:30–21:00, Sat 10:00–17:00', phone: '01-555-0101', email: 'library@fictional-tud.ie', color: '#003087' },
  { id: 2, name: 'Student Union Office', category: 'Student Services', description: 'SU rep office, welfare support, event bookings.', building: 'Block A', floor: 'Ground Floor', hours: 'Mon–Fri 09:00–17:00', phone: '01-555-0102', email: 'su@fictional-tud.ie', color: '#06d6a0' },
  { id: 3, name: 'Careers Office', category: 'Student Services', description: 'CV help, job listings, industry placement support.', building: 'Block B', floor: '2nd Floor', hours: 'Mon–Fri 09:30–16:30', phone: '01-555-0103', email: 'careers@fictional-tud.ie', color: '#0050c8' },
  { id: 4, name: 'Canteen', category: 'Food & Drink', description: 'Main campus canteen serving hot meals, snacks, and drinks.', building: 'Block D', floor: 'Ground Floor', hours: 'Mon–Fri 08:00–16:00', phone: '01-555-0104', email: 'canteen@fictional-tud.ie', color: '#fb8500' },
  { id: 5, name: 'IT Helpdesk', category: 'IT Support', description: 'Walk-in IT support for students and staff.', building: 'Block B', floor: 'Ground Floor', hours: 'Mon–Fri 09:00–17:30', phone: '01-555-0105', email: 'ithelpdesk@fictional-tud.ie', color: '#ef233c' },
  { id: 6, name: 'Gym & Sports Hall', category: 'Sport', description: 'Fully equipped gym and sports hall. Membership required.', building: 'Block E', floor: 'Ground Floor', hours: 'Mon–Fri 07:00–22:00, Sat–Sun 09:00–18:00', phone: '01-555-0106', email: 'sport@fictional-tud.ie', color: '#ffd60a' },
  { id: 7, name: 'Disability Support Office', category: 'Student Services', description: 'Supports students with disabilities and learning differences.', building: 'Block A', floor: '1st Floor', hours: 'Mon–Fri 09:00–17:00', phone: '01-555-0107', email: 'disability@fictional-tud.ie', color: '#8b5cf6' },
  { id: 8, name: 'Health Centre', category: 'Wellbeing', description: 'On-campus nurse and counselling service.', building: 'Block A', floor: 'Ground Floor', hours: 'Mon–Fri 09:00–17:00', phone: '01-555-0108', email: 'health@fictional-tud.ie', color: '#06d6a0' },
  { id: 9, name: 'Printing Services', category: 'Academic', description: 'Print, scan, and photocopy. Student card payment only.', building: 'Block C', floor: 'Ground Floor', hours: 'Mon–Fri 08:30–18:00', phone: '01-555-0109', email: 'print@fictional-tud.ie', color: '#003087' },
  { id: 10, name: 'Main Reception', category: 'Admin', description: 'General enquiries, lost & found, visitor passes.', building: 'Block A', floor: 'Ground Floor', hours: 'Mon–Fri 08:00–18:00', phone: '01-555-0110', email: 'reception@fictional-tud.ie', color: '#8b93a7' },
]

const categories = ['All', 'Academic', 'Student Services', 'Food & Drink', 'IT Support', 'Sport', 'Wellbeing', 'Admin']

// Fictional campus block layout for the visual map
const blocks = [
  { id: 'A', x: 60, y: 80, w: 120, h: 140, label: 'Block A\nAdmin / Services', color: '#e8f0fe' },
  { id: 'B', x: 220, y: 80, w: 110, h: 100, label: 'Block B\nIT / Careers', color: '#fce8e6' },
  { id: 'C', x: 370, y: 60, w: 130, h: 120, label: 'Block C\nLibrary / Print', color: '#e6f4ea' },
  { id: 'D', x: 220, y: 220, w: 110, h: 90, label: 'Block D\nCanteen', color: '#fef3e2' },
  { id: 'E', x: 370, y: 220, w: 130, h: 90, label: 'Block E\nSports', color: '#fff8e1' },
]

export default function MapPage() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<number | null>(null)

  const filtered = locations.filter(l => {
    const matchCat = category === 'All' || l.category === category
    const matchSearch = search === '' || l.name.toLowerCase().includes(search.toLowerCase()) || l.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const selectedLoc = locations.find(l => l.id === selected)

  return (
    <div className="fade-in">
      <div className="grid-2" style={{ gap: '20px', alignItems: 'start' }}>
        {/* Left: map visual + filter */}
        <div>
          {/* Fictional campus map SVG */}
          <div className="card card-padded" style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>Campus Overview – TUD Tallaght (Fictional Layout)</h2>
            <svg
              viewBox="0 0 560 340"
              style={{ width: '100%', borderRadius: 'var(--radius-sm)', background: '#f0f4fa', display: 'block' }}
              role="img"
              aria-label="Fictional campus map showing Blocks A through E with roads and green spaces"
            >
              {/* Road */}
              <rect x="0" y="0" width="560" height="340" fill="#eef2f7" />
              <rect x="0" y="250" width="560" height="24" fill="#d8dfe8" opacity="0.6" />
              <rect x="180" y="0" width="24" height="340" fill="#d8dfe8" opacity="0.6" />
              {/* Green area */}
              <ellipse cx="480" cy="300" rx="50" ry="30" fill="#c8e6c9" opacity="0.6" />
              <text x="480" y="305" textAnchor="middle" fontSize="10" fill="#388e3c">Green Space</text>
              {/* Blocks */}
              {blocks.map(b => (
                <g key={b.id}>
                  <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="6" fill={b.color} stroke="#b0bed4" strokeWidth="1.5" />
                  {b.label.split('\n').map((line, i) => (
                    <text key={i} x={b.x + b.w / 2} y={b.y + b.h / 2 - 6 + i * 16} textAnchor="middle" fontSize="11" fontWeight={i === 0 ? 700 : 400} fill="#1a2a4a">
                      {line}
                    </text>
                  ))}
                </g>
              ))}
              {/* Entrance */}
              <rect x="90" y="278" width="60" height="10" rx="3" fill="#90a4ae" />
              <text x="120" y="305" textAnchor="middle" fontSize="10" fill="#546e7a">Main Entrance</text>
              {/* Compass */}
              <text x="528" y="28" fontSize="12" fontWeight="700" fill="#546e7a">N ↑</text>
            </svg>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
              Note: This is a fictional campus layout created for the Campus Companion CA3 project.
            </p>
          </div>

          {/* Search + filter */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '160px', position: 'relative' }}>
              <label htmlFor="loc-search" className="sr-only">Search locations</label>
              <Search size={15} aria-hidden="true" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input id="loc-search" type="search" className="input" style={{ paddingLeft: '32px' }} placeholder="Search locations…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div>
              <label htmlFor="loc-cat" className="sr-only">Filter by category</label>
              <select id="loc-cat" className="select" style={{ width: 'auto' }} value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Right: location cards */}
        <div>
          <h2 id="locations-heading" className="section-heading">
            <MapPin size={20} aria-hidden="true" />
            Campus Locations
            <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)', marginLeft: 'auto' }}>{filtered.length} found</span>
          </h2>

          {selected && selectedLoc ? (
            /* Detail panel */
            <div className="card card-padded fade-in" style={{ borderTop: `4px solid ${selectedLoc.color}`, marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700 }}>{selectedLoc.name}</h3>
                  <span className="badge badge-blue" style={{ marginTop: '4px' }}>{selectedLoc.category}</span>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => setSelected(null)} aria-label="Close detail panel">✕ Close</button>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>{selectedLoc.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <MapPin size={15} style={{ color: selectedLoc.color, flexShrink: 0 }} aria-hidden="true" />
                  {selectedLoc.building}, {selectedLoc.floor}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <Clock size={15} style={{ color: selectedLoc.color, flexShrink: 0 }} aria-hidden="true" />
                  {selectedLoc.hours}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <Phone size={15} style={{ color: selectedLoc.color, flexShrink: 0 }} aria-hidden="true" />
                  <a href={`tel:${selectedLoc.phone}`} style={{ color: 'var(--tud-blue-mid)' }}>{selectedLoc.phone}</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <Mail size={15} style={{ color: selectedLoc.color, flexShrink: 0 }} aria-hidden="true" />
                  <a href={`mailto:${selectedLoc.email}`} style={{ color: 'var(--tud-blue-mid)' }}>{selectedLoc.email}</a>
                </div>
              </div>
            </div>
          ) : null}

          <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filtered.map(loc => (
              <li key={loc.id}>
                <button
                  className="card card-padded"
                  style={{
                    width: '100%', textAlign: 'left', cursor: 'pointer',
                    borderLeft: `4px solid ${loc.color}`,
                    background: selected === loc.id ? 'color-mix(in srgb, var(--tud-blue) 4%, var(--bg-card))' : 'var(--bg-card)',
                    display: 'flex', alignItems: 'center', gap: '14px', border: `1px solid var(--border)`,
                    borderLeft: `4px solid ${loc.color}`,
                  }}
                  onClick={() => setSelected(selected === loc.id ? null : loc.id)}
                  aria-expanded={selected === loc.id}
                  aria-controls={`loc-detail-${loc.id}`}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, fontSize: '14px' }}>{loc.name}</span>
                      <span className="badge badge-gray">{loc.building}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{loc.description}</div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} aria-hidden="true" />
                      {loc.floor}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <div className="empty-state card card-padded">
              <MapPin size={36} />
              <h3>No locations found</h3>
              <p>Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
