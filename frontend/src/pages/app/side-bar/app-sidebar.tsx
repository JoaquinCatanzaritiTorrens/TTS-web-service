import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { Logout, ChevronLeft, ChevronRight } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../../../components/Header/header-components/ThemeToggle';
import LanguageSelector from '../../../components/Header/header-components/LanguageSelector';
import Logo from '../../../components/Header/header-components/Logo';
import { useAppSidebar, UseAppSidebarProps } from './use-app-sidebar';

const AppSidebar = ({ onToggle }: UseAppSidebarProps) => {
    const { t } = useTranslation();
    const { isOpen, handleLogoClick, handleLogout, toggleSidebar, navigateTo, currentPath } = useAppSidebar({ onToggle });
    const isMobile = useMediaQuery('(max-width:1000px)');

    return (
        <>
            {isMobile && isOpen && (
                <Box
                    onClick={toggleSidebar}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 1199,
                    }}
                />
            )}
            <Box
                sx={{
                    width: isOpen ? 280 : 0,
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    overflow: 'hidden',
                    transition: 'width 0.3s ease',
                    zIndex: 1200,
                }}
            >
                <Box
                    sx={{
                        width: 280,
                        height: '100vh',
                        bgcolor: 'background.paper',
                        borderRight: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        opacity: isOpen ? 1 : 0,
                        transition: 'opacity 0.15s ease',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                            <Logo onLogoClick={handleLogoClick} />
                        </Box>
                    </Box>

                    <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Box component="span" sx={{ color: 'primary.main', fontWeight: 600, fontSize: '0.875rem' }}>
                                {t('drawer.navigation')}
                            </Box>
                        </Box>
                        <List disablePadding>
                            {[
                                { label: t('app.sidebar.tts'), icon: <GraphicEqIcon fontSize="small" />, path: '/app' },
                                { label: t('app.sidebar.apiKeys'), icon: <VpnKeyIcon fontSize="small" />, path: '/app/keys' },
                            ].map(({ label, icon, path }) => (
                                <ListItem key={path} disablePadding>
                                    <ListItemButton
                                        selected={currentPath === path}
                                        onClick={() => navigateTo(path)}
                                        sx={{
                                            borderRadius: 1,
                                            mb: 0.5,
                                            '&.Mui-selected': {
                                                backgroundColor: 'primary.main',
                                                color: 'primary.contrastText',
                                                '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                                                '&:hover': { backgroundColor: 'primary.dark' },
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
                                        <ListItemText
                                            primary={label}
                                            sx={{ '& .MuiListItemText-primary': { fontSize: '0.9rem' } }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Box sx={{ flex: 1 }} />

                    <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                            <SettingsIcon color="primary" fontSize="small" />
                            <Box component="span" sx={{ color: 'primary.main', fontWeight: 600, fontSize: '0.875rem' }}>
                                {t('drawer.preferences')}
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, py: 0.5, px: 1, mb: 1 }}>
                            <ThemeToggle />
                            <LanguageSelector />
                        </Box>

                        <List disablePadding sx={{ mt: 1 }}>
                            <ListItem disablePadding sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                                <ListItemButton
                                    onClick={handleLogout}
                                    sx={{
                                        borderRadius: 1,
                                        '&:hover': { backgroundColor: 'action.hover' },
                                        transition: 'all 0.2s ease-in-out',
                                    }}
                                >
                                    <ListItemIcon><Logout /></ListItemIcon>
                                    <ListItemText
                                        primary={t('app.sidebar.logout')}
                                        sx={{ '& .MuiListItemText-primary': { fontWeight: 500, fontSize: '0.95rem' } }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Box>

            <Tooltip title={isOpen ? t('app.sidebar.hide') : t('app.sidebar.show')} placement="right">
                <IconButton
                    onClick={toggleSidebar}
                    sx={{
                        position: 'fixed',
                        left: isOpen ? 270 : 10,
                        top: '50vh',
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
