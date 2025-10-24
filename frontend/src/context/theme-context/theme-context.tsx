import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import lightTheme from '../../theme/light-theme';
import darkTheme from '../../theme/dark-theme';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useCustomTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useCustomTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('theme');
        const isDark = savedTheme ? savedTheme === 'dark' : true;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        return isDark;
    });

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <div style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minHeight: '100vh',
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary
                }}>
                    {children}
                </div>
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
