import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#7c3aed',
            light: '#8b5cf6',
            dark: '#6d28d9',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#0891b2',
            light: '#06b6d4',
            dark: '#0e7490',
            contrastText: '#ffffff'
        },
        background: {
            default: '#faf5ff',
            paper: '#ffffff'
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b'
        },
        divider: '#e2e8f0',
        success: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669'
        },
        error: {
            main: '#ef4444',
            light: '#f87171',
            dark: '#dc2626'
        },
        warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706'
        },
        info: {
            main: '#06b6d4',
            light: '#22d3ee',
            dark: '#0891b2'
        }
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            color: '#1e293b',
            letterSpacing: '-0.025em'
        },
        h2: {
            fontWeight: 600,
            color: '#1e293b',
            letterSpacing: '-0.025em'
        },
        h3: {
            fontWeight: 600,
            color: '#1e293b'
        },
        body1: {
            color: '#334155',
            lineHeight: 1.7
        },
        body2: {
            color: '#64748b',
            lineHeight: 1.6
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: '#1e293b',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    borderBottom: '1px solid #e2e8f0',
                    backdropFilter: 'blur(8px)',
                    '-webkit-backdrop-filter': 'blur(8px)'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #f1f5f9',
                    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        '& fieldset': {
                            borderColor: '#e2e8f0',
                            borderWidth: '1px'
                        },
                        '&:hover fieldset': {
                            borderColor: '#cbd5e1'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2563eb',
                            borderWidth: '2px'
                        }
                    },
                    '& .MuiInputLabel-root': {
                        color: '#64748b'
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
                        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3), 0 2px 4px -1px rgba(37, 99, 235, 0.2)',
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
                containedPrimary: {
                    background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)'
                    }
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                outlined: {
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderColor: '#2563eb',
                    color: '#2563eb',
                    fontWeight: 600,
                    padding: '0.25rem 0.75rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 0.2)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 8px rgba(37, 99, 235, 0.2)',
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
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        border: '2px solid rgba(37, 99, 235, 0.3)',
                        color: '#2563eb',
                        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.15)',
                        '&:hover': {
                            backgroundColor: 'rgba(37, 99, 235, 0.2)',
                            borderColor: '#2563eb',
                            boxShadow: '0 8px 30px rgba(37, 99, 235, 0.25)',
                        }
                    },
                    '&.github-icon': {
                        backgroundColor: 'rgba(124, 58, 237, 0.1)',
                        border: '2px solid rgba(124, 58, 237, 0.3)',
                        color: '#7c3aed',
                        boxShadow: '0 4px 20px rgba(124, 58, 237, 0.15)',
                        '&:hover': {
                            backgroundColor: 'rgba(124, 58, 237, 0.2)',
                            borderColor: '#7c3aed',
                            boxShadow: '0 8px 30px rgba(124, 58, 237, 0.25)',
                        }
                    }
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    border: '1px solid #f1f5f9',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    },
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

export default lightTheme;
