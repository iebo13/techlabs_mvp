import type { Request } from 'express'

// Extend Express Request type to include authenticated user
export type AuthRequest = Request & {
  user?: {
    id: string
    email: string
    role: 'admin' | 'user'
  }
}

// API Response envelope
export type ApiResponse<T> = {
  data: T
}

// API Error type
export type ApiError = {
  code: string
  message: string
  details?: Record<string, unknown>
  traceId?: string
}

// API Error response
export type ApiErrorResponse = {
  error: ApiError
}

// Pagination parameters
export type PaginationParams = {
  page: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
}

// Paginated response
export type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
