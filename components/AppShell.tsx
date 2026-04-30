'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export type StudentProfile = {
  id?: string
  full_name: string
  student_number: string
  email: string
  course: string
  year: string
}

const storageKey = 'campus-companion-student'

export function getStoredStudent(): StudentProfile | null {
  if (typeof window === 'undefined') return null
  const saved = window.localStorage.getItem(storageKey)
  if (!saved) return null

  try {
    return JSON.parse(saved) as StudentProfile
  } catch {
    window.localStorage.removeItem(storageKey)
    return null
  }
}

export function storeStudent(student: StudentProfile) {
  window.localStorage.setItem(storageKey, JSON.stringify(student))
}

export function clearStoredStudent() {
  window.localStorage.removeItem(storageKey)
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [student, setStudent] = useState<StudentProfile | null>(() => getStoredStudent())
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/login'

  useEffect(() => {
    if (!student && !isLoginPage) router.replace('/login')
    if (student && isLoginPage) router.replace('/')
  }, [isLoginPage, router, student])

  const closeSidebar = () => setSidebarOpen(false)
  const logout = () => {
    clearStoredStudent()
    setStudent(null)
    router.replace('/login')
  }

  if (isLoginPage) return <>{children}</>

  if (!student) {
    return (
      <main className="login-shell" aria-live="polite">
        <div className="login-card">Loading student portal…</div>
      </main>
    )
  }

  return (
    <div className="layout">
      {sidebarOpen && <button className="sidebar-backdrop" aria-label="Close menu" onClick={closeSidebar} />}
      <Sidebar open={sidebarOpen} onNavigate={closeSidebar} />
      <div className="main-content">
        <Topbar onMenuClick={() => setSidebarOpen(true)} student={student} onLogout={logout} />
        <main id="main-content" className="page-body" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  )
}
