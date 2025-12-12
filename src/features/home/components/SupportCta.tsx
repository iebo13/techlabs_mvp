import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, Typography } from '@mui/material'
import { CTAButton } from '@/components/Buttons/CtaButton'
import { OptimizedImage, Section } from '@/components/Layouts'
import { useI18n } from '@/hooks'

const SUPPORT_BACKGROUND_IMAGE = '/img/background.png'

export type SupportCtaProps = {
  title?: string
  body?: string
  imageUrl?: string
  cta?: {
    label?: string
    to: string
  }
}

export const SupportCta: React.FC<SupportCtaProps> = ({ title, body, imageUrl, cta }) => {
  const navigate = useNavigate()
  const { t } = useI18n()
  const displayImageUrl = imageUrl || SUPPORT_BACKGROUND_IMAGE
  const displayTitle = title || t('hero.support.title')
  const displayBody = body || t('hero.support.body')
  const displayCtaLabel = cta?.label || t('hero.support.ctaLabel')
  const ctaTo = cta?.to || '/support'

  const handleCtaClick = () => {
    navigate(ctaTo)
  }

  return (
    <Section sx={{ width: '100%' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: { xs: 380, md: 440 },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <OptimizedImage
          src={displayImageUrl}
          alt=""
          aria-hidden
          width="100%"
          height="100%"
          priority
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
        <Card
          elevation={0}
          sx={{
            position: 'absolute',
            left: { xs: '5%', md: '64px' },
            width: { xs: '90%', md: '420px' },
            p: 4,
            maxWidth: '90%',
            borderRadius: '20px',
            border: 'none',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            backgroundColor: 'white',
            zIndex: 3,
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '12px', md: '16px' },
            }}>
            <Typography variant="h4" color="primary.main" fontWeight={700}>
              {displayTitle}
            </Typography>

            <Typography variant="body1" color="text.primary">
              {displayBody}
            </Typography>
            <CTAButton variant="outlined" size="large" onClick={handleCtaClick}>
              {displayCtaLabel}
            </CTAButton>
          </Box>
        </Card>
      </Box>
    </Section>
  )
}
