import { useUser, useLogout } from '@/features/auth'

const QUICK_LINKS = [
  { label: 'Documentation Adonis', href: 'https://docs.adonisjs.com', desc: 'Guides, API, recipes' },
  { label: 'Tanstack Query', href: 'https://tanstack.com/query', desc: 'Server state management' },
  { label: 'Zustand', href: 'https://zustand-demo.pmnd.rs', desc: 'Client state store' },
  { label: 'Vite', href: 'https://vitejs.dev', desc: 'Build tool ultra-rapide' },
]

export function DashboardPage() {
  const user = useUser()
  const { mutate: logout, isPending } = useLogout()


  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)' }}>

      {/* Header */}
      <header
        className="flex items-center justify-between px-8 py-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            adonis-react-starter
          </span>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="font-mono text-sm" style={{ color: 'var(--accent)' }}>
            dashboard
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            {/* Avatar initiales */}
            <div
              className="w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-medium"
              style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}
            >
              {user.initials}
            </div>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {user.fullName ?? user.email}
            </span>
          </div>

          <button
            onClick={() => logout()}
            disabled={isPending}
            className="font-mono text-xs transition-colors"
            style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseOver={e => (e.currentTarget.style.color = 'var(--error)')}
            onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {isPending ? 'déconnexion...' : 'déconnexion →'}
          </button>
        </div>
      </header>

      {/* Contenu */}
      <main className="flex-1 px-8 py-12 max-w-4xl mx-auto w-full">

        {/* Bienvenue */}
        <div className="mb-16 animate-fade-up">
          <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
            connecté en tant que <span style={{ color: 'var(--accent)' }}>{user.email}</span>
          </p>
          <h1 className="font-mono text-4xl font-medium" style={{ letterSpacing: '-0.02em' }}>
            Bonjour, {user.fullName?.split(' ')[0] ?? 'vous'}.
          </h1>
        </div>

        {/* Stats placeholder */}
        <div
          className="grid grid-cols-3 gap-px mb-12 animate-fade-up rounded-xl overflow-hidden"
          style={{ animationDelay: '80ms', border: '1px solid var(--border)' }}
        >
          {[
            { label: 'token actif', value: '1' },
            { label: 'rôle', value: 'user' },
            { label: 'membre depuis', value: new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }) },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="p-6"
              style={{ background: 'var(--bg-2)' }}
            >
              <p className="font-mono text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                {label}
              </p>
              <p className="font-mono text-2xl font-medium" style={{ color: 'var(--accent)' }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Liens rapides */}
        <div className="animate-fade-up" style={{ animationDelay: '160ms' }}>
          <p className="font-mono text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
            liens utiles
          </p>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map(({ label, href, desc }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-lg flex items-start gap-3 transition-colors group"
                style={{
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                }}
                onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                onMouseOut={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <span style={{ color: 'var(--accent)' }} className="font-mono text-xs mt-0.5">→</span>
                <div>
                  <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--text)' }}>
                    {label}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Placeholder feature */}
        <div
          className="mt-12 p-8 rounded-xl text-center animate-fade-up"
          style={{
            animationDelay: '240ms',
            border: '1px dashed var(--border)',
            background: 'var(--bg-2)',
          }}
        >
          <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            // votre feature ici
          </p>
          <p className="font-mono text-xs mt-2" style={{ color: 'var(--border-hover)' }}>
            créez vos features dans src/features/
          </p>
        </div>
      </main>
    </div>
  )
}