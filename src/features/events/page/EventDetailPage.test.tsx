/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { theme } from '@/theme'
import { EventDetailPage } from './EventDetailPage'

jest.mock('@/components/Layouts', () => ({
  DataLoadingState: ({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) =>
    isLoading ? <div>Loading...</div> : <div>{children}</div>,
  LazyIntersection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Section: ({
    children,
    component: Component = 'section',
  }: {
    children: React.ReactNode
    component?: React.ElementType
  }) => <Component>{children}</Component>,
  SectionHeading: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  SEO: () => null,
}))

const tMock = (key: string) => {
  const table: Record<string, string> = {
    'events.detail.notFound': 'Event not found',
    'events.detail.notFoundMessage': 'This event does not exist.',
    'events.detail.backToEvents': 'Back to events',
    'events.detail.about': 'About',
    'events.detail.highlights': 'Highlights',
    'events.detail.agenda': 'Agenda',
    'events.detail.dateTime': 'When',
    'events.detail.location': 'Where',
    'events.detail.register': 'Register',
    'events.detail.learnMore': 'Learn more',
    'events.detail.questions': 'Questions?',
    'events.detail.contactUs': 'Contact us',
    'events.card.upcomingLabel': 'Upcoming',
    'events.card.pastLabel': 'Past',
    'events.hostEvent.title': 'Host',
    'events.hostEvent.description': 'Description',
    'events.hostEvent.cta': 'Get in Touch',
  }

  return table[key] ?? key
}

jest.mock('@/hooks', () => ({
  useI18n: () => ({
    t: tMock,
    formatDate: (date: string | Date) =>
      new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date)),
    tWithFallback: (key: string, fallback: string) => tMock(key) || fallback,
    currentLanguage: 'en',
    availableLanguages: [],
    changeLanguage: async () => {},
    isLanguageSupported: () => true,
    formatNumber: (n: number) => String(n),
    formatCurrency: (n: number) => String(n),
    isReady: true,
    isLoading: false,
  }),
}))

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

const renderAtSlug = (slug: string) => {
  const queryClient = createTestQueryClient()

  return render(
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MemoryRouter initialEntries={[`/events/${slug}`]}>
            <Routes>
              <Route path="/events/:eventSlug" element={<EventDetailPage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

describe('EventDetailPage', () => {
  it('renders event title for a valid slug', async () => {
    renderAtSlug('web-development-workshop')
    expect(await screen.findByRole('heading', { level: 1, name: /Web Development Workshop/i })).toBeInTheDocument()
  })

  it('shows not found for unknown slug', async () => {
    renderAtSlug('unknown-event-slug-xyz')
    expect(await screen.findByRole('heading', { name: /Event not found/i })).toBeInTheDocument()
  })
})
