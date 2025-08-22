import React, { useState, useEffect, useRef } from 'react'

import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Box, IconButton, Stack } from '@mui/material'

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
    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)
    const maxIndex = Math.max(0, items.length - itemsPerView)

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

    // Auto-play functionality
    useEffect(() => {
        if (!autoPlay || items.length <= itemsPerView) return

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 1
                const clampedIndex = nextIndex > maxIndex ? 0 : nextIndex
                onItemChange?.(clampedIndex)
                return clampedIndex
            })
        }, autoPlayInterval)

        return () => clearInterval(interval)
    }, [autoPlay, autoPlayInterval, maxIndex, onItemChange, items.length, itemsPerView])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!carouselRef.current?.contains(event.target as Node)) return

            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault()
                    setCurrentIndex(prevIndex => {
                        const newIndex = Math.max(0, prevIndex - 1)
                        onItemChange?.(newIndex)
                        return newIndex
                    })
                    break
                case 'ArrowRight':
                    event.preventDefault()
                    setCurrentIndex(prevIndex => {
                        const newIndex = Math.min(prevIndex + 1, maxIndex)
                        onItemChange?.(newIndex)
                        return newIndex
                    })
                    break
                case 'Home':
                    event.preventDefault()
                    setCurrentIndex(0)
                    onItemChange?.(0)
                    break
                case 'End':
                    event.preventDefault()
                    setCurrentIndex(maxIndex)
                    onItemChange?.(maxIndex)
                    break
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [maxIndex, onItemChange])

    const visibleItems = items.slice(currentIndex, currentIndex + itemsPerView)

    return (
        <Box className={className}>
            <Stack spacing={2}>
                {/* Navigation Header */}
                {showNavigation && items.length > itemsPerView && (
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
                            {currentIndex + 1} of {items.length}
                        </Box>
                        <Stack direction="row" spacing={1}>
                            <IconButton
                                onClick={goToPrevious}
                                disabled={currentIndex === 0}
                                aria-label="Previous item"
                                size="small"
                            >
                                <ChevronLeft />
                            </IconButton>
                            <IconButton
                                onClick={goToNext}
                                disabled={currentIndex >= maxIndex}
                                aria-label="Next item"
                                size="small"
                            >
                                <ChevronRight />
                            </IconButton>
                        </Stack>
                    </Stack>
                )}

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

                {/* Position Indicator */}
                {showPositionIndicator && items.length > itemsPerView && (
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
                                onClick={() => goToSlide(index)}
                                role="button"
                                aria-label={`Go to slide ${index + 1}`}
                                tabIndex={0}
                                onKeyDown={event => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault()
                                        goToSlide(index)
                                    }
                                }}
                            />
                        ))}
                    </Stack>
                )}
            </Stack>
        </Box>
    )
}

export { Carousel }
