import React from 'react'

import { useNavigate } from 'react-router-dom'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material'

import { Section } from '@/components/Layouts/Section'

export type SupportCtaProps = {
  /** Support section data */
  title: string
  body: string
  imageUrl: string
  cta: {
    label: string
    to: string
  }
}

/**
 * SupportCta component displays a highlight CTA block encouraging users to support tech education.
 * Features an image, compelling copy, and a prominent CTA button.
 */
export const SupportCta: React.FC<SupportCtaProps> = ({ title, body, imageUrl, cta }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  const handleCtaClick = () => {
    navigate(cta.to)
  }

  return (
    <Section variant="paper" paddingScale={1.5}>
      <Container maxWidth="lg">
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: `2px solid ${theme.palette.primary.main}`,
            overflow: 'hidden',
            position: 'relative',
            '&:hover': {
              transform: 'translateY(-4px)',
              transition: 'transform 0.3s ease-in-out',
              boxShadow: theme.shadows[8],
            },
          }}
        >
          <Grid container>
            {/* Image Section */}
            <Grid size={{ xs: 12, md: 5 }}>
              <CardMedia
                component="img"
                image={imageUrl}
                alt="Support Tech Education"
                sx={{
                  height: { xs: 200, md: '100%' },
                  minHeight: { md: 300 },
                  objectFit: 'cover',
                }}
              />
            </Grid>

            {/* Content Section */}
            <Grid size={{ xs: 12, md: 7 }}>
              <CardContent
                sx={{
                  p: { xs: 4, md: 6 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  minHeight: { md: 300 },
                }}
              >
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      mb: 2,
                      color: 'primary.main',
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      fontWeight: 800,
                      lineHeight: 1.2,
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '1.125rem', md: '1.25rem' },
                      lineHeight: 1.6,
                      color: 'text.secondary',
                      maxWidth: '600px',
                    }}
                  >
                    {body}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleCtaClick}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    borderRadius: '56px',
                    minHeight: '56px',
                    alignSelf: 'flex-start',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme => theme.shadows[8],
                    },
                  }}
                >
                  {cta.label}
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Section>
  )
}
