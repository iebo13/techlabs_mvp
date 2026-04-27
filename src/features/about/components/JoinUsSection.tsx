import React from 'react'
import { Business, Handshake, School } from '@mui/icons-material'
import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { CTAButton } from '@/components/Buttons/CtaButton'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { TRANSITION } from '@/theme'

const PATHWAYS = [
  { key: 'shaper', icon: School, to: '/tracks' },
  { key: 'mentor', icon: Handshake, to: '/about#contact' },
  { key: 'partner', icon: Business, to: '/partners' },
] as const

export const JoinUsSection: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section variant="primary" paddingScale={1.2}>
      <Container maxWidth="lg">
        <Stack spacing={5} alignItems="center">
          <SectionHeading level={2} centered emphasis="gradient" maxWidth="600px">
            {t('about.joinSection.title')}
          </SectionHeading>
          <Typography
            variant="h6"
            component="p"
            color="common.white"
            textAlign="center"
            sx={{ maxWidth: 550, opacity: 0.9, lineHeight: 1.5, mt: -2 }}>
            {t('about.joinSection.subtitle')}
          </Typography>

          <Grid container spacing={3}>
            {PATHWAYS.map(pathway => {
              const IconComponent = pathway.icon

              return (
                <Grid key={pathway.key} size={{ xs: 12, sm: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      bgcolor: theme => alpha(theme.palette.common.white, 0.12),
                      backdropFilter: 'blur(8px)',
                      border: theme => `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                      borderRadius: 3,
                      color: 'inherit',
                      transition: `all ${TRANSITION.normal}`,
                      '&:hover': {
                        bgcolor: theme => alpha(theme.palette.common.white, 0.18),
                        transform: 'translateY(-2px)',
                      },
                    }}>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Stack spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            bgcolor: theme => alpha(theme.palette.common.white, 0.15),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <IconComponent sx={{ fontSize: 28, color: 'common.white' }} />
                        </Box>

                        <Typography variant="h6" fontWeight={700} color="common.white">
                          {t(`about.joinSection.${pathway.key}.title`)}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ color: theme => alpha(theme.palette.common.white, 0.8), lineHeight: 1.7 }}>
                          {t(`about.joinSection.${pathway.key}.description`)}
                        </Typography>

                        <CTAButton
                          to={pathway.to}
                          variant="outlined"
                          size="small"
                          sx={{
                            color: 'common.white',
                            borderColor: theme => alpha(theme.palette.common.white, 0.6),
                            '&:hover': {
                              borderColor: 'common.white',
                              bgcolor: theme => alpha(theme.palette.common.white, 0.1),
                            },
                          }}>
                          {t(`about.joinSection.${pathway.key}.cta`)}
                        </CTAButton>
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

JoinUsSection.displayName = 'JoinUsSection'
