export type TimetableClass = {
  module_code: string
  module_name: string
  day: string
  start: string
  end: string
  room: string
  lecturer: string
  type: string
}

// Fictional timetable data (Computing General, Year 1).
export const timetableData: TimetableClass[] = [
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

export const mondayClasses = timetableData.filter(cls => cls.day === 'Monday')
