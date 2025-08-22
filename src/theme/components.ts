import { alpha } from '@mui/material/styles'
import { PRIMARY, GREY } from './colors'

export const componentOverrides = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 999, // Pill-shaped
                boxShadow: 'none', // No elevation
                fontWeight: 800, // Bold
                '&:focus-visible': {
                    outline: `3px solid ${alpha(PRIMARY[500], 0.25)}`,
                    outlineOffset: 2,
                },
            },
            containedPrimary: {
                ':hover': {
                    boxShadow: 'none',
                    backgroundColor: PRIMARY[700], // Slight darken on hover
                },
            },
            outlinedPrimary: {
                borderWidth: '2px', // 2px border for outlined
                ':hover': {
                    borderWidth: '2px', // Preserve border width on hover
                    backgroundColor: alpha(PRIMARY[500], 0.04),
                },
            },
            sizeMedium: { minHeight: 48, padding: '0 24px' },
            sizeLarge: { minHeight: 56, padding: '0 32px' }, // For prominent CTAs
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
                borderRadius: 24, // Softer radius
                boxShadow: '0px 4px 24px rgba(0,0,0,0.06)', // Softer shadow
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
                width: 28, // Larger checkbox size
                height: 28,
                borderRadius: 6, // Square with slight corner radius
                padding: '6px', // Better touch target
                '&.Mui-checked': {
                    color: PRIMARY[500],
                },
                '&:focus-visible': {
                    outline: `2px solid ${PRIMARY[500]}`,
                    outlineOffset: 2,
                },
                '& .MuiSvgIcon-root': {
                    fontSize: 24, // Larger icon
                }
            }
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
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)', // 1px hairline
                boxShadow: 'none', // Remove shadows
            },
        },
    },
    MuiContainer: {
        defaultProps: {
            maxWidth: 'lg' as const, // Default to wide layout
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
