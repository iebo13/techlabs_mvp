// Test Data Factories

type User = {
  id: number
  name: string
  email: string
  avatar: string
}

type Story = {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
}

type Event = {
  id: number
  title: string
  description: string
  date: string
  location: string
}

export const makeUser = (overrides: Partial<User> = {}): User => ({
  id: Math.floor(Math.random() * 1000),
  name: 'Test User',
  email: 'test@example.com',
  avatar: 'https://via.placeholder.com/150',
  ...overrides,
})

export const makeStory = (overrides: Partial<Story> = {}): Story => ({
  id: Math.floor(Math.random() * 1000),
  title: 'Test Story',
  content: 'This is a test story content for testing purposes.',
  author: 'Test Author',
  createdAt: new Date().toISOString(),
  ...overrides,
})

export const makeEvent = (overrides: Partial<Event> = {}): Event => ({
  id: Math.floor(Math.random() * 1000),
  title: 'Test Event',
  description: 'This is a test event description.',
  date: new Date().toISOString(),
  location: 'Test Location',
  ...overrides,
})
