import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'

const eventSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  blurb: z.string().min(1),
  date: z.string().min(1),
  location: z.string().min(1),
  type: z.enum(['upcoming', 'past']),
  imageUrl: z.string().min(1),
  href: z.string().min(1),
})

export type AdminEvent = z.infer<typeof eventSchema>

const blogPostStatusSchema = z.enum(['draft', 'published'])

const blogPostSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  featuredImage: z.string().optional(),
  author: z.string().min(1),
  tags: z.array(z.string()),
  status: blogPostStatusSchema,
  publishedAt: z.string().optional(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
})

export type BlogPost = z.infer<typeof blogPostSchema>

const eventsFileSchema = z.object({
  events: z.array(eventSchema),
})

const makeId = (): string => {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const DEFAULT_AUTHOR = 'TechLabs Team'

const seedBlogPosts = (): BlogPost[] => {
  return [
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
      status: 'published',
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
      status: 'published',
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
      status: 'draft',
      createdAt: '2024-02-10T14:00:00Z',
      updatedAt: '2024-02-10T14:00:00Z',
    },
  ]
}

export type MemoryStore = {
  getEvents: () => AdminEvent[]
  createEvent: (input: Omit<AdminEvent, 'id'>) => AdminEvent
  updateEvent: (input: Partial<Omit<AdminEvent, 'id'>> & { id: string }) => AdminEvent | null
  deleteEvent: (id: string) => boolean
  getBlogPosts: () => BlogPost[]
  createBlogPost: (input: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>) => BlogPost
  updateBlogPost: (input: Partial<Omit<BlogPost, 'id'>> & { id: string }) => BlogPost | null
  deleteBlogPost: (id: string) => boolean
}

export const createMemoryStore = async (): Promise<MemoryStore> => {
  const eventsPath = path.resolve(process.cwd(), 'src/mocks/events.json')
  const raw = await readFile(eventsPath, { encoding: 'utf8' })
  const parsed = eventsFileSchema.parse(JSON.parse(raw) as unknown)

  const state: {
    events: AdminEvent[]
    blogPosts: BlogPost[]
  } = {
    events: parsed.events,
    blogPosts: seedBlogPosts(),
  }

  return {
    getEvents: () => state.events,
    createEvent: input => {
      const created: AdminEvent = { ...input, id: makeId() }
      state.events = [created, ...state.events]
      return created
    },
    updateEvent: input => {
      const idx = state.events.findIndex(e => e.id === input.id)
      if (idx < 0) return null
      const updated: AdminEvent = { ...state.events[idx], ...input }
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
