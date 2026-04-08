import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '@/features/auth'
import { AuthLayout, FormField, SubmitButton, ApiErrorMessage } from '@/shared/components/AuthLayout'
import type { ApiError } from '@/lib/http'

export function LoginPage() {
  const { mutate: login, isPending, error } = useLogin()
  const apiError = error as ApiError | null

  const [form, setForm] = useState({ email: '', password: '' })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    login(form)
  }

  return (
    <AuthLayout
      title="connexion_"
      subtitle="Pas encore de compte ? → "
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <ApiErrorMessage message={apiError?.message} />

        <FormField
          label="email"
          type="email"
          placeholder="vous@exemple.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
          autoComplete="email"
        />

        <FormField
          label="mot de passe"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          required
          autoComplete="current-password"
        />

        <SubmitButton isLoading={isPending}>
          se connecter →
        </SubmitButton>

        <p className="text-center font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          Pas de compte ?{' '}
          <Link to="/signup" style={{ color: 'var(--accent)' }}>
            inscription
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}