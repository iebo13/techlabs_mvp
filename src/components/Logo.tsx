import React from 'react'

import { Box, Typography } from '@mui/material'

import { NavLink } from './NavLink'

/**
 * Logo component with icon and wordmark
 */
export const Logo: React.FC = () => {
    return (
        <NavLink
            to="/"
            showActive={false}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                padding: '8px 0',
                '&:hover': {
                    backgroundColor: 'transparent',
                },
            }}
        >
            {/* Logo icon placeholder - pink round icon */}
            <Box
                sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    sx={{
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                    }}
                >
                    T
                </Typography>
            </Box>
            {/* TechLabs wordmark */}
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
    )
}
