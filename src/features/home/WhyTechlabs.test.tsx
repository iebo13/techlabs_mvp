import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { theme } from '@/theme/theme'
import { WhyTechlabsSection } from './components/WhyTechlabs'

/**
 * Test wrapper component that provides MUI theme and router context
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </BrowserRouter>
)

describe('WhyTechlabsSection', () => {
  it('renders section heading', () => {
    render(
      <TestWrapper>
        <WhyTechlabsSection />
      </TestWrapper>
    )

    expect(screen.getByText('Why Techlabs?')).toBeInTheDocument()
    expect(
      screen.getByText(
        'We free your mind for what matters the most to the wold, unlocking your true potential'
      )
    ).toBeInTheDocument()
  })

  it('renders all three feature card titles', () => {
    render(
      <TestWrapper>
        <WhyTechlabsSection />
      </TestWrapper>
    )

    // Test the three main feature titles from home.json
    expect(screen.getByText('Totally free')).toBeInTheDocument()
    expect(screen.getByText('Networking')).toBeInTheDocument()
    expect(screen.getByText('Job Ready')).toBeInTheDocument()
  })

  it('renders card descriptions', () => {
    render(
      <TestWrapper>
        <WhyTechlabsSection />
      </TestWrapper>
    )

    expect(
      screen.getByText(
        'We free your mind for what matters the most to the wold, unlocking your true potential'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Expand your network through our community for potential job opportunities or startups'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'You create a project that build your portfolio as a fundamental step towards your dream job'
      )
    ).toBeInTheDocument()
  })

  it('renders Start learning CTA button', () => {
    render(
      <TestWrapper>
        <WhyTechlabsSection />
      </TestWrapper>
    )

    const ctaButton = screen.getByRole('link', { name: 'Start learning' })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', '/tracks')
  })

  it('has accessible structure with headings', () => {
    render(
      <TestWrapper>
        <WhyTechlabsSection />
      </TestWrapper>
    )

    // Section heading should be h2
    expect(screen.getByRole('heading', { name: 'Why Techlabs?', level: 2 })).toBeInTheDocument()

    // Card titles should be h3 headings
    expect(screen.getByRole('heading', { name: 'Totally free', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Networking', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Job Ready', level: 3 })).toBeInTheDocument()
  })
})
