import { Drawer, List, ListItem, ListItemButton, ListItemText, Box, Typography, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigationIcon from '@mui/icons-material/Navigation';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { isNavItemActive } from '../header-utils';

const DrawerMenu = ({ open, onClose, navItems, handleNavigate, handleLaunchApp }) => {
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
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<RocketLaunchIcon />}
                        onClick={() => handleItemClick(handleLaunchApp)}
                        className="launch-app-button"
                    >
                        {t('header.launchApp')}
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default DrawerMenu;