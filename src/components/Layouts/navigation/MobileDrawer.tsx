import React from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { MobileDrawerFooter } from './MobileDrawerFooter'
import { MobileDrawerHeader } from './MobileDrawerHeader'
import { MobileDrawerNav } from './MobileDrawerNav'
import { getDrawerSpacing } from './MobileDrawerUtils'

type MobileDrawerProps = {
  open: boolean
  onClose: () => void
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose }) => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))

  const spacing = getDrawerSpacing(isXs, isSm)

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: {
          xs: `max(${spacing.py * 8}px, env(safe-area-inset-top, ${spacing.py * 8}px))`,
        },
        paddingBottom: {
          xs: `max(${spacing.py * 8}px, env(safe-area-inset-bottom, ${spacing.py * 8}px))`,
        },
        '& > *': {
          width: '100%',
        },
      }}>
      <MobileDrawerHeader onClose={onClose} px={spacing.px} mb={spacing.headerMb} />
      <MobileDrawerNav open={open} onNavigate={onClose} listPx={spacing.listPx} />
      <MobileDrawerFooter
        onNavigate={onClose}
        px={spacing.px}
        py={spacing.py}
        ctaMt={spacing.ctaMt}
        dividerMb={spacing.dividerMb}
      />
    </Box>
  )
}

MobileDrawer.displayName = 'MobileDrawer'
