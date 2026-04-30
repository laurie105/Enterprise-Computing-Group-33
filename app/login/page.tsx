'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { storeStudent, StudentProfile } from '@/components/AppShell'

const years = ['1', '2', '3', '4']

export default function LoginPage() {
  const router = useRouter()
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
        setCourses(data.courses ?? [])
        setForm(prev => ({ ...prev, course: data.courses?.[0] ?? '' }))
      } catch {
        setError('Could not load courses. Refresh and try again.')
      } finally {
        setLoadingCourses(false)
      }
    }

    loadCourses()
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.full_name.trim()) return setError('Enter your full name.')
    if (!/^[A-Z]\d{8}$/i.test(form.student_number.trim())) return setError('Student number must start with a letter followed by 8 digits.')
    if (!/\S+@\S+\.\S+/.test(form.email.trim())) return setError('Enter a valid email address.')
    if (!form.course) return setError('Choose your course.')
    if (!supabase) return setError('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')

    setSubmitting(true)

    const student = {
      full_name: form.full_name.trim(),
      student_number: form.student_number.trim().toUpperCase(),
      email: form.email.trim().toLowerCase(),
      course: form.course,
      year: form.year,
    }

    const { data, error: supabaseError } = await supabase
      .from('students')
      .upsert(student, { onConflict: 'student_number' })
      .select('id, full_name, student_number, email, course, year')
      .single()

    setSubmitting(false)

    if (supabaseError) {
      setError(supabaseError.message)
      return
    }

    storeStudent(data)
    router.replace('/')
  }

  return (
    <main className="login-shell">
      <section className="login-card" aria-labelledby="login-heading">
        <div className="login-brand">CC</div>
        <p className="login-kicker">Campus Companion</p>
        <h1 id="login-heading">Student Login</h1>
        <p className="login-copy">Enter your TU Dublin student details to access the portal.</p>

        {error && <div className="alert alert-error" role="alert">{error}</div>}

        <form onSubmit={submit} className="login-form">
          <div className="form-group">
            <label htmlFor="full-name" className="form-label">Full Name</label>
            <input id="full-name" className="input" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} placeholder="e.g. Alex Murphy" />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label htmlFor="student-number" className="form-label">Student Number</label>
              <input id="student-number" className="input" value={form.student_number} onChange={e => setForm({ ...form, student_number: e.target.value })} placeholder="Student number" />
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
            <input id="email" className="input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="name@student.tudublin.ie" />
          </div>

          <div className="form-group">
            <label htmlFor="course" className="form-label">Course</label>
            <select id="course" className="select" value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} disabled={loadingCourses}>
              {courses.map(course => <option key={course} value={course}>{course}</option>)}
            </select>
            <span className="form-hint">Course names are loaded from the TU Dublin courses page.</span>
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting || loadingCourses}>
            {submitting ? 'Signing in…' : 'Enter Portal'}
          </button>
        </form>
      </section>
    </main>
  )
}
