import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Box, Typography, Avatar, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigationIcon from '@mui/icons-material/Navigation';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { isNavItemActive } from '../header-utils';

const DrawerMenu = ({ open, onClose, navItems, user, handleNavigate, handleLogin, handleLogout }) => {
    const { t } = useTranslation();
    const { pathname } = useLocation();

    const handleItemClick = (action) => {
        action();
        onClose();
    };

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: 280,
                    bgcolor: 'background.paper',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                }
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <NavigationIcon color="primary" fontSize="small" />
                        <Typography variant="subtitle2" color="primary" fontWeight={600}>
                            {t('drawer.navigation')}
                        </Typography>
                    </Box>
                    <List disablePadding>
                        {navItems.map((id) => (
                            <ListItem key={id} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemButton
                                    onClick={() => handleItemClick(() => handleNavigate(id))}
                                    sx={{
                                        borderRadius: 1,
                                        backgroundColor: isNavItemActive(id, pathname) ? 'primary.main' : 'transparent',
                                        color: isNavItemActive(id, pathname) ? 'primary.contrastText' : 'text.primary',
                                        '&:hover': {
                                            backgroundColor: isNavItemActive(id, pathname)
                                                ? 'primary.dark'
                                                : 'action.hover',
                                        },
                                        transition: 'all 0.2s ease-in-out'
                                    }}
                                >
                                    <ListItemText
                                        primary={t(`nav.${id}`)}
                                        sx={{
                                            '& .MuiListItemText-primary': {
                                                fontWeight: isNavItemActive(id, pathname) ? 600 : 500,
                                                fontSize: '0.95rem'
                                            }
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <SettingsIcon color="primary" fontSize="small" />
                        <Typography variant="subtitle2" color="primary" fontWeight={600}>
                            {t('drawer.preferences')}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        gap: 3,
                        py: 0.5,
                        px: 1
                    }}>
                        <LanguageSelector />
                        <ThemeToggle />
                    </Box>
                </Box>
                <Box sx={{ p: 2, mt: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <PersonIcon color="primary" fontSize="small" />
                        <Typography variant="subtitle2" color="primary" fontWeight={600}>
                            {t('drawer.account')}
                        </Typography>
                    </Box>

                    {user ? (
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 1.5,
                                bgcolor: 'action.hover',
                                borderRadius: 1,
                                mb: 1
                            }}>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                    {user.email?.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography variant="body2" fontWeight={600} noWrap>
                                        {user.name || 'Usuario'}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" noWrap>
                                        {user.email}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                                {t('drawer.notLoggedIn')}
                            </Typography>
                        </Box>
                    )}

                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => handleItemClick(user ? handleLogout : handleLogin)}
                            sx={{
                                borderRadius: 1,
                                bgcolor: user ? 'error.main' : 'primary.main',
                                color: user ? 'error.contrastText' : 'primary.contrastText',
                                '&:hover': {
                                    bgcolor: user ? 'error.dark' : 'primary.dark',
                                },
                                transition: 'all 0.2s ease-in-out',
                                justifyContent: 'center'
                            }}
                        >
                            <ListItemText
                                primary={user ? t('header.logout') : t('header.login')}
                                sx={{
                                    textAlign: 'center',
                                    '& .MuiListItemText-primary': {
                                        fontWeight: 600,
                                        fontSize: '0.95rem'
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Box>
            </Box>
        </Drawer>
    );
};

export default DrawerMenu;