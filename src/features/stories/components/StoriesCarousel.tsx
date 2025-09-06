import React, { useState, useRef, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import { Box, Button, Stack, Container } from '@mui/material'
import { Section } from '@/components/Layouts/Section'
import type { Story } from '@/types/home'
import { CarouselHeader, CarouselItem, CarouselNavigation } from './StoriesCarouselComponents'

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
  ({ stories, sectionTitle = 'Our Graduates Stories', showSeeAllLink = true }) => {
    // Always show exactly 3 cards per view as per Figma design
    const cardsPerView = 3
    const maxIndex = Math.max(0, stories.length - cardsPerView)

    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)

    // Navigation handlers for UI buttons
    const handlePrevious = () => {
      setCurrentIndex(prev => Math.max(0, prev - 1))
    }

    const handleNext = () => {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
    }

    // Visible stories
    const visibleStories = stories.slice(currentIndex, currentIndex + cardsPerView)

    // Carousel container styles
    const carouselContainerStyles = {
      position: 'relative' as const,
      maxWidth: '1400px', // Increased from 1200px for wider cards
      margin: '0 auto',
      px: 6, // Space for overlapping arrows
    }

    // Grid styles - exactly 3 cards with optimized gaps for wider cards
    const gridStyles = {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 2.5, // 20px gaps (reduced slightly to allow more width for cards)
    }

    // Keyboard navigation for carousel arrows
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!carouselRef.current?.contains(event.target as Node)) return

        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault()
            setCurrentIndex(prev => Math.max(0, prev - 1))
            break
          case 'ArrowRight':
            event.preventDefault()
            setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
            break
          case 'Home':
            event.preventDefault()
            setCurrentIndex(0)
            break
          case 'End':
            event.preventDefault()
            setCurrentIndex(maxIndex)
            break
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [maxIndex])

    return (
      <Section sx={{ py: { xs: 4, md: 5 }, position: 'relative' }}>
        {' '}
        {/* Reduced padding for tighter rhythm */}
        <Container maxWidth="lg">
          <Stack spacing={3}>
            {/* Centered section heading with tighter spacing */}
            <Box sx={{ textAlign: 'center', pt: { xs: 2, md: 3 }, pb: { xs: 2, md: 2.5 } }}>
              <Box
                sx={{
                  '& h2': {
                    color: '#FA1E5A', // Brand pink color for heading
                    letterSpacing: 0, // Remove letter-spacing
                    fontWeight: 700, // Keep bold
                    lineHeight: 1.2, // Dense line height
                  },
                }}
              >
                <CarouselHeader sectionTitle={sectionTitle} />
              </Box>
            </Box>

            {/* Carousel container with navigation arrows */}
            <Box sx={carouselContainerStyles}>
              <Box
                ref={carouselRef}
                role="region"
                aria-label="Stories carousel"
                aria-live="polite"
                sx={{ position: 'relative' }}
              >
                {/* Navigation arrows positioned over cards */}
                <CarouselNavigation
                  currentIndex={currentIndex}
                  maxIndex={maxIndex}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                />

                {/* Stories grid - exactly 3 cards */}
                <Box sx={gridStyles}>
                  {visibleStories.map(story => (
                    <Box key={story.id}>
                      <CarouselItem story={story} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* See all stories link */}
            {showSeeAllLink && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 2, pl: 4 }}>
                <Button
                  component={Link}
                  to="/stories"
                  variant="text"
                  endIcon={<ChevronRightIcon sx={{ fontSize: 14, ml: 0.5 }} />}
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '14px', sm: '16px' }, // Updated sizing
                    fontWeight: 400, // Light weight
                    textTransform: 'none',
                    p: 0,
                    minWidth: 'auto',
                    gap: 0.5, // Consistent spacing with chevron
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  See all stories
                </Button>
              </Box>
            )}
          </Stack>
        </Container>
      </Section>
    )
  }
)

StoriesCarousel.displayName = 'StoriesCarousel'
