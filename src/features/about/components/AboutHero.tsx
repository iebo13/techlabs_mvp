import React from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'
import { CTAButton } from '@/components/Buttons/CtaButton'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { useCountUp } from '../hooks/useCountUp'

const STATS = [
  { end: 2500, suffix: '+', labelKey: 'about.heroSection.stats.shapers' },
  { end: 8, suffix: '', labelKey: 'about.heroSection.stats.cities' },
  { end: 200, suffix: '+', labelKey: 'about.heroSection.stats.mentors' },
  { end: 87, suffix: '%', labelKey: 'about.heroSection.stats.completionRate' },
] as const

const AnimatedStat: React.FC<{ end: number; suffix: string; label: string }> = ({ end, suffix, label }) => {
  const { ref, displayValue } = useCountUp({ end, suffix, duration: 2000 })

  return (
    <Box ref={ref} sx={{ textAlign: 'center', minWidth: { xs: '40%', sm: 'auto' } }}>
      <Typography
        variant="h3"
        component="p"
        color="primary.main"
        fontWeight={900}
        aria-label={`${end}${suffix} ${label}`}>
        {displayValue}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  )
}

export const AboutHero: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={3}>
          <Typography
            variant="subtitle1"
            color="primary.main"
            textAlign="center"
            sx={{ letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 }}>
            {t('about.heroSection.tagline')}
          </Typography>

          <SectionHeading level={1} centered emphasis="primary" maxWidth="800px">
            {t('about.missionSection.title')}
          </SectionHeading>

          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: '700px', fontSize: '1.125rem', lineHeight: 1.6 }}>
            {t('about.heroSection.subtitle')}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 3, sm: 5 },
              mt: 2,
              py: 3,
            }}>
            {STATS.map(stat => (
              <AnimatedStat key={stat.labelKey} end={stat.end} suffix={stat.suffix} label={t(stat.labelKey)} />
            ))}
          </Box>

          <CTAButton to="/tracks" size="large">
            {t('about.heroSection.cta')}
          </CTAButton>
        </Stack>
      </Container>
    </Section>
  )
}

AboutHero.displayName = 'AboutHero'
