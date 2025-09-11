import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, Typography } from '@mui/material'
import { CTAButton } from '@/components/Buttons/CtaButton'
import { OptimizedImage, Section } from '@/components/Layouts'

const SUPPORT_BACKGROUND_IMAGE = '/img/background.png'

export type SupportCtaProps = {
  title?: string
  body: string
  imageUrl?: string
  cta: {
    label: string
    to: string
  }
}

export const SupportCta: React.FC<SupportCtaProps> = ({
  title = 'Support Tech Education',
  body,
  imageUrl,
  cta,
}) => {
  const navigate = useNavigate()
  const displayImageUrl = imageUrl || SUPPORT_BACKGROUND_IMAGE

  const handleCtaClick = () => {
    navigate(cta.to)
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
        }}
      >
        <OptimizedImage
          src={displayImageUrl}
          alt={title}
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
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '12px', md: '16px' },
            }}
          >
            <Typography variant="h4" color="primary.main" fontWeight={700}>
              {title}
            </Typography>

            <Typography variant="body1" color="text.primary">
              {body}
            </Typography>
            <CTAButton variant="outlined" size="large" onClick={handleCtaClick}>
              {cta.label}
            </CTAButton>
          </Box>
        </Card>
      </Box>
    </Section>
  )
}
