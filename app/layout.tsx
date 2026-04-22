import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import AccessibilityWrapper from '@/components/AccessibilityWrapper'

export const metadata: Metadata = {
  title: 'Campus Companion | TUD',
  description: 'Your all-in-one student portal for TUD campus services',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AccessibilityWrapper>
          {/* Skip to main content – WCAG 2.4.1 */}
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <div className="layout">
            <Sidebar />
            <div className="main-content">
              <Topbar />
              <main id="main-content" className="page-body" tabIndex={-1}>
                {children}
              </main>
            </div>
          </div>
        </AccessibilityWrapper>
      </body>
    </html>
  )
}
