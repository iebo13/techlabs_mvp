import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import { Box, Button, useTheme, useMediaQuery } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import type { Story } from '@/features/stories'
import { CarouselItem } from './CarouselItem'
import { CarouselNavigation } from './CarouselNavigation'

type StoriesCarouselProps = {
  stories: Story[]
  sectionTitle?: string
  showSeeAllLink?: boolean
}

export const StoriesCarousel: React.FC<StoriesCarouselProps> = ({ stories, sectionTitle, showSeeAllLink = true }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const cardsPerView = isMobile ? 1 : 3
  const maxIndex = Math.max(0, stories.length - cardsPerView)

  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
  }

  const visibleStories = stories.slice(currentIndex, currentIndex + cardsPerView)

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
    <Section sx={{ py: { xs: 4, md: 6 }, position: 'relative' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ textAlign: 'center', color: 'primary.main' }}>
          <SectionHeading level={2}>{sectionTitle}</SectionHeading>
        </Box>
        <Box
          sx={{
            position: 'relative',
            maxWidth: '1400px',
            margin: '0 auto',
            px: { xs: 3, md: 6 },
          }}>
          <Box
            ref={carouselRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Stories carousel"
            aria-live="polite"
            sx={{ position: 'relative' }}>
            <CarouselNavigation
              currentIndex={currentIndex}
              maxIndex={maxIndex}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(3, 1fr)',
                },
                gap: 2.5,
              }}>
              {visibleStories.map(story => (
                <Box key={story.id}>
                  <CarouselItem story={story} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {showSeeAllLink && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              component={Link}
              to="/stories"
              variant="text"
              endIcon={<ChevronRightIcon />}
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '14px', sm: '16px' },
                fontWeight: 400,
                textTransform: 'none',
                p: 0,
                minWidth: 'auto',
                gap: 0.5,
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'transparent',
                },
              }}>
              See all stories
            </Button>
          </Box>
        )}
      </Box>
    </Section>
  )
}

StoriesCarousel.displayName = 'StoriesCarousel'
