export type NavigationItem = {
  label: string
  path: string
  external?: boolean
}

export type CTAButton = {
  label: string
  path: string
  variant: 'contained' | 'outlined'
}

export const navigationItems: NavigationItem[] = [
  { label: 'Tracks', path: '/tracks' },
  { label: 'Stories', path: '/stories' },
  { label: 'Events', path: '/events' },
  { label: 'Be a Partner', path: '/partners' },
  { label: 'About us', path: '/about' },
]

export const ctaButtons: CTAButton[] = [
  { label: 'Join our team', path: '/careers', variant: 'outlined' },
  { label: 'Start Learning', path: '/tracks', variant: 'contained' },
]
