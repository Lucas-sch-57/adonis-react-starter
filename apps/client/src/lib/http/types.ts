export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type RequestConfig = {
  headers?: Record<string, string>
  params?: Record<string, string>
  withAuth?: boolean
}

export type ApiResponse<T> = {
  data: T
  status: number
}

export type ApiError = {
  message: string
  status: number
  errors?: Record<string, string[]>
}