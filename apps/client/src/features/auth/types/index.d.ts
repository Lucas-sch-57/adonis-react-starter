export type User = {
  id: number
  fullName: string | null
  email: string
  createdAt: string
  updatedAt: string | null
  initials: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type SignupPayload = {
  fullName: string | null
  email: string
  password: string
  passwordConfirmation: string
}

export type AuthResponse = {
  data: {
    user: User,
    token: string
  }
}