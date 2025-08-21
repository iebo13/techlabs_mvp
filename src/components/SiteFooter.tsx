import React from 'react'

import {
    LinkedIn,
    Twitter,
    Instagram,
    Facebook,
    GitHub,
    Email,
} from '@mui/icons-material'
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    Stack,
    IconButton,
    Divider,
} from '@mui/material'

import { NavLink } from './NavLink'

type FooterSection = {
    title: string
    links: Array<{
        label: string
        path: string
        external?: boolean
    }>
}

const footerSections: FooterSection[] = [
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

const socialLinks = [
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

/**
 * SiteFooter component provides comprehensive site navigation and legal information.
 * Includes 4 organized link columns, social media links, and legal pages.
 */
export const SiteFooter: React.FC = () => {
    const currentYear = new Date().getFullYear()

    return (
        <Box component="footer" sx={{ backgroundColor: 'background.paper', mt: 'auto' }}>
            <Container maxWidth="lg">
                <Box sx={{ py: 6 }}>
                    {/* Main Footer Content */}
                    <Grid container spacing={4}>
                        {/* Brand Section */}
                        <Grid item xs={12} md={4}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: '1.5rem',
                                    color: 'primary.main',
                                    letterSpacing: '-0.02em',
                                    mb: 2,
                                }}
                            >
                                TechLabs
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3, maxWidth: '300px', lineHeight: 1.6 }}
                            >
                                Empowering people to shape the digital future through free tech education,
                                local community, and practical projects.
                            </Typography>

                            {/* Social Links */}
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}
                            >
                                Follow Us
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                {socialLinks.map((social) => {
                                    const IconComponent = social.icon
                                    return (
                                        <IconButton
                                            key={social.name}
                                            component="a"
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.ariaLabel}
                                            size="small"
                                            sx={{
                                                color: 'text.secondary',
                                                '&:hover': {
                                                    color: 'primary.main',
                                                    backgroundColor: 'rgba(250, 33, 92, 0.04)',
                                                },
                                                '&:focus-visible': {
                                                    outline: '3px solid rgba(250, 33, 92, 0.25)',
                                                    outlineOffset: 2,
                                                },
                                            }}
                                        >
                                            <IconComponent fontSize="small" />
                                        </IconButton>
                                    )
                                })}
                            </Stack>
                        </Grid>

                        {/* Footer Links Columns */}
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={3}>
                                {footerSections.map((section) => (
                                    <Grid item xs={6} sm={3} key={section.title}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 2,
                                                color: 'text.primary',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {section.title}
                                        </Typography>
                                        <Stack spacing={1.5}>
                                            {section.links.map((link) => (
                                                <Link
                                                    key={link.label}
                                                    component={link.external ? 'a' : NavLink}
                                                    to={link.external ? undefined : link.path}
                                                    href={link.external ? link.path : undefined}
                                                    target={link.external ? '_blank' : undefined}
                                                    rel={link.external ? 'noopener noreferrer' : undefined}
                                                    showActive={false}
                                                    sx={{
                                                        color: 'text.secondary',
                                                        textDecoration: 'none',
                                                        fontSize: '0.875rem',
                                                        fontWeight: 400,
                                                        lineHeight: 1.5,
                                                        display: 'block',
                                                        padding: 0,
                                                        '&:hover': {
                                                            color: 'primary.main',
                                                            textDecoration: 'none',
                                                        },
                                                        '&:focus-visible': {
                                                            outline: '3px solid rgba(250, 33, 92, 0.25)',
                                                            outlineOffset: 2,
                                                            borderRadius: '4px',
                                                        },
                                                    }}
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ borderColor: 'divider' }} />

                {/* Footer Bottom */}
                <Box
                    sx={{
                        py: 3,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        © {currentYear} TechLabs. All rights reserved.
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 3 }}
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                    >
                        <Link
                            component={NavLink}
                            to="/privacy"
                            showActive={false}
                            sx={{
                                color: 'text.secondary',
                                textDecoration: 'none',
                                fontSize: '0.875rem',
                                '&:hover': {
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                },
                                '&:focus-visible': {
                                    outline: '3px solid rgba(250, 33, 92, 0.25)',
                                    outlineOffset: 2,
                                    borderRadius: '4px',
                                },
                            }}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            component={NavLink}
                            to="/imprint"
                            showActive={false}
                            sx={{
                                color: 'text.secondary',
                                textDecoration: 'none',
                                fontSize: '0.875rem',
                                '&:hover': {
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                },
                                '&:focus-visible': {
                                    outline: '3px solid rgba(250, 33, 92, 0.25)',
                                    outlineOffset: 2,
                                    borderRadius: '4px',
                                },
                            }}
                        >
                            Imprint
                        </Link>
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
}
