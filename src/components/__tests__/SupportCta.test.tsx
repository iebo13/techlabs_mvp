import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

import { SupportCta } from '../SupportCta'

// Mock useNavigate hook
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async importOriginal => {
  const actual = await importOriginal()
  return {
    ...(actual as Record<string, unknown>),
    useNavigate: () => mockNavigate,
  }
})

// Test data
const mockSupportData = {
  title: 'Support Tech Education',
  body: 'Help us empower the next generation by funding cohorts and resources.',
  imageUrl: '/img/support.jpg',
  cta: {
    label: 'Support Tech Education',
    to: '/support',
  },
}

// Wrapper component for testing with router context
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('SupportCta', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders the support CTA section with correct content', () => {
    render(
      <TestWrapper>
        <SupportCta {...mockSupportData} />
      </TestWrapper>
    )

    // Check title
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Support Tech Education')

    // Check body text
    expect(
      screen.getByText('Help us empower the next generation by funding cohorts and resources.')
    ).toBeInTheDocument()

    // Check CTA button
    expect(screen.getByRole('button', { name: 'Support Tech Education' })).toBeInTheDocument()

    // Check image
    const image = screen.getByAltText('Support Tech Education')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/img/support.jpg')
  })

  it('navigates to the correct route when CTA button is clicked', () => {
    render(
      <TestWrapper>
        <SupportCta {...mockSupportData} />
      </TestWrapper>
    )

    const ctaButton = screen.getByRole('button', { name: 'Support Tech Education' })
    fireEvent.click(ctaButton)

    expect(mockNavigate).toHaveBeenCalledWith('/support')
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })

  it('renders with custom props correctly', () => {
    const customData = {
      title: 'Custom Support Title',
      body: 'Custom support message for testing.',
      imageUrl: '/img/custom-support.jpg',
      cta: {
        label: 'Custom CTA',
        to: '/custom-support',
      },
    }

    render(
      <TestWrapper>
        <SupportCta {...customData} />
      </TestWrapper>
    )

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Custom Support Title')
    expect(screen.getByText('Custom support message for testing.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Custom CTA' })).toBeInTheDocument()

    const image = screen.getByAltText('Support Tech Education')
    expect(image).toHaveAttribute('src', '/img/custom-support.jpg')
  })

  it('has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <SupportCta {...mockSupportData} />
      </TestWrapper>
    )

    // Check heading structure
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()

    // Check button accessibility
    const button = screen.getByRole('button', { name: 'Support Tech Education' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')

    // Check image alt text
    const image = screen.getByAltText('Support Tech Education')
    expect(image).toBeInTheDocument()
  })

  it('renders responsive layout correctly', () => {
    render(
      <TestWrapper>
        <SupportCta {...mockSupportData} />
      </TestWrapper>
    )

    // Check that the component renders without errors
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Support Tech Education' })).toBeInTheDocument()
    expect(screen.getByAltText('Support Tech Education')).toBeInTheDocument()
  })
})
