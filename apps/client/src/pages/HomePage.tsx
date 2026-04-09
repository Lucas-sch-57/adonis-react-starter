import { Link } from 'react-router-dom'

const STACK = [
  { label: 'AdonisJS v7', desc: 'Backend · API REST · Auth' },
  { label: 'React 19 + Vite', desc: 'Frontend · HMR · TypeScript' },
  { label: 'Tanstack Query', desc: 'Server state · Cache · Mutations' },
  { label: 'Zustand', desc: 'Client state · Store léger' },
  { label: 'PostgreSQL', desc: 'Base de données · Lucid ORM' },
  { label: 'Docker Compose', desc: 'Dev · Prod · Services orchestrés' },
]

export function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* Grille de fond */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,255,62,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,255,62,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between px-8 py-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{
              background: 'var(--accent-dim)',
              color: 'var(--accent)',
              border: '1px solid var(--accent-border)',
            }}
          >
            v1.0.0
          </span>
          <span className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
            adonis-react-starter
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <a
            href="https://docs.adonisjs.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseOver={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            docs
          </a>
          <a
            href="https://github.com/Lucas-sch-57/adonis-react-starter"
            target="_blank"
            rel="noreferrer"
            className="text-sm transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseOver={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            github
          </a>
          <Link
            to="/login"
            className="text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            connexion →
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-8 py-24 max-w-5xl mx-auto w-full">
        <div className="animate-fade-up" style={{ animationDelay: '0ms' }}>
          <p className="font-mono text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--accent)' }}>$</span> npx create-adonis-react-starter my-project
            <span className="animate-blink ml-0.5" style={{ color: 'var(--accent)' }}>▊</span>
          </p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '80ms' }}>
          <h1
            className="font-mono text-5xl md:text-7xl font-medium leading-none mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            Starter.
            <br />
            <span style={{ color: 'var(--accent)' }}>Production-ready.</span>
          </h1>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '160ms' }}>
          <p className="text-lg mb-12 max-w-xl" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Un monorepo AdonisJS + React opinioné, avec auth JWT, Docker Compose, et une structure feature-based prête à scaler.
          </p>
        </div>

        <div className="animate-fade-up flex gap-4 flex-wrap" style={{ animationDelay: '240ms' }}>
          <Link
            to="/signup"
            className="font-mono text-sm px-6 py-3 rounded transition-all"
            style={{
              background: 'var(--accent)',
              color: '#0a0a0a',
              fontWeight: 500,
            }}
            onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={e => (e.currentTarget.style.opacity = '1')}
          >
            get started →
          </Link>
          <a
            href="https://github.com/Lucas-sch-57/adonis-react-starter"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm px-6 py-3 rounded transition-all"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = 'var(--border-hover)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            ★ github
          </a>
        </div>

        {/* Stack grid */}
        <div
          className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-px animate-fade-up"
          style={{
            animationDelay: '320ms',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {STACK.map(({ label, desc }) => (
            <div
              key={label}
              className="p-5 transition-colors"
              style={{ background: 'var(--bg-2)' }}
              onMouseOver={e => (e.currentTarget.style.background = 'var(--bg-3)')}
              onMouseOut={e => (e.currentTarget.style.background = 'var(--bg-2)')}
            >
              <p className="font-mono text-sm mb-1" style={{ color: 'var(--accent)' }}>
                {label}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 px-8 py-5 flex items-center justify-between"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          MIT License
        </span>
        <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          Built with AdonisJS & React
        </span>
      </footer>
    </div>
  )
}