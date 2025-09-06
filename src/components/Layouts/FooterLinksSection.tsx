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
      <Grid container>
        {footerSections.map(section => (
          <Grid size={{ xs: 6, sm: 3 }} key={section.title}>
            <Typography variant="subtitle1" color="text.primary">
              {section.title}
            </Typography>
            <Stack>
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
