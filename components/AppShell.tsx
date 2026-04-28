'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="layout">
      {sidebarOpen && <button className="sidebar-backdrop" aria-label="Close menu" onClick={closeSidebar} />}
      <Sidebar open={sidebarOpen} onNavigate={closeSidebar} />
      <div className="main-content">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main id="main-content" className="page-body" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  )
}
