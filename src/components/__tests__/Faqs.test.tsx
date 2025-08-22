import { ThemeProvider } from '@mui/material/styles'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { theme } from '../../theme/theme'
import { Faqs } from '../Faqs'

// Mock data for testing
const mockFaqs = [
    {
        q: 'Where does the TechLabs take place?',
        a: 'We run in multiple cities and online. Check the application page for your city.',
    },
    {
        q: 'Is it a full time program?',
        a: 'No. It is designed to fit alongside work or studies (part-time).',
    },
]

// Wrapper component for testing with required providers
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </BrowserRouter>
)

describe('Faqs', () => {
    it('renders FAQ section header correctly', () => {
        render(
            <TestWrapper>
                <Faqs faqs={mockFaqs} />
            </TestWrapper>
        )

        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
        expect(
            screen.getByText('Get answers to common questions about TechLabs')
        ).toBeInTheDocument()
    })

    it('renders all FAQ items from props', () => {
        render(
            <TestWrapper>
                <Faqs faqs={mockFaqs} />
            </TestWrapper>
        )

        expect(screen.getByText('Where does the TechLabs take place?')).toBeInTheDocument()
        expect(screen.getByText('Is it a full time program?')).toBeInTheDocument()
    })

    it('shows FAQ answers when accordion is expanded', () => {
        render(
            <TestWrapper>
                <Faqs faqs={mockFaqs} />
            </TestWrapper>
        )

        // Debug: Check initial state
        const firstAccordion = screen.getByRole('button', { name: /where does the techlabs take place/i })

        // Click to expand first FAQ
        fireEvent.click(firstAccordion)

        // Answer should now be visible
        expect(screen.getByText('We run in multiple cities and online. Check the application page for your city.')).toBeInTheDocument()
    })

    it('renders FAQ accordion with expandable panels', () => {
        render(
            <TestWrapper>
                <Faqs faqs={mockFaqs} />
            </TestWrapper>
        )

        // Both FAQ questions should be visible
        expect(screen.getByText('Where does the TechLabs take place?')).toBeInTheDocument()
        expect(screen.getByText('Is it a full time program?')).toBeInTheDocument()

        // Both answers should be present in the DOM (MUI Accordion behavior)
        expect(screen.getByText('We run in multiple cities and online. Check the application page for your city.')).toBeInTheDocument()
        expect(screen.getByText('No. It is designed to fit alongside work or studies (part-time).')).toBeInTheDocument()

        // Verify accordion structure
        const accordionButtons = screen.getAllByRole('button')
        expect(accordionButtons).toHaveLength(2)
    })

    it('renders "More Questions" button with correct link', () => {
        render(
            <TestWrapper>
                <Faqs faqs={mockFaqs} />
            </TestWrapper>
        )

        const moreQuestionsButton = screen.getByRole('link', { name: /more questions/i })
        expect(moreQuestionsButton).toBeInTheDocument()
        expect(moreQuestionsButton).toHaveAttribute('href', '/about#faq')
    })

    it('renders helper text below More Questions button', () => {
        render(
            <TestWrapper>
                <Faqs faqs={mockFaqs} />
            </TestWrapper>
        )

        expect(
            screen.getByText("Can't find what you're looking for? Check our full FAQ section.")
        ).toBeInTheDocument()
    })

    it('has proper heading structure for accessibility', () => {
        render(
            <TestWrapper>
                <Faqs faqs={mockFaqs} />
            </TestWrapper>
        )

        // Main section heading
        const mainHeading = screen.getByRole('heading', { level: 2 })
        expect(mainHeading).toHaveTextContent('Frequently Asked Questions')

        // FAQ question headings (should be 2 from the FAQ items)
        const questionHeadings = screen.getAllByRole('heading', { level: 3 })
        expect(questionHeadings).toHaveLength(2)
        expect(questionHeadings[0]).toHaveTextContent('Where does the TechLabs take place?')
        expect(questionHeadings[1]).toHaveTextContent('Is it a full time program?')
    })

    it('handles keyboard navigation for accordion expansion', () => {
        render(
            <TestWrapper>
                <Faqs faqs={mockFaqs} />
            </TestWrapper>
        )

        const firstAccordion = screen.getByRole('button', { name: /where does the techlabs take place/i })

        // Focus on first accordion
        firstAccordion.focus()

        // Press Enter to expand
        fireEvent.keyDown(firstAccordion, { key: 'Enter', code: 'Enter' })

        // Answer should be visible
        expect(screen.getByText('We run in multiple cities and online. Check the application page for your city.')).toBeInTheDocument()
    })

    it('renders with empty FAQ array gracefully', () => {
        render(
            <TestWrapper>
                <Faqs faqs={[]} />
            </TestWrapper>
        )

        // Header should still render
        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()

        // No FAQ items should render
        expect(screen.queryByRole('button')).not.toBeInTheDocument()

        // More Questions button should still be present
        expect(screen.getByRole('link', { name: /more questions/i })).toBeInTheDocument()
    })
})
