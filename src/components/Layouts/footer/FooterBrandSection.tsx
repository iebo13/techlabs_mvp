import React from 'react'
import { Box, Typography } from '@mui/material'
import { useI18n } from '@/hooks'
import { Logo } from '../navigation/Logo'

export const FooterBrandSection: React.FC = () => {
  const { t } = useI18n()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'start',
        flex: 1,
        py: { xs: 2, md: 0 },
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Logo />
        <Typography variant="body1" color="text.secondary" sx={{ p: 0 }}>
          {t('footer.city')}
        </Typography>
      </Box>
    </Box>
  )
}
