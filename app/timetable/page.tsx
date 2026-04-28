'use client'
import { useState } from 'react'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

// Fictional timetable data (Computing General, Year 1)
const timetableData = [
  { module_code: 'CS1001', module_name: 'Introduction to Programming', day: 'Monday', start: '09:00', end: '11:00', room: 'B201', lecturer: 'Dr. Fiona Hartley', type: 'Lecture' },
  { module_code: 'CS1002', module_name: 'Computer Architecture', day: 'Monday', start: '13:00', end: '15:00', room: 'A104', lecturer: 'Mr. Declan Murphy', type: 'Lecture' },
  { module_code: 'MATH1001', module_name: 'Discrete Mathematics', day: 'Tuesday', start: '10:00', end: '12:00', room: 'C302', lecturer: 'Dr. Aoife Brennan', type: 'Lecture' },
  { module_code: 'CS1003', module_name: 'Web Development Fundamentals', day: 'Tuesday', start: '14:00', end: '16:00', room: 'Lab3', lecturer: 'Ms. Sarah O\'Brien', type: 'Lab' },
  { module_code: 'CS1004', module_name: 'Database Systems', day: 'Wednesday', start: '09:00', end: '11:00', room: 'B205', lecturer: 'Mr. Cian Walsh', type: 'Lecture' },
  { module_code: 'STAT1001', module_name: 'Statistics for Computing', day: 'Wednesday', start: '13:00', end: '15:00', room: 'A101', lecturer: 'Dr. Fiona Hartley', type: 'Lecture' },
  { module_code: 'CS1005', module_name: 'Operating Systems', day: 'Thursday', start: '10:00', end: '12:00', room: 'B201', lecturer: 'Mr. Declan Murphy', type: 'Lecture' },
  { module_code: 'CS1006', module_name: 'Nature of Enterprise Computing', day: 'Thursday', start: '14:00', end: '16:00', room: 'Lab2', lecturer: 'Ms. Sarah O\'Brien', type: 'Lab' },
  { module_code: 'CS1001', module_name: 'Introduction to Programming (Lab)', day: 'Friday', start: '09:00', end: '11:00', room: 'Lab1', lecturer: 'Ms. Sarah O\'Brien', type: 'Lab' },
  { module_code: 'MATH1001', module_name: 'Discrete Mathematics (Tutorial)', day: 'Friday', start: '13:00', end: '14:00', room: 'C302', lecturer: 'Dr. Aoife Brennan', type: 'Tutorial' },
]

const typeColors: Record<string, string> = {
  Lecture: 'badge-blue',
  Lab: 'badge-green',
  Tutorial: 'badge-cyan',
}

const moduleColors = [
  '#003087', '#0050c8', '#06d6a0', '#fb8500', '#ef233c', '#00b4d8', '#8b5cf6', '#ffd60a',
]

const moduleColorMap: Record<string, string> = {}
timetableData.forEach((c) => {
  if (!moduleColorMap[c.module_code]) {
    moduleColorMap[c.module_code] = moduleColors[Object.keys(moduleColorMap).length % moduleColors.length]
  }
})

export default function TimetablePage() {
  const [view, setView] = useState<'week' | 'list'>('week')
  const [selectedDay, setSelectedDay] = useState<string>('Monday')

  const today = new Date().toLocaleDateString('en-IE', { weekday: 'long' })

  return (
    <div className="fade-in">
      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn ${view === 'week' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setView('week')}
            aria-pressed={view === 'week'}
          >
            Weekly View
          </button>
          <button
            className={`btn ${view === 'list' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setView('list')}
            aria-pressed={view === 'list'}
          >
            List View
          </button>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Computing General · Year 1 · Semester 1
        </div>
      </div>

      {view === 'week' ? (
        <>
          {/* Day tabs */}
          <div role="tablist" aria-label="Days of the week" style={{ display: 'flex', gap: '6px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
            {days.map(day => (
              <button
                key={day}
                role="tab"
                aria-selected={selectedDay === day}
                onClick={() => setSelectedDay(day)}
                className={`btn btn-sm ${selectedDay === day ? 'btn-primary' : 'btn-secondary'}`}
                style={{ position: 'relative', whiteSpace: 'nowrap' }}
              >
                {day}
                {day === today && (
                  <span style={{
                    position: 'absolute', top: '-4px', right: '-4px',
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: 'var(--tud-green)', border: '2px solid var(--bg-card)',
                  }} aria-label="today" />
                )}
              </button>
            ))}
          </div>

          {/* Day panel */}
          <div role="tabpanel" aria-label={`${selectedDay} schedule`}>
            {timetableData.filter(c => c.day === selectedDay).length === 0 ? (
              <div className="empty-state card card-padded">
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)' }}>No classes on {selectedDay}</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Enjoy your free day!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {timetableData
                  .filter(c => c.day === selectedDay)
                  .sort((a, b) => a.start.localeCompare(b.start))
                  .map((cls, i) => (
                    <div key={i} className="card card-padded" style={{
                      display: 'flex', alignItems: 'center', gap: '20px',
                      borderLeft: `4px solid ${moduleColorMap[cls.module_code]}`,
                    }}>
                      <div style={{ minWidth: '90px', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '15px', color: 'var(--tud-blue)' }}>{cls.start}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>to {cls.end}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, fontSize: '15px' }}>{cls.module_name}</span>
                          <span className={`badge ${typeColors[cls.type] || 'badge-gray'}`}>{cls.type}</span>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                          {cls.lecturer} · Room {cls.room}
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {cls.module_code}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </>
      ) : (
        /* List view */
        <section aria-label="Full timetable list">
          <div className="table-wrap">
            <table>
              <caption className="sr-only">Full weekly timetable</caption>
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Time</th>
                  <th scope="col">Module</th>
                  <th scope="col">Code</th>
                  <th scope="col">Room</th>
                  <th scope="col">Lecturer</th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              <tbody>
                {[...timetableData]
                  .sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day) || a.start.localeCompare(b.start))
                  .map((cls, i) => (
                    <tr key={i}>
                      <td>
                        <span style={{
                          fontWeight: cls.day === today ? 700 : 500,
                          color: cls.day === today ? 'var(--tud-blue)' : 'var(--text-primary)',
                        }}>
                          {cls.day === today ? `${cls.day} ★` : cls.day}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{cls.start}–{cls.end}</td>
                      <td style={{ fontWeight: 500 }}>{cls.module_name}</td>
                      <td><span className="badge badge-gray">{cls.module_code}</span></td>
                      <td>{cls.room}</td>
                      <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{cls.lecturer}</td>
                      <td><span className={`badge ${typeColors[cls.type] || 'badge-gray'}`}>{cls.type}</span></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
