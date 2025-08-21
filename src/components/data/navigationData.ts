/**
 * Navigation data for HeaderNav component
 */

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
    { label: 'Events', path: '/events' },
    { label: 'Stories', path: '/stories' },
    { label: 'Partners', path: '/partners' },
    { label: 'About Us', path: '/about' },
]

export const ctaButtons: CTAButton[] = [
    { label: 'Start Learning', path: '/tracks', variant: 'contained' },
    { label: 'Join our team', path: '/careers', variant: 'outlined' },
]
