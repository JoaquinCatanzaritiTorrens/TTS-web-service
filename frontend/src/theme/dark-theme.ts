import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#a78bfa', // Purple for voice/audio theme
            light: '#c4b5fd',
            dark: '#8b5cf6',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#06b6d4', // Cyan accent
            light: '#22d3ee',
            dark: '#0891b2',
            contrastText: '#ffffff'
        },
        background: {
            default: '#0a0118', // Deep purple-black
            paper: '#1a0f2e' // Dark purple
        },
        text: {
            primary: '#f8fafc',
            secondary: '#e2e8f0'
        },
        divider: '#334155',
        success: {
            main: '#22c55e',
            light: '#4ade80',
            dark: '#16a34a'
        },
        error: {
            main: '#f87171',
            light: '#fca5a5',
            dark: '#ef4444'
        },
        warning: {
            main: '#fbbf24',
            light: '#fde047',
            dark: '#f59e0b'
        },
        info: {
            main: '#38bdf8',
            light: '#7dd3fc',
            dark: '#0ea5e9'
        }
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            color: '#f8fafc',
            letterSpacing: '-0.025em'
        },
        h2: {
            fontWeight: 600,
            color: '#f8fafc',
            letterSpacing: '-0.025em'
        },
        h3: {
            fontWeight: 600,
            color: '#f8fafc'
        },
        body1: {
            color: '#f1f5f9',
            lineHeight: 1.7
        },
        body2: {
            color: '#e2e8f0',
            lineHeight: 1.6
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(26, 15, 46, 0.95)',
                    color: '#f1f5f9',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
                    borderBottom: '1px solid rgba(167, 139, 250, 0.2)',
                    backdropFilter: 'blur(8px)',
                    '-webkit-backdrop-filter': 'blur(8px)'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(167, 139, 250, 0.2)',
                    backgroundImage: 'linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 100%)'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#334155',
                        borderRadius: '8px',
                        '& fieldset': {
                            borderColor: '#475569',
                            borderWidth: '1px'
                        },
                        '&:hover fieldset': {
                            borderColor: '#64748b'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#60a5fa',
                            borderWidth: '2px'
                        }
                    },
                    '& .MuiInputLabel-root': {
                        color: '#cbd5e1'
                    },
                    '& .MuiFormHelperText-root': {
                        color: '#94a3b8'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    padding: '10px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(96, 165, 250, 0.3), 0 2px 4px -1px rgba(96, 165, 250, 0.2)',
                        transform: 'translateY(-1px)'
                    },
                    '&.launch-app-button': {
                        fontWeight: 600,
                        px: 2,
                        height: '40px',
                        minWidth: '140px',
                        textTransform: 'none',
                        background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        }
                    }
                },
                contained: {
                    background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                    color: '#ffffff',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                    }
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                outlined: {
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    borderColor: '#60a5fa',
                    color: '#60a5fa',
                    fontWeight: 600,
                    padding: '0.25rem 0.75rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(96, 165, 250, 0.2)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 8px rgba(96, 165, 250, 0.2)',
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&.social-icon': {
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                    },
                    '&.linkedin-icon': {
                        backgroundColor: 'rgba(96, 165, 250, 0.1)',
                        border: '2px solid rgba(96, 165, 250, 0.3)',
                        color: '#60a5fa',
                        boxShadow: '0 4px 20px rgba(96, 165, 250, 0.2)',
                        '&:hover': {
                            backgroundColor: 'rgba(96, 165, 250, 0.2)',
                            borderColor: '#60a5fa',
                            boxShadow: '0 8px 30px rgba(96, 165, 250, 0.3)',
                        }
                    },
                    '&.github-icon': {
                        backgroundColor: 'rgba(167, 139, 250, 0.1)',
                        border: '2px solid rgba(167, 139, 250, 0.3)',
                        color: '#a78bfa',
                        boxShadow: '0 4px 20px rgba(167, 139, 250, 0.2)',
                        '&:hover': {
                            backgroundColor: 'rgba(167, 139, 250, 0.2)',
                            borderColor: '#a78bfa',
                            boxShadow: '0 8px 30px rgba(167, 139, 250, 0.3)',
                        }
                    }
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
                    border: '1px solid #334155',
                    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
                    },
                    '&.app-page-card': {
                        transition: 'none',
                        '&:hover': {
                            transform: 'none',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
                        }
                    }
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                }
            }
        }
    }
});

export default darkTheme;