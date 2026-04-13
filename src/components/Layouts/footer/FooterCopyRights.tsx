import React from 'react'
import { Box, Link, Typography } from '@mui/material'
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
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        <Link
          href="https://unsplash.com/?utm_source=techlabs&utm_medium=referral"
          target="_blank"
          rel="noopener noreferrer">
          {t('footer.photosFromUnsplash')}
        </Link>
      </Typography>
    </Box>
  )
}

FooterCopyRights.displayName = 'FooterCopyRights'
