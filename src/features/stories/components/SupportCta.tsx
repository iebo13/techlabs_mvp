import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, Typography } from '@mui/material'
import { CTAButton } from '@/components/Buttons/CtaButton'
import { OptimizedImage } from '@/components/Layouts/OptimizedImage'
import { Section } from '@/components/Layouts/Section'

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
        {/* Background image */}
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
            <Typography
              variant="h4"
              component="h2"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                fontSize: { xs: '1.75rem', md: '2rem' },
                lineHeight: 1.2,
                mb: 0,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.primary',
                fontSize: '16px',
                lineHeight: 1.5,
                mb: { xs: '20px', md: '24px' },
              }}
            >
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
