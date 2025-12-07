import React from 'react'
import { Box, Typography } from '@mui/material'
import { useI18n } from '@/hooks'

export const FooterCopyRights: React.FC = () => {
  const { t } = useI18n()

  return (
    <Box>
      <Typography variant="body2" color="text.primary">
        {t('footer.copyright')}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {t('footer.boardMembers')}
      </Typography>
    </Box>
  )
}
