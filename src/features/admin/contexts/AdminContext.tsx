/**
 * Admin Context Provider
 * Manages state for admin CRUD operations on Events and Blog Posts
 */

import React, { createContext, useContext, useReducer, type ReactNode } from 'react'
import eventsData from '@/mocks/events.json'
import {
  type AdminEvent,
  type BlogPost,
  type AdminState,
  type AdminAction,
  type CreateEventInput,
  type CreateBlogPostInput,
  type UpdateEventInput,
  type UpdateBlogPostInput,
  BlogPostStatus,
} from '../types'
import { createEventWithId, createBlogPostWithId } from '../utils'

// Constants
const DEFAULT_AUTHOR = 'TechLabs Team'

// Sample blog posts for initial state
const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Web Development',
    slug: 'getting-started-with-web-development',
    excerpt: 'Learn the fundamentals of web development and start your journey into tech.',
    content:
      '<h2>Introduction</h2><p>Web development is one of the most in-demand skills in the tech industry today...</p>',
    featuredImage: '/img/stories/person1.png',
    author: DEFAULT_AUTHOR,
    tags: ['web-dev', 'beginner', 'tutorial'],
    status: BlogPostStatus.PUBLISHED,
    publishedAt: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Data Science Career Paths in 2024',
    slug: 'data-science-career-paths-2024',
    excerpt: 'Explore the various career opportunities in data science and AI.',
    content: '<h2>The Data Science Landscape</h2><p>Data science continues to evolve rapidly...</p>',
    featuredImage: '/img/stories/person2.png',
    author: DEFAULT_AUTHOR,
    tags: ['data-science', 'career', 'ai'],
    status: BlogPostStatus.PUBLISHED,
    publishedAt: '2024-02-01T12:00:00Z',
    createdAt: '2024-01-28T09:00:00Z',
    updatedAt: '2024-02-01T12:00:00Z',
  },
  {
    id: '3',
    title: 'UX Design Best Practices',
    slug: 'ux-design-best-practices',
    excerpt: 'Draft article about user experience design principles.',
    content: '<h2>Draft</h2><p>This is a work in progress...</p>',
    featuredImage: '',
    author: DEFAULT_AUTHOR,
    tags: ['design', 'ux'],
    status: BlogPostStatus.DRAFT,
    createdAt: '2024-02-10T14:00:00Z',
    updatedAt: '2024-02-10T14:00:00Z',
  },
]

// Initial state from mock data
const initialState: AdminState = {
  events: eventsData.events as AdminEvent[],
  blogPosts: sampleBlogPosts,
  loading: false,
  error: null,
}

// Reducer function
const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_EVENTS':
      return { ...state, events: action.payload }
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] }
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(e => (e.id === action.payload.id ? action.payload : e)),
      }
    case 'DELETE_EVENT':
      return { ...state, events: state.events.filter(e => e.id !== action.payload) }
    case 'SET_BLOG_POSTS':
      return { ...state, blogPosts: action.payload }
    case 'ADD_BLOG_POST':
      return { ...state, blogPosts: [...state.blogPosts, action.payload] }
    case 'UPDATE_BLOG_POST':
      return {
        ...state,
        blogPosts: state.blogPosts.map(p => (p.id === action.payload.id ? action.payload : p)),
      }
    case 'DELETE_BLOG_POST':
      return { ...state, blogPosts: state.blogPosts.filter(p => p.id !== action.payload) }
    default:
      return state
  }
}

// Context type
type AdminContextType = {
  state: AdminState
  // Event operations
  createEvent: (input: CreateEventInput) => void
  updateEvent: (input: UpdateEventInput) => void
  deleteEvent: (id: string) => void
  // Blog Post operations
  createBlogPost: (input: CreateBlogPostInput) => void
  updateBlogPost: (input: UpdateBlogPostInput) => void
  deleteBlogPost: (id: string) => void
  // Utility
  clearError: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

type AdminProviderProps = {
  readonly children: ReactNode
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState)

  // Event operations
  const createEvent = (input: CreateEventInput): void => {
    const newEvent = createEventWithId(input)

    dispatch({ type: 'ADD_EVENT', payload: newEvent })
  }

  const updateEvent = (input: UpdateEventInput): void => {
    const existingEvent = state.events.find(e => e.id === input.id)

    if (existingEvent) {
      const updatedEvent: AdminEvent = { ...existingEvent, ...input }

      dispatch({ type: 'UPDATE_EVENT', payload: updatedEvent })
    }
  }

  const deleteEvent = (id: string): void => {
    dispatch({ type: 'DELETE_EVENT', payload: id })
  }

  // Blog Post operations
  const createBlogPost = (input: CreateBlogPostInput): void => {
    const newPost = createBlogPostWithId(input)

    dispatch({ type: 'ADD_BLOG_POST', payload: newPost })
  }

  const updateBlogPost = (input: UpdateBlogPostInput): void => {
    const existingPost = state.blogPosts.find(p => p.id === input.id)

    if (existingPost) {
      const now = new Date().toISOString()
      const updatedPost: BlogPost = {
        ...existingPost,
        ...input,
        updatedAt: now,
        publishedAt:
          input.status === BlogPostStatus.PUBLISHED && !existingPost.publishedAt ? now : existingPost.publishedAt,
      }

      dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost })
    }
  }

  const deleteBlogPost = (id: string): void => {
    dispatch({ type: 'DELETE_BLOG_POST', payload: id })
  }

  // Utility
  const clearError = (): void => {
    dispatch({ type: 'SET_ERROR', payload: null })
  }

  const value: AdminContextType = {
    state,
    createEvent,
    updateEvent,
    deleteEvent,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    clearError,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext)

  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }

  return context
}
