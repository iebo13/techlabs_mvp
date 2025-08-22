import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { theme } from '../../theme/theme'
import { EventCard, type Event } from '../EventCard'

// Mock date-fns
vi.mock('date-fns', () => ({
  formatDistanceToNow: vi.fn((date, options) => {
    const mockDate = new Date('2025-01-15T18:00:00Z')
    if (date.getTime() === mockDate.getTime()) {
      return options?.addSuffix ? 'in 5 days' : '5 days'
    }
    return options?.addSuffix ? '2 months ago' : '2 months'
  }),
}))

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </BrowserRouter>
  )
}

describe('EventCard', () => {
  const mockUpcomingEvent: Event = {
    id: '1',
    title: 'TechLabs Düsseldorf Meetup',
    blurb: 'Join our local community for networking, project showcases, and tech talks.',
    date: '2025-01-15T18:00:00Z',
    location: 'Düsseldorf, Germany',
    type: 'upcoming',
    imageUrl: '/img/events/meetup.jpg',
    href: '/events/techlabs-dusseldorf-meetup',
  }

  const mockPastEvent: Event = {
    id: '2',
    title: 'Graduation Ceremony 2024',
    blurb: 'Celebrating the achievements of our latest cohort of TechLabs graduates.',
    date: '2024-12-15T15:00:00Z',
    location: 'Berlin, Germany',
    type: 'past',
    imageUrl: '/img/events/graduation-2024.jpg',
    href: '/events/graduation-ceremony-2024',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders upcoming event card with correct content', () => {
      renderWithProviders(<EventCard event={mockUpcomingEvent} />)

      expect(screen.getByText('TechLabs Düsseldorf Meetup')).toBeInTheDocument()
      expect(
        screen.getByText(
          'Join our local community for networking, project showcases, and tech talks.'
        )
      ).toBeInTheDocument()
      expect(screen.getByText('📍 Düsseldorf, Germany')).toBeInTheDocument()
      expect(screen.getByText('Upcoming')).toBeInTheDocument()
      expect(screen.getByText('📅 in 5 days')).toBeInTheDocument()
    })

    it('renders past event card with correct content', () => {
      renderWithProviders(<EventCard event={mockPastEvent} />)

      expect(screen.getByText('Graduation Ceremony 2024')).toBeInTheDocument()
      expect(
        screen.getByText('Celebrating the achievements of our latest cohort of TechLabs graduates.')
      ).toBeInTheDocument()
      expect(screen.getByText('📍 Berlin, Germany')).toBeInTheDocument()
      expect(screen.getByText('Past')).toBeInTheDocument()
      expect(screen.getByText('📅 2 months ago')).toBeInTheDocument()
    })

    it('renders event image with correct alt text', () => {
      renderWithProviders(<EventCard event={mockUpcomingEvent} />)

      const image = screen.getByRole('img', { name: 'TechLabs Düsseldorf Meetup event image' })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/img/events/meetup.jpg')
    })

    it('renders as a link with correct href', () => {
      renderWithProviders(<EventCard event={mockUpcomingEvent} />)

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/events/techlabs-dusseldorf-meetup')
    })
  })

  describe('Event Type Styling', () => {
    it('shows primary chip for upcoming events', () => {
      renderWithProviders(<EventCard event={mockUpcomingEvent} />)

      const chip = screen.getByText('Upcoming')
      expect(chip).toBeInTheDocument()
      expect(chip.closest('.MuiChip-root')).toHaveClass('MuiChip-colorPrimary')
    })

    it('shows default chip for past events', () => {
      renderWithProviders(<EventCard event={mockPastEvent} />)

      const chip = screen.getByText('Past')
      expect(chip).toBeInTheDocument()
      expect(chip.closest('.MuiChip-root')).toHaveClass('MuiChip-colorDefault')
    })
  })

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      renderWithProviders(<EventCard event={mockUpcomingEvent} />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('TechLabs Düsseldorf Meetup')
    })

    it('has accessible image alt text', () => {
      renderWithProviders(<EventCard event={mockUpcomingEvent} />)

      const image = screen.getByAltText('TechLabs Düsseldorf Meetup event image')
      expect(image).toBeInTheDocument()
    })

    it('has keyboard accessible link', () => {
      renderWithProviders(<EventCard event={mockUpcomingEvent} />)

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      // Links are keyboard accessible by default, no need to check tabIndex
    })
  })

  describe('Date and Location Display', () => {
    it('displays date with calendar emoji', () => {
      renderWithProviders(<EventCard event={mockUpcomingEvent} />)

      expect(screen.getByText('📅 in 5 days')).toBeInTheDocument()
    })

    it('displays location with pin emoji', () => {
      renderWithProviders(<EventCard event={mockUpcomingEvent} />)

      expect(screen.getByText('📍 Düsseldorf, Germany')).toBeInTheDocument()
    })
  })

  describe('Card Layout', () => {
    it('renders with proper card structure', () => {
      renderWithProviders(<EventCard event={mockUpcomingEvent} />)

      expect(screen.getByRole('img')).toBeInTheDocument()
      expect(screen.getByText('TechLabs Düsseldorf Meetup')).toBeInTheDocument()
      expect(
        screen.getByText(
          'Join our local community for networking, project showcases, and tech talks.'
        )
      ).toBeInTheDocument()
    })
  })
})
