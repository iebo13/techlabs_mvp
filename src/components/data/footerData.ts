/**
 * Footer data for SiteFooter component
 */

import {
    LinkedIn,
    Twitter,
    Instagram,
    Facebook,
    GitHub,
    Email,
} from '@mui/icons-material'

export type FooterSection = {
    title: string
    links: Array<{
        label: string
        path: string
        external?: boolean
    }>
}

export type SocialLink = {
    name: string
    icon: typeof LinkedIn
    url: string
    ariaLabel: string
}

export const footerSections: FooterSection[] = [
    {
        title: 'Programs',
        links: [
            { label: 'Digital Shaper Program', path: '/tracks' },
            { label: 'Events & Workshops', path: '/events' },
            { label: 'Mentorship', path: '/about' },
            { label: 'Community', path: '/about' },
        ],
    },
    {
        title: 'Tracks',
        links: [
            { label: 'Web Development', path: '/tracks' },
            { label: 'Data Science', path: '/tracks' },
            { label: 'Product Design', path: '/tracks' },
            { label: 'AI & Machine Learning', path: '/tracks' },
        ],
    },
    {
        title: 'Get Involved',
        links: [
            { label: 'Become a Learner', path: '/tracks' },
            { label: 'Join as Mentor', path: '/careers' },
            { label: 'Partner with Us', path: '/partners' },
            { label: 'Support Us', path: '/about' },
        ],
    },
    {
        title: 'About Us',
        links: [
            { label: 'Our Story', path: '/about' },
            { label: 'Team', path: '/about' },
            { label: 'Careers', path: '/careers' },
            { label: 'Graduate Stories', path: '/stories' },
        ],
    },
]

export const socialLinks: SocialLink[] = [
    {
        name: 'LinkedIn',
        icon: LinkedIn,
        url: 'https://linkedin.com/company/techlabs',
        ariaLabel: 'Follow TechLabs on LinkedIn',
    },
    {
        name: 'Twitter',
        icon: Twitter,
        url: 'https://twitter.com/techlabs',
        ariaLabel: 'Follow TechLabs on Twitter',
    },
    {
        name: 'Instagram',
        icon: Instagram,
        url: 'https://instagram.com/techlabs',
        ariaLabel: 'Follow TechLabs on Instagram',
    },
    {
        name: 'Facebook',
        icon: Facebook,
        url: 'https://facebook.com/techlabs',
        ariaLabel: 'Follow TechLabs on Facebook',
    },
    {
        name: 'GitHub',
        icon: GitHub,
        url: 'https://github.com/techlabs',
        ariaLabel: 'Follow TechLabs on GitHub',
    },
    {
        name: 'Email',
        icon: Email,
        url: 'mailto:hello@techlabs.org',
        ariaLabel: 'Send email to TechLabs',
    },
]
