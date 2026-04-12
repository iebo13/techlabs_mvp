import React from 'react'
import { Box, ButtonBase } from '@mui/material'
import { useI18n } from '@/hooks'

type CarouselDotsProps = {
  count: number
  currentIndex: number
  onSelect: (index: number) => void
}

export const CarouselDots: React.FC<CarouselDotsProps> = ({ count, currentIndex, onSelect }) => {
  const { t } = useI18n()

  if (count <= 1) return null

  const dots = Array.from({ length: count }, (_, i) => i)

  return (
    <Box
      role="tablist"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        mt: 3,
      }}>
      {dots.map(dotIndex => {
        const isActive = dotIndex === currentIndex

        return (
          <ButtonBase
            key={`dot${dotIndex}`}
            role="tab"
            aria-selected={isActive}
            aria-label={t('stories.carousel.goToSlide', { index: dotIndex + 1 })}
            onClick={() => onSelect(dotIndex)}
            sx={theme => ({
              width: isActive ? 24 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: isActive ? theme.palette.primary.main : theme.palette.action.disabled,
              transition: 'all 0.25s ease',
              '&:hover': {
                bgcolor: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
              },
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: 3,
              },
            })}
          />
        )
      })}
    </Box>
  )
}

CarouselDots.displayName = 'CarouselDots'
