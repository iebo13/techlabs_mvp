import { useEffect } from 'react'

/**
 * Custom hook for managing carousel auto-play functionality
 * Extracts auto-play logic from Carousel component
 */
export const useCarouselAutoPlay = (
  autoPlay: boolean,
  autoPlayInterval: number,
  itemsLength: number,
  itemsPerView: number,
  currentIndex: number,
  maxIndex: number,
  goToSlide: (index: number) => void
) => {
  useEffect(() => {
    if (!autoPlay || itemsLength <= itemsPerView) return

    const interval = setInterval(() => {
      const nextIndex = currentIndex + 1
      const clampedIndex = nextIndex > maxIndex ? 0 : nextIndex

      goToSlide(clampedIndex)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, maxIndex, goToSlide, itemsLength, itemsPerView, currentIndex])
}
