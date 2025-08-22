import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'

import { ValuePropCard } from '../ValuePropCard'
import { theme } from '../../theme/theme'

/**
 * Test wrapper component that provides MUI theme context
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
)

describe('ValuePropCard', () => {
    const mockProps = {
        icon: 'VolunteerActivism',
        title: 'Totally free',
        body: 'We cover tuition so you can focus on learning and outcomes.'
    }

    it('renders card title correctly', () => {
        render(
            <TestWrapper>
                <ValuePropCard {...mockProps} />
            </TestWrapper>
        )

        expect(screen.getByText('Totally free')).toBeInTheDocument()
    })

    it('renders card body text correctly', () => {
        render(
            <TestWrapper>
                <ValuePropCard {...mockProps} />
            </TestWrapper>
        )

        expect(screen.getByText('We cover tuition so you can focus on learning and outcomes.')).toBeInTheDocument()
    })

    it('renders with different props', () => {
        const networkingProps = {
            icon: 'Groups',
            title: 'Networking',
            body: 'Grow your network through mentors, peers, and partners.'
        }

        render(
            <TestWrapper>
                <ValuePropCard {...networkingProps} />
            </TestWrapper>
        )

        expect(screen.getByText('Networking')).toBeInTheDocument()
        expect(screen.getByText('Grow your network through mentors, peers, and partners.')).toBeInTheDocument()
    })

    it('uses heading role for title', () => {
        render(
            <TestWrapper>
                <ValuePropCard {...mockProps} />
            </TestWrapper>
        )

        expect(screen.getByRole('heading', { name: 'Totally free' })).toBeInTheDocument()
    })
})
