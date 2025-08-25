import type { Theme } from '@mui/material'

export const PRIMARY_COLOR_OPACITY = '40'

export type DrawerSpacing = {
  px: number
  py: number
  headerMb: number
  listPx: number
  ctaMt: number
  dividerMb: number
}

export type HeaderTypography = {
  variant: 'h5' | 'h6'
  fontSize: string
}

export const getDrawerSpacing = (isXs: boolean, isSm: boolean): DrawerSpacing => {
  if (isXs) {
    return {
      px: 2,
      py: 2,
      headerMb: 2.5,
      listPx: 1,
      ctaMt: 3,
      dividerMb: 2.5,
    }
  }

  if (isSm) {
    return {
      px: 3,
      py: 2.5,
      headerMb: 3,
      listPx: 1.5,
      ctaMt: 4,
      dividerMb: 3,
    }
  }

  return {
    px: 3,
    py: 3,
    headerMb: 3.5,
    listPx: 2,
    ctaMt: 4,
    dividerMb: 3,
  }
}

export const getHeaderTypography = (isXs: boolean, isSm: boolean): HeaderTypography => {
  if (isXs) return { variant: 'h6' as const, fontSize: '1.15rem' }
  if (isSm) return { variant: 'h6' as const, fontSize: '1.25rem' }

  return { variant: 'h5' as const, fontSize: '1.35rem' }
}

export const createCloseButtonStyles = (theme: Theme) => ({
  color: 'text.primary',
  width: {
    xs: 44,
    sm: 48,
  },
  height: {
    xs: 44,
    sm: 48,
  },
  borderRadius: 2,
  // eslint-disable-next-line sonarjs/no-duplicate-string
  transition: theme.transitions.create(['background-color', 'transform', 'color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    transform: 'scale(1.05)',
    color: 'primary.main',
  },
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.primary.main}${PRIMARY_COLOR_OPACITY}`,
    outlineOffset: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
})

export const createNavLinkStyles = (theme: Theme) => ({
  display: 'block',
  width: '100%',
  textDecoration: 'none',
  borderRadius: 2,
  mx: 1,
  mb: 0.75,
  minHeight: {
    xs: 52,
    sm: 56,
  },
  px: {
    xs: 2,
    sm: 2.5,
  },
  py: {
    xs: 1.5,
    sm: 1.75,
  },
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    transform: 'translateX(4px)',
  },
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.primary.main}${PRIMARY_COLOR_OPACITY}`,
    outlineOffset: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
})

export const createCtaButtonStyles = (theme: Theme, buttonVariant: 'contained' | 'outlined') => ({
  py: {
    xs: 1.75,
    sm: 2,
  },
  fontSize: {
    xs: '1rem',
    sm: '1.05rem',
  },
  fontWeight: 600,
  borderRadius: 2,
  textTransform: 'none',
  minHeight: {
    xs: 50,
    sm: 54,
  },
  transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow:
      buttonVariant === 'contained'
        ? `0 6px 16px ${theme.palette.primary.main}25`
        : '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.primary.main}${PRIMARY_COLOR_OPACITY}`,
    outlineOffset: 2,
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  ...(buttonVariant === 'outlined' && {
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}08`,
      borderColor: theme.palette.primary.main,
    },
  }),
})
