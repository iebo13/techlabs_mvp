import { useEffect, useRef } from 'react'

/**
 * Custom hook for managing carousel keyboard navigation
 * Extracts keyboard navigation logic from Carousel component
 */
export const useCarouselKeyboard = (
  currentIndex: number,
  maxIndex: number,
  goToSlide: (index: number) => void
) => {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!carouselRef.current?.contains(event.target as Node)) return

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          goToSlide(Math.max(0, currentIndex - 1))
          break
        case 'ArrowRight':
          event.preventDefault()
          goToSlide(Math.min(currentIndex + 1, maxIndex))
          break
        case 'Home':
          event.preventDefault()
          goToSlide(0)
          break
        case 'End':
          event.preventDefault()
          goToSlide(maxIndex)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, maxIndex, goToSlide])

  return carouselRef
}
