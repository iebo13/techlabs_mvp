import React from 'react'
import { Build, Groups, MoneyOff } from '@mui/icons-material'
import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { SHADOW, TRANSITION } from '@/theme'

const DIFFERENTIATORS = [
  { key: 'free', icon: MoneyOff },
  { key: 'community', icon: Groups },
  { key: 'projects', icon: Build },
] as const

export const OurApproachSection: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack spacing={5} alignItems="center">
          <SectionHeading level={2} centered subtitle={t('about.approachSection.subtitle')} maxWidth="600px">
            {t('about.approachSection.title')}
          </SectionHeading>

          <Grid container spacing={3} px={{ xs: 0, md: 4 }}>
            {DIFFERENTIATORS.map(item => {
              const IconComponent = item.icon

              return (
                <Grid key={item.key} size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: `all ${TRANSITION.normal}`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: SHADOW.cardHover,
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
                          <IconComponent sx={{ color: 'common.white', fontSize: 28 }} />
                        </Box>
                        <Typography variant="h6" fontWeight={700}>
                          {t(`about.approachSection.${item.key}.title`)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                          {t(`about.approachSection.${item.key}.description`)}
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

OurApproachSection.displayName = 'OurApproachSection'
