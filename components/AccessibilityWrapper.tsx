'use client'
import { createContext, useContext, useEffect, useState } from 'react'

interface A11ySettings {
  theme: 'light' | 'dark'
  textSize: 'normal' | 'large' | 'xlarge'
  reducedMotion: boolean
  highContrast: boolean
}

interface A11yContextType {
  settings: A11ySettings
  updateSetting: <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => void
}

const defaultSettings: A11ySettings = {
  theme: 'light',
  textSize: 'normal',
  reducedMotion: false,
  highContrast: false,
}

const getInitialSettings = (): A11ySettings => {
  if (typeof window === 'undefined') return defaultSettings

  const saved = window.localStorage.getItem('a11y-settings')
  let initial = defaultSettings

  if (saved) {
    try {
      initial = { ...initial, ...JSON.parse(saved) }
    } catch {
      initial = defaultSettings
    }
  }

  return {
    ...initial,
    reducedMotion: initial.reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    theme: initial.theme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : initial.theme,
  }
}

const A11yContext = createContext<A11yContextType>({
  settings: defaultSettings,
  updateSetting: () => {},
})

export const useA11y = () => useContext(A11yContext)

export default function AccessibilityWrapper({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(getInitialSettings)

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('data-theme', settings.theme)
    html.setAttribute('data-text-size', settings.textSize)
    html.setAttribute('data-reduced-motion', String(settings.reducedMotion))
    html.setAttribute('data-high-contrast', String(settings.highContrast))
    localStorage.setItem('a11y-settings', JSON.stringify(settings))
  }, [settings])

  const updateSetting = <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
    setSettings(s => ({ ...s, [key]: value }))
  }

  return (
    <A11yContext.Provider value={{ settings, updateSetting }}>
      {children}
    </A11yContext.Provider>
  )
}
