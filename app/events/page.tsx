'use client'
import { useState } from 'react'
import { Calendar, MapPin, Users, Tag } from 'lucide-react'
import { events, eventCategories } from '@/data/events'
import { recommendEvents } from '@/lib/recommender'

const categoryColors: Record<string, string> = {
  Academic: 'badge-blue',
  Society: 'badge-green',
  Wellbeing: 'badge-cyan',
  Culture: 'badge-orange',
  Career: 'badge-yellow',
  Social: 'badge-gray',
  Sport: 'badge-red',
}

export default function EventsPage() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [userInterests] = useState(['Academic', 'Society', 'Career'])

  const filtered = events.filter(e => {
    const matchCat = category === 'All' || e.category === category
    const matchSearch = search === '' ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const recommended = recommendEvents(events, userInterests)

  return (
    <div className="fade-in">
      {/* ML Recommendations */}
      <section aria-labelledby="rec-heading" style={{ marginBottom: '28px' }}>
        <h2 id="rec-heading" className="section-heading">
          <span style={{ fontSize: '14px', background: 'color-mix(in srgb, var(--tud-blue) 10%, transparent)', color: 'var(--tud-blue)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', marginRight: '4px' }}>ML</span>
          Recommended for You
        </h2>
        <div className="grid-3">
          {recommended.map(evt => (
            <div key={evt.id} className="card card-padded" style={{ borderTop: '3px solid var(--tud-accent)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className={`badge ${categoryColors[evt.category] || 'badge-gray'}`}>{evt.category}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {Math.round(evt.attendees / evt.capacity * 100)}% full
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>{evt.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{evt.description}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={12} aria-hidden="true" />
                {new Date(evt.date).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })} · {evt.start}
              </div>
              {/* Progress bar for capacity */}
              <div className="progress-bar" style={{ marginTop: '12px' }}>
                <div className="progress-fill" style={{ width: `${Math.round(evt.attendees / evt.capacity * 100)}%` }} role="progressbar" aria-valuenow={evt.attendees} aria-valuemin={0} aria-valuemax={evt.capacity} aria-label={`${evt.attendees} of ${evt.capacity} places filled`} />
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
          ℹ️ Recommendations based on your saved interests (Academic, Society, Career) using a popularity-weighted filter. See the ML feature section for full details.
        </p>
      </section>

      {/* Search + filter bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label htmlFor="event-search" className="sr-only">Search events</label>
          <input
            id="event-search"
            type="search"
            className="input"
            placeholder="Search events…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search events by name or description"
          />
        </div>
        <div>
          <label htmlFor="event-category" className="sr-only">Filter by category</label>
          <select
            id="event-category"
            className="select"
            style={{ width: 'auto' }}
            value={category}
            onChange={e => setCategory(e.target.value)}
            aria-label="Filter events by category"
          >
            {eventCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {filtered.length} event{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Events list */}
      <section aria-label="All events">
        {filtered.length === 0 ? (
          <div className="empty-state card card-padded">
            <Calendar size={40} />
            <h3>No events found</h3>
            <p>Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(evt => {
              const fillPct = Math.round(evt.attendees / evt.capacity * 100)
              const almostFull = fillPct >= 90
              return (
                <article key={evt.id} className="card card-padded" aria-label={evt.title}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                        <span className={`badge ${categoryColors[evt.category] || 'badge-gray'}`}>{evt.category}</span>
                        {almostFull && <span className="badge badge-red">Almost Full</span>}
                      </div>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{evt.title}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>{evt.description}</p>
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Calendar size={14} aria-hidden="true" />
                          {new Date(evt.date).toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' })} · {evt.start}–{evt.end}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <MapPin size={14} aria-hidden="true" />
                          {evt.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Users size={14} aria-hidden="true" />
                          {evt.attendees}/{evt.capacity} places
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Tag size={14} aria-hidden="true" />
                          {evt.organiser}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '80px' }}>
                      <div style={{ fontSize: '22px', fontWeight: 700, color: almostFull ? 'var(--tud-red)' : 'var(--tud-blue)' }}>{fillPct}%</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>capacity</div>
                    </div>
                  </div>
                  <div className="progress-bar" style={{ marginTop: '12px' }}>
                    <div
                      className="progress-fill"
                      style={{ width: `${fillPct}%`, background: almostFull ? 'var(--tud-red)' : undefined }}
                      role="progressbar"
                      aria-valuenow={evt.attendees}
                      aria-valuemin={0}
                      aria-valuemax={evt.capacity}
                      aria-label={`${evt.attendees} of ${evt.capacity} places filled`}
                    />
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
