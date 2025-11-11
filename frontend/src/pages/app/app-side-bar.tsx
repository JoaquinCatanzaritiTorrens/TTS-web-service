import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Tooltip } from '@mui/material';
import { Logout, ChevronLeft, ChevronRight } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../../components/Header/header-components/ThemeToggle';
import LanguageSelector from '../../components/Header/header-components/LanguageSelector';
import Logo from '../../components/Header/header-components/Logo';
import { useAppSidebar, UseAppSidebarProps } from './use-app-sidebar';

const AppSidebar = ({ onToggle }: UseAppSidebarProps) => {
    const { t } = useTranslation();
    const { isOpen, handleLogoClick, handleLogout, toggleSidebar } = useAppSidebar({ onToggle });

    return (
        <>
            <Box
                sx={{
                    width: isOpen ? 280 : 0,
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bgcolor: 'background.paper',
                    borderRight: isOpen ? '1px solid' : 'none',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'width 0.3s ease',
                    overflow: 'hidden',
                    zIndex: 1200,
                }}
            >
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                        <Logo onLogoClick={handleLogoClick} />
                    </Box>
                </Box>

                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <SettingsIcon color="primary" fontSize="small" />
                        <Box
                            component="span"
                            sx={{
                                color: 'primary.main',
                                fontWeight: 600,
                                fontSize: '0.875rem'
                            }}
                        >
                            {t('drawer.preferences')}
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        gap: 3,
                        py: 0.5,
                        px: 1
                    }}>
                        <ThemeToggle />
                        <LanguageSelector />
                    </Box>
                </Box>

                <Box sx={{ flex: 1 }} />

                <Box sx={{ p: 2 }}>
                    <List disablePadding>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={handleLogout}
                                sx={{
                                    borderRadius: 1,
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={t('app.sidebar.logout')}
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            fontWeight: 500,
                                            fontSize: '0.95rem'
                                        }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Box>

            <Tooltip title={isOpen ? t('app.sidebar.hide') : t('app.sidebar.show')} placement="right">
                <IconButton
                    onClick={toggleSidebar}
                    sx={{
                        position: 'fixed',
                        left: isOpen ? 270 : 10,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        zIndex: 1201,
                        transition: 'left 0.3s ease',
                        '&:hover': {
                            bgcolor: 'action.hover',
                        },
                        width: 32,
                        height: 32,
                    }}
                >
                    {isOpen ? <ChevronLeft fontSize="small" /> : <ChevronRight fontSize="small" />}
                </IconButton>
            </Tooltip>
        </>
    );
};

export default AppSidebar;
