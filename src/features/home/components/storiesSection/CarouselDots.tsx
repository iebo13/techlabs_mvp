import React from 'react'
import { Box, ButtonBase } from '@mui/material'
import { useI18n } from '@/hooks'
import { createFocusRing } from '@/theme'

type CarouselDotsProps = {
  readonly count: number
  readonly currentIndex: number
  readonly onSelect: (index: number) => void
}

export const CarouselDots: React.FC<CarouselDotsProps> = ({ count, currentIndex, onSelect }) => {
  const { t } = useI18n()

  if (count <= 1) return null

  const dots = Array.from({ length: count }, (_, i) => i)

  return (
    <Box
      role="group"
      aria-label={t('stories.carousel.chooseSlide')}
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
            aria-label={t('stories.carousel.goToSlide', { index: dotIndex + 1 })}
            aria-current={isActive ? 'true' : undefined}
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
              '&:focus-visible': createFocusRing(theme),
            })}
          />
        )
      })}
    </Box>
  )
}

CarouselDots.displayName = 'CarouselDots'
