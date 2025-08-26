import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { theme } from '@/theme/theme'
import { NumbersBand } from './components/NumbersBand'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('NumbersBand', () => {
  const mockNumbers = [
    { label: 'Cities', value: '15' },
    { label: 'Graduates', value: '+600' },
    { label: 'Mentors', value: '35' },
  ]

  it('renders with default title and subtitle', () => {
    renderWithTheme(<NumbersBand numbers={mockNumbers} />)

    expect(screen.getByText('Our Impact')).toBeInTheDocument()
    expect(screen.getByText('Join thousands of learners building their future')).toBeInTheDocument()
  })

  it('renders custom title and subtitle when provided', () => {
    const customTitle = 'Custom Impact Title'
    const customSubtitle = 'Custom subtitle text'

    renderWithTheme(
      <NumbersBand numbers={mockNumbers} title={customTitle} subtitle={customSubtitle} />
    )

    expect(screen.getByText(customTitle)).toBeInTheDocument()
    expect(screen.getByText(customSubtitle)).toBeInTheDocument()
  })

  it('renders all metric numbers correctly', () => {
    renderWithTheme(<NumbersBand numbers={mockNumbers} />)

    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('+600')).toBeInTheDocument()
    expect(screen.getByText('35')).toBeInTheDocument()
  })

  it('renders all metric labels correctly', () => {
    renderWithTheme(<NumbersBand numbers={mockNumbers} />)

    expect(screen.getByText('Cities')).toBeInTheDocument()
    expect(screen.getByText('Graduates')).toBeInTheDocument()
    expect(screen.getByText('Mentors')).toBeInTheDocument()
  })

  it('renders appropriate icons for each metric type', () => {
    renderWithTheme(<NumbersBand numbers={mockNumbers} />)

    // Check that emoji icons are rendered
    expect(screen.getByText('🏙️')).toBeInTheDocument() // Cities icon
    expect(screen.getByText('🎓')).toBeInTheDocument() // Graduates icon
    expect(screen.getByText('👥')).toBeInTheDocument() // Mentors icon
  })

  it('emphasizes the middle metric (Graduates)', () => {
    renderWithTheme(<NumbersBand numbers={mockNumbers} />)

    // The middle metric (index 1) should be emphasized
    const graduatesValue = screen.getByText('+600')
    expect(graduatesValue).toHaveStyle({ color: 'rgb(255, 45, 108)' }) // primary.main color
  })

  it('handles empty numbers array gracefully', () => {
    renderWithTheme(<NumbersBand numbers={[]} />)

    expect(screen.getByText('Our Impact')).toBeInTheDocument()
    // Should not crash with empty array
  })

  it('renders with single metric', () => {
    const singleMetric = [{ label: 'Test', value: '100' }]
    renderWithTheme(<NumbersBand numbers={singleMetric} />)

    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('has proper responsive grid structure', () => {
    renderWithTheme(<NumbersBand numbers={mockNumbers} />)

    // Check that the section exists
    const section = screen.getByText('Our Impact').closest('section')
    expect(section).toBeInTheDocument()

    // Should have 3 grid items
    const gridItems = screen.getAllByText(/15|600|35/)
    expect(gridItems).toHaveLength(3)
  })

  it('applies proper spacing and layout', () => {
    renderWithTheme(<NumbersBand numbers={mockNumbers} />)

    const section = screen.getByText('Our Impact').closest('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('class', expect.stringContaining('MuiBox-root'))
  })
})
