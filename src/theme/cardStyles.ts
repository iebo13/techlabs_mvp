/**
 * Shared card styles extracted from StoryCard/EventCard/TrackCard.
 * Use these to maintain visual consistency across content cards.
 */
import type { Theme } from '@mui/material/styles'
import { RADIUS, SHADOW, TRANSITION } from './tokens'

/** Wrapper styles for a card that acts as a link */
export const createLinkCardWrapper = (theme: Theme) =>
  ({
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    height: '100%',
    '&:focus-visible': {
      outline: '2px solid',
      outlineColor: theme.palette.primary.main,
      outlineOffset: '3px',
      borderRadius: RADIUS.md,
    },
  }) as const

/** Card surface styles with hover elevation */
export const createLinkCard = (theme: Theme) =>
  ({
    height: '100%',
    transition: `all ${TRANSITION.normal}`,
    borderRadius: RADIUS.md,
    boxShadow: SHADOW.cardBrand,
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[8],
    },
  }) as const

/** Chip overlay positioning for cards with image + badge */
export const CHIP_OVERLAY = {
  position: 'absolute' as const,
  top: 12,
  left: 12,
} as const

/** Title truncation styles */
export const CARD_TITLE = {
  fontWeight: 600,
  mb: 0.5,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
} as const

/** Multi-line description clamping */
export const CARD_DESCRIPTION = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical' as const,
  overflow: 'hidden',
  lineHeight: 1.6,
} as const
