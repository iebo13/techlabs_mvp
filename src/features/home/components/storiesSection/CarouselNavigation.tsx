import React from 'react'
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material'
import { Box, IconButton, useTheme } from '@mui/material'

type CarouselNavigationProps = {
  currentIndex: number
  maxIndex: number
  onPrevious: () => void
  onNext: () => void
}

export const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  currentIndex,
  maxIndex,
  onPrevious,
  onNext,
}) => {
  const theme = useTheme()

  return (
    <Box sx={{ position: 'relative', height: 0 }}>
      <IconButton
        onClick={onPrevious}
        disabled={currentIndex === 0}
        aria-label="Previous stories"
        sx={{
          width: { xs: 48, md: 60 },
          height: { xs: 48, md: 60 },
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          borderRadius: '50%',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
          position: 'absolute',
          left: { xs: -24, md: -35 },
          top: { xs: '240px', md: '240px' },
          transform: 'translateY(-50%)',
          zIndex: 2,
          '&:hover': {
            backgroundColor: '#E01A51',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
            transform: 'translateY(-50%) translateY(-1px)',
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            opacity: 0.4,
          },
        }}>
        <ArrowBackIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
      </IconButton>
      <IconButton
        onClick={onNext}
        disabled={currentIndex >= maxIndex}
        aria-label="Next stories"
        sx={{
          width: { xs: 48, md: 60 },
          height: { xs: 48, md: 60 },
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          borderRadius: '50%',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
          position: 'absolute',
          right: { xs: -24, md: -35 },
          top: { xs: '240px', md: '240px' },
          transform: 'translateY(-50%)',
          zIndex: 2,
          '&:hover': {
            backgroundColor: '#E01A51',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
            transform: 'translateY(-50%) translateY(-1px)',
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            opacity: 0.4,
          },
        }}>
        <ArrowForwardIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
      </IconButton>
    </Box>
  )
}
