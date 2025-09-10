/**
 * MSW Request Handlers
 * Define mock API responses for testing
 */

import { http, HttpResponse } from 'msw'

// Mock API base URL - adjust based on your API configuration
const API_BASE_URL = '/api'

// Default request handlers for common API endpoints
export const handlers = [
  // Health check endpoint
  http.get(`${API_BASE_URL}/health`, () => {
    return HttpResponse.json({ status: 'ok', timestamp: new Date().toISOString() }, { status: 200 })
  }),

  // Mock authentication endpoints
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string }

    // Mock successful login
    if (body.email && body.password) {
      return HttpResponse.json(
        {
          user: {
            id: 1,
            email: body.email,
            name: 'Test User',
          },
          token: 'mock-jwt-token',
        },
        { status: 200 }
      )
    }

    // Mock invalid credentials
    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }),

  http.post(`${API_BASE_URL}/auth/logout`, () => {
    return HttpResponse.json({ message: 'Logged out successfully' }, { status: 200 })
  }),

  // Mock user profile endpoint
  http.get(`${API_BASE_URL}/user/profile`, () => {
    return HttpResponse.json(
      {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        avatar: 'https://via.placeholder.com/150',
      },
      { status: 200 }
    )
  }),

  // Mock data endpoints (adjust based on your application)
  http.get(`${API_BASE_URL}/stories`, ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const limit = Number(url.searchParams.get('limit')) || 10

    return HttpResponse.json(
      {
        data: Array.from({ length: limit }, (_, index) => ({
          id: (page - 1) * limit + index + 1,
          title: `Mock Story ${(page - 1) * limit + index + 1}`,
          content: 'This is a mock story for testing purposes.',
          author: 'Test Author',
          createdAt: new Date().toISOString(),
        })),
        pagination: {
          page,
          limit,
          total: 100,
          totalPages: Math.ceil(100 / limit),
        },
      },
      { status: 200 }
    )
  }),

  http.get(`${API_BASE_URL}/events`, () => {
    return HttpResponse.json(
      {
        data: [
          {
            id: 1,
            title: 'Mock Event 1',
            description: 'This is a mock event for testing.',
            date: new Date().toISOString(),
            location: 'Test Location',
          },
          {
            id: 2,
            title: 'Mock Event 2',
            description: 'Another mock event for testing.',
            date: new Date().toISOString(),
            location: 'Another Test Location',
          },
        ],
      },
      { status: 200 }
    )
  }),

  // Mock form submission endpoints
  http.post(`${API_BASE_URL}/contact`, async ({ request }) => {
    const body = (await request.json()) as {
      name: string
      email: string
      message: string
    }

    // Simulate form validation
    if (!body.name || !body.email || !body.message) {
      return HttpResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    return HttpResponse.json({ message: 'Message sent successfully' }, { status: 200 })
  }),

  // Mock error endpoint for testing error handling
  http.get(`${API_BASE_URL}/error`, () => {
    return HttpResponse.json({ error: 'Internal server error' }, { status: 500 })
  }),

  // Mock network delay endpoint for testing loading states
  http.get(`${API_BASE_URL}/slow`, async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return HttpResponse.json({ message: 'This response was delayed' }, { status: 200 })
  }),
]

// Export individual handler groups for specific test scenarios
export const authHandlers = handlers.filter(handler => handler.info.header?.includes('/auth/'))

export const dataHandlers = handlers.filter(
  handler => handler.info.header?.includes('/stories') || handler.info.header?.includes('/events')
)

export const errorHandlers = [
  // Handler that always returns error
  http.get(`${API_BASE_URL}/*`, () => {
    return HttpResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }),
]
