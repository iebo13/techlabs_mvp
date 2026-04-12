import React from 'react'
import { Favorite, Groups, Build } from '@mui/icons-material'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

const PILLARS = [
  { key: 'free', icon: <Favorite /> },
  { key: 'community', icon: <Groups /> },
  { key: 'practical', icon: <Build /> },
] as const

export const WhyTechLabsStrip: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <SectionHeading level={2} emphasis="primary" centered sx={{ mb: 4 }}>
          {t('tracks.overview.whyTechlabs.title')}
        </SectionHeading>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {PILLARS.map(({ key, icon }) => (
            <Grid size={{ xs: 12, md: 4 }} key={key}>
              <Stack spacing={1.5} alignItems="center" textAlign="center">
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  }}>
                  {icon}
                </Box>
                <Typography variant="h6" fontWeight={700}>
                  {t(`tracks.overview.whyTechlabs.${key}.title`)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, maxWidth: 320 }}>
                  {t(`tracks.overview.whyTechlabs.${key}.body`)}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

WhyTechLabsStrip.displayName = 'WhyTechLabsStrip'
