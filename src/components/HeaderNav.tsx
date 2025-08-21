import React, { useState, useEffect } from 'react'

import { Menu as MenuIcon } from '@mui/icons-material'
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Drawer,
    Button,
    Container,
    useTheme,
    useMediaQuery,
    Typography,
} from '@mui/material'

import { navigationItems, ctaButtons } from './data/navigationData'
import { MobileDrawer } from './MobileDrawer'
import { NavLink } from './NavLink'

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
                <MobileDrawer onClose={handleDrawerClose} />
            </Drawer>
        </>
    )
}
