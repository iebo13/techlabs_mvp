import React from 'react'
import { Email, GitHub, LinkedIn, LocationOn, Phone, Twitter } from '@mui/icons-material'
import { Box, Button, Container, Grid, Link, Stack, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'

type ContactData = {
  title: string
  description: string
  email: string
  phone: string
  address: string
  social: {
    linkedin: string
    twitter: string
    github: string
  }
}

export const ContactSection: React.FC<{ data: ContactData }> = ({ data }) => (
  <Section>
    <Container maxWidth="lg">
      <SectionHeading level={2} centered maxWidth="700px">
        {data.title}
      </SectionHeading>
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        sx={{ mt: 3, maxWidth: '600px', mx: 'auto', mb: 6 }}>
        {data.description}
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Email color="primary" />
              <Box>
                <Typography variant="h6" component="h3" fontWeight={600}>
                  Email
                </Typography>
                <Link href={`mailto:${data.email}`} color="primary">
                  {data.email}
                </Link>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Phone color="primary" />
              <Box>
                <Typography variant="h6" component="h3" fontWeight={600}>
                  Phone
                </Typography>
                <Link href={`tel:${data.phone}`} color="primary">
                  {data.phone}
                </Link>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocationOn color="primary" />
              <Box>
                <Typography variant="h6" component="h3" fontWeight={600}>
                  Address
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.address}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <Button
                component={Link}
                href={data.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<LinkedIn />}
                sx={{ borderRadius: 2 }}>
                LinkedIn
              </Button>
              <Button
                component={Link}
                href={data.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<Twitter />}
                sx={{ borderRadius: 2 }}>
                Twitter
              </Button>
              <Button
                component={Link}
                href={data.social.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<GitHub />}
                sx={{ borderRadius: 2 }}>
                GitHub
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Section>
)
