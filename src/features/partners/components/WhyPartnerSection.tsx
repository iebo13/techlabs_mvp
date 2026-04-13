import React from 'react'
import { Campaign, Diversity3, Groups, Lightbulb, Public, School } from '@mui/icons-material'
import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

const BENEFIT_KEYS = [
  { key: 'fosterTalent', icon: School },
  { key: 'talentPool', icon: Groups },
  { key: 'solveChallenges', icon: Lightbulb },
  { key: 'brandVisibility', icon: Campaign },
  { key: 'diverseTalent', icon: Diversity3 },
  { key: 'scaleEurope', icon: Public },
] as const

export const WhyPartnerSection: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg" id="why-partner">
        <Stack spacing={4} alignItems="center">
          <SectionHeading level={2} centered subtitle={t('partners.whyPartner.subtitle')}>
            {t('partners.whyPartner.title')}
          </SectionHeading>
          <Grid container spacing={3} px={{ xs: 2, md: 4 }}>
            {BENEFIT_KEYS.map(benefit => {
              const IconComponent = benefit.icon

              return (
                <Grid key={benefit.key} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.25s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      },
                    }}>
                    <CardContent sx={{ p: 3 }}>
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <IconComponent sx={{ color: 'white', fontSize: 28 }} />
                        </Box>
                        <Typography variant="h6" fontWeight={700}>
                          {t(`partners.whyPartner.benefits.${benefit.key}.title`)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t(`partners.whyPartner.benefits.${benefit.key}.description`)}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Stack>
      </Container>
    </Section>
  )
}
