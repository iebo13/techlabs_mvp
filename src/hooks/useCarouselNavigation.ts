import { useState, useCallback } from 'react'

/**
 * Custom hook for managing carousel navigation state and logic
 * Extracts navigation logic from Carousel component
 */
export const useCarouselNavigation = (
  itemsLength: number,
  itemsPerView: number,
  onItemChange?: (currentIndex: number) => void
) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.max(0, itemsLength - itemsPerView)

  const goToSlide = useCallback(
    (newIndex: number) => {
      const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex))
      setCurrentIndex(clampedIndex)
      onItemChange?.(clampedIndex)
    },
    [maxIndex, onItemChange]
  )

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex - 1)
  }, [currentIndex, goToSlide])

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1)
  }, [currentIndex, goToSlide])

  const goToFirst = useCallback(() => {
    goToSlide(0)
  }, [goToSlide])

  const goToLast = useCallback(() => {
    goToSlide(maxIndex)
  }, [maxIndex, goToSlide])

  return {
    currentIndex,
    maxIndex,
    goToSlide,
    goToPrevious,
    goToNext,
    goToFirst,
    goToLast,
  }
}
