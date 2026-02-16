import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#856404', // Dark Gold (Vintage Yellow)
            light: '#b8860b',
            dark: '#533f03',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#c5a059',
            light: '#e3c078',
            dark: '#8f7236',
            contrastText: '#0f172a',
        },
        background: {
            default: 'transparent',
            paper: 'rgba(255, 255, 255, 0.8)',
        },
        text: {
            primary: '#533f03', // Dark Brown/Gold for high contrast text
            secondary: '#856404', // Gold for secondary text
        },
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h4: {
            fontWeight: 800,
            color: '#856404',
        },
        h5: {
            fontWeight: 800,
            color: '#856404',
        },
        h6: {
            fontWeight: 800,
            color: '#856404',
        },
        subtitle1: {
            fontWeight: 700,
            color: '#856404',
        },
        body1: {
            fontWeight: 500,
            color: '#533f03',
        },
        body2: {
            fontWeight: 500,
            color: '#533f03',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: '12px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(133, 100, 4, 0.2)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #4a7c59 0%, #2f5e3d 100%)', // Vintage Green
                    color: '#000000',
                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                elevation0: {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                }
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(133, 100, 4, 0.08)',
                    },
                },
            },
        },
    },
});

export default theme;
