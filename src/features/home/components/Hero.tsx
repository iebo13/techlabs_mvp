import React from 'react'
import { Box, Typography } from '@mui/material'
import { Section } from '@/components/Layouts/Section'

/**
 * Hero component provides the main landing section with primary value proposition.
 * Features responsive typography with emphasis on "Tech" and supporting subhead.
 */
export const Hero: React.FC = () => {
  return (
    <Section
      component="section"
      sx={{
        minHeight: { xs: '60vh', md: '70vh' },
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'background.default', // Pure white background
        '& > .MuiContainer-root': {
          '&[aria-labelledby]': {
            ariaLabelledby: 'hero-heading',
          },
        },
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto' }}>
        {/* Main Heading */}
        <Typography
          variant="h1"
          id="hero-heading"
          component="h1"
          sx={{
            // Use theme h1 typography with very tight line-height
            lineHeight: 0.95, // Very tight line-height per Figma
            mb: 4, // Generous spacing below headline
            '& .emphasis': {
              color: 'primary.main',
              fontWeight: 'inherit',
            },
          }}
        >
          Learn{' '}
          <Box component="span" className="emphasis">
            Tech
          </Box>{' '}
          Skills for Free
        </Typography>

        {/* Subhead */}
        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            fontSize: { xs: '1.125rem', md: '1.25rem' },
            fontWeight: 400,
            lineHeight: 1.7, // Comfortable line-height
            color: 'text.secondary', // Muted gray
            maxWidth: '600px',
            mx: 'auto',
            mb: { xs: 6, md: 8 }, // Generous spacing below subtitle
            '& .separator': {
              color: 'text.secondary',
              mx: 1,
              fontSize: '0.875em',
              userSelect: 'none',
            },
          }}
        >
          Blended learning
          <Box component="span" className="separator">
            ·
          </Box>
          Local Community
          <Box component="span" className="separator">
            ·
          </Box>
          Practical Projects
        </Typography>
      </Box>
    </Section>
  )
}
