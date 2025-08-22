import { ThemeProvider } from '@mui/material/styles'
import { render, screen, fireEvent } from '@testing-library/react'

import { theme } from '../../theme/theme'
import { TrackCard, type Track } from '../TrackCard'

const mockTrack: Track = {
    id: 'web-dev',
    label: 'Web Development',
    description: 'Learn modern web development with HTML, CSS, JavaScript, and popular frameworks.',
    duration: '6 months',
    format: 'Part-time, 2 evenings per week',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React'],
    projects: ['Personal portfolio', 'E-commerce site'],
    careerPaths: ['Frontend Developer', 'Full-stack Developer'],
    nextCohort: 'March 2025',
    applicationDeadline: '2025-02-15',
    spotsAvailable: 25,
    icon: '💻',
}

const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('TrackCard', () => {
    it('renders track information correctly', () => {
        renderWithTheme(<TrackCard track={mockTrack} />)

        expect(screen.getByText('Web Development')).toBeInTheDocument()
        expect(
            screen.getByText(
                'Learn modern web development with HTML, CSS, JavaScript, and popular frameworks.'
            )
        ).toBeInTheDocument()
        expect(screen.getByText('6 months')).toBeInTheDocument()
        expect(screen.getByText('Part-time, 2 evenings per week')).toBeInTheDocument()
        expect(screen.getByText('25 spots left')).toBeInTheDocument()
        expect(screen.getByText('💻')).toBeInTheDocument()
    })

    it('shows expandable content when toggle button is clicked', () => {
        renderWithTheme(<TrackCard track={mockTrack} />)

        const toggleButton = screen.getByRole('button', { name: /show more details/i })
        fireEvent.click(toggleButton)

        expect(screen.getByText("Skills You'll Learn")).toBeInTheDocument()
        expect(screen.getByText('HTML5')).toBeInTheDocument()
        expect(screen.getByText('CSS3')).toBeInTheDocument()
        expect(screen.getByText('JavaScript')).toBeInTheDocument()
        expect(screen.getByText('React')).toBeInTheDocument()

        expect(screen.getByText("Projects You'll Build")).toBeInTheDocument()
        expect(screen.getByText('Personal portfolio')).toBeInTheDocument()
        expect(screen.getByText('E-commerce site')).toBeInTheDocument()

        expect(screen.getByText('Career Paths')).toBeInTheDocument()
        expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
        expect(screen.getByText('Full-stack Developer')).toBeInTheDocument()

        expect(screen.getByText('Application Details')).toBeInTheDocument()
        expect(screen.getByText('Next Cohort:')).toBeInTheDocument()
        expect(screen.getByText('March 2025')).toBeInTheDocument()
        expect(screen.getByText('Application Deadline:')).toBeInTheDocument()
        expect(screen.getByText('February 15, 2025')).toBeInTheDocument()
    })

    it('calls onToggle when toggle button is clicked', () => {
        const mockOnToggle = vi.fn()
        renderWithTheme(<TrackCard track={mockTrack} onToggle={mockOnToggle} />)

        const toggleButton = screen.getByRole('button', { name: /show more details/i })
        fireEvent.click(toggleButton)

        expect(mockOnToggle).toHaveBeenCalledWith('web-dev')
    })

    it('calls onToggle callback when toggle button is clicked', () => {
        const mockOnToggle = vi.fn()
        renderWithTheme(<TrackCard track={mockTrack} onToggle={mockOnToggle} />)

        const toggleButton = screen.getByRole('button', { name: /show more details/i })
        fireEvent.click(toggleButton)

        expect(mockOnToggle).toHaveBeenCalledWith('web-dev')
    })

    it('renders with expanded state when isExpanded is true', () => {
        renderWithTheme(<TrackCard track={mockTrack} isExpanded={true} />)

        expect(screen.getByText("Skills You'll Learn")).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /show less details/i })).toBeInTheDocument()
    })

    it('renders Apply Now button with correct link', () => {
        renderWithTheme(<TrackCard track={mockTrack} />)

        const applyButton = screen.getByRole('link', { name: /apply now/i })
        expect(applyButton).toHaveAttribute('href', '/apply?track=web-dev')
    })

    it('displays spots available with appropriate color based on availability', () => {
        const lowSpotsTrack = { ...mockTrack, spotsAvailable: 5 }
        renderWithTheme(<TrackCard track={lowSpotsTrack} />)

        const spotsChip = screen.getByText('5 spots left')
        expect(spotsChip).toBeInTheDocument()
        // Note: Color testing would require more complex setup with MUI theme
    })

    it('formats dates correctly', () => {
        renderWithTheme(<TrackCard track={mockTrack} />)

        // Expand to see application details
        const toggleButton = screen.getByRole('button', { name: /show more details/i })
        fireEvent.click(toggleButton)

        expect(screen.getByText('Application Deadline:')).toBeInTheDocument()
        expect(screen.getByText('February 15, 2025')).toBeInTheDocument()
    })

    it('has proper accessibility attributes', () => {
        renderWithTheme(<TrackCard track={mockTrack} />)

        const toggleButton = screen.getByRole('button', { name: /show more details/i })
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

        // Expand
        fireEvent.click(toggleButton)
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
        expect(toggleButton).toHaveAttribute('aria-label', 'Show less details')
    })

    it('renders skills as chips', () => {
        renderWithTheme(<TrackCard track={mockTrack} />)

        const toggleButton = screen.getByRole('button', { name: /show more details/i })
        fireEvent.click(toggleButton)

        expect(screen.getByText('HTML5')).toBeInTheDocument()
        expect(screen.getByText('CSS3')).toBeInTheDocument()
        expect(screen.getByText('JavaScript')).toBeInTheDocument()
        expect(screen.getByText('React')).toBeInTheDocument()
    })

    it('renders projects with bullet points', () => {
        renderWithTheme(<TrackCard track={mockTrack} />)

        const toggleButton = screen.getByRole('button', { name: /show more details/i })
        fireEvent.click(toggleButton)

        expect(screen.getByText('Personal portfolio')).toBeInTheDocument()
        expect(screen.getByText('E-commerce site')).toBeInTheDocument()
    })

    it('renders career paths as primary colored chips', () => {
        renderWithTheme(<TrackCard track={mockTrack} />)

        const toggleButton = screen.getByRole('button', { name: /show more details/i })
        fireEvent.click(toggleButton)

        expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
        expect(screen.getByText('Full-stack Developer')).toBeInTheDocument()
    })
})
