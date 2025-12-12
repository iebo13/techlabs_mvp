import { API_BASE_URL, type ApiError, type ApiResponse } from '@/config/http'

// API client utility
type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}

const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken')
}

const apiClient = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', body, headers = {} } = options

  const token = getAuthToken()

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    const error: { error: ApiError } = await response.json()
    throw new Error(error.error.message || 'An error occurred')
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T
  }

  const data = await response.json()

  return data as T
}

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await apiClient<ApiResponse<{ user: User; token: string }>>('/auth/login', {
      method: 'POST',
      body: { email, password },
    })

    // Store token
    localStorage.setItem('authToken', response.data.token)

    return response
  },

  register: async (data: {
    email: string
    password: string
    firstName?: string
    lastName?: string
  }): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await apiClient<ApiResponse<{ user: User; token: string }>>('/auth/register', {
      method: 'POST',
      body: data,
    })

    // Store token
    localStorage.setItem('authToken', response.data.token)

    return response
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    return apiClient<ApiResponse<User>>('/auth/me')
  },

  logout: (): void => {
    localStorage.removeItem('authToken')
  },
}

// Events API
export const eventsApi = {
  getAll: async (params?: {
    page?: number
    limit?: number
    sort?: string
    order?: 'asc' | 'desc'
  }): Promise<PaginatedResponse<Event>> => {
    const queryParams = new URLSearchParams()

    if (params?.page) queryParams.append('page', String(params.page))
    if (params?.limit) queryParams.append('limit', String(params.limit))
    if (params?.sort) queryParams.append('sort', params.sort)
    if (params?.order) queryParams.append('order', params.order)

    const query = queryParams.toString()

    return apiClient<PaginatedResponse<Event>>(`/events${query ? `?${query}` : ''}`)
  },

  getById: async (id: string): Promise<ApiResponse<Event>> => {
    return apiClient<ApiResponse<Event>>(`/events/${id}`)
  },

  create: async (data: CreateEventInput): Promise<ApiResponse<Event>> => {
    return apiClient<ApiResponse<Event>>('/events', {
      method: 'POST',
      body: data,
    })
  },

  update: async (id: string, data: UpdateEventInput): Promise<ApiResponse<Event>> => {
    return apiClient<ApiResponse<Event>>(`/events/${id}`, {
      method: 'PUT',
      body: data,
    })
  },

  delete: async (id: string): Promise<void> => {
    return apiClient<void>(`/events/${id}`, {
      method: 'DELETE',
    })
  },
}

// Blog Posts API
export const blogPostsApi = {
  getAll: async (params?: {
    page?: number
    limit?: number
    sort?: string
    order?: 'asc' | 'desc'
  }): Promise<PaginatedResponse<BlogPost>> => {
    const queryParams = new URLSearchParams()

    if (params?.page) queryParams.append('page', String(params.page))
    if (params?.limit) queryParams.append('limit', String(params.limit))
    if (params?.sort) queryParams.append('sort', params.sort)
    if (params?.order) queryParams.append('order', params.order)

    const query = queryParams.toString()

    return apiClient<PaginatedResponse<BlogPost>>(`/blog-posts${query ? `?${query}` : ''}`)
  },

  getById: async (id: string): Promise<ApiResponse<BlogPost>> => {
    return apiClient<ApiResponse<BlogPost>>(`/blog-posts/${id}`)
  },

  create: async (data: CreateBlogPostInput): Promise<ApiResponse<BlogPost>> => {
    return apiClient<ApiResponse<BlogPost>>('/blog-posts', {
      method: 'POST',
      body: data,
    })
  },

  update: async (id: string, data: UpdateBlogPostInput): Promise<ApiResponse<BlogPost>> => {
    return apiClient<ApiResponse<BlogPost>>(`/blog-posts/${id}`, {
      method: 'PUT',
      body: data,
    })
  },

  delete: async (id: string): Promise<void> => {
    return apiClient<void>(`/blog-posts/${id}`, {
      method: 'DELETE',
    })
  },
}

// Types
type User = {
  _id: string
  email: string
  role: 'admin' | 'user'
  firstName?: string
  lastName?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

type Event = {
  _id: string
  title: string
  slug: string
  type: string
  date: string
  location: string
  blurb: string
  description?: string
  imageUrl?: string
  registrationUrl?: string
  capacity?: number
  registeredCount: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

type CreateEventInput = Omit<Event, '_id' | 'createdAt' | 'updatedAt' | 'registeredCount'>
type UpdateEventInput = Partial<CreateEventInput>

type BlogPost = {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  author: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

type CreateBlogPostInput = Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt' | 'publishedAt'>
type UpdateBlogPostInput = Partial<CreateBlogPostInput>

type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
