/**
 * Application configuration for deadline management
 * Centralized configuration to avoid stale copy across components
 */

export const APPLICATION_CONFIG = {
  // Application deadline in ISO format
  // Update this date as needed to reflect current application periods
  deadline: '2024-03-15T23:59:59.000Z',

  // Alternative: for rolling admissions, use a computed date
  // deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
} as const

export type ApplicationConfig = typeof APPLICATION_CONFIG
