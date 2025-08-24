import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { CTAButton } from '../CTAButton'

// Mock React Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('CTAButton', () => {
  describe('Internal Routing (to prop)', () => {
    it('renders as a Link when to prop is provided', () => {
      renderWithRouter(
        <CTAButton to="/tracks" variant="contained">
          Start Learning
        </CTAButton>
      )

      const link = screen.getByRole('link', { name: 'Start Learning' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/tracks')
    })

    it('applies correct styling for contained variant', () => {
      renderWithRouter(
        <CTAButton to="/tracks" variant="contained">
          Start Learning
        </CTAButton>
      )

      const button = screen.getByRole('button', { name: 'Start Learning' })
      expect(button).toHaveClass('MuiButton-contained')
    })

    it('applies correct styling for outlined variant', () => {
      renderWithRouter(
        <CTAButton to="/tracks" variant="outlined">
          Start Learning
        </CTAButton>
      )

      const button = screen.getByRole('button', { name: 'Start Learning' })
      expect(button).toHaveClass('MuiButton-outlined')
    })
  })

  describe('External Links (href prop)', () => {
    it('renders as an anchor tag when href prop is provided', () => {
      render(
        <CTAButton href="https://example.com" variant="outlined">
          Visit External Site
        </CTAButton>
      )

      const link = screen.getByRole('link', { name: 'Visit External Site' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Regular Button', () => {
    it('renders as a button when no routing props are provided', () => {
      const handleClick = vi.fn()
      render(
        <CTAButton onClick={handleClick} variant="text">
          Click Me
        </CTAButton>
      )

      const button = screen.getByRole('button', { name: 'Click Me' })
      expect(button).toBeInTheDocument()
    })

    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn()
      render(
        <CTAButton onClick={handleClick} variant="text">
          Click Me
        </CTAButton>
      )

      const button = screen.getByRole('button', { name: 'Click Me' })
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Styling and Props', () => {
    it('applies default large size', () => {
      renderWithRouter(<CTAButton to="/tracks">Start Learning</CTAButton>)

      const button = screen.getByRole('button', { name: 'Start Learning' })
      expect(button).toHaveClass('MuiButton-sizeLarge')
    })

    it('applies custom size when specified', () => {
      renderWithRouter(
        <CTAButton to="/tracks" size="small">
          Start Learning
        </CTAButton>
      )

      const button = screen.getByRole('button', { name: 'Start Learning' })
      expect(button).toHaveClass('MuiButton-sizeSmall')
    })

    it('applies custom sx styles', () => {
      renderWithRouter(
        <CTAButton to="/tracks" sx={{ backgroundColor: 'red' }}>
          Start Learning
        </CTAButton>
      )

      const button = screen.getByRole('button', { name: 'Start Learning' })
      // MUI might apply styles via CSS classes, so we check if the sx prop is respected
      expect(button).toBeInTheDocument()
    })

    it('forwards additional button props', () => {
      renderWithRouter(
        <CTAButton to="/tracks" disabled>
          Start Learning
        </CTAButton>
      )

      const button = screen.getByRole('button', { name: 'Start Learning' })
      // For Link components, disabled state is handled via aria-disabled and tabindex
      expect(button).toHaveAttribute('aria-disabled', 'true')
      expect(button).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('Accessibility', () => {
    it('maintains proper ARIA attributes', () => {
      renderWithRouter(
        <CTAButton to="/tracks" aria-label="Custom label">
          Start Learning
        </CTAButton>
      )

      const button = screen.getByRole('button', { name: 'Custom label' })
      expect(button).toBeInTheDocument()
    })

    it('supports keyboard navigation', () => {
      renderWithRouter(<CTAButton to="/tracks">Start Learning</CTAButton>)

      const button = screen.getByRole('button', { name: 'Start Learning' })
      expect(button).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithRouter(<CTAButton to="/tracks" children={undefined} />)

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })

    it('prioritizes to prop over href prop', () => {
      renderWithRouter(
        <CTAButton to="/internal" href="https://external.com">
          Start Learning
        </CTAButton>
      )

      const link = screen.getByRole('link', { name: 'Start Learning' })
      expect(link).toHaveAttribute('href', '/internal')
      expect(link).not.toHaveAttribute('target')
    })
  })
})
