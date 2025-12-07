export type NavigationItem = {
  labelKey: string
  path: string
  external?: boolean
}

export type CTAButton = {
  labelKey: string
  path: string
  variant: 'contained' | 'outlined'
}

export const navigationItems: NavigationItem[] = [
  { labelKey: 'navigation.tracks', path: '/tracks' },
  { labelKey: 'navigation.stories', path: '/stories' },
  { labelKey: 'navigation.events', path: '/events' },
  { labelKey: 'navigation.partners', path: '/partners' },
  { labelKey: 'navigation.about', path: '/about' },
]

export const ctaButtons: CTAButton[] = [
  { labelKey: 'navigation.cta.joinTeam', path: '/careers', variant: 'outlined' },
  { labelKey: 'navigation.cta.startLearning', path: '/tracks', variant: 'contained' },
]
