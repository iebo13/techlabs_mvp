import { createTheme, alpha } from '@mui/material/styles'

const PRIMARY = {
    900: '#891232',
    700: '#AF1740',
    500: '#FA215C',
    300: '#FB638C',
    100: '#FDAEC3',
}

const BLUE = {
    700: '#336FDB',
    500: '#6A9EF6',
    300: '#91B8F8',
}

const GREY = {
    900: '#040404',
    700: '#5C5C5C',
    500: '#A0A0A0',
    300: '#E6E6E6',
    100: '#F5F4F4',
    0: '#FFFFFF',
}

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
        divider: GREY[300],
        background: {
            default: GREY[100],
            paper: GREY[0],
        },
    },

    spacing: 8, // 8px grid – matches the layout rhythm on the site

    shape: {
        borderRadius: 16, // card/default radius
    },

    typography: {
        fontFamily: '"Inter","Poppins","Roboto","Helvetica Neue",Arial,sans-serif',
        h1: { fontSize: '3.5rem', lineHeight: 1.15, fontWeight: 800, letterSpacing: -0.5 },
        h2: { fontSize: '2.5rem', lineHeight: 1.2, fontWeight: 700, letterSpacing: -0.25 },
        h3: { fontSize: '1.875rem', lineHeight: 1.25, fontWeight: 700 },
        subtitle1: { fontSize: '1.125rem', lineHeight: 1.45, fontWeight: 600 },
        body1: { fontSize: '1rem', lineHeight: 1.625, fontWeight: 400, color: GREY[900] },
        body2: { fontSize: '0.875rem', lineHeight: 1.57, fontWeight: 400, color: GREY[700] },
        button: { fontSize: '1rem', fontWeight: 700, textTransform: 'none' },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    boxShadow: 'none',
                    '&:focus-visible': {
                        outline: `3px solid ${alpha(PRIMARY[500], 0.25)}`,
                        outlineOffset: 2,
                    },
                },
                containedPrimary: {
                    ':hover': { boxShadow: 'none' },
                },
                sizeMedium: { minHeight: 48, padding: '0 24px' },
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
                    borderRadius: 16,
                    boxShadow: '0px 4px 16px rgba(0,0,0,0.08)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: { borderRadius: 16 },
            },
        },
        MuiTextField: {
            defaultProps: { variant: 'outlined' },
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
            styleOverrides: { root: { color: PRIMARY[500] } },
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
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiContainer: {
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
    },
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
        ...theme.components,
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