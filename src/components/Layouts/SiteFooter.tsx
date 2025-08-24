import React from 'react'

import { Box, Container, Grid, Typography, Link, Stack, IconButton, Divider } from '@mui/material'

import { footerSections, socialLinks } from '@/config/data/footerData'

import { NavLink } from './NavLink'

/**
 * SiteFooter component provides comprehensive site navigation and legal information.
 * Includes 4 organized link columns, social media links, and legal pages.
 */
export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box component="footer" sx={{ backgroundColor: 'background.paper', mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          {/* Main Footer Content */}
          <Grid container spacing={4}>
            {/* Brand Section */}
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
                Empowering people to shape the digital future through free tech education, local
                community, and practical projects.
              </Typography>

              {/* Social Links */}
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}
              >
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

            {/* Footer Links Columns */}
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
                        <Link
                          key={link.label}
                          component={link.external ? 'a' : NavLink}
                          to={link.external ? undefined : link.path}
                          href={link.external ? link.path : undefined}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
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
                        </Link>
                      ))}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: 'divider' }} />

        {/* Footer Bottom */}
        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} TechLabs. All rights reserved.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 3 }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Link
              component={NavLink}
              to="/privacy"
              showActive={false}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
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
              Privacy Policy
            </Link>
            <Link
              component={NavLink}
              to="/imprint"
              showActive={false}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
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
              Imprint
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
