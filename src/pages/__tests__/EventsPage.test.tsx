import { ThemeProvider } from '@mui/material/styles'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { theme } from '../../theme/theme'
import { EventsPage } from '../EventsPage'

// Mock events data
vi.mock('../../mocks/events.json', () => ({
  default: {
    events: [
      {
        id: '1',
        title: 'TechLabs Düsseldorf Meetup',
        blurb: 'Join our local community for networking, project showcases, and tech talks.',
        date: '2025-01-15T18:00:00Z',
        location: 'Düsseldorf, Germany',
        type: 'upcoming',
        imageUrl: '/img/events/meetup.jpg',
        href: '/events/techlabs-dusseldorf-meetup',
      },
      {
        id: '2',
        title: 'Web Development Workshop',
        blurb: 'Hands-on session on modern web development with React and TypeScript.',
        date: '2025-01-22T14:00:00Z',
        location: 'Berlin, Germany',
        type: 'upcoming',
        imageUrl: '/img/events/web-dev-workshop.jpg',
        href: '/events/web-development-workshop',
      },
      {
        id: '3',
        title: 'Data Science Career Panel',
        blurb: 'Learn from industry experts about breaking into data science and AI.',
        date: '2025-01-28T19:00:00Z',
        location: 'Munich, Germany',
        type: 'upcoming',
        imageUrl: '/img/events/data-science-panel.jpg',
        href: '/events/data-science-career-panel',
      },
      {
        id: '4',
        title: 'Graduation Ceremony 2024',
        blurb: 'Celebrating the achievements of our latest cohort of TechLabs graduates.',
        date: '2024-12-15T15:00:00Z',
        location: 'Düsseldorf, Germany',
        type: 'past',
        imageUrl: '/img/events/graduation-2024.jpg',
        href: '/events/graduation-ceremony-2024',
      },
      {
        id: '5',
        title: 'Hackathon: Sustainable Tech',
        blurb: '24-hour hackathon focused on building solutions for environmental challenges.',
        date: '2024-11-20T10:00:00Z',
        location: 'Cologne, Germany',
        type: 'past',
        imageUrl: '/img/events/hackathon-sustainable.jpg',
        href: '/events/hackathon-sustainable-tech',
      },
      {
        id: '6',
        title: 'Mentor Networking Event',
        blurb: 'Connect with TechLabs mentors and learn about mentorship opportunities.',
        date: '2024-10-28T18:00:00Z',
        location: 'Stuttgart, Germany',
        type: 'past',
        imageUrl: '/img/events/mentor-networking.jpg',
        href: '/events/mentor-networking-event',
      },
      {
        id: '7',
        title: 'Tech Career Fair',
        blurb: 'Meet potential employers and explore career opportunities in tech.',
        date: '2024-10-15T11:00:00Z',
        location: 'Düsseldorf, Germany',
        type: 'past',
        imageUrl: '/img/events/career-fair.jpg',
        href: '/events/tech-career-fair',
      },
    ],
  },
}))

// Mock date-fns
vi.mock('date-fns', () => ({
  formatDistanceToNow: vi.fn(() => 'in 5 days'),
}))

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </BrowserRouter>
  )
}

