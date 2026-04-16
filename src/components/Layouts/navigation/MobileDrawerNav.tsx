import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Box, Fade, List, ListItem, Typography, useTheme } from '@mui/material'
import { navigationItems } from '@/config/data/navigationData'
import { useI18n } from '@/hooks'
import { createNavItemStyles, getSectionLabelSx, NAV_ITEM_STAGGER_MS } from './MobileDrawerUtils'

type MobileDrawerNavProps = {
  open: boolean
  onNavigate: () => void
  listPx: number
}

export const MobileDrawerNav: React.FC<MobileDrawerNavProps> = ({ open, onNavigate, listPx }) => {
  const theme = useTheme()
  const { t } = useI18n()
  const location = useLocation()

  return (
    <Box sx={{ flex: 1, overflowY: 'auto' }}>
      <Typography component="h2" sx={getSectionLabelSx()}>
        {t('navigation.sections.explore')}
      </Typography>
      <List sx={{ px: listPx, pt: 0 }}>
        {navigationItems.map((item, index) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          return (
            <Fade
              key={item.path}
              in={open}
              timeout={300}
              style={{ transitionDelay: open ? `${NAV_ITEM_STAGGER_MS * index}ms` : '0ms' }}>
              <ListItem disablePadding>
                <Box
                  component={RouterLink}
                  to={item.path}
                  onClick={onNavigate}
                  aria-current={isActive ? 'page' : undefined}
                  sx={createNavItemStyles(theme, isActive)}>
                  {Icon && (
                    <Icon
                      aria-hidden
                      sx={{
                        fontSize: 22,
                        color: 'inherit',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: isActive ? 700 : 600,
                      fontSize: { xs: '1.05rem', sm: '1.1rem' },
                      lineHeight: 1.3,
                      color: 'inherit',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                    {t(item.labelKey)}
                  </Typography>
                </Box>
              </ListItem>
            </Fade>
          )
        })}
      </List>
    </Box>
  )
}

MobileDrawerNav.displayName = 'MobileDrawerNav'
