import React from 'react'
import { Box, Typography } from '@mui/material'

type TimelineItemProps = {
  readonly year: string
  readonly title: string
  readonly description: string
  readonly index: number
  readonly isLast: boolean
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, index, isLast }) => {
  const isEven = index % 2 === 0

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: { xs: 'flex-start', md: isEven ? 'flex-start' : 'flex-end' },
        pl: { xs: 5, md: 0 },
        mb: isLast ? 0 : { xs: 4, md: 6 },
      }}>
      {/* Dot marker */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 0, md: '50%' },
          top: { xs: 6, md: 24 },
          transform: { xs: 'none', md: 'translateX(-50%)' },
          width: { xs: 12, md: 16 },
          height: { xs: 12, md: 16 },
          borderRadius: '50%',
          bgcolor: 'primary.main',
          border: '3px solid',
          borderColor: 'background.default',
          boxShadow: theme => `0 0 0 2px ${theme.palette.primary.main}40`,
          zIndex: 1,
        }}
      />

      {/* Content card */}
      <Box
        sx={{
          width: { xs: '100%', md: '44%' },
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          transition: 'box-shadow 0.25s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          },
        }}>
        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1.5 }}>
          {year}
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mt: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.7 }}>
          {description}
        </Typography>
      </Box>
    </Box>
  )
}
