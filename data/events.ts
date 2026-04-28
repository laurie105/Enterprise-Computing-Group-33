export type CampusEvent = {
  id: number
  title: string
  description: string
  date: string
  start: string
  end: string
  location: string
  category: string
  organiser: string
  capacity: number
  attendees: number
  tags: string[]
}

// Fictional future campus event data used by the Events page and ML API.
export const events: CampusEvent[] = [
  { id: 1, title: 'Freshers Week Welcome Talk', description: 'An introduction to TUD services, clubs, and supports for new students.', date: '2026-09-08', start: '10:00', end: '12:00', location: 'Main Hall, Block A', category: 'Academic', organiser: 'Student Services', capacity: 300, attendees: 245, tags: ['freshers', 'welcome', 'orientation'] },
  { id: 2, title: 'Coding Hackathon 2026', description: '24-hour hackathon open to all computing students. Form teams and build something amazing!', date: '2026-10-15', start: '09:00', end: '09:00', location: 'Computer Lab Block B', category: 'Society', organiser: 'Computing Society', capacity: 60, attendees: 58, tags: ['hackathon', 'coding', 'computing'] },
  { id: 3, title: 'Mental Health Awareness Week Seminar', description: 'Expert panel on student mental wellbeing and available supports.', date: '2026-10-20', start: '13:00', end: '15:00', location: 'Lecture Hall C1', category: 'Wellbeing', organiser: 'Student Union', capacity: 150, attendees: 87, tags: ['wellness', 'mental-health', 'support'] },
  { id: 4, title: 'Campus Art Exhibition', description: 'Showcase of student artwork across all disciplines.', date: '2026-11-03', start: '11:00', end: '17:00', location: 'Atrium, Block D', category: 'Culture', organiser: 'Arts Society', capacity: 200, attendees: 130, tags: ['art', 'culture', 'exhibition'] },
  { id: 5, title: 'CV Writing Workshop', description: 'Get tips from industry professionals on crafting the perfect CV.', date: '2026-11-10', start: '14:00', end: '16:00', location: 'Room A203', category: 'Career', organiser: 'Careers Office', capacity: 40, attendees: 39, tags: ['career', 'cv', 'workshop'] },
  { id: 6, title: 'Table Quiz Night', description: 'Annual charity table quiz. Teams of 4, €5 per person.', date: '2026-11-17', start: '19:00', end: '22:00', location: 'Student Bar', category: 'Social', organiser: 'Student Union', capacity: 120, attendees: 96, tags: ['social', 'quiz', 'charity'] },
  { id: 7, title: 'Data Science Guest Lecture', description: 'Industry guest from a Dublin tech firm talks about data pipelines.', date: '2026-11-24', start: '12:00', end: '13:00', location: 'Lecture Hall B2', category: 'Academic', organiser: 'Computing Society', capacity: 80, attendees: 54, tags: ['data', 'lecture', 'computing'] },
  { id: 8, title: 'Sports Day 2026', description: 'Inter-class sports competition. Sign up your team at the SU office.', date: '2026-12-01', start: '10:00', end: '16:00', location: 'Sports Ground', category: 'Sport', organiser: 'Sports Society', capacity: 200, attendees: 177, tags: ['sport', 'fitness', 'competition'] },
  { id: 9, title: 'Christmas Social', description: 'End of semester social with live music and food.', date: '2026-12-12', start: '18:00', end: '23:00', location: 'Student Bar & Courtyard', category: 'Social', organiser: 'Student Union', capacity: 250, attendees: 210, tags: ['social', 'christmas', 'music'] },
  { id: 10, title: 'Spring Semester Orientation', description: 'Welcome back session for all returning students.', date: '2027-01-19', start: '10:00', end: '12:00', location: 'Main Hall, Block A', category: 'Academic', organiser: 'Student Services', capacity: 300, attendees: 180, tags: ['orientation', 'semester', 'returning'] },
]

export const eventCategories = ['All', ...Array.from(new Set(events.map(event => event.category)))]
