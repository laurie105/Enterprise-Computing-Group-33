'use client'

import { useEffect, useState } from 'react'
import { storeStudent, StudentProfile } from '@/components/AppShell'

const years = ['1', '2', '3', '4']
const fallbackCourses = ['Computer Science (TU856)', 'Computing (General Entry) (TU859)', 'Business Computing (TU914)']

export default function LoginPage() {
  const [courses, setCourses] = useState<string[]>([])
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<StudentProfile>({
    full_name: '',
    student_number: '',
    email: '',
    course: '',
    year: '1',
  })

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await fetch('/api/courses')
        const data = await response.json()
        const loadedCourses = data.courses?.length ? data.courses : fallbackCourses
        setCourses(loadedCourses)
        setForm(prev => ({ ...prev, course: loadedCourses[0] ?? fallbackCourses[0] }))
      } catch {
        setCourses(fallbackCourses)
        setForm(prev => ({ ...prev, course: fallbackCourses[0] }))
      } finally {
        setLoadingCourses(false)
      }
    }

    loadCourses()
  }, [])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const student: StudentProfile = {
      id: 'fictional-student-demo',
      full_name: form.full_name.trim() || 'Alex Murphy',
      student_number: form.student_number.trim() || 'Fictional Student',
      email: form.email.trim() || 'student@example.com',
      course: form.course || fallbackCourses[0],
      year: form.year || '1',
    }

    storeStudent(student)
    window.location.href = '/'
  }

  return (
    <main className="login-shell">
      <section className="login-card" aria-labelledby="login-heading">
        <div className="login-brand">CC</div>
        <p className="login-kicker">Campus Companion</p>
        <h1 id="login-heading">Student Login</h1>
        <p className="login-copy">Enter fictional student details, or leave fields blank to use demo details.</p>

        {error && <div className="alert alert-error" role="alert">{error}</div>}

        <form onSubmit={submit} className="login-form">
          <div className="form-group">
            <label htmlFor="full-name" className="form-label">Full Name</label>
            <input id="full-name" className="input" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} placeholder="e.g. Alex Murphy" />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label htmlFor="student-number" className="form-label">Student Number</label>
              <input id="student-number" className="input" value={form.student_number} onChange={e => setForm({ ...form, student_number: e.target.value })} placeholder="Any fictional student number" />
            </div>
            <div className="form-group">
              <label htmlFor="year" className="form-label">Year</label>
              <select id="year" className="select" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}>
                {years.map(year => <option key={year} value={year}>Year {year}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input id="email" className="input" type="text" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Fictional email or contact" />
          </div>

          <div className="form-group">
            <label htmlFor="course" className="form-label">Course</label>
            <select id="course" className="select" value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} disabled={loadingCourses}>
              {courses.map(course => <option key={course} value={course}>{course}</option>)}
            </select>
            <span className="form-hint">Course is optional for the demo login.</span>
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Enter Portal'}
          </button>
        </form>
      </section>
    </main>
  )
}
