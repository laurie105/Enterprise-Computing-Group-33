import type { Metadata } from 'next'
import './globals.css'
import AccessibilityWrapper from '@/components/AccessibilityWrapper'
import AppShell from '@/components/AppShell'

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
          <AppShell>{children}</AppShell>
        </AccessibilityWrapper>
      </body>
    </html>
  )
}
