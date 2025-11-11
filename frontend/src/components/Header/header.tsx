import { AppBar, Toolbar, IconButton, Box, Container, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useTranslation } from 'react-i18next';
import useHeader from './use-header';
import Logo from './header-components/Logo';
import NavLinks from './header-components/NavLinks';
import LanguageSelector from './header-components/LanguageSelector';
import DrawerMenu from './header-components/DrawerMenu';
import ThemeToggle from './header-components/ThemeToggle';
import './header.css';

const Header = () => {
    const { t } = useTranslation();
    const {
        state: { show, isMobile, mobileOpen, navItems },
        actions: { handleNavigate, handleLogoClick, handleDrawerToggle, handleLaunchApp }
    } = useHeader();

    return (
        <AppBar
            position="fixed"
            className="header-appbar"
            sx={{
                transform: show ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'transform 0.3s ease'
            }}
        >
            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 2, md: 2 } }}>
                <Toolbar className="header-toolbar" disableGutters>
                    <Logo onLogoClick={handleLogoClick} />
                    {isMobile ? (
                        <Box className="header-right-box">
                            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        <NavLinks navItems={navItems} onNavigate={handleNavigate} />
                    )}
                    {!isMobile && (
                        <Box sx={{
                            marginLeft: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            width: '240px',
                            minWidth: '240px',
                            justifyContent: 'flex-end',
                            flexShrink: 0
                        }}>
                            <ThemeToggle />
                            <LanguageSelector />
                            <Button
                                variant="contained"
                                startIcon={<RocketLaunchIcon />}
                                onClick={handleLaunchApp}
                                className="launch-app-button"
                            >
                                {t('header.launchApp')}
                            </Button>
                        </Box>
                    )}
                    <DrawerMenu
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        navItems={navItems}
                        handleNavigate={handleNavigate}
                        handleLaunchApp={handleLaunchApp}
                    />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
