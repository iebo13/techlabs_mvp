import React from 'react'
import { Box, Stack } from '@mui/material'
import { useCarouselAutoPlay } from '@/hooks/useCarouselAutoPlay'
import { useCarouselKeyboard } from '@/hooks/useCarouselKeyboard'
import { useCarouselNavigation } from '@/hooks/useCarouselNavigation'
import { CarouselIndicators } from './CarouselIndicators'
import { CarouselNavigation } from './CarouselNavigation'

type CarouselProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  itemsPerView: number
  showNavigation?: boolean
  showPositionIndicator?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  onItemChange?: (currentIndex: number) => void
  className?: string
}

/**
 * Carousel - Generic carousel component for any type of content
 * Supports keyboard navigation, auto-play, and customizable rendering
 */
const Carousel = <T extends { id?: string | number }>({
  items,
  renderItem,
  itemsPerView = 3,
  showNavigation = true,
  showPositionIndicator = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  onItemChange,
  className,
}: CarouselProps<T>): React.ReactElement => {
  const { currentIndex, maxIndex, goToSlide, goToPrevious, goToNext } = useCarouselNavigation(
    items.length,
    itemsPerView,
    onItemChange
  )

  useCarouselAutoPlay(
    autoPlay,
    autoPlayInterval,
    items.length,
    itemsPerView,
    currentIndex,
    maxIndex,
    goToSlide
  )

  const carouselRef = useCarouselKeyboard(currentIndex, maxIndex, goToSlide)

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <Box className={className}>
      <Stack spacing={2}>
        <CarouselNavigation
          showNavigation={showNavigation}
          itemsLength={items.length}
          itemsPerView={itemsPerView}
          currentIndex={currentIndex}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />

        {/* Carousel Container */}
        <Box
          ref={carouselRef}
          role="region"
          aria-label="Carousel"
          aria-live="polite"
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          {/* Items Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
              gap: 3,
            }}
          >
            {visibleItems.map((item, index) => (
              <Box
                key={`${item.id || currentIndex + index}-${currentIndex}`}
                tabIndex={0}
                role="button"
                aria-label={`Item ${currentIndex + index + 1} of ${items.length}`}
              >
                {renderItem(item, currentIndex + index)}
              </Box>
            ))}
          </Box>
        </Box>

        <CarouselIndicators
          showPositionIndicator={showPositionIndicator}
          itemsLength={items.length}
          itemsPerView={itemsPerView}
          currentIndex={currentIndex}
          onGoToSlide={goToSlide}
        />
      </Stack>
    </Box>
  )
}

export { Carousel }
