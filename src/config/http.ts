import { QueryClient } from '@tanstack/react-query'

// HTTP client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

// Base API configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// HTTP error types
export type ApiError = {
  code: string
  message: string
  details?: Record<string, unknown>
  traceId?: string
}

// HTTP response envelope
export type ApiResponse<T> = {
  status: 'success' | 'fail' | 'error'
  results?: number
  data: T
  message?: string
}

// HTTP error response
export type ApiErrorResponse = {
  status: 'fail' | 'error'
  message: string
  stack?: string
}

// Fetch wrapper
export const httpClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)

    if (!response.ok) {
      const errorData = (await response.json()) as ApiErrorResponse
      throw new Error(errorData.message || 'API request failed')
    }

    const data = (await response.json()) as ApiResponse<T>
    return data.data
  },

  async post<T, B>(endpoint: string, body: B): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = (await response.json()) as ApiErrorResponse
      throw new Error(errorData.message || 'API request failed')
    }

    const data = (await response.json()) as ApiResponse<T>
    return data.data
  },

  async patch<T, B>(endpoint: string, body: B): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = (await response.json()) as ApiErrorResponse
      throw new Error(errorData.message || 'API request failed')
    }

    const data = (await response.json()) as ApiResponse<T>
    return data.data
  },

  async delete(endpoint: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorData = (await response.json()) as ApiErrorResponse
      throw new Error(errorData.message || 'API request failed')
    }
  },
}

// HTTP client utilities
export const createApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`
}

// Error mapping utilities
export const mapHttpError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return {
      code: 'HTTP_ERROR',
      message: error.message,
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
  }
}
