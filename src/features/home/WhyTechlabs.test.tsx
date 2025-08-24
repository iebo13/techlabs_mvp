import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { theme } from '@/theme/theme'
import { WhyTechlabs } from './components/WhyTechlabs'

/**
 * Test wrapper component that provides MUI theme and router context
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </BrowserRouter>
)

describe('WhyTechlabs', () => {
  it('renders section heading', () => {
    render(
      <TestWrapper>
        <WhyTechlabs />
      </TestWrapper>
    )

    expect(screen.getByText('Why TechLabs?')).toBeInTheDocument()
    expect(
      screen.getByText('Discover what makes our programs unique and effective')
    ).toBeInTheDocument()
  })

  it('renders all three feature card titles', () => {
    render(
      <TestWrapper>
        <WhyTechlabs />
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
        <WhyTechlabs />
      </TestWrapper>
    )

    expect(
      screen.getByText('We cover tuition so you can focus on learning and outcomes.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Grow your network through mentors, peers, and partners.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Build projects and a portfolio that accelerate your job search.')
    ).toBeInTheDocument()
  })

  it('renders Start learning CTA button', () => {
    render(
      <TestWrapper>
        <WhyTechlabs />
      </TestWrapper>
    )

    const ctaButton = screen.getByRole('link', { name: 'Start learning' })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', '/tracks')
  })

  it('has accessible structure with headings', () => {
    render(
      <TestWrapper>
        <WhyTechlabs />
      </TestWrapper>
    )

    // Section heading should be h2
    expect(screen.getByRole('heading', { name: 'Why TechLabs?', level: 2 })).toBeInTheDocument()

    // Card titles should be h3 headings
    expect(screen.getByRole('heading', { name: 'Totally free', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Networking', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Job Ready', level: 3 })).toBeInTheDocument()
  })
})
