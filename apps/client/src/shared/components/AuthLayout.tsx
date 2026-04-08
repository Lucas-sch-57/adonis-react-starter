import { type ReactNode, type InputHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

// ─────────────────────────────────────────
// Layout partagé login / signup
// ─────────────────────────────────────────
export function AuthLayout({ children, title, subtitle }: {
  children: ReactNode
  title: string
  subtitle: ReactNode
}) {
  return (
    <div
      className="min-h-screen flex"
      style={{ background: 'var(--bg)' }}
    >
      {/* Panneau gauche — déco */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12"
        style={{ borderRight: '1px solid var(--border)' }}
      >
        <Link to="/" className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
          ← retour
        </Link>

        <div>
          <p className="font-mono text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
            stack incluse
          </p>
          <div className="space-y-3">
            {['AdonisJS v7', 'React 19 + Vite', 'Tanstack Query', 'Zustand', 'PostgreSQL', 'Docker'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span style={{ color: 'var(--accent)' }} className="font-mono text-xs">→</span>
                <span className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          adonis-react-starter v1.0.0
        </p>
      </div>

      {/* Panneau droit — form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm animate-fade-up">
          <div className="mb-10">
            <h1
              className="font-mono text-2xl font-medium mb-2"
              style={{ color: 'var(--text)' }}
            >
              {title}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Champ de formulaire
// ─────────────────────────────────────────
type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function FormField({ label, error, ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded text-sm outline-none transition-all"
        style={{
          background: 'var(--bg-2)',
          border: `1px solid ${error ? 'var(--error)' : 'var(--border)'}`,
          color: 'var(--text)',
          fontFamily: 'inherit',
        }}
        onFocus={e => {
          if (!error) e.currentTarget.style.borderColor = 'var(--accent-border)'
        }}
        onBlur={e => {
          if (!error) e.currentTarget.style.borderColor = 'var(--border)'
        }}
      />
      {error && (
        <p className="font-mono text-xs" style={{ color: 'var(--error)' }}>
          {error}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// Bouton submit
// ─────────────────────────────────────────
export function SubmitButton({ children, isLoading }: { children: ReactNode; isLoading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full font-mono text-sm py-3 rounded transition-all"
      style={{
        background: isLoading ? 'var(--bg-3)' : 'var(--accent)',
        color: isLoading ? 'var(--text-muted)' : '#0a0a0a',
        fontWeight: 500,
        cursor: isLoading ? 'not-allowed' : 'pointer',
        border: 'none',
      }}
    >
      {isLoading ? 'chargement...' : children}
    </button>
  )
}

// ─────────────────────────────────────────
// Affichage d'erreur API
// ─────────────────────────────────────────
export function ApiErrorMessage({ message }: { message?: string }) {
  if (!message) return null
  return (
    <div
      className="px-4 py-3 rounded font-mono text-xs"
      style={{
        background: 'var(--error-dim)',
        border: '1px solid var(--error)',
        color: 'var(--error)',
      }}
    >
      {message}
    </div>
  )
}