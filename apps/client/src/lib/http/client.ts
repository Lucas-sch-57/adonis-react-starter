import { tokenStorage } from './token'
import type { ApiError, ApiResponse, HttpMethod, RequestConfig } from './types'

const BASE_URL = import.meta.env.VITE_API_URL


type HttpClientCallbacks = {
  onUnauthorized?: () => void 
}

let callbacks: HttpClientCallbacks = {}

export function configureHttpClient(config: HttpClientCallbacks) {
  callbacks = config
}


async function request<T>(
  method: HttpMethod,
  url: string,
  body?: unknown,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const { headers = {}, params, withAuth = true } = config

  // Ajout des query params si présents
  const fullUrl = new URL(`${BASE_URL}${url}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      fullUrl.searchParams.append(key, value)
    })
  }

  // Headers de base
  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  }

  // Ajout du token Bearer si disponible et withAuth activé
  if (withAuth) {
    const token = tokenStorage.get()
    if (token) {
      finalHeaders['Authorization'] = `Bearer ${token}`
    }
  }

  const response = await fetch(fullUrl.toString(), {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  // Réponse vide (ex: 204 No Content)
  if (response.status === 204) {
    return { data: null as T, status: response.status }
  }

  const json = await response.json()

  // Gestion des erreurs HTTP
  if (!response.ok) {
    // Intercepteur 401 : token expiré ou invalide
    if (response.status === 401) {
      tokenStorage.remove()
      callbacks.onUnauthorized?.()
    }

    const error: ApiError = {
      message: json?.message ?? 'Une erreur est survenue',
      status: response.status,
      errors: json?.errors,
    }

    throw error
  }

  return { data: json as T, status: response.status }
}


export const http = {
  get<T>(url: string, config?: RequestConfig) {
    return request<T>('GET', url, undefined, config)
  },

  post<T>(url: string, body?: unknown, config?: RequestConfig) {
    return request<T>('POST', url, body, config)
  },

  put<T>(url: string, body?: unknown, config?: RequestConfig) {
    return request<T>('PUT', url, body, config)
  },

  patch<T>(url: string, body?: unknown, config?: RequestConfig) {
    return request<T>('PATCH', url, body, config)
  },

  delete<T>(url: string, config?: RequestConfig) {
    return request<T>('DELETE', url, undefined, config)
  },
}