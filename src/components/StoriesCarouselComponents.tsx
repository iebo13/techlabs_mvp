import React from 'react'

import { Link } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Stack } from '@mui/material'

import { SectionHeading } from './SectionHeading'

import type { Story } from '../types/home'

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
  currentIndex: number
  maxIndex: number
  onPrevious: () => void
  onNext: () => void
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
  <Stack direction="row" spacing={1} alignItems="center">
    <IconButton
      onClick={onPrevious}
      disabled={currentIndex === 0}
      aria-label="Previous stories"
      size="large"
      sx={{
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'primary.50',
        },
        '&.Mui-disabled': {
          borderColor: 'divider',
          opacity: 0.5,
        },
      }}
    >
      <ArrowBackIcon />
    </IconButton>

    <IconButton
      onClick={onNext}
      disabled={currentIndex >= maxIndex}
      aria-label="Next stories"
      size="large"
      sx={{
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'primary.50',
        },
        '&.Mui-disabled': {
          borderColor: 'divider',
          opacity: 0.5,
        },
      }}
    >
      <ArrowForwardIcon />
    </IconButton>
  </Stack>
)

/**
 * Carousel header with title and navigation
 */
export const CarouselHeader: React.FC<CarouselHeaderProps> = ({
  sectionTitle,
  currentIndex,
  maxIndex,
  onPrevious,
  onNext,
}) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    flexWrap="wrap"
    spacing={2}
  >
    <SectionHeading level={2}>{sectionTitle}</SectionHeading>

    <CarouselNavigation
      currentIndex={currentIndex}
      maxIndex={maxIndex}
      onPrevious={onPrevious}
      onNext={onNext}
    />
  </Stack>
)

/**
 * Individual carousel item component
 */
export const CarouselItem: React.FC<CarouselItemProps> = ({ story }) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    }}
  >
    <CardMedia
      component="img"
      height="200"
      image={story.imageUrl}
      alt={story.title}
      sx={{ objectFit: 'cover' }}
    />
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" component="h3" gutterBottom>
        {story.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
        {story.excerpt}
      </Typography>
      <Button
        component={Link}
        to={`/stories/${story.id}`}
        variant="outlined"
        size="small"
        sx={{ alignSelf: 'flex-start' }}
      >
        Read Story
      </Button>
    </CardContent>
  </Card>
)