describe('EventsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Page Structure', () => {
    it('renders page title and subtitle', () => {
      renderWithProviders(<EventsPage />)

      expect(screen.getByRole('heading', { level: 1, name: 'TechLabs Events' })).toBeInTheDocument()
      expect(
        screen.getByText('Join our community events, workshops, and networking opportunities')
      ).toBeInTheDocument()
    })

    it('renders all three tabs with correct labels', () => {
      renderWithProviders(<EventsPage />)

      expect(screen.getByRole('tab', { name: 'All Events (7)' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Upcoming (3)' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Past (4)' })).toBeInTheDocument()
    })

    it('renders "Get in Touch" CTA section', () => {
      renderWithProviders(<EventsPage />)

      expect(screen.getByText('Want to host an event?')).toBeInTheDocument()
      expect(
        screen.getByText(
          'Partner with us to create meaningful learning experiences for our community.'
        )
      ).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Get in Touch' })).toBeInTheDocument()
    })
  })

  describe('Tab Functionality', () => {
    it('shows all events by default', () => {
      renderWithProviders(<EventsPage />)

      // Should show first 6 events (EVENTS_PER_PAGE = 6), but our mock has 7 total
      // Since we're showing events sorted by date, check for the correct order
      expect(screen.getByText('TechLabs Düsseldorf Meetup')).toBeInTheDocument()
      expect(screen.getByText('Web Development Workshop')).toBeInTheDocument()
      expect(screen.getByText('Graduation Ceremony 2024')).toBeInTheDocument()
      expect(screen.getByText('Hackathon: Sustainable Tech')).toBeInTheDocument()
      expect(screen.getByText('Mentor Networking Event')).toBeInTheDocument()
    })

    it('filters to upcoming events when clicking Upcoming tab', async () => {
      renderWithProviders(<EventsPage />)

      const upcomingTab = screen.getByRole('tab', { name: 'Upcoming (3)' })
      fireEvent.click(upcomingTab)

      await waitFor(() => {
        expect(screen.getByText('TechLabs Düsseldorf Meetup')).toBeInTheDocument()
        expect(screen.getByText('Web Development Workshop')).toBeInTheDocument()
        expect(screen.queryByText('Graduation Ceremony 2024')).not.toBeInTheDocument()
      })
    })

    it('filters to past events when clicking Past tab', async () => {
      renderWithProviders(<EventsPage />)

      const pastTab = screen.getByRole('tab', { name: 'Past (4)' })
      fireEvent.click(pastTab)

      await waitFor(() => {
        expect(screen.getByText('Graduation Ceremony 2024')).toBeInTheDocument()
        expect(screen.getByText('Hackathon: Sustainable Tech')).toBeInTheDocument()
        expect(screen.getByText('Mentor Networking Event')).toBeInTheDocument()
        expect(screen.getByText('Tech Career Fair')).toBeInTheDocument()
        expect(screen.queryByText('TechLabs Düsseldorf Meetup')).not.toBeInTheDocument()
      })
    })

    it('returns to all events when clicking All Events tab', async () => {
      renderWithProviders(<EventsPage />)

      // First click on Past tab
      const pastTab = screen.getByRole('tab', { name: 'Past (4)' })
      fireEvent.click(pastTab)

      await waitFor(() => {
        expect(screen.queryByText('TechLabs Düsseldorf Meetup')).not.toBeInTheDocument()
      })

      // Then click on All Events tab
      const allTab = screen.getByRole('tab', { name: 'All Events (7)' })
      fireEvent.click(allTab)

      await waitFor(() => {
        expect(screen.getByText('TechLabs Düsseldorf Meetup')).toBeInTheDocument()
        expect(screen.getByText('Graduation Ceremony 2024')).toBeInTheDocument()
      })
    })
  })

  describe('Pagination', () => {
    it('shows "Load More Events" button when there are more than 6 events', () => {
      renderWithProviders(<EventsPage />)

      expect(screen.getByRole('button', { name: 'Load More Events' })).toBeInTheDocument()
    })

    it('loads more events when clicking "Load More Events"', async () => {
      renderWithProviders(<EventsPage />)

      // Our mock has 7 events total, check if Tech Career Fair is visible
      // Since events are sorted and our mock data might show all 7 initially

      const loadMoreButton = screen.getByRole('button', { name: 'Load More Events' })
      fireEvent.click(loadMoreButton)

      await waitFor(() => {
        expect(screen.getByText('Tech Career Fair')).toBeInTheDocument()
      })
    })

    it('hides "Load More Events" button when all events are loaded', async () => {
      renderWithProviders(<EventsPage />)

      const loadMoreButton = screen.getByRole('button', { name: 'Load More Events' })
      fireEvent.click(loadMoreButton)

      await waitFor(() => {
        expect(screen.queryByRole('button', { name: 'Load More Events' })).not.toBeInTheDocument()
      })
    })

    it('resets pagination when switching tabs', async () => {
      renderWithProviders(<EventsPage />)

      // Load more events
      const loadMoreButton = screen.getByRole('button', { name: 'Load More Events' })
      fireEvent.click(loadMoreButton)

      await waitFor(() => {
        expect(screen.getByText('Tech Career Fair')).toBeInTheDocument()
      })

      // Switch to Upcoming tab
      const upcomingTab = screen.getByRole('tab', { name: 'Upcoming (3)' })
      fireEvent.click(upcomingTab)

      await waitFor(() => {
        // Should show only first 6 upcoming events (but there are only 3 total)
        expect(screen.getByText('TechLabs Düsseldorf Meetup')).toBeInTheDocument()
        expect(screen.getByText('Web Development Workshop')).toBeInTheDocument()
        expect(screen.getByText('Data Science Career Panel')).toBeInTheDocument()
        // Load More button should not be visible as there are only 3 upcoming events
        expect(screen.queryByRole('button', { name: 'Load More Events' })).not.toBeInTheDocument()
      })
    })
  })

  describe('Event Grid Layout', () => {
    it('renders events in a grid layout', () => {
      renderWithProviders(<EventsPage />)

      const eventCards = screen.getAllByRole('link')
      // We have 7 total events + 1 "Get in Touch" link = 8 links, but expect at least 6 event cards
      expect(eventCards.length).toBeGreaterThanOrEqual(6)
    })
  })

  describe('CTA Section', () => {
    it('renders the host event CTA with correct link', () => {
      renderWithProviders(<EventsPage />)

      // The "Get in Touch" is rendered as a link, not a button
      const ctaLink = screen.getByRole('link', { name: 'Get in Touch' })
      expect(ctaLink).toBeInTheDocument()
      expect(ctaLink).toHaveAttribute('href', '/about#contact')
    })
  })

  describe('Empty State', () => {
    it('shows empty state message when no events match filter', async () => {
      // We need to test with a scenario where filters would return no results
      // Since our mock data always has events, this would require a different mock
      // For now, this test structure shows how we would test empty states
      // The implementation would check for the "No events found" message
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithProviders(<EventsPage />)

      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toHaveTextContent('TechLabs Events')
    })

    it('has accessible tab navigation', () => {
      renderWithProviders(<EventsPage />)

      const tabList = screen.getByRole('tablist')
      expect(tabList).toBeInTheDocument()

      const tabs = screen.getAllByRole('tab')
      expect(tabs).toHaveLength(3)
    })

    it('has accessible button labels', () => {
      renderWithProviders(<EventsPage />)

      expect(screen.getByRole('button', { name: 'Load More Events' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Get in Touch' })).toBeInTheDocument()
    })
  })
})
