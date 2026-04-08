import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuthStore } from '../stores/authStore'
import type {User, LoginPayload, SignupPayload } from '../types'
import { type ApiError } from '@/lib/http'

export function useAuth() {
  return useAuthStore()
}

export function useUser() {
  const user = useAuthStore((s) => s.user)
  if (!user) throw new Error('useUser must be used in an authenticated context')
  return user
}

export function useLogin() {
  const { setUser } = useAuthStore()
  const navigate = useNavigate()

  return useMutation<User,ApiError,LoginPayload>({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (user) => {
      setUser(user)
      navigate('/dashboard')
    },
  })
}

export function useSignup() {
  const { setUser } = useAuthStore()
  const navigate = useNavigate()

  return useMutation<User,ApiError,SignupPayload>({
    mutationFn: (payload: SignupPayload) => authService.signup(payload),
    onSuccess: (user) => {
      setUser(user)
      navigate('/dashboard')
    },
  })
}

export function useLogout() {
  const { clearUser } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      clearUser()
      queryClient.clear()
      navigate('/login')
    },
  })
}