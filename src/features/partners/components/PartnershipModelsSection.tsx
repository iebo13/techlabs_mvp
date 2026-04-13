import React from 'react'
import { CheckCircleOutline } from '@mui/icons-material'
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { CTAButton } from '@/components/Buttons/CtaButton'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { RADIUS, SHADOW, TRANSITION } from '@/theme'

const MODEL_KEYS = ['eventPartnership', 'brandingSponsorship'] as const

export const PartnershipModelsSection: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section variant="paper" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          level={2}
          emphasis="primary"
          centered
          subtitle={t('partners.partnershipModels.subtitle')}
          sx={{ mb: 4 }}>
          {t('partners.partnershipModels.title')}
        </SectionHeading>

        <Grid container spacing={4} sx={{ mt: 2 }} px={{ xs: 2, md: 4 }}>
          {MODEL_KEYS.map(key => {
            const benefits = t(`partners.partnershipModels.${key}.benefits`, { returnObjects: true }) as string[]

            return (
              <Grid size={{ xs: 12, md: 6 }} key={key}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: RADIUS.md,
                    transition: `all ${TRANSITION.normal}`,
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: SHADOW.cardHover,
                    },
                  }}>
                  <Stack spacing={2.5} sx={{ height: '100%' }}>
                    <Typography variant="h5" component="h3" fontWeight={800} color="primary.main">
                      {t(`partners.partnershipModels.${key}.title`)}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
                      {t(`partners.partnershipModels.${key}.subtitle`)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t(`partners.partnershipModels.${key}.description`)}
                    </Typography>
                    <List dense disablePadding>
                      {benefits.map(benefit => (
                        <ListItem key={benefit} disableGutters sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ fontSize: 20, color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={benefit}
                            primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ mt: 'auto', pt: 1 }}>
                      <CTAButton to="/about#contact" variant="outlined" size="medium">
                        {t(`partners.partnershipModels.${key}.cta`)}
                      </CTAButton>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Section>
  )
}

PartnershipModelsSection.displayName = 'PartnershipModelsSection'
