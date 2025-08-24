import React from 'react'
import { Grid, Typography, Stack, IconButton } from '@mui/material'
import { socialLinks } from '@/config/data/footerData'

/**
 * FooterBrandSection - Renders the brand section of the footer
 * Extracted from SiteFooter for better separation of concerns
 */
export const FooterBrandSection: React.FC = () => {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
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
        Empowering people to shape the digital future through free tech education, local community,
        and practical projects.
      </Typography>

      {/* Social Links */}
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
        Follow Us
      </Typography>
      <Stack direction="row" spacing={1}>
        {socialLinks.map(social => {
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
  )
}
