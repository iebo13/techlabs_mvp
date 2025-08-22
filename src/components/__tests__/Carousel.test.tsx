import { render, screen, fireEvent, act } from '@testing-library/react'
import { vi } from 'vitest'
import { Carousel } from '../Carousel'

const mockItems = [
  { id: 1, name: 'Item 1', content: 'Content 1' },
  { id: 2, name: 'Item 2', content: 'Content 2' },
  { id: 3, name: 'Item 3', content: 'Content 3' },
  { id: 4, name: 'Item 4', content: 'Content 4' },
  { id: 5, name: 'Item 5', content: 'Content 5' },
]

const MockItemComponent = ({ item }: { item: (typeof mockItems)[0] }) => (
  <div data-testid={`item-${item.id}`}>
    <h3>{item.name}</h3>
    <p>{item.content}</p>
  </div>
)

describe('Carousel', () => {
  describe('Rendering', () => {
    it('renders all visible items based on itemsPerView', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={3}
        />
      )

      expect(screen.getByTestId('item-1')).toBeInTheDocument()
      expect(screen.getByTestId('item-2')).toBeInTheDocument()
      expect(screen.getByTestId('item-3')).toBeInTheDocument()
      expect(screen.queryByTestId('item-4')).not.toBeInTheDocument()
    })

    it('renders navigation when items exceed itemsPerView', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
        />
      )

      expect(screen.getByLabelText('Previous item')).toBeInTheDocument()
      expect(screen.getByLabelText('Next item')).toBeInTheDocument()
    })

    it('does not render navigation when items fit in view', () => {
      render(
        <Carousel
          items={mockItems.slice(0, 2)}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
        />
      )

      expect(screen.queryByLabelText('Previous item')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Next item')).not.toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('navigates to next items when next button is clicked', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
        />
      )

      // Initially shows items 1 and 2
      expect(screen.getByTestId('item-1')).toBeInTheDocument()
      expect(screen.getByTestId('item-2')).toBeInTheDocument()

      // Click next
      const nextButton = screen.getByLabelText('Next item')
      fireEvent.click(nextButton)

      // Should show items 2 and 3
      expect(screen.getByTestId('item-2')).toBeInTheDocument()
      expect(screen.getByTestId('item-3')).toBeInTheDocument()
    })

    it('navigates to previous items when previous button is clicked', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
        />
      )

      // Go to next first
      const nextButton = screen.getByLabelText('Next item')
      fireEvent.click(nextButton)

      // Then go back
      const prevButton = screen.getByLabelText('Previous item')
      fireEvent.click(prevButton)

      // Should show items 1 and 2 again
      expect(screen.getByTestId('item-1')).toBeInTheDocument()
      expect(screen.getByTestId('item-2')).toBeInTheDocument()
    })

    it('disables previous button on first slide', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
        />
      )

      const prevButton = screen.getByLabelText('Previous item')
      expect(prevButton).toBeDisabled()
    })

    it('disables next button on last slide', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
        />
      )

      // Navigate to last slide
      const nextButton = screen.getByLabelText('Next item')
      fireEvent.click(nextButton)
      fireEvent.click(nextButton)
      fireEvent.click(nextButton)

      expect(nextButton).toBeDisabled()
    })
  })

  describe('Position Indicator', () => {
    it('shows position indicator when enabled', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
          showPositionIndicator={true}
        />
      )

      // Should show 4 position indicators (5 items - 2 per view = 4 positions)
      const indicators = screen.getAllByRole('button', { name: /Go to slide/ })
      expect(indicators).toHaveLength(4)
    })

    it('highlights current position', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
          showPositionIndicator={true}
        />
      )

      const indicators = screen.getAllByRole('button', { name: /Go to slide/ })
      const firstIndicator = indicators[0]

      // First indicator should be highlighted (primary color)
      expect(firstIndicator).toHaveStyle({
        backgroundColor: expect.stringMatching(/primary|255|#ff2d63/i),
      })
    })

    it('allows navigation via position indicators', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
          showPositionIndicator={true}
        />
      )

      const indicators = screen.getAllByRole('button', { name: /Go to slide/ })
      const lastIndicator = indicators[indicators.length - 1]

      // Click last indicator
      fireEvent.click(lastIndicator)

      // Should show last items
      expect(screen.getByTestId('item-4')).toBeInTheDocument()
      expect(screen.getByTestId('item-5')).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('supports arrow key navigation', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
        />
      )

      const carousel = screen.getByRole('region')
      carousel.focus()

      // Right arrow should go to next
      fireEvent.keyDown(carousel, { key: 'ArrowRight' })
      expect(screen.getByTestId('item-3')).toBeInTheDocument()

      // Left arrow should go to previous
      fireEvent.keyDown(carousel, { key: 'ArrowLeft' })
      expect(screen.getByTestId('item-1')).toBeInTheDocument()
    })

    it('supports Home and End keys', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
        />
      )

      const carousel = screen.getByRole('region')
      carousel.focus()

      // End key should go to last slide
      fireEvent.keyDown(carousel, { key: 'End' })
      expect(screen.getByTestId('item-4')).toBeInTheDocument()

      // Home key should go to first slide
      fireEvent.keyDown(carousel, { key: 'Home' })
      expect(screen.getByTestId('item-1')).toBeInTheDocument()
    })
  })

  describe('Auto-play', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('auto-advances when enabled', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
          autoPlay={true}
          autoPlayInterval={1000}
        />
      )

      // Initially shows items 1 and 2
      expect(screen.getByTestId('item-1')).toBeInTheDocument()
      expect(screen.getByTestId('item-2')).toBeInTheDocument()

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(1000)
      })

      // Should show items 2 and 3
      expect(screen.getByTestId('item-2')).toBeInTheDocument()
      expect(screen.getByTestId('item-3')).toBeInTheDocument()
    })

    it('respects autoPlayInterval', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
          autoPlay={true}
          autoPlayInterval={2000}
        />
      )

      // Should not advance after 1 second
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(screen.getByTestId('item-1')).toBeInTheDocument()

      // Should advance after 2 seconds
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(screen.getByTestId('item-2')).toBeInTheDocument()
    })
  })

  describe('Customization', () => {
    it('applies custom className', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
          className="custom-carousel"
        />
      )

      const carousel = screen.getByRole('region').closest('.custom-carousel')
      expect(carousel).toBeInTheDocument()
    })

    it('calls onItemChange callback', () => {
      const handleItemChange = vi.fn()
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
          onItemChange={handleItemChange}
        />
      )

      const nextButton = screen.getByLabelText('Next item')
      fireEvent.click(nextButton)

      expect(handleItemChange).toHaveBeenCalledWith(1)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
        />
      )

      const carousel = screen.getByRole('region')
      expect(carousel).toHaveAttribute('aria-label', 'Carousel')
      expect(carousel).toHaveAttribute('aria-live', 'polite')
    })

    it('announces current position', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
        />
      )

      expect(screen.getByText('1 of 5')).toBeInTheDocument()
    })

    it('provides accessible labels for navigation buttons', () => {
      render(
        <Carousel
          items={mockItems}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
        />
      )

      expect(screen.getByLabelText('Previous item')).toBeInTheDocument()
      expect(screen.getByLabelText('Next item')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles single item gracefully', () => {
      render(
        <Carousel
          items={[mockItems[0]]}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={2}
        />
      )

      expect(screen.getByTestId('item-1')).toBeInTheDocument()
      expect(screen.queryByLabelText('Previous item')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Next item')).not.toBeInTheDocument()
    })

    it('handles itemsPerView greater than total items', () => {
      render(
        <Carousel
          items={mockItems.slice(0, 2)}
          renderItem={item => <MockItemComponent item={item} />}
          itemsPerView={5}
        />
      )

      expect(screen.getByTestId('item-1')).toBeInTheDocument()
      expect(screen.getByTestId('item-2')).toBeInTheDocument()
      expect(screen.queryByLabelText('Previous item')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Next item')).not.toBeInTheDocument()
    })
  })
})
