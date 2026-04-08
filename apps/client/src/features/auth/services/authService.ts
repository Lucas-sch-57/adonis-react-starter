import { http, tokenStorage } from '@/lib/http'
import type { AuthResponse, LoginPayload, SignupPayload, User } from '../types'

export const authService = {
  async login(payload: LoginPayload): Promise<User> {
    const { data } = await http.post<AuthResponse>('/api/v1/auth/login', payload, {
      withAuth: false,
    })
    console.log(data)
    tokenStorage.set(data.data.token)
    return data.data.user
  },

  async signup(payload: SignupPayload): Promise<User> {
    const { data } = await http.post<AuthResponse>('/api/v1/auth/signup', payload, {
      withAuth: false,
    })
    tokenStorage.set(data.data.token)
    return data.data.user
  },

  async logout(): Promise<void> {
    await http.post('/api/v1/auth/logout')
    tokenStorage.remove()
  },

  async me(): Promise<User> {
    const { data } = await http.get<User>('/api/v1/account/profile')
    return data
  },
}