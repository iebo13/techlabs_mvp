import React from 'react'
import { Box, Stack } from '@mui/material'

type CarouselIndicatorsProps = {
  showPositionIndicator: boolean
  itemsLength: number
  itemsPerView: number
  currentIndex: number
  onGoToSlide: (index: number) => void
}

/**
 * CarouselIndicators - Renders position indicators for the carousel
 * Extracted from Carousel for better separation of concerns
 */
export const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({
  showPositionIndicator,
  itemsLength,
  itemsPerView,
  currentIndex,
  onGoToSlide,
}) => {
  if (!showPositionIndicator || itemsLength <= itemsPerView) {
    return null
  }

  const maxIndex = Math.max(0, itemsLength - itemsPerView)

  return (
    <Stack direction="row" justifyContent="center" spacing={1}>
      {Array.from({ length: maxIndex + 1 }, (_, index) => (
        <Box
          key={`indicator-${index}`}
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: index === currentIndex ? 'primary.main' : 'divider',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: index === currentIndex ? 'primary.dark' : 'text.secondary',
            },
          }}
          onClick={() => onGoToSlide(index)}
          role="button"
          aria-label={`Go to slide ${index + 1}`}
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onGoToSlide(index)
            }
          }}
        />
      ))}
    </Stack>
  )
}
