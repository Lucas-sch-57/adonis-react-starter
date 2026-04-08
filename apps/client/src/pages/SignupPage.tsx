import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '@/features/auth'
import { AuthLayout, FormField, SubmitButton, ApiErrorMessage } from '@/shared/components/AuthLayout'
import type { ApiError } from '@/lib/http'

export function SignupPage() {
  const { mutate: signup, isPending, error } = useSignup()
  const apiError = error as ApiError | null

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const [clientError, setClientError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setClientError('')

    if (form.password !== form.passwordConfirmation) {
      setClientError('Les mots de passe ne correspondent pas.')
      return
    }

    signup({ ...form, fullName: form.fullName || null })
  }

  return (
    <AuthLayout
      title="inscription_"
      subtitle="Déjà un compte ?"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <ApiErrorMessage message={clientError || apiError?.message} />

        <FormField
          label="nom complet"
          type="text"
          placeholder="Jean Dupont"
          value={form.fullName}
          onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
          autoComplete="name"
        />

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
          placeholder="8 caractères minimum"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          required
          autoComplete="new-password"
        />

        <FormField
          label="confirmer le mot de passe"
          type="password"
          placeholder="••••••••"
          value={form.passwordConfirmation}
          onChange={e => setForm(f => ({ ...f, passwordConfirmation: e.target.value }))}
          required
          autoComplete="new-password"
          error={clientError ? ' ' : undefined}
        />

        <SubmitButton isLoading={isPending}>
          créer mon compte →
        </SubmitButton>

        <p className="text-center font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          Déjà un compte ?{' '}
          <Link to="/login" style={{ color: 'var(--accent)' }}>
            connexion
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}