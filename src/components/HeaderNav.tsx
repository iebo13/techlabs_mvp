import React, { useState, useEffect } from 'react'

import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Button,
    Container,
    useTheme,
    useMediaQuery,
    Typography,
} from '@mui/material'

import { NavLink } from './NavLink'

type NavigationItem = {
    label: string
    path: string
    external?: boolean
}

const navigationItems: NavigationItem[] = [
    { label: 'Tracks', path: '/tracks' },
    { label: 'Events', path: '/events' },
    { label: 'Stories', path: '/stories' },
    { label: 'Partners', path: '/partners' },
    { label: 'About Us', path: '/about' },
]

const ctaButtons = [
    { label: 'Start Learning', path: '/tracks', variant: 'contained' as const },
    { label: 'Join our team', path: '/careers', variant: 'outlined' as const },
]

/**
 * HeaderNav component provides sticky navigation with responsive mobile drawer.
 * Includes elevation on scroll, accessibility features, and branded CTAs.
 */
export const HeaderNav: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll elevation
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 8
            setScrolled(isScrolled)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handle drawer toggle
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    // Handle drawer close
    const handleDrawerClose = () => {
        setMobileOpen(false)
    }

    // Handle escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && mobileOpen) {
                handleDrawerClose()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [mobileOpen])

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [mobileOpen])

    const drawer = (
        <Box sx={{ width: 280, height: '100%', pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 3 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    TechLabs
                </Typography>
                <IconButton
                    edge="end"
                    onClick={handleDrawerClose}
                    aria-label="close navigation menu"
                    sx={{
                        color: 'text.primary',
                        '&:focus-visible': {
                            outline: `3px solid ${theme.palette.primary.main}40`,
                            outlineOffset: 2,
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            <List sx={{ px: 1 }}>
                {navigationItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to={item.path}
                            onClick={handleDrawerClose}
                            sx={{
                                borderRadius: 2,
                                mx: 1,
                                mb: 0.5,
                                '&:focus-visible': {
                                    outline: `3px solid ${theme.palette.primary.main}40`,
                                    outlineOffset: 2,
                                },
                            }}
                        >
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box sx={{ px: 2, mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {ctaButtons.map((button) => (
                    <Button
                        key={button.path}
                        variant={button.variant}
                        component={NavLink}
                        to={button.path}
                        onClick={handleDrawerClose}
                        size="large"
                        fullWidth
                    >
                        {button.label}
                    </Button>
                ))}
            </Box>
        </Box>
    )

    return (
        <>
            <AppBar
                position="sticky"
                elevation={scrolled ? 4 : 0}
                sx={{
                    backgroundColor: scrolled
                        ? 'rgba(255, 255, 255, 0.95)'
                        : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: scrolled
                        ? '1px solid rgba(0, 0, 0, 0.12)'
                        : '1px solid rgba(0, 0, 0, 0.06)',
                    transition: theme.transitions.create(['elevation', 'background-color', 'border-color'], {
                        duration: theme.transitions.duration.short,
                    }),
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ px: { xs: 0, sm: 0 }, minHeight: { xs: 64, sm: 72 } }}>
                        {/* Logo */}
                        <NavLink
                            to="/"
                            showActive={false}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mr: 'auto',
                                padding: '8px 0',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: '1.5rem',
                                    color: 'primary.main',
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                TechLabs
                            </Typography>
                        </NavLink>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 3 }}>
                                    {navigationItems.map((item, index) => (
                                        <React.Fragment key={item.path}>
                                            <NavLink to={item.path}>
                                                {item.label}
                                            </NavLink>
                                            {index < navigationItems.length - 1 && (
                                                <Typography
                                                    component="span"
                                                    sx={{
                                                        color: 'text.disabled',
                                                        mx: 0.5,
                                                        fontSize: '0.875rem',
                                                        userSelect: 'none',
                                                    }}
                                                >
                                                    ·
                                                </Typography>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    {ctaButtons.map((button) => (
                                        <Button
                                            key={button.path}
                                            variant={button.variant}
                                            component={NavLink}
                                            to={button.path}
                                            size="medium"
                                        >
                                            {button.label}
                                        </Button>
                                    ))}
                                </Box>
                            </>
                        )}

                        {/* Mobile Menu Button */}
                        {isMobile && (
                            <IconButton
                                edge="end"
                                onClick={handleDrawerToggle}
                                aria-label="open navigation menu"
                                aria-expanded={mobileOpen}
                                aria-controls="mobile-navigation-drawer"
                                sx={{
                                    color: 'text.primary',
                                    '&:focus-visible': {
                                        outline: `3px solid ${theme.palette.primary.main}40`,
                                        outlineOffset: 2,
                                    },
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerClose}
                id="mobile-navigation-drawer"
                ModalProps={{
                    keepMounted: true, // Better mobile performance
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: 'background.paper',
                        '& .MuiBackdrop-root': {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    )
}
