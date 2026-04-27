'use client'
import { useState } from 'react'
import { Calendar, MapPin, Users, Tag } from 'lucide-react'

// Fictional events data
const events = [
  { id: 1, title: 'Freshers Week Welcome Talk', description: 'An introduction to TUD services, clubs, and supports for new students.', date: '2025-09-08', start: '10:00', end: '12:00', location: 'Main Hall, Block A', category: 'Academic', organiser: 'Student Services', capacity: 300, attendees: 245, tags: ['freshers', 'welcome', 'orientation'] },
  { id: 2, title: 'Coding Hackathon 2025', description: '24-hour hackathon open to all computing students. Form teams and build something amazing!', date: '2025-10-15', start: '09:00', end: '09:00', location: 'Computer Lab Block B', category: 'Society', organiser: 'Computing Society', capacity: 60, attendees: 58, tags: ['hackathon', 'coding', 'computing'] },
  { id: 3, title: 'Mental Health Awareness Week Seminar', description: 'Expert panel on student mental wellbeing and available supports.', date: '2025-10-20', start: '13:00', end: '15:00', location: 'Lecture Hall C1', category: 'Wellbeing', organiser: 'Student Union', capacity: 150, attendees: 87, tags: ['wellness', 'mental-health', 'support'] },
  { id: 4, title: 'Campus Art Exhibition', description: 'Showcase of student artwork across all disciplines.', date: '2025-11-03', start: '11:00', end: '17:00', location: 'Atrium, Block D', category: 'Culture', organiser: 'Arts Society', capacity: 200, attendees: 130, tags: ['art', 'culture', 'exhibition'] },
  { id: 5, title: 'CV Writing Workshop', description: 'Get tips from industry professionals on crafting the perfect CV.', date: '2025-11-10', start: '14:00', end: '16:00', location: 'Room A203', category: 'Career', organiser: 'Careers Office', capacity: 40, attendees: 39, tags: ['career', 'cv', 'workshop'] },
  { id: 6, title: 'Table Quiz Night', description: 'Annual charity table quiz. Teams of 4, €5 per person.', date: '2025-11-17', start: '19:00', end: '22:00', location: 'Student Bar', category: 'Social', organiser: 'Student Union', capacity: 120, attendees: 96, tags: ['social', 'quiz', 'charity'] },
  { id: 7, title: 'Data Science Guest Lecture', description: 'Industry guest from a Dublin tech firm talks about data pipelines.', date: '2025-11-24', start: '12:00', end: '13:00', location: 'Lecture Hall B2', category: 'Academic', organiser: 'Computing Society', capacity: 80, attendees: 54, tags: ['data', 'lecture', 'computing'] },
  { id: 8, title: 'Sports Day 2025', description: 'Inter-class sports competition. Sign up your team at the SU office.', date: '2025-12-01', start: '10:00', end: '16:00', location: 'Sports Ground', category: 'Sport', organiser: 'Sports Society', capacity: 200, attendees: 177, tags: ['sport', 'fitness', 'competition'] },
  { id: 9, title: 'Christmas Social', description: 'End of semester social with live music and food.', date: '2025-12-12', start: '18:00', end: '23:00', location: 'Student Bar & Courtyard', category: 'Social', organiser: 'Student Union', capacity: 250, attendees: 210, tags: ['social', 'christmas', 'music'] },
  { id: 10, title: 'Spring Semester Orientation', description: 'Welcome back session for all returning students.', date: '2026-01-19', start: '10:00', end: '12:00', location: 'Main Hall, Block A', category: 'Academic', organiser: 'Student Services', capacity: 300, attendees: 180, tags: ['orientation', 'semester', 'returning'] },
]

const categories = ['All', 'Academic', 'Society', 'Wellbeing', 'Culture', 'Career', 'Social', 'Sport']

const categoryColors: Record<string, string> = {
  Academic: 'badge-blue',
  Society: 'badge-green',
  Wellbeing: 'badge-cyan',
  Culture: 'badge-orange',
  Career: 'badge-yellow',
  Social: 'badge-gray',
  Sport: 'badge-red',
}

// ML: simple k-NN style recommendation based on category + capacity filling rate
type EventWithScore = typeof events[number] & { score: number };

function getRecommended(all: typeof events, interests: string[]): EventWithScore[] {
  return [...all]
    .map(e => {
      // Feature 1: Interest match (categorical)
      const interestScore = interests.includes(e.category) ? 1 : 0;

      // Feature 2: Popularity (normalized)
      const popularityScore = e.attendees / e.capacity;

      // Feature 3: price factor
      const priceScore = e.price ? 1 - (e.price / 150) : 0.5;

      // Final weighted score
      const score =
        (0.6 * interestScore) +
        (0.3 * popularityScore) +
        (0.1 * priceScore);

      return { ...e, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
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

  const recommended = getRecommended(events, userInterests)

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
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
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
