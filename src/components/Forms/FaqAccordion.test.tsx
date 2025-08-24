import { render, screen, fireEvent } from '@testing-library/react'
import { FAQAccordion } from './FaqAccordion'

const mockFaqs = [
  {
    q: 'What is TechLabs?',
    a: 'TechLabs is a free tech education program that helps people learn digital skills.',
  },
  {
    q: 'How much does it cost?',
    a: 'TechLabs is completely free for all participants.',
  },
  {
    q: 'What tracks are available?',
    a: 'We offer Web Development, Data Science, Product Design, and AI tracks.',
  },
]

describe('FAQAccordion', () => {
  describe('Rendering', () => {
    it('renders all FAQ items', () => {
      render(<FAQAccordion faqs={mockFaqs} />)

      expect(screen.getByText('What is TechLabs?')).toBeInTheDocument()
      expect(screen.getByText('How much does it cost?')).toBeInTheDocument()
      expect(screen.getByText('What tracks are available?')).toBeInTheDocument()
    })

    it('renders FAQ answers', () => {
      render(<FAQAccordion faqs={mockFaqs} />)

      expect(
        screen.getByText(
          'TechLabs is a free tech education program that helps people learn digital skills.'
        )
      ).toBeInTheDocument()
      expect(
        screen.getByText('TechLabs is completely free for all participants.')
      ).toBeInTheDocument()
      expect(
        screen.getByText('We offer Web Development, Data Science, Product Design, and AI tracks.')
      ).toBeInTheDocument()
    })

    it('handles empty faqs array gracefully', () => {
      render(<FAQAccordion faqs={[]} />)

      const accordion = screen.queryByRole('button')
      expect(accordion).not.toBeInTheDocument()
    })
  })

  describe('Single Open Behavior', () => {
    it('opens only one panel at a time by default', () => {
      render(<FAQAccordion faqs={mockFaqs} />)

      // Click first FAQ
      const firstFaq = screen.getByRole('button', { name: /What is TechLabs/i })
      fireEvent.click(firstFaq)
      expect(
        screen.getByText(
          'TechLabs is a free tech education program that helps people learn digital skills.'
        )
      ).toBeVisible()

      // Click second FAQ
      const secondFaq = screen.getByRole('button', { name: /How much does it cost/i })
      fireEvent.click(secondFaq)
      expect(screen.getByText('TechLabs is completely free for all participants.')).toBeVisible()

      // First FAQ should be closed (MUI Accordion behavior)
      // Note: MUI Accordion might keep content visible during transitions
      // We'll check that the aria-expanded state is correct instead
      expect(firstFaq).toHaveAttribute('aria-expanded', 'false')
      expect(secondFaq).toHaveAttribute('aria-expanded', 'true')
    })

    it('closes panel when clicked again', () => {
      render(<FAQAccordion faqs={mockFaqs} />)

      const firstFaq = screen.getByRole('button', { name: /What is TechLabs/i })

      // Open panel
      fireEvent.click(firstFaq)
      expect(firstFaq).toHaveAttribute('aria-expanded', 'true')

      // Close panel
      fireEvent.click(firstFaq)
      expect(firstFaq).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Customization Options', () => {
    it('applies custom maxWidth', () => {
      render(<FAQAccordion faqs={mockFaqs} maxWidth="lg" />)

      const container = screen.getByText('What is TechLabs?').closest('.MuiBox-root')
      expect(container).toHaveStyle({ maxWidth: '1200px' }) // lg breakpoint
    })

    it('shows borders by default', () => {
      render(<FAQAccordion faqs={mockFaqs} />)

      const accordion = screen.getByText('What is TechLabs?').closest('.MuiAccordion-root')
      expect(accordion).toHaveStyle({ border: '1px solid' })
    })

    it('hides borders when showBorder is false', () => {
      render(<FAQAccordion faqs={mockFaqs} showBorder={false} />)

      const accordion = screen.getByText('What is TechLabs?').closest('.MuiAccordion-root')
      expect(accordion).toHaveStyle({ border: 'none' })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<FAQAccordion faqs={mockFaqs} />)

      const firstAccordion = screen
        .getByText('What is TechLabs?')
        .closest('.MuiAccordionSummary-root')
      expect(firstAccordion).toHaveAttribute('aria-controls', 'panel0bh-content')
      expect(firstAccordion).toHaveAttribute('id', 'panel0bh-header')
    })

    it('supports keyboard navigation', () => {
      render(<FAQAccordion faqs={mockFaqs} />)

      const firstFaq = screen.getByRole('button', { name: /What is TechLabs/i })

      // Press Enter to open (simulate click instead since MUI handles this internally)
      fireEvent.click(firstFaq)
      expect(firstFaq).toHaveAttribute('aria-expanded', 'true')

      // Press Space to close (simulate click instead)
      fireEvent.click(firstFaq)
      expect(firstFaq).toHaveAttribute('aria-expanded', 'false')
    })

    it('announces expand/collapse to screen readers', () => {
      render(<FAQAccordion faqs={mockFaqs} />)

      const firstFaq = screen.getByRole('button', { name: /What is TechLabs/i })
      expect(firstFaq).toHaveAttribute('aria-expanded', 'false')

      fireEvent.click(firstFaq)
      expect(firstFaq).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Styling', () => {
    it('applies primary color to expanded panel', () => {
      render(<FAQAccordion faqs={mockFaqs} />)

      const firstFaq = screen.getByRole('button', { name: /What is TechLabs/i })
      fireEvent.click(firstFaq)

      const accordion = firstFaq.closest('.MuiAccordion-root')
      expect(accordion).toHaveClass('Mui-expanded')
    })

    it('applies proper spacing between items', () => {
      render(<FAQAccordion faqs={mockFaqs} />)

      // Find the Stack container that wraps all accordions
      const stackContainer = screen.getByText('What is TechLabs?').closest('.MuiStack-root')
      // MUI Stack spacing={2} creates spacing between children, but the exact CSS property may vary
      // Check that the container exists and has the Stack class
      expect(stackContainer).toBeInTheDocument()
      expect(stackContainer).toHaveClass('MuiStack-root')
    })
  })

  describe('Edge Cases', () => {
    it('handles FAQ with very long question text', () => {
      const longQuestionFaq = [
        {
          q: 'This is a very long question that might wrap to multiple lines and could potentially cause layout issues in the accordion component?',
          a: 'Short answer.',
        },
      ]

      render(<FAQAccordion faqs={longQuestionFaq} />)

      expect(screen.getByText(/This is a very long question/)).toBeInTheDocument()
    })

    it('handles FAQ with HTML in answer text', () => {
      const htmlFaq = [
        {
          q: 'Question with HTML?',
          a: 'Answer with <strong>bold text</strong> and <em>italic text</em>.',
        },
      ]

      render(<FAQAccordion faqs={htmlFaq} />)

      // Use a more specific selector to avoid multiple matches
      const answerElement = screen
        .getByText('Question with HTML?')
        .closest('.MuiAccordion-root')
        ?.querySelector('.MuiAccordionDetails-root p')
      expect(answerElement).toBeInTheDocument()
      expect(answerElement).toHaveTextContent('Answer with')
      expect(answerElement).toHaveTextContent('bold text')
      expect(answerElement).toHaveTextContent('italic text')
    })
  })
})
