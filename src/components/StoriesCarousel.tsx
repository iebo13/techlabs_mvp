import React, { useState, useRef, useEffect, useCallback } from 'react'

import { Link } from 'react-router-dom'

import {
    Box,
    Button,
    Stack,
    useTheme,
    useMediaQuery,
} from '@mui/material'

import { Section } from './Section'
import { CarouselHeader, CarouselItem } from './StoriesCarouselComponents'

import type { Story } from '../types/home'

type StoriesCarouselProps = {
    stories: Story[]
    sectionTitle?: string
    showSeeAllLink?: boolean
}

/**
 * StoriesCarousel component - accessible carousel showcasing graduate stories
 * Features keyboard navigation, reduced motion support, and screen reader announcements
 */
export const StoriesCarousel: React.FC<StoriesCarouselProps> = ({
    stories,
    sectionTitle = "Our Graduates' Stories",
    showSeeAllLink = true,
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))

    // Calculate cards per view based on screen size
    const cardsPerView = isMobile ? 1 : isTablet ? 2 : 3
    const maxIndex = Math.max(0, stories.length - cardsPerView)

    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)

    const goToSlide = useCallback((newIndex: number) => {
        const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex))
        setCurrentIndex(clampedIndex)

        // Announce current position to screen readers
        const announcement = `Showing ${clampedIndex + 1} to ${Math.min(clampedIndex + cardsPerView, stories.length)} of ${stories.length} stories`
        announceToScreenReader(announcement)
    }, [maxIndex, cardsPerView, stories.length])

    const goToPrevious = useCallback(() => {
        goToSlide(currentIndex - 1)
    }, [currentIndex, goToSlide])

    const goToNext = useCallback(() => {
        goToSlide(currentIndex + 1)
    }, [currentIndex, goToSlide])

    // Screen reader announcements
    const announceToScreenReader = useCallback((message: string) => {
        // Only run in browser environment
        if (typeof document === 'undefined') return

        const announcement = document.createElement('div')
        announcement.setAttribute('aria-live', 'polite')
        announcement.setAttribute('aria-atomic', 'true')
        announcement.setAttribute('class', 'sr-only')
        announcement.style.position = 'absolute'
        announcement.style.left = '-10000px'
        announcement.style.width = '1px'
        announcement.style.height = '1px'
        announcement.style.overflow = 'hidden'
        announcement.textContent = message

        document.body.appendChild(announcement)

        // Simple cleanup without tracking timeouts
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement)
            }
        }, 1000)
    }, [])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!carouselRef.current?.contains(event.target as Node)) return

            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault()
                    goToPrevious()
                    break
                case 'ArrowRight':
                    event.preventDefault()
                    goToNext()
                    break
                case 'Home':
                    event.preventDefault()
                    goToSlide(0)
                    break
                case 'End':
                    event.preventDefault()
                    goToSlide(maxIndex)
                    break
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [goToPrevious, goToNext, goToSlide, maxIndex])

    const visibleStories = stories.slice(currentIndex, currentIndex + cardsPerView)

    return (
        <Section sx={{ py: { xs: 6, md: 8 } }}>
            <Stack spacing={4}>
                <CarouselHeader
                    sectionTitle={sectionTitle}
                    currentIndex={currentIndex}
                    maxIndex={maxIndex}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                />

                {/* Carousel container */}
                <Box
                    ref={carouselRef}
                    role="region"
                    aria-label="Stories carousel"
                    aria-live="polite"
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 2,
                    }}
                >
                    {/* Stories grid */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                            },
                            gap: 3,
                        }}
                    >
                        {visibleStories.map((story, index) => (
                            <Box
                                key={story.id}
                                tabIndex={0}
                                role="button"
                                aria-label={`Story ${currentIndex + index + 1}: ${story.title}`}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault()
                                        // Navigate to story detail page
                                        window.location.href = `/stories/${story.id}`
                                    }
                                }}
                            >
                                <CarouselItem story={story} />
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* See all stories link */}
                {showSeeAllLink && stories.length > cardsPerView && (
                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            component={Link}
                            to="/stories"
                            variant="outlined"
                            size="large"
                            sx={{ px: 4 }}
                        >
                            See All Stories
                        </Button>
                    </Box>
                )}
            </Stack>
        </Section>
    )
}
