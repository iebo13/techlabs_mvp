import React from 'react'
import { Close as CloseIcon } from '@mui/icons-material'
import {
  Box,
  List,
  ListItem,
  Button,
  IconButton,
  Typography,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { navigationItems, ctaButtons } from '@/config/data/navigationData'
import {
  getDrawerSpacing,
  getHeaderTypography,
  createCloseButtonStyles,
  createNavLinkStyles,
  createCtaButtonStyles,
} from './MobileDrawerUtils'
import { NavLink } from './NavLink'

type MobileDrawerProps = {
  onClose: () => void
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ onClose }) => {
  const theme = useTheme()

  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))

  const spacing = getDrawerSpacing(isXs, isSm)
  const headerTypography = getHeaderTypography(isXs, isSm)
  const closeButtonStyles = createCloseButtonStyles(theme)
  const navLinkStyles = createNavLinkStyles(theme)
  const getCtaStyles = (variant: 'contained' | 'outlined') => createCtaButtonStyles(theme, variant)

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: {
          xs: `max(${spacing.py * 8}px, env(safe-area-inset-top, ${spacing.py * 8}px))`,
        },
        paddingBottom: {
          xs: `max(${spacing.py * 8}px, env(safe-area-inset-bottom, ${spacing.py * 8}px))`,
        },
        '& > *': {
          width: '100%',
        },
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: spacing.px,
          mb: spacing.headerMb,
          flexShrink: 0,
        }}>
        <Typography
          id="mobile-drawer-title"
          variant={headerTypography.variant}
          component="div"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            fontSize: headerTypography.fontSize,
            lineHeight: 1.2,
          }}>
          TechLabs
        </Typography>
        <Typography
          id="mobile-drawer-description"
          sx={{
            position: 'absolute',
            left: '-10000px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}>
          Main navigation menu with links to different sections of the TechLabs website
        </Typography>
        <IconButton edge="end" onClick={onClose} aria-label="close navigation menu" sx={closeButtonStyles}>
          <CloseIcon
            sx={{
              fontSize: {
                xs: 24,
                sm: 26,
              },
            }}
          />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <List sx={{ px: spacing.listPx }}>
          {navigationItems.map(item => (
            <ListItem key={item.path} disablePadding>
              <NavLink to={item.path} onClick={onClose} sx={navLinkStyles}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: {
                      xs: '1.05rem',
                      sm: '1.1rem',
                    },
                    lineHeight: 1.3,
                  }}>
                  {item.label}
                </Typography>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          px: spacing.px,
          mt: spacing.ctaMt,
          flexShrink: 0,
          pb: {
            xs: `max(${spacing.py * 8}px, env(safe-area-inset-bottom, ${spacing.py * 8}px))`,
          },
        }}>
        <Divider sx={{ mb: spacing.dividerMb }} />
        <Stack spacing={{ xs: 2, sm: 2.5 }}>
          {ctaButtons.map(button => (
            <Button
              key={button.path}
              component={NavLink}
              to={button.path}
              variant={button.variant}
              fullWidth
              onClick={onClose}
              sx={getCtaStyles(button.variant)}>
              {button.label}
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

MobileDrawer.displayName = 'MobileDrawer'
