import React from 'react'
import { FormatQuote as QuoteIcon } from '@mui/icons-material'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { PORTRAIT_IMAGE_OBJECT_POSITION } from '../utils/portraitObjectPosition'

type StoryPullQuoteProps = {
  readonly quote: string
  readonly attribution: string
  readonly role?: string
  readonly avatarUrl?: string
}

export const StoryPullQuote: React.FC<StoryPullQuoteProps> = ({ quote, attribution, role, avatarUrl }) => (
  <Box
    component="blockquote"
    sx={{
      position: 'relative',
      m: 0,
      p: { xs: 3, md: 5 },
      borderRadius: 3,
      background: theme =>
        `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.primary.main}14 100%)`,
      border: '1px solid',
      borderColor: theme => `${theme.palette.primary.main}22`,
      overflow: 'hidden',
    }}>
    {/* Decorative quote icon */}
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        top: { xs: -6, md: -10 },
        right: { xs: 12, md: 24 },
        opacity: 0.07,
        color: 'primary.main',
        transform: 'rotate(180deg)',
        lineHeight: 0,
      }}>
      <QuoteIcon sx={{ fontSize: { xs: '6rem', md: '8rem' } }} />
    </Box>

    {/* Accent bar */}
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 4,
        height: '100%',
        bgcolor: 'primary.main',
        borderRadius: '4px 0 0 4px',
      }}
    />

    <Typography
      variant="h5"
      component="p"
      sx={{
        fontWeight: 500,
        fontStyle: 'italic',
        lineHeight: 1.7,
        color: 'text.primary',
        position: 'relative',
        zIndex: 1,
        mb: 3,
        fontSize: { xs: '1.1rem', md: '1.35rem' },
        '&::before': { content: "'\\201C'" },
        '&::after': { content: "'\\201D'" },
      }}>
      {quote}
    </Typography>

    {/* Attribution */}
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ position: 'relative', zIndex: 1 }}>
      {avatarUrl && (
        <Avatar
          src={avatarUrl}
          alt={attribution}
          sx={{
            width: 36,
            height: 36,
            '& .MuiAvatar-img': { objectPosition: PORTRAIT_IMAGE_OBJECT_POSITION },
          }}
        />
      )}
      <Box>
        <Typography variant="subtitle2" fontWeight={700} color="text.primary" lineHeight={1.3}>
          {attribution}
        </Typography>
        {role && (
          <Typography variant="caption" color="text.secondary" lineHeight={1.3}>
            {role}
          </Typography>
        )}
      </Box>
    </Stack>
  </Box>
)

StoryPullQuote.displayName = 'StoryPullQuote'
