import { alpha } from '@mui/material/styles'
import { PRIMARY, GREY } from './colors'
import { FOCUS_RING_STATIC } from './focusRing'
import { RADIUS, SHADOW } from './tokens'

export const componentOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: RADIUS.full,
        boxShadow: 'none',
        fontWeight: 800,
        '&:focus-visible': FOCUS_RING_STATIC,
      },
      containedPrimary: {
        ':hover': {
          boxShadow: 'none',
          backgroundColor: PRIMARY[700],
        },
      },
      outlinedPrimary: {
        borderWidth: '2px',
        ':hover': {
          borderWidth: '2px',
          backgroundColor: alpha(PRIMARY[500], 0.04),
        },
      },
      sizeMedium: { minHeight: 48, padding: '0 24px' },
      sizeLarge: { minHeight: 56, padding: '0 32px' },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: RADIUS.full, fontWeight: 600 },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: RADIUS.xl,
        boxShadow: SHADOW.card,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      rounded: { borderRadius: RADIUS.xl },
    },
  },
  MuiTextField: {
    defaultProps: { variant: 'outlined' as const },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: RADIUS.md,
        backgroundColor: GREY[0],
        '& fieldset': { borderColor: GREY[300] },
        '&:hover fieldset': { borderColor: GREY[700] },
        '&.Mui-focused fieldset': { borderColor: PRIMARY[500] },
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: PRIMARY[500],
        width: 28,
        height: 28,
        borderRadius: RADIUS.sm,
        padding: '6px',
        '&.Mui-checked': {
          color: PRIMARY[500],
        },
        '&:focus-visible': FOCUS_RING_STATIC,
        '& .MuiSvgIcon-root': {
          fontSize: 24,
        },
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        fontWeight: 600,
        textUnderlineOffset: '3px',
        ':hover': { textDecorationColor: PRIMARY[500] },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(GREY[0], 0.95),
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${alpha('#000000', 0.08)}`,
        boxShadow: 'none',
      },
    },
  },
  MuiContainer: {
    defaultProps: {
      maxWidth: 'lg' as const,
    },
    styleOverrides: {
      root: {
        paddingLeft: '16px',
        paddingRight: '16px',
        '@media (min-width: 600px)': {
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        scrollbarWidth: 'thin',
        scrollbarColor: `${GREY[500]} ${GREY[100]}`,
      },
      '*': {
        boxSizing: 'border-box',
      },
      '*::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: GREY[100],
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: GREY[500],
        borderRadius: '4px',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        backgroundColor: GREY[700],
      },
    },
  },
}
