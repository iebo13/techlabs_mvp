import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { NavLink } from '../navigation/NavLink'
import { footerSections } from './footerData'

export const FooterLinksSection: React.FC = () => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', flex: 2, width: '100%' }}
    >
      <Grid container spacing={{ xs: 3, md: 6 }} width="100%">
        {footerSections.map(section => (
          <Grid size={{ xs: 6, sm: 3 }} key={section.title}>
            <nav aria-label={section.title}>
              <Typography variant="body1" color="text.primary" fontWeight={600}>
                {section.title}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                {section.links.map(link => (
                  <Box component="li" key={link.label}>
                    <NavLink
                      to={link.path}
                      showActive={false}
                      sx={{
                        px: 0,
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        lineHeight: 1.5,
                        display: 'block',
                        wordWrap: 'break-word',
                        maxWidth: '100%',
                        '&:hover': {
                          color: 'primary.main',
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
                  </Box>
                ))}
              </Box>
            </nav>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
