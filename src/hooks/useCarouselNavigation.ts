import { useState } from 'react'

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

  const goToSlide = (newIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex))
    setCurrentIndex(clampedIndex)
    onItemChange?.(clampedIndex)
  }

  const goToPrevious = () => {
    goToSlide(currentIndex - 1)
  }

  const goToNext = () => {
    goToSlide(currentIndex + 1)
  }

  const goToFirst = () => {
    goToSlide(0)
  }

  const goToLast = () => {
    goToSlide(maxIndex)
  }

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
