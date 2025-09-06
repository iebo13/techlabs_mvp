import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { theme } from '@/theme/theme'
import { FeatureItem } from './components/ValuePropCard'

/**
 * Test wrapper component that provides MUI theme context
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('FeatureItem', () => {
  const mockProps = {
    icon: 'free',
    title: 'Totally free',
    body: 'We cover tuition so you can focus on learning and outcomes.',
  }

  it('renders card title correctly', () => {
    render(
      <TestWrapper>
        <FeatureItem {...mockProps} />
      </TestWrapper>
    )

    expect(screen.getByText('Totally free')).toBeInTheDocument()
  })

  it('renders card body text correctly', () => {
    render(
      <TestWrapper>
        <FeatureItem {...mockProps} />
      </TestWrapper>
    )

    expect(
      screen.getByText('We cover tuition so you can focus on learning and outcomes.')
    ).toBeInTheDocument()
  })

  it('renders with different props', () => {
    const networkingProps = {
      icon: 'network',
      title: 'Networking',
      body: 'Grow your network through mentors, peers, and partners.',
    }

    render(
      <TestWrapper>
        <FeatureItem {...networkingProps} />
      </TestWrapper>
    )

    expect(screen.getByText('Networking')).toBeInTheDocument()
    expect(
      screen.getByText('Grow your network through mentors, peers, and partners.')
    ).toBeInTheDocument()
  })

  it('uses heading role for title', () => {
    render(
      <TestWrapper>
        <FeatureItem {...mockProps} />
      </TestWrapper>
    )

    expect(screen.getByRole('heading', { name: 'Totally free' })).toBeInTheDocument()
  })
})
