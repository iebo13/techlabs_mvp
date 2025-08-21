import React from 'react'

import { Close as CloseIcon } from '@mui/icons-material'
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Button,
    IconButton,
    Typography,
    Stack,
    Divider,
    useTheme,
} from '@mui/material'

import { navigationItems, ctaButtons } from './data/navigationData'
import { NavLink } from './NavLink'

type MobileDrawerProps = {
    onClose: () => void
}

/**
 * MobileDrawer component provides mobile navigation menu
 */
export const MobileDrawer: React.FC<MobileDrawerProps> = ({ onClose }) => {
    const theme = useTheme()

    return (
        <Box sx={{ width: 280, height: '100%', pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 3 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    TechLabs
                </Typography>
                <IconButton
                    edge="end"
                    onClick={onClose}
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
                            onClick={onClose}
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

            <Box sx={{ px: 2, mt: 4 }}>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={2}>
                    {ctaButtons.map((button) => (
                        <Button
                            key={button.path}
                            component={NavLink}
                            to={button.path}
                            variant={button.variant}
                            fullWidth
                            onClick={onClose}
                            sx={{
                                py: 1.5,
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                textTransform: 'none',
                                '&:focus-visible': {
                                    outline: `3px solid ${theme.palette.primary.main}40`,
                                    outlineOffset: 2,
                                },
                            }}
                        >
                            {button.label}
                        </Button>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
}
