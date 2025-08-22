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
      primary: GREY[900], // Near-black for primary text
      secondary: GREY[700], // Muted gray for secondary text
      disabled: GREY[500],
    },
    divider: 'rgba(0,0,0,0.08)', // Subtle dividers
    background: {
      default: GREY[0], // Pure white background
      paper: GREY[0], // Keep surfaces white
    },
  },

  spacing: 8, // 8px grid – matches the layout rhythm on the site

  shape: {
    borderRadius: 24, // Softer default radius
  },

  typography: {
    fontFamily: '"Inter","Poppins","Roboto","Helvetica Neue",Arial,sans-serif',
    h1: {
      fontSize: 'clamp(3rem, 8vw, 6rem)', // Fluid display size
      lineHeight: 0.95, // Very tight line-height
      fontWeight: 900,
      letterSpacing: '-0.02em', // Slight negative tracking
    },
    h2: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)', // Fluid and heavy
      lineHeight: 1.05,
      fontWeight: 800,
      letterSpacing: '-0.01em',
    },
    h3: { fontSize: '1.875rem', lineHeight: 1.25, fontWeight: 800 },
    subtitle1: { fontSize: '1.125rem', lineHeight: 1.7, fontWeight: 600 }, // Comfortable line-height
    body1: { fontSize: '1rem', lineHeight: 1.65, fontWeight: 400, color: GREY[700] }, // Comfortable line-height
    body2: { fontSize: '0.875rem', lineHeight: 1.65, fontWeight: 400, color: GREY[700] }, // Updated color
    button: { fontSize: '1rem', fontWeight: 800, textTransform: 'none' }, // Bold buttons
  },

  components: componentOverrides,
})

// Dark theme variant (for future use)
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
