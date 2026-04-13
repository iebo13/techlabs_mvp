/**
 * Unified focus ring styles for keyboard accessibility.
 * Use these instead of defining custom focus-visible styles per component.
 */
import type { Theme } from '@mui/material/styles'
import { PRIMARY } from './colors'

/** Standard focus ring for links, cards, and custom interactive elements */
export const createFocusRing = (theme: Theme) =>
  ({
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  }) as const

/** Static variant for MUI component overrides (no theme parameter needed) */
export const FOCUS_RING_STATIC = {
  outline: `2px solid ${PRIMARY[500]}`,
  outlineOffset: '2px',
} as const
