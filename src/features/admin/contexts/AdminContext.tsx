/**
 * Admin Context Provider
 * Loads and persists Events/Blog Posts via backend API.
 */

import React, { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import { mapHttpError } from '@/config/http'
import {
  createAdminBlogPost,
  createAdminEvent,
  deleteAdminBlogPost,
  deleteAdminEvent,
  getAdminBlogPosts,
  getAdminEvents,
  updateAdminBlogPost,
  updateAdminEvent,
} from '../api/adminApi'
import {
  BlogPostStatus,
  type AdminAction,
  type AdminState,
  type CreateBlogPostInput,
  type CreateEventInput,
  type UpdateBlogPostInput,
  type UpdateEventInput,
} from '../types'

const initialState: AdminState = {
  events: [],
  blogPosts: [],
  loading: false,
  error: null,
}

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_EVENTS':
      return { ...state, events: action.payload }
    case 'ADD_EVENT':
      return { ...state, events: [action.payload, ...state.events] }
    case 'UPDATE_EVENT':
      return { ...state, events: state.events.map(e => (e.id === action.payload.id ? action.payload : e)) }
    case 'DELETE_EVENT':
      return { ...state, events: state.events.filter(e => e.id !== action.payload) }
    case 'SET_BLOG_POSTS':
      return { ...state, blogPosts: action.payload }
    case 'ADD_BLOG_POST':
      return { ...state, blogPosts: [action.payload, ...state.blogPosts] }
    case 'UPDATE_BLOG_POST':
      return { ...state, blogPosts: state.blogPosts.map(p => (p.id === action.payload.id ? action.payload : p)) }
    case 'DELETE_BLOG_POST':
      return { ...state, blogPosts: state.blogPosts.filter(p => p.id !== action.payload) }
    default:
      return state
  }
}

type AdminContextType = {
  state: AdminState
  refresh: () => Promise<void>
  createEvent: (input: CreateEventInput) => Promise<void>
  updateEvent: (input: UpdateEventInput) => Promise<void>
  deleteEvent: (id: string) => Promise<void>
  createBlogPost: (input: CreateBlogPostInput) => Promise<void>
  updateBlogPost: (input: UpdateBlogPostInput) => Promise<void>
  deleteBlogPost: (id: string) => Promise<void>
  clearError: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

type AdminProviderProps = {
  readonly children: ReactNode
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState)

  const setLoading = (value: boolean): void => {
    dispatch({ type: 'SET_LOADING', payload: value })
  }

  const setErrorFromUnknown = (err: unknown): void => {
    const apiError = mapHttpError(err)

    dispatch({ type: 'SET_ERROR', payload: apiError.message })
  }

  const refresh = async (): Promise<void> => {
    setLoading(true)
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      const [events, blogPosts] = await Promise.all([getAdminEvents(), getAdminBlogPosts()])

      dispatch({ type: 'SET_EVENTS', payload: events })
      dispatch({ type: 'SET_BLOG_POSTS', payload: blogPosts })
    } catch (err) {
      setErrorFromUnknown(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createEvent = async (input: CreateEventInput): Promise<void> => {
    setLoading(true)
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      const created = await createAdminEvent(input)

      dispatch({ type: 'ADD_EVENT', payload: created })
    } catch (err) {
      setErrorFromUnknown(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateEvent = async (input: UpdateEventInput): Promise<void> => {
    setLoading(true)
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      const updated = await updateAdminEvent(input)

      dispatch({ type: 'UPDATE_EVENT', payload: updated })
    } catch (err) {
      setErrorFromUnknown(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteEvent = async (id: string): Promise<void> => {
    setLoading(true)
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      await deleteAdminEvent(id)
      dispatch({ type: 'DELETE_EVENT', payload: id })
    } catch (err) {
      setErrorFromUnknown(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createBlogPost = async (input: CreateBlogPostInput): Promise<void> => {
    setLoading(true)
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      const created = await createAdminBlogPost(input)

      dispatch({ type: 'ADD_BLOG_POST', payload: created })
    } catch (err) {
      setErrorFromUnknown(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateBlogPost = async (input: UpdateBlogPostInput): Promise<void> => {
    setLoading(true)
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      const existingPost = state.blogPosts.find(p => p.id === input.id)
      const now = new Date().toISOString()

      const updated = await updateAdminBlogPost({
        ...input,
        updatedAt: now,
        publishedAt:
          input.status === BlogPostStatus.PUBLISHED && !existingPost?.publishedAt ? now : existingPost?.publishedAt,
      })

      dispatch({ type: 'UPDATE_BLOG_POST', payload: updated })
    } catch (err) {
      setErrorFromUnknown(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteBlogPost = async (id: string): Promise<void> => {
    setLoading(true)
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      await deleteAdminBlogPost(id)
      dispatch({ type: 'DELETE_BLOG_POST', payload: id })
    } catch (err) {
      setErrorFromUnknown(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearError = (): void => {
    dispatch({ type: 'SET_ERROR', payload: null })
  }

  const value: AdminContextType = {
    state,
    refresh,
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
