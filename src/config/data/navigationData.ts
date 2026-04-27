import {
  Home as HomeIcon,
  School as SchoolIcon,
  Favorite as FavoriteIcon,
  Event as EventIcon,
  Handshake as HandshakeIcon,
  Groups as GroupsIcon,
} from '@mui/icons-material'
import type { SvgIconComponent } from '@mui/icons-material'

export type City = {
  name: string
  slug: string
}

export const cities: City[] = [
  { name: 'Düsseldorf', slug: 'dusseldorf' },
  { name: 'Berlin', slug: 'berlin' },
  { name: 'Munich', slug: 'munich' },
  { name: 'Hamburg', slug: 'hamburg' },
  { name: 'Frankfurt', slug: 'frankfurt' },
  { name: 'Cologne', slug: 'cologne' },
  { name: 'Stuttgart', slug: 'stuttgart' },
]

export type NavigationItem = {
  labelKey: string
  path: string
  external?: boolean
  icon?: SvgIconComponent
  mobileOnly?: boolean
}

export type CTAButton = {
  labelKey: string
  path: string
  variant: 'contained' | 'outlined'
}

export const navigationItems: NavigationItem[] = [
  { labelKey: 'navigation.home', path: '/', icon: HomeIcon, mobileOnly: true },
  { labelKey: 'navigation.tracks', path: '/tracks', icon: SchoolIcon },
  { labelKey: 'navigation.stories', path: '/stories', icon: FavoriteIcon },
  { labelKey: 'navigation.events', path: '/events', icon: EventIcon },
  { labelKey: 'navigation.partners', path: '/partners', icon: HandshakeIcon },
  { labelKey: 'navigation.about', path: '/about', icon: GroupsIcon },
]

export const ctaButtons: CTAButton[] = [
  { labelKey: 'navigation.cta.joinTeam', path: '/careers', variant: 'outlined' },
  { labelKey: 'navigation.cta.startLearning', path: '/tracks', variant: 'contained' },
]
