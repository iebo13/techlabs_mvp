import { alpha } from '@mui/material/styles'
import { PRIMARY, GREY } from './colors'

export const componentOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 999,
        boxShadow: 'none',
        fontWeight: 800,
        '&:focus-visible': {
          outline: `3px solid ${alpha(PRIMARY[500], 0.25)}`,
          outlineOffset: 2,
        },
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
      root: { borderRadius: 999, fontWeight: 600 },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 24,
        boxShadow: '0px 4px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      rounded: { borderRadius: 24 },
    },
  },
  MuiTextField: {
    defaultProps: { variant: 'outlined' as const },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
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
        borderRadius: 6,
        padding: '6px',
        '&.Mui-checked': {
          color: PRIMARY[500],
        },
        '&:focus-visible': {
          outline: `2px solid ${PRIMARY[500]}`,
          outlineOffset: 2,
        },
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
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
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
