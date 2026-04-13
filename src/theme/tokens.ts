/**
 * Design tokens for consistent styling across the application.
 * Import these tokens instead of using magic numbers or hard-coded values.
 */

/** Border radius scale (in px) */
export const RADIUS = {
  xs: 0, // chips, small tags, card images
  sm: 1, // toggle buttons
  md: 2, // inputs, popovers
  lg: 4, // accordion, papers
  xl: 8, // cards, dialogs (theme default)
  full: 999, // pill buttons, circular
} as const

/** Box shadow presets */
export const SHADOW = {
  card: '0px 4px 24px rgba(0,0,0,0.06)',
  cardHover: '0 8px 32px rgba(0,0,0,0.12)',
  cardBrand: '8px 12px 12px rgba(44,42,42,0.3)',
  elevated: '0 4px 16px rgba(0,0,0,0.15)',
  subtle: '0 4px 20px rgba(0,0,0,0.06)',
  none: 'none',
} as const

/** Transition duration + easing presets */
export const TRANSITION = {
  fast: '0.2s ease-in-out',
  normal: '0.25s ease-in-out',
  slow: '0.3s ease-in-out',
} as const

/** Minimum interactive target sizes (in px) */
export const TOUCH_TARGET = {
  min: 44,
} as const

/** Sticky element offsets accounting for fixed header */
export const STICKY_TOP = {
  sidebar: 88,
} as const
