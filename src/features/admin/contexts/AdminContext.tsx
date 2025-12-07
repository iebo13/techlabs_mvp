/**
 * Admin Context Provider
 * Manages state for admin CRUD operations on Events, Stories, and Partners
 */

import React, { createContext, useContext, useReducer, type ReactNode } from 'react'
import eventsData from '@/mocks/events.json'
import partnersData from '@/mocks/partners.json'
import storiesArray from '@/mocks/stories.json'
import {
  type AdminEvent,
  type AdminStory,
  type AdminPartner,
  type AdminState,
  type AdminAction,
  type CreateEventInput,
  type CreateStoryInput,
  type CreatePartnerInput,
  type UpdateEventInput,
  type UpdateStoryInput,
  type UpdatePartnerInput,
} from '../types'
import { createEventWithId, createStoryWithId, createPartnerWithId } from '../utils'

// Initial state from mock data
const initialState: AdminState = {
  events: eventsData.events as AdminEvent[],
  stories: storiesArray as AdminStory[],
  partners: partnersData.partners.map((p, index) => ({
    ...p,
    id: `partner-${index + 1}`,
  })) as AdminPartner[],
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
    case 'SET_STORIES':
      return { ...state, stories: action.payload }
    case 'ADD_STORY':
      return { ...state, stories: [...state.stories, action.payload] }
    case 'UPDATE_STORY':
      return {
        ...state,
        stories: state.stories.map(s => (s.id === action.payload.id ? action.payload : s)),
      }
    case 'DELETE_STORY':
      return { ...state, stories: state.stories.filter(s => s.id !== action.payload) }
    case 'SET_PARTNERS':
      return { ...state, partners: action.payload }
    case 'ADD_PARTNER':
      return { ...state, partners: [...state.partners, action.payload] }
    case 'UPDATE_PARTNER':
      return {
        ...state,
        partners: state.partners.map(p => (p.id === action.payload.id ? action.payload : p)),
      }
    case 'DELETE_PARTNER':
      return { ...state, partners: state.partners.filter(p => p.id !== action.payload) }
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
  // Story operations
  createStory: (input: CreateStoryInput) => void
  updateStory: (input: UpdateStoryInput) => void
  deleteStory: (id: string) => void
  // Partner operations
  createPartner: (input: CreatePartnerInput) => void
  updatePartner: (input: UpdatePartnerInput) => void
  deletePartner: (id: string) => void
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

  // Story operations
  const createStory = (input: CreateStoryInput): void => {
    const newStory = createStoryWithId(input)

    dispatch({ type: 'ADD_STORY', payload: newStory })
  }

  const updateStory = (input: UpdateStoryInput): void => {
    const existingStory = state.stories.find(s => s.id === input.id)

    if (existingStory) {
      const updatedStory: AdminStory = { ...existingStory, ...input }

      dispatch({ type: 'UPDATE_STORY', payload: updatedStory })
    }
  }

  const deleteStory = (id: string): void => {
    dispatch({ type: 'DELETE_STORY', payload: id })
  }

  // Partner operations
  const createPartner = (input: CreatePartnerInput): void => {
    const newPartner = createPartnerWithId(input)

    dispatch({ type: 'ADD_PARTNER', payload: newPartner })
  }

  const updatePartner = (input: UpdatePartnerInput): void => {
    const existingPartner = state.partners.find(p => p.id === input.id)

    if (existingPartner) {
      const updatedPartner: AdminPartner = { ...existingPartner, ...input }

      dispatch({ type: 'UPDATE_PARTNER', payload: updatedPartner })
    }
  }

  const deletePartner = (id: string): void => {
    dispatch({ type: 'DELETE_PARTNER', payload: id })
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
    createStory,
    updateStory,
    deleteStory,
    createPartner,
    updatePartner,
    deletePartner,
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
