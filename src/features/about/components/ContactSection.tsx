import React from 'react'
import { Email, GitHub, LinkedIn, LocationOn, Phone, Twitter } from '@mui/icons-material'
import { Box, Button, Container, Grid, Link, Stack, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

type ContactData = {
  social: {
    linkedin: string
    twitter: string
    github: string
  }
}

const SOCIAL_BUTTON_SX = { borderRadius: 2 }

export const ContactSection: React.FC<{ data: ContactData }> = ({ data }) => {
  const { t } = useI18n()
  const opensInNewTab = t('common:accessibility.opensInNewTab')

  return (
    <Section>
      <Container maxWidth="lg">
        <SectionHeading level={2} centered maxWidth="700px">
          {t('about.contactSection.title')}
        </SectionHeading>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 3, maxWidth: '600px', mx: 'auto', mb: 6 }}>
          {t('about.contactSection.description')}
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Email color="primary" />
                <Box>
                  <Typography variant="h6" component="h3" fontWeight={600}>
                    {t('about.contactSection.email')}
                  </Typography>
                  <Link href={`mailto:${t('about.contactSection.contactInfo.email')}`} color="primary">
                    {t('about.contactSection.contactInfo.email')}
                  </Link>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Phone color="primary" />
                <Box>
                  <Typography variant="h6" component="h3" fontWeight={600}>
                    {t('about.contactSection.phone')}
                  </Typography>
                  <Link href={`tel:${t('about.contactSection.contactInfo.phone')}`} color="primary">
                    {t('about.contactSection.contactInfo.phone')}
                  </Link>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocationOn color="primary" />
                <Box>
                  <Typography variant="h6" component="h3" fontWeight={600}>
                    {t('about.contactSection.address')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('about.contactSection.contactInfo.address')}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                {t('about.contactSection.followUs')}
              </Typography>
              <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }} flexWrap="wrap">
                <Button
                  component={Link}
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<LinkedIn aria-hidden="true" />}
                  aria-label={`${t('about.contactSection.socialMedia.linkedin')} ${opensInNewTab}`}
                  sx={SOCIAL_BUTTON_SX}>
                  {t('about.contactSection.socialMedia.linkedin')}
                </Button>
                <Button
                  component={Link}
                  href={data.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<Twitter aria-hidden="true" />}
                  aria-label={`${t('about.contactSection.socialMedia.twitter')} ${opensInNewTab}`}
                  sx={SOCIAL_BUTTON_SX}>
                  {t('about.contactSection.socialMedia.twitter')}
                </Button>
                <Button
                  component={Link}
                  href={data.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<GitHub aria-hidden="true" />}
                  aria-label={`${t('about.contactSection.socialMedia.github')} ${opensInNewTab}`}
                  sx={SOCIAL_BUTTON_SX}>
                  {t('about.contactSection.socialMedia.github')}
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Section>
  )
}
