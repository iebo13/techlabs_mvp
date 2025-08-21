import { ThemeProvider } from '@mui/material/styles'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { vi } from 'vitest'

import { theme } from '../../theme/theme'
import VideoEmbed from '../VideoEmbed'

// Simple approach - just test functionality without mocking icons

const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

const defaultProps = {
    open: true,
    onClose: vi.fn(),
    title: 'TechLabs Introduction Video',
    srcUrl: '/video/intro.mp4',
    posterUrl: '/img/video-poster.jpg',
}

describe('VideoEmbed', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        // Clear any existing timers and event listeners
        vi.clearAllTimers()
    })

    afterEach(() => {
        // Clean up any timers and restore real timers after each test
        vi.runOnlyPendingTimers()
        vi.useRealTimers()
        // Clear all mocks to prevent memory leaks
        vi.restoreAllMocks()
    })

    it('renders when open is true', () => {
        renderWithTheme(<VideoEmbed {...defaultProps} />)

        expect(screen.getByRole('dialog')).toBeInTheDocument()
        expect(screen.getByText('TechLabs Introduction Video')).toBeInTheDocument()
    })

    it('does not render when open is false', () => {
        renderWithTheme(<VideoEmbed {...defaultProps} open={false} />)

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('displays correct title in dialog header', () => {
        renderWithTheme(<VideoEmbed {...defaultProps} />)

        const title = screen.getByText('TechLabs Introduction Video')
        expect(title).toBeInTheDocument()
    })

    it('has close button with accessible label', () => {
        renderWithTheme(<VideoEmbed {...defaultProps} />)

        const closeButton = screen.getByLabelText('Close video')
        expect(closeButton).toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', async () => {
        const user = userEvent.setup()
        const onCloseMock = vi.fn()

        renderWithTheme(<VideoEmbed {...defaultProps} onClose={onCloseMock} />)

        const closeButton = screen.getByLabelText('Close video')
        await user.click(closeButton)

        expect(onCloseMock).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when Escape key is pressed', async () => {
        const onCloseMock = vi.fn()

        renderWithTheme(<VideoEmbed {...defaultProps} onClose={onCloseMock} />)

        fireEvent.keyDown(document, { key: 'Escape' })

        await waitFor(() => {
            expect(onCloseMock).toHaveBeenCalledTimes(1)
        })
    })

    it('does not call onClose for other keys', async () => {
        const onCloseMock = vi.fn()

        renderWithTheme(<VideoEmbed {...defaultProps} onClose={onCloseMock} />)

        fireEvent.keyDown(document, { key: 'Enter' })
        fireEvent.keyDown(document, { key: 'Space' })
        fireEvent.keyDown(document, { key: 'Tab' })

        expect(onCloseMock).not.toHaveBeenCalled()
    })

    it('renders video element with correct attributes', () => {
        renderWithTheme(<VideoEmbed {...defaultProps} />)

        const video = screen.getByLabelText('TechLabs Introduction Video video player')
        expect(video).toBeInTheDocument()
        expect(video).toHaveAttribute('controls')
        expect(video).toHaveAttribute('poster', '/img/video-poster.jpg')
        expect(video).toHaveAttribute('preload', 'metadata')
    })

    it('has video source with correct src and type', () => {
        renderWithTheme(<VideoEmbed {...defaultProps} />)

        const videoSource = screen.getByRole('application').querySelector('source')
        expect(videoSource).toHaveAttribute('src', '/video/intro.mp4')
        expect(videoSource).toHaveAttribute('type', 'video/mp4')
    })

    it('includes captions track for accessibility', () => {
        renderWithTheme(<VideoEmbed {...defaultProps} />)

        const video = screen.getByLabelText('TechLabs Introduction Video video player')
        const track = video.querySelector('track')

        expect(track).toHaveAttribute('kind', 'captions')
        expect(track).toHaveAttribute('src', '/captions/intro.vtt')
        expect(track).toHaveAttribute('srcLang', 'en')
        expect(track).toHaveAttribute('label', 'English captions')
        expect(track).toHaveAttribute('default')
    })

    it('pauses video when modal closes', () => {
        const pauseMock = vi.fn()

        // Mock HTMLVideoElement.pause
        Object.defineProperty(HTMLVideoElement.prototype, 'pause', {
            configurable: true,
            value: pauseMock,
        })

        const { rerender } = renderWithTheme(<VideoEmbed {...defaultProps} />)

        // Close the modal
        rerender(<ThemeProvider theme={theme}><VideoEmbed {...defaultProps} open={false} /></ThemeProvider>)

        expect(pauseMock).toHaveBeenCalled()
    })

    it('focuses close button when modal opens', async () => {
        vi.useFakeTimers()

        try {
            renderWithTheme(<VideoEmbed {...defaultProps} />)

            // Fast-forward the setTimeout
            vi.advanceTimersByTime(100)

            await waitFor(() => {
                const closeButton = screen.getByLabelText('Close video')
                expect(closeButton).toHaveFocus()
            })
        } finally {
            // Ensure timers are always cleaned up
            vi.useRealTimers()
        }
    })

    it('has proper ARIA attributes for dialog', () => {
        renderWithTheme(<VideoEmbed {...defaultProps} />)

        const dialog = screen.getByRole('dialog')
        expect(dialog).toHaveAttribute('aria-labelledby', 'video-dialog-title')
    })

    it('removes event listeners when unmounted', () => {
        const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')

        const { unmount } = renderWithTheme(<VideoEmbed {...defaultProps} />)

        unmount()

        expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

        removeEventListenerSpy.mockRestore()
    })

    it('handles different titles correctly', () => {
        const customTitle = 'Custom Video Title'

        renderWithTheme(<VideoEmbed {...defaultProps} title={customTitle} />)

        expect(screen.getByText(customTitle)).toBeInTheDocument()
        expect(screen.getByLabelText(`${customTitle} video player`)).toBeInTheDocument()
    })

    it('provides fallback text for unsupported browsers', () => {
        renderWithTheme(<VideoEmbed {...defaultProps} />)

        const video = screen.getByLabelText('TechLabs Introduction Video video player')
        expect(video).toHaveTextContent('Your browser does not support the video tag.')
    })
})
