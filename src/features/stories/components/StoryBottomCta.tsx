import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container } from '@mui/material'
import { CTAButton } from '@/components/Buttons'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

export const StoryBottomCta: React.FC = () => {
  const navigate = useNavigate()
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
        <SectionHeading level={3} centered>
          {t('common:stories.detail.joinUs')}
        </SectionHeading>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton to="/tracks">{t('common:stories.detail.applyNow')}</CTAButton>
            <Button variant="outlined" size="large" onClick={() => navigate('/stories')}>
              {t('common:stories.detail.seeMore')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Section>
  )
}

StoryBottomCta.displayName = 'StoryBottomCta'
