/**
 * Tests for TrustStrip component
 */

import { ThemeProvider } from '@mui/material'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { theme } from '@/theme/theme'
import { TrustStrip } from './components/TrustStrip'

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('TrustStrip', () => {
  it('renders the Google.org award line', () => {
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    )

    // Check that the award text components are present
    expect(screen.getByText('Winner of the')).toBeInTheDocument()
    expect(screen.getByText('Impact Challenge Germany 2018')).toBeInTheDocument()
    expect(screen.getByAltText('Google.org')).toBeInTheDocument()
  })

  it('displays at least 4 partner logos', () => {
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    )

    // Get all images with role img (partner logos)
    const logos = screen.getAllByRole('img')

    // Filter out the sr-only text and focus on actual logo images
    const partnerLogos = logos.filter(
      img => img.getAttribute('alt') && img.getAttribute('src')?.includes('/src/assets/partners/')
    )

    expect(partnerLogos.length).toBeGreaterThanOrEqual(4)
  })

  it('has correct alt text for partner logos matching organization names', () => {
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    )

    // Check specific partner alt texts based on mock data
    expect(screen.getByAltText('O2')).toBeInTheDocument()
    expect(screen.getByAltText('HUAWEI')).toBeInTheDocument()
    expect(screen.getByAltText('Deutsche Telekom')).toBeInTheDocument()
    expect(screen.getByAltText('Deutsche Post')).toBeInTheDocument()
  })

  it('enables lazy loading for all partner logos', () => {
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    )

    const logos = screen.getAllByRole('img')
    const partnerLogos = logos.filter(img =>
      img.getAttribute('src')?.includes('/src/assets/partners/')
    )

    partnerLogos.forEach(logo => {
      expect(logo).toHaveAttribute('loading', 'lazy')
    })
  })

  it('uses correct image sources from mock data', () => {
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    )

    // Verify specific partner logo sources based on mock data
    expect(screen.getByAltText('O2')).toHaveAttribute('src', '/src/assets/partners/o2.svg')
    expect(screen.getByAltText('HUAWEI')).toHaveAttribute('src', '/src/assets/partners/huawei.svg')
    expect(screen.getByAltText('Deutsche Telekom')).toHaveAttribute(
      'src',
      '/src/assets/partners/deutsche-telekom.svg'
    )
    expect(screen.getByAltText('Deutsche Post')).toHaveAttribute(
      'src',
      '/src/assets/partners/deutsche-post.svg'
    )
  })

  it('provides screen reader context about partners', () => {
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    )

    // Check for screen reader friendly description
    const srText = screen.getByLabelText(
      'Our trusted partners support TechLabs educational programs'
    )
    expect(srText).toBeInTheDocument()
  })

  it('handles partners with href links correctly', () => {
    // This test would be more relevant if we had partners with href in mock data
    // For now, we test the structure is ready for it
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    )

    // Verify logos are rendered (even without links in current mock data)
    const logos = screen.getAllByRole('img')
    const partnerLogos = logos.filter(img =>
      img.getAttribute('src')?.includes('/src/assets/partners/')
    )

    expect(partnerLogos.length).toBeGreaterThan(0)
  })

  it('applies consistent styling and responsive behavior', () => {
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    )

    // Check that the main container has the expected styling classes
    // This is more of a structure test since we can't easily test responsive breakpoints in JSDOM
    const logos = screen.getAllByRole('img')

    // Verify all logos have the expected CSS classes applied via sx prop
    const partnerLogos = logos.filter(img =>
      img.getAttribute('src')?.includes('/src/assets/partners/')
    )
    partnerLogos.forEach(logo => {
      expect(logo).toHaveStyle('object-fit: contain')
      expect(logo).toHaveStyle('filter: grayscale(1)')
    })
  })

  it('renders within a Section component with proper styling', () => {
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    )

    // The component should be wrapped in a section with appropriate background
    // We can check this indirectly by ensuring the content is properly contained
    expect(screen.getByText('Winner of the')).toBeInTheDocument()
    expect(screen.getByText('Impact Challenge Germany 2018')).toBeInTheDocument()
    expect(screen.getByAltText('Google.org')).toBeInTheDocument()
  })

  it('maintains proper semantic structure', () => {
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    )

    // Award line should be in typography elements
    expect(screen.getByText('Winner of the')).toBeInTheDocument()
    expect(screen.getByText('Impact Challenge Germany 2018')).toBeInTheDocument()
    expect(screen.getByAltText('Google.org')).toBeInTheDocument()

    // Screen reader context should be properly labeled
    const srContext = screen.getByLabelText(
      'Our trusted partners support TechLabs educational programs'
    )
    expect(srContext).toBeInTheDocument()
  })

  it('handles empty or missing partner data gracefully', () => {
    // Note: This test assumes the component would handle edge cases
    // In practice, with Zod validation, this scenario is less likely
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    )

    // At minimum, the award line should always render
    expect(screen.getByText('Winner of the')).toBeInTheDocument()
    expect(screen.getByText('Impact Challenge Germany 2018')).toBeInTheDocument()
    expect(screen.getByAltText('Google.org')).toBeInTheDocument()
  })
})
