import React from 'react'
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { useI18n } from '@/hooks'
import { RADIUS, SHADOW, TRANSITION } from '@/theme'
import type { DetailedPartner } from '../types/partners.type'

type PartnerCardProps = {
  readonly partner: DetailedPartner
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  const { t } = useI18n()

  return (
    <Box
      component="a"
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('partners.card.visitPartner', { name: partner.name })}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        p: 3,
        borderRadius: RADIUS.md,
        border: '1px solid',
        borderColor: 'divider',
        transition: `all ${TRANSITION.normal}`,
        cursor: 'pointer',
        height: '100%',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: SHADOW.subtle,
          transform: 'translateY(-2px)',
        },
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 100,
          width: '100%',
          mb: 2,
        }}>
        <Box
          component="img"
          src={partner.logoUrl}
          alt={`${partner.name} logo`}
          loading="lazy"
          sx={{
            maxHeight: 72,
            maxWidth: '80%',
            objectFit: 'contain',
          }}
        />
      </Box>
      <Stack spacing={0.5} alignItems="center" sx={{ mt: 'auto' }}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography variant="subtitle1" fontWeight={700} color="text.primary" textAlign="center">
            {partner.name}
          </Typography>
          <OpenInNewIcon aria-hidden="true" sx={{ fontSize: 14, color: 'text.disabled' }} />
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {partner.category}
        </Typography>
      </Stack>
    </Box>
  )
}

PartnerCard.displayName = 'PartnerCard'
