'use client'
import { useA11y } from '@/components/AccessibilityWrapper'
import { Sun, Moon, Type, Zap, Contrast, RotateCcw } from 'lucide-react'

export default function AccessibilitySettingsPage() {
  const { settings, updateSetting } = useA11y()

  function resetAll() {
    updateSetting('theme', 'light')
    updateSetting('textSize', 'normal')
    updateSetting('reducedMotion', false)
    updateSetting('highContrast', false)
  }

  return (
    <div className="fade-in" style={{ maxWidth: '680px' }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '14px' }}>
        These settings are saved to your browser and apply across all pages. They are designed to help make Campus Companion as accessible as possible for every student.
      </p>

      {/* Theme */}
      <section aria-labelledby="theme-heading" className="card card-padded" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'color-mix(in srgb, var(--tud-blue) 10%, transparent)', color: 'var(--tud-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {settings.theme === 'light' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>Colour Theme</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Switch between light and dark mode</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }} role="radiogroup" aria-label="Colour theme">
            {(['light', 'dark'] as const).map(t => (
              <button
                key={t}
                role="radio"
                aria-checked={settings.theme === t}
                className={`btn btn-sm ${settings.theme === t ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => updateSetting('theme', t)}
              >
                {t === 'light' ? '☀️ Light' : '🌙 Dark'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Text size */}
      <section aria-labelledby="textsize-heading" className="card card-padded" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,80,200,0.1)', color: 'var(--tud-blue-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Type size={20} aria-hidden="true" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }} id="textsize-heading">Text Size</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Increase text size for easier reading</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }} role="radiogroup" aria-labelledby="textsize-heading">
            {(['normal', 'large', 'xlarge'] as const).map(size => (
              <button
                key={size}
                role="radio"
                aria-checked={settings.textSize === size}
                className={`btn btn-sm ${settings.textSize === size ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => updateSetting('textSize', size)}
              >
                {size === 'normal' ? 'Normal' : size === 'large' ? 'Large' : 'X-Large'}
              </button>
            ))}
          </div>
        </div>

        {/* Live preview */}
        <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: settings.textSize === 'normal' ? '14px' : settings.textSize === 'large' ? '18px' : '22px', color: 'var(--text-primary)', transition: 'font-size 0.2s' }} aria-live="polite" aria-label="Text size preview">
            Preview: The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </section>

      {/* Reduced motion */}
      <section aria-labelledby="motion-heading" className="card card-padded" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'rgba(6,214,160,0.1)', color: 'var(--tud-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} aria-hidden="true" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }} id="motion-heading">Reduce Motion</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Disable animations and transitions (WCAG 2.3.3)</div>
            </div>
          </div>
          <label className="toggle" aria-label="Toggle reduced motion">
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={e => updateSetting('reducedMotion', e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>
      </section>

      {/* High contrast */}
      <section aria-labelledby="contrast-heading" className="card card-padded" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'rgba(239,35,60,0.08)', color: 'var(--tud-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Contrast size={20} aria-hidden="true" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }} id="contrast-heading">High Contrast Mode</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Increase colour contrast for better readability (WCAG 1.4.3)</div>
            </div>
          </div>
          <label className="toggle" aria-label="Toggle high contrast mode">
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={e => updateSetting('highContrast', e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>
      </section>

      {/* WCAG info */}
      <div className="card card-padded" style={{ marginBottom: '20px', background: 'color-mix(in srgb, var(--tud-blue) 4%, var(--bg-card))' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: 'var(--tud-blue)' }}>WCAG 2.1 Compliance Notes</h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            ['1.4.3', 'Contrast (Minimum): 4.5:1 ratio for normal text across all themes'],
            ['2.4.1', 'Bypass Blocks: Skip-to-content link provided on every page'],
            ['2.4.3', 'Focus Order: Logical keyboard tab order throughout the app'],
            ['2.4.7', 'Focus Visible: All interactive elements show a visible focus ring'],
            ['1.3.1', 'Info and Relationships: Headings, landmarks, and ARIA labels throughout'],
            ['2.3.3', 'Animation from Interactions: Reduce Motion setting respects OS preference'],
            ['1.4.4', 'Resize Text: Text size can be increased up to 200% without loss of content'],
          ].map(([sc, desc]) => (
            <li key={sc} style={{ fontSize: '13px', display: 'flex', gap: '10px', color: 'var(--text-secondary)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', background: 'color-mix(in srgb, var(--tud-blue) 12%, transparent)', color: 'var(--tud-blue)', padding: '1px 7px', borderRadius: '4px', flexShrink: 0, alignSelf: 'flex-start', marginTop: '1px' }}>
                SC {sc}
              </span>
              {desc}
            </li>
          ))}
        </ul>
      </div>

      {/* Reset button */}
      <button className="btn btn-secondary" onClick={resetAll} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RotateCcw size={15} aria-hidden="true" />
        Reset All Settings to Default
      </button>
    </div>
  )
}
