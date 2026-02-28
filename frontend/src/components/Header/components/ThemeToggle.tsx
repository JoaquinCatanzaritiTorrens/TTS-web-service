import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useCustomTheme } from '../../../context/theme-context/theme-context';
import { useTranslation } from 'react-i18next';

const ThemeToggle: React.FC = () => {
    const { isDarkMode, toggleTheme } = useCustomTheme();
    const { t } = useTranslation();

    return (
        <Tooltip title={isDarkMode ? t('theme.switchToLight') : t('theme.switchToDark')}>
            <IconButton
                color="inherit"
                onClick={toggleTheme}
                sx={{
                    width: '40px',
                    height: '40px',
                    padding: '8px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                        backgroundColor: 'rgba(128, 128, 128, 0.1)'
                    },
                    '& .MuiSvgIcon-root': {
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            filter: 'drop-shadow(0 0 6px currentColor)'
                        }
                    }
                }}
            >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggle;
