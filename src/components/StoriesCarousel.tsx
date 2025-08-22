import React, { useState, useRef, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { Box, Button, Stack, useTheme, useMediaQuery } from '@mui/material'

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!carouselRef.current?.contains(event.target as Node)) return

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          setCurrentIndex(prev => (prev - 1 + stories.length) % stories.length)
          break
        case 'ArrowRight':
          event.preventDefault()
          setCurrentIndex(prev => (prev + 1) % stories.length)
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
  }, [currentIndex, maxIndex, stories.length])

  const visibleStories = stories.slice(currentIndex, currentIndex + cardsPerView)

  return (
    <Section sx={{ py: { xs: 6, md: 8 } }}>
      <Stack spacing={4}>
        <CarouselHeader
          sectionTitle={sectionTitle}
          currentIndex={currentIndex}
          maxIndex={maxIndex}
          onPrevious={() => setCurrentIndex(prev => (prev - 1 + stories.length) % stories.length)}
          onNext={() => setCurrentIndex(prev => (prev + 1) % stories.length)}
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
                onKeyDown={event => {
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
            <Button component={Link} to="/stories" variant="outlined" size="large" sx={{ px: 4 }}>
              See All Stories
            </Button>
          </Box>
        )}
      </Stack>
    </Section>
  )
}
