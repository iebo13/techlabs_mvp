import React from 'react'
import { Grid, Typography, Stack } from '@mui/material'
import { footerSections } from '@/config/data/footerData'
import { NavLink } from './NavLink'

/**
 * FooterLinksSection - Renders the footer links columns
 * Extracted from SiteFooter for better separation of concerns
 */
export const FooterLinksSection: React.FC = () => {
  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Grid container spacing={3}>
        {footerSections.map(section => (
          <Grid size={{ xs: 6, sm: 3 }} key={section.title}>
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
              {section.links.map(link => (
                <NavLink
                  key={link.label}
                  to={link.path}
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
                </NavLink>
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
