import React from 'react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Box, IconButton, Stack } from '@mui/material'

type CarouselNavigationProps = {
  showNavigation: boolean
  itemsLength: number
  itemsPerView: number
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
}

/**
 * CarouselNavigation - Renders navigation controls for the carousel
 * Extracted from Carousel for better separation of concerns
 */
export const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  showNavigation,
  itemsLength,
  itemsPerView,
  currentIndex,
  onPrevious,
  onNext,
}) => {
  if (!showNavigation || itemsLength <= itemsPerView) {
    return null
  }

  const maxIndex = Math.max(0, itemsLength - itemsPerView)

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      {/* Position indicator text */}
      <Box
        component="span"
        sx={{
          typography: 'body2',
          color: 'text.secondary',
          fontWeight: 500,
        }}
      >
        {currentIndex + 1} of {itemsLength}
      </Box>
      <Stack direction="row" spacing={1}>
        <IconButton
          onClick={onPrevious}
          disabled={currentIndex === 0}
          aria-label="Previous item"
          size="small"
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={onNext}
          disabled={currentIndex >= maxIndex}
          aria-label="Next item"
          size="small"
        >
          <ChevronRight />
        </IconButton>
      </Stack>
    </Stack>
  )
}
