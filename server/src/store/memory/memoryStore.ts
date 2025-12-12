import type {
  BlogPost,
  CreateBlogPostInput,
  UpdateBlogPostInput,
} from '../../domains/content/blogPosts/blogPost.schemas'
import type { CreateEventInput, Event, UpdateEventInput } from '../../domains/content/events/event.schemas'
import { makeId } from './makeId'
import { loadSeedEvents } from './loadSeedEvents'
import { seedBlogPosts } from './seedBlogPosts'

export type MemoryStore = {
  getEvents: () => Event[]
  createEvent: (input: CreateEventInput) => Event
  updateEvent: (input: UpdateEventInput) => Event | null
  deleteEvent: (id: string) => boolean
  getBlogPosts: () => BlogPost[]
  createBlogPost: (input: CreateBlogPostInput) => BlogPost
  updateBlogPost: (input: UpdateBlogPostInput) => BlogPost | null
  deleteBlogPost: (id: string) => boolean
}

export const createMemoryStore = async (): Promise<MemoryStore> => {
  const state: {
    events: Event[]
    blogPosts: BlogPost[]
  } = {
    events: await loadSeedEvents(),
    blogPosts: seedBlogPosts(),
  }

  return {
    getEvents: () => state.events,
    createEvent: input => {
      const created: Event = { ...input, id: makeId() }
      state.events = [created, ...state.events]
      return created
    },
    updateEvent: input => {
      const idx = state.events.findIndex(e => e.id === input.id)
      if (idx < 0) return null

      const updated: Event = { ...state.events[idx], ...input }
      state.events = state.events.map(e => (e.id === updated.id ? updated : e))
      return updated
    },
    deleteEvent: id => {
      const before = state.events.length
      state.events = state.events.filter(e => e.id !== id)
      return state.events.length !== before
    },
    getBlogPosts: () => state.blogPosts,
    createBlogPost: input => {
      const now = new Date().toISOString()

      const created: BlogPost = {
        ...input,
        id: makeId(),
        createdAt: now,
        updatedAt: now,
        publishedAt: input.status === 'published' ? now : undefined,
      }

      state.blogPosts = [created, ...state.blogPosts]
      return created
    },
    updateBlogPost: input => {
      const idx = state.blogPosts.findIndex(p => p.id === input.id)
      if (idx < 0) return null

      const now = new Date().toISOString()
      const prev = state.blogPosts[idx]

      const updated: BlogPost = {
        ...prev,
        ...input,
        updatedAt: now,
        publishedAt: input.status === 'published' && !prev.publishedAt ? now : prev.publishedAt,
      }

      state.blogPosts = state.blogPosts.map(p => (p.id === updated.id ? updated : p))
      return updated
    },
    deleteBlogPost: id => {
      const before = state.blogPosts.length
      state.blogPosts = state.blogPosts.filter(p => p.id !== id)
      return state.blogPosts.length !== before
    },
  }
}
