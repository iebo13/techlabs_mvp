import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import { Box, Button, useTheme, useMediaQuery } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import type { Story } from '@/features/stories'
import { useI18n } from '@/hooks'
import { CarouselDots } from './CarouselDots'
import { CarouselItem } from './CarouselItem'

type StoriesCarouselProps = {
  stories: Story[]
  sectionTitle?: string
  showSeeAllLink?: boolean
}

const SWIPE_THRESHOLD_PX = 50

export const StoriesCarousel: React.FC<StoriesCarouselProps> = ({ stories, sectionTitle, showSeeAllLink = true }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useI18n()
  const cardsPerView = isMobile ? 1 : 3
  const maxIndex = Math.max(0, stories.length - cardsPerView)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragDelta, setDragDelta] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const dragStartX = useRef<number | null>(null)

  const goTo = (next: number) => {
    setCurrentIndex(Math.max(0, Math.min(maxIndex, next)))
  }

  const visibleStories = stories.slice(currentIndex, currentIndex + cardsPerView)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!carouselRef.current?.contains(event.target as Node)) return

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          setCurrentIndex(prev => Math.max(0, prev - 1))
          break
        case 'ArrowRight':
          event.preventDefault()
          setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
          break
        case 'Home':
          event.preventDefault()
          setCurrentIndex(0)
          break
        case 'End':
          event.preventDefault()
          setCurrentIndex(maxIndex)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [maxIndex])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return
    setDragDelta(event.clientX - dragStartX.current)
  }

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return
    const delta = event.clientX - dragStartX.current

    if (delta <= -SWIPE_THRESHOLD_PX) {
      goTo(currentIndex + 1)
    } else if (delta >= SWIPE_THRESHOLD_PX) {
      goTo(currentIndex - 1)
    }

    dragStartX.current = null
    setDragDelta(0)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <Section sx={{ py: { xs: 4, md: 6 }, position: 'relative' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {sectionTitle && (
          <Box sx={{ textAlign: 'center', color: 'primary.main' }}>
            <SectionHeading level={2}>{sectionTitle}</SectionHeading>
          </Box>
        )}
        <Box
          sx={{
            position: 'relative',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            px: { xs: 3, md: 6 },
          }}>
          <Box
            ref={carouselRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={t('stories.carousel.ariaLabel')}
            aria-live="polite"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            sx={{
              position: 'relative',
              cursor: 'grab',
              touchAction: 'pan-y',
              userSelect: 'none',
              '&:active': { cursor: 'grabbing' },
            }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(3, 1fr)',
                },
                gap: 2.5,
                transform: `translateX(${dragDelta * 0.25}px)`,
                transition: dragStartX.current === null ? 'transform 0.25s ease' : 'none',
              }}>
              {visibleStories.map(story => (
                <Box key={story.id}>
                  <CarouselItem story={story} />
                </Box>
              ))}
            </Box>
          </Box>

          <CarouselDots count={maxIndex + 1} currentIndex={currentIndex} onSelect={goTo} />
        </Box>

        {showSeeAllLink && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              component={Link}
              to="/stories"
              variant="text"
              endIcon={<ChevronRightIcon />}
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '14px', sm: '16px' },
                fontWeight: 400,
                textTransform: 'none',
                p: 0,
                minWidth: 'auto',
                gap: 0.5,
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'transparent',
                },
              }}>
              {t('stories.seeAll')}
            </Button>
          </Box>
        )}
      </Box>
    </Section>
  )
}

StoriesCarousel.displayName = 'StoriesCarousel'
