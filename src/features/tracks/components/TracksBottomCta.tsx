import React from 'react'
import { Box, Container } from '@mui/material'
import { CTAButton } from '@/components/Buttons'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

export const TracksBottomCta: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section
      variant="paper"
      sx={{
        py: { xs: 6, md: 8 },
        borderTop: '1px solid',
        borderColor: 'divider',
      }}>
      <Container maxWidth="sm">
        <SectionHeading level={3} centered subtitle={t('tracks.overview.finalCta.body')}>
          {t('tracks.overview.finalCta.title')}
        </SectionHeading>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton to="/apply">{t('tracks.overview.finalCta.primary')}</CTAButton>
            <CTAButton to="/about#contact" variant="outlined">
              {t('tracks.overview.finalCta.secondary')}
            </CTAButton>
          </Box>
        </Box>
      </Container>
    </Section>
  )
}

TracksBottomCta.displayName = 'TracksBottomCta'
