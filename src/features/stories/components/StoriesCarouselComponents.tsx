import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Typography, IconButton } from '@mui/material'
import { SectionHeading } from '@/components/Layouts/SectionHeading'
import type { Story } from '@/types/home'

// Constants
const NAVIGATION_BUTTON_SIZE = 60 // Increased to 56-64px range
const BRAND_PINK = '#FA1E5A' // Brand pink color

// Image paths for story assets
const STORY_IMAGES = {
  '1': '/img/stories/person1.png',
  '2': '/img/stories/person2.png',
  '3': '/img/stories/person3.png',
} as const

export type CarouselNavigationProps = {
  currentIndex: number
  maxIndex: number
  onPrevious: () => void
  onNext: () => void
}

export type CarouselItemProps = {
  story: Story
}

export type CarouselHeaderProps = {
  sectionTitle: string
}

/**
 * Navigation controls for the stories carousel
 */
export const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  currentIndex,
  maxIndex,
  onPrevious,
  onNext,
}) => (
  <Box sx={{ position: 'relative', height: 0 }}>
    {' '}
    {/* Container for absolutely positioned arrows */}
    <IconButton
      onClick={onPrevious}
      disabled={currentIndex === 0}
      aria-label="Previous stories"
      sx={{
        width: NAVIGATION_BUTTON_SIZE,
        height: NAVIGATION_BUTTON_SIZE,
        backgroundColor: BRAND_PINK,
        color: 'white',
        borderRadius: '50%',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        position: 'absolute',
        left: -35, // Adjusted for wider cards to overlap edge properly
        top: '240px', // Vertically centered (480px / 2 = 240px)
        transform: 'translateY(-50%)', // Perfect center alignment
        zIndex: 2,
        '&:hover': {
          backgroundColor: '#E01A51', // Darker pink on hover
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
          transform: 'translateY(-50%) translateY(-1px)', // Maintain center + lift
        },
        '&.Mui-disabled': {
          backgroundColor: BRAND_PINK,
          color: 'white',
          opacity: 0.4,
        },
      }}
    >
      <ArrowBackIcon sx={{ fontSize: 24 }} />
    </IconButton>
    <IconButton
      onClick={onNext}
      disabled={currentIndex >= maxIndex}
      aria-label="Next stories"
      sx={{
        width: NAVIGATION_BUTTON_SIZE,
        height: NAVIGATION_BUTTON_SIZE,
        backgroundColor: BRAND_PINK,
        color: 'white',
        borderRadius: '50%',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        position: 'absolute',
        right: -35, // Adjusted for wider cards to overlap edge properly
        top: '240px', // Vertically centered (480px / 2 = 240px)
        transform: 'translateY(-50%)', // Perfect center alignment
        zIndex: 2,
        '&:hover': {
          backgroundColor: '#E01A51', // Darker pink on hover
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
          transform: 'translateY(-50%) translateY(-1px)', // Maintain center + lift
        },
        '&.Mui-disabled': {
          backgroundColor: BRAND_PINK,
          color: 'white',
          opacity: 0.4,
        },
      }}
    >
      <ArrowForwardIcon sx={{ fontSize: 24 }} />
    </IconButton>
  </Box>
)

/**
 * Carousel header with centered title
 */
export const CarouselHeader: React.FC<CarouselHeaderProps> = ({ sectionTitle }) => (
  <Box sx={{ textAlign: 'center' }}>
    <SectionHeading level={2}>{sectionTitle}</SectionHeading>
  </Box>
)

/**
 * Individual carousel item component - image-only tile with gradient overlay
 */
export const CarouselItem: React.FC<CarouselItemProps> = ({ story }) => {
  // Map story ID to appropriate image asset
  const getStoryImage = (storyId: string) => {
    return STORY_IMAGES[storyId as keyof typeof STORY_IMAGES] || STORY_IMAGES['1']
  }

  return (
    <Box
      component="a"
      href={`/stories/${story.id}`}
      sx={{
        position: 'relative',
        display: 'block',
        height: '480px', // Increased card size (bigger)
        borderRadius: '20px', // Kept at 20px as requested
        overflow: 'hidden',
        textDecoration: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', // Soft spread shadow
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', // Enhanced hover shadow
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px',
        },
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          window.location.href = `/stories/${story.id}`
        }
      }}
    >
      {/* Story Image */}
      <Box
        component="img"
        src={getStoryImage(story.id)}
        alt={story.title}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Bottom Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%', // Increased to cover bottom 50%
          background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.75))', // Strengthened gradient
          pointerEvents: 'none',
        }}
      />

      {/* Text Content Overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20, // Increased padding
          left: 20, // Increased padding
          right: 20, // Increased padding
          color: '#FFFFFF', // Pure white
          pointerEvents: 'none',
        }}
      >
        <Typography variant="h3" component="h3">
          {story.title}
        </Typography>
        <Typography variant="body2" color="white">
          {'“ ' + story.excerpt + '”'}
        </Typography>
      </Box>
    </Box>
  )
}
