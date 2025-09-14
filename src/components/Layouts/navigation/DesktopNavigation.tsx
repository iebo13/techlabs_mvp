import React from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'
import { Box, Button, useTheme, useMediaQuery } from '@mui/material'
import { navigationItems, ctaButtons } from '@/config/data/navigationData'
import { NavLink } from './NavLink'

export const DesktopNavigation: React.FC = () => {
  const theme = useTheme()

  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const isXLarge = useMediaQuery(theme.breakpoints.up('xl'))

  const getNavigationSpacing = () => {
    if (isTablet) return { gap: 2 }
    if (isLarge) return { gap: 2 }
    if (isXLarge) return { gap: 3 }

    return { gap: 2 }
  }

  const getCTASpacing = () => {
    if (isTablet) return { gap: 1 }
    if (isLarge) return { gap: 1.5 }
    if (isXLarge) return { gap: 2 }

    return { gap: 1.25 }
  }

  const navigationSpacing = getNavigationSpacing()
  const ctaSpacing = getCTASpacing()

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          ...navigationSpacing,
          flexWrap: {
            md: 'nowrap',
            lg: 'nowrap',
          },
          '& > *': {
            flexShrink: 0,
          },
        }}>
        {navigationItems.map(item => (
          <Box
            key={item.path}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <NavLink to={item.path}>{item.label}</NavLink>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: {
            md: 2,
            lg: 3,
            xl: 4,
          },
          flexShrink: 0,
        }}>
        <Button
          variant="text"
          endIcon={<KeyboardArrowDown />}
          aria-label="Select city"
          aria-haspopup="true"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            fontSize: {
              md: '0.9rem',
              lg: '1rem',
              xl: '1.1rem',
            },
            px: {
              md: 1,
              lg: 1.5,
              xl: 2,
            },
            py: {
              md: 0.5,
              lg: 0.75,
              xl: 1,
            },
            minWidth: 'auto',
            minHeight: '44px',
            borderRadius: 1,
            transition: theme.transitions.create(['background-color', 'transform'], {
              duration: theme.transitions.duration.short,
            }),
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              transform: 'scale(1.02)',
            },
            '&:focus-visible': {
              outline: `3px solid ${theme.palette.primary.main}40`,
              outlineOffset: 2,
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}>
          Düsseldorf
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            ...ctaSpacing,
            '& .MuiButton-root': {
              flexShrink: 0,
            },
          }}>
          {ctaButtons.map(button => (
            <Button
              key={button.path}
              variant={button.variant}
              component={NavLink}
              to={button.path}
              size={isTablet ? 'medium' : 'large'}
              sx={{
                fontSize: {
                  md: '0.875rem',
                  lg: '0.95rem',
                  xl: '1rem',
                },
                px: {
                  md: 2,
                  lg: 3,
                  xl: 4,
                },
                py: {
                  md: 1,
                  lg: 1.25,
                  xl: 1.5,
                },
                minHeight: {
                  md: '40px',
                  lg: '44px',
                  xl: '48px',
                },
                borderRadius: {
                  md: '6px',
                  lg: '8px',
                  xl: '10px',
                },
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 'none',
                transition: theme.transitions.create(['box-shadow', 'transform', 'background-color'], {
                  duration: theme.transitions.duration.short,
                }),
                '&:hover': {
                  boxShadow:
                    button.variant === 'contained' ? `0 4px 12px ${theme.palette.primary.main}25` : '0 0 0 1px',
                  transform: 'translateY(-1px)',
                },
                '&:focus-visible': {
                  outline: `3px solid ${theme.palette.primary.main}40`,
                  outlineOffset: 2,
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
                ...(button.variant === 'outlined' && {
                  border: `2px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}08`,
                    borderColor: theme.palette.primary.main,
                  },
                }),
              }}>
              {button.label}
            </Button>
          ))}
        </Box>
      </Box>
    </>
  )
}

DesktopNavigation.displayName = 'DesktopNavigation'
