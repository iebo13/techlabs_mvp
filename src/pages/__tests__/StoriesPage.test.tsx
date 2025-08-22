import { ThemeProvider } from '@mui/material/styles'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import { theme } from '../../theme/theme'
import { StoriesPage } from '../StoriesPage'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>{component}</BrowserRouter>
    </ThemeProvider>
  )
}

describe('StoriesPage', () => {
  it('renders the page header correctly', () => {
    renderWithProviders(<StoriesPage />)

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent("Our Graduates' Stories")
    expect(screen.getByText(/Discover how TechLabs alumni/)).toBeInTheDocument()
  })

  it('renders the track filter dropdown', () => {
    renderWithProviders(<StoriesPage />)

    expect(screen.getByLabelText('Filter by Track')).toBeInTheDocument()
    expect(screen.getByText('All Tracks')).toBeInTheDocument()
  })

  it('shows all stories by default', () => {
    renderWithProviders(<StoriesPage />)

    expect(screen.getByText('Max Startup is Rocketing')).toBeInTheDocument()
    expect(screen.getByText('Lia just landed her first client')).toBeInTheDocument()
    expect(screen.getByText('Showing 2 of 2 stories')).toBeInTheDocument()
  })

  it('filters stories by track when selection changes', async () => {
    renderWithProviders(<StoriesPage />)

    const filterSelect = screen.getByLabelText('Filter by Track')
    fireEvent.mouseDown(filterSelect)

    // Select Web Development from the dropdown menu
    const webDevOption = screen.getByRole('option', { name: 'Web Development' })
    fireEvent.click(webDevOption)

    await waitFor(() => {
      expect(screen.getByText('Showing 1 of 2 stories in Web Development')).toBeInTheDocument()
      expect(screen.getByText('Max Startup is Rocketing')).toBeInTheDocument()
      expect(screen.queryByText('Lia just landed her first client')).not.toBeInTheDocument()
    })
  })

  it('shows empty state when no stories match filter', async () => {
    renderWithProviders(<StoriesPage />)

    const filterSelect = screen.getByLabelText('Filter by Track')
    fireEvent.mouseDown(filterSelect)

    // Select AI (no stories in mock data)
    const aiOption = screen.getByRole('option', { name: 'Artificial Intelligence' })
    fireEvent.click(aiOption)

    await waitFor(() => {
      expect(screen.getByText('No stories found for this track')).toBeInTheDocument()
      expect(screen.getByText(/Try selecting a different track/)).toBeInTheDocument()
    })
  })

  it('opens story modal when story card is clicked', async () => {
    renderWithProviders(<StoriesPage />)

    // Use the first story card by finding it through the role and aria-label
    const storyCard = screen.getByLabelText('View details for Max Startup is Rocketing')
    expect(storyCard).toBeInTheDocument()

    fireEvent.click(storyCard)

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      // Use the dialog title instead of generic text to avoid duplicates
      expect(
        screen.getByRole('heading', { level: 2, name: 'Max Startup is Rocketing' })
      ).toBeInTheDocument()
      expect(screen.getByText(/Max joined TechLabs with a background/)).toBeInTheDocument()
    })
  })

  it('displays story details correctly in modal', async () => {
    renderWithProviders(<StoriesPage />)

    const storyCard = screen.getByLabelText('View details for Max Startup is Rocketing')
    fireEvent.click(storyCard)

    await waitFor(() => {
      // Use more specific selectors to avoid duplicate text issues
      expect(screen.getByText('2024-03')).toBeInTheDocument()
      expect(screen.getByText('TechFlow Solutions')).toBeInTheDocument()
      expect(screen.getByText('Secured €500K seed funding')).toBeInTheDocument()
      expect(screen.getByText('Built MVP from scratch')).toBeInTheDocument()
    })
  })

  it('closes modal when close button is clicked', async () => {
    renderWithProviders(<StoriesPage />)

    const storyCard = screen.getByLabelText('View details for Max Startup is Rocketing')
    fireEvent.click(storyCard)

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    const closeButton = screen.getByLabelText('Close story details')
    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('closes modal when ESC key is pressed', async () => {
    renderWithProviders(<StoriesPage />)

    const storyCard = screen.getByLabelText('View details for Max Startup is Rocketing')
    fireEvent.click(storyCard)

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    // Use the dialog element for key events
    const dialog = screen.getByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'Escape' })

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('supports keyboard navigation for story cards', () => {
    renderWithProviders(<StoriesPage />)

    const storyCard = screen.getByLabelText('View details for Max Startup is Rocketing')
    expect(storyCard).toHaveAttribute('tabIndex', '0')

    // Focus the card
    if (storyCard) {
      ;(storyCard as HTMLElement).focus()

      // Press Enter to open modal
      fireEvent.keyDown(storyCard, { key: 'Enter' })
    }

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('displays track badges on story cards', () => {
    renderWithProviders(<StoriesPage />)

    // Check for track badges in the story cards
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    expect(screen.getByText('Data Science')).toBeInTheDocument()
  })

  it('shows story metadata on cards', () => {
    renderWithProviders(<StoriesPage />)

    // Check for specific metadata that appears only once
    expect(screen.getByText('Graduated 2024-03')).toBeInTheDocument()
    expect(screen.getByText('Graduated 2024-01')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    renderWithProviders(<StoriesPage />)

    const storyCard = screen.getByLabelText('View details for Max Startup is Rocketing')
    expect(storyCard).toHaveAttribute('aria-label', 'View details for Max Startup is Rocketing')

    // Check that the filter select has the correct label association
    const filterSelect = screen.getByLabelText('Filter by Track')
    expect(filterSelect).toBeInTheDocument()

    // The Select component should have the labelId prop set correctly
    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveAttribute('aria-labelledby', 'track-filter-label')
  })
})
