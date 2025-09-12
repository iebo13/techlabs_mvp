import { createTheme } from '@mui/material/styles'
import { PRIMARY, BLUE, GREY } from './colors'
import { componentOverrides } from './components'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY[500],
      light: PRIMARY[300],
      dark: PRIMARY[700],
      contrastText: GREY[0],
    },
    secondary: {
      main: GREY[700],
      light: GREY[500],
      dark: GREY[900],
      contrastText: GREY[0],
    },
    info: {
      main: BLUE[500],
      light: BLUE[300],
      dark: BLUE[700],
      contrastText: GREY[0],
    },
    text: {
      primary: GREY[900],
      secondary: GREY[700],
      disabled: GREY[500],
    },
    divider: 'rgba(0,0,0,0.08)',
    background: {
      default: GREY[0],
      paper: GREY[0],
    },
  },

  spacing: 8,

  shape: {
    borderRadius: 24,
  },

  typography: {
    fontFamily: '"Inter","Poppins","Roboto","Helvetica Neue",Arial,sans-serif',
    h1: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      lineHeight: 0.95,
      fontWeight: 900,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      lineHeight: 1.05,
      fontWeight: 800,
      letterSpacing: '-0.01em',
    },
    h3: { fontSize: '1.875rem', lineHeight: 1.25, fontWeight: 800 },
    subtitle1: { fontSize: '1.125rem', lineHeight: 1.7, fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: 1.65, fontWeight: 400, color: GREY[700] },
    body2: { fontSize: '0.875rem', lineHeight: 1.65, fontWeight: 400, color: GREY[700] },
    button: { fontSize: '1rem', fontWeight: 800, textTransform: 'none' },
  },

  components: componentOverrides,
})

export const darkTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    mode: 'dark',
    primary: {
      main: PRIMARY[300],
      light: PRIMARY[100],
      dark: PRIMARY[500],
      contrastText: GREY[900],
    },
    background: {
      default: GREY[900],
      paper: '#1a1a1a',
    },
    text: {
      primary: GREY[0],
      secondary: GREY[500],
    },
  },
  components: {
    ...componentOverrides,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
})
