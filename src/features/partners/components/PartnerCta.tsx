import React from 'react'
import { CheckCircleOutline } from '@mui/icons-material'
import { Box, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { CTAButton } from '@/components/Buttons/CtaButton'
import { Section } from '@/components/Layouts'
import { useI18n } from '@/hooks'

export const PartnerCTA: React.FC = () => {
  const { t } = useI18n()
  const benefits = t('partners.cta.benefits', { returnObjects: true }) as string[]

  return (
    <Section variant="primary" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg" id="partner-cta">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" px={{ xs: 2, md: 4 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <Typography variant="h3" component="h2" fontWeight={800} color="common.white">
                {t('partners.cta.title')}
              </Typography>
              <Typography variant="body1" color="common.white" sx={{ opacity: 0.85, maxWidth: 520 }}>
                {t('partners.cta.subtitle')}
              </Typography>
              <List disablePadding>
                {benefits.map(benefit => (
                  <ListItem key={benefit} disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleOutline sx={{ fontSize: 20, color: 'common.white', opacity: 0.8 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={benefit}
                      primaryTypographyProps={{ variant: 'body2', color: 'common.white', sx: { opacity: 0.9 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                bgcolor: 'common.white',
                borderRadius: 3,
                p: { xs: 3, md: 4 },
                textAlign: 'center',
              }}>
              <Stack spacing={2.5} alignItems="center">
                <Typography variant="h5" fontWeight={800} color="primary.main">
                  {t('partners.hero.cta')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('partners.faq.items.5.a')}
                </Typography>
                <CTAButton to="/about#contact" sx={{ width: '100%' }}>
                  {t('partners.cta.primaryCta')}
                </CTAButton>
                <CTAButton to="/about#contact" variant="outlined" sx={{ width: '100%' }}>
                  {t('partners.cta.secondaryCta')}
                </CTAButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Section>
  )
}

PartnerCTA.displayName = 'PartnerCTA'
