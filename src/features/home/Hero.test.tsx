/// <reference types="vitest/globals" />
import { ThemeProvider } from '@mui/material'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { theme } from '@/theme/theme'
import { Hero } from './components/Hero'

// Wrapper component for theme context
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Hero Component', () => {
  it('renders the main heading with correct text and emphasis', () => {
    renderWithTheme(<Hero />)

    // Check that the main heading is present
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'hero-heading')

    // Check the full text content
    expect(heading).toHaveTextContent('Learn Tech Skills for Free')

    // Check that "Tech" has the emphasis class
    const emphasisElement = heading.querySelector('.emphasis')
    expect(emphasisElement).toBeInTheDocument()
    expect(emphasisElement).toHaveTextContent('Tech')
  })

  it('renders the subhead with correct copy and separators', () => {
    renderWithTheme(<Hero />)

    // Find the subhead paragraph
    const subhead = screen.getByText(/Blended learning/)
    expect(subhead).toBeInTheDocument()

    // Check for key content parts (spaces around separators may be collapsed)
    expect(subhead).toHaveTextContent(/Blended learning.*Local Community.*Practical Projects/)

    // Check that separator dots are present
    const separators = subhead.querySelectorAll('.separator')
    expect(separators).toHaveLength(2)
    separators.forEach(separator => {
      expect(separator).toHaveTextContent('·')
    })
  })

  it('has proper semantic structure', () => {
    renderWithTheme(<Hero />)

    // Check for semantic section
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section?.tagName).toBe('SECTION')

    // Check heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveAttribute('id', 'hero-heading')

    // Ensure only one h1 exists
    const allH1s = screen.getAllByRole('heading', { level: 1 })
    expect(allH1s).toHaveLength(1)
  })

  it('matches snapshot', () => {
    const { container } = renderWithTheme(<Hero />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
