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
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// HTTP error types
export type ApiError = {
  code: string
  message: string
  details?: Record<string, unknown>
  traceId?: string
}

// HTTP response envelope
export type ApiResponse<T> = {
  data: T
}

// HTTP error response
export type ApiErrorResponse = {
  error: ApiError
}

// HTTP client utilities
export const createApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`
}

// Error mapping utilities
export const mapHttpError = (error: unknown): ApiError => {
  if (error && typeof error === 'object' && 'error' in error) {
    return (error as ApiErrorResponse).error
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
  }
}
