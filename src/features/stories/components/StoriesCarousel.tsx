import React, { useState, useRef, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Stack, useTheme, useMediaQuery } from '@mui/material'
import { Section } from '@/components/Layouts/Section'
import type { Story } from '@/types/home'
import { CarouselHeader, CarouselItem } from './StoriesCarouselComponents'

type StoriesCarouselProps = {
  stories: Story[]
  sectionTitle?: string
  showSeeAllLink?: boolean
}

/**
 * StoriesCarousel component - accessible carousel showcasing graduate stories
 * Features keyboard navigation, reduced motion support, and screen reader announcements
 */
export const StoriesCarousel: React.FC<StoriesCarouselProps> = memo(
  ({ stories, sectionTitle = "Our Graduates' Stories", showSeeAllLink = true }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))

    // Calculate cards per view based on screen size
    const cardsPerView = isMobile ? 1 : isTablet ? 2 : 3
    const maxIndex = Math.max(0, stories.length - cardsPerView)

    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)

    // Navigation handlers for UI buttons
    const handlePrevious = () => {
      setCurrentIndex(prev => (prev - 1 + stories.length) % stories.length)
    }

    const handleNext = () => {
      setCurrentIndex(prev => (prev + 1) % stories.length)
    }

    // Visible stories
    const visibleStories = stories.slice(currentIndex, currentIndex + cardsPerView)

    // Carousel styles
    const carouselStyles = {
      position: 'relative' as const,
      overflow: 'hidden',
      borderRadius: 2,
    }

    // Grid styles
    const gridStyles = {
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      },
      gap: 3,
    }

    // Story key down handler
    const handleStoryKeyDown = (storyId: string) => (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        window.location.href = `/stories/${storyId}`
      }
    }

    // Keyboard navigation
    useEffect(() => {
      const handlePrevious = () => {
        setCurrentIndex(prev => (prev - 1 + stories.length) % stories.length)
      }

      const handleNext = () => {
        setCurrentIndex(prev => (prev + 1) % stories.length)
      }

      const handleGoToStart = () => {
        setCurrentIndex(0)
      }

      const handleGoToEnd = () => {
        setCurrentIndex(maxIndex)
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (!carouselRef.current?.contains(event.target as Node)) return

        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault()
            handlePrevious()
            break
          case 'ArrowRight':
            event.preventDefault()
            handleNext()
            break
          case 'Home':
            event.preventDefault()
            handleGoToStart()
            break
          case 'End':
            event.preventDefault()
            handleGoToEnd()
            break
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [stories.length, maxIndex])

    return (
      <Section sx={{ py: { xs: 6, md: 8 } }}>
        <Stack spacing={4}>
          <CarouselHeader
            sectionTitle={sectionTitle}
            currentIndex={currentIndex}
            maxIndex={maxIndex}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />

          {/* Carousel container */}
          <Box
            ref={carouselRef}
            role="region"
            aria-label="Stories carousel"
            aria-live="polite"
            sx={carouselStyles}
          >
            {/* Stories grid */}
            <Box sx={gridStyles}>
              {visibleStories.map((story, index) => (
                <Box
                  key={story.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`Story ${currentIndex + index + 1}: ${story.title}`}
                  onKeyDown={handleStoryKeyDown(story.id)}
                >
                  <CarouselItem story={story} />
                </Box>
              ))}
            </Box>
          </Box>

          {/* See all stories link */}
          {showSeeAllLink && stories.length > cardsPerView && (
            <Box sx={{ textAlign: 'center' }}>
              <Button component={Link} to="/stories" variant="outlined" size="large" sx={{ px: 4 }}>
                See All Stories
              </Button>
            </Box>
          )}
        </Stack>
      </Section>
    )
  }
)

StoriesCarousel.displayName = 'StoriesCarousel'
