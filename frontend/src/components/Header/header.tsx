import { AppBar, Toolbar, IconButton, Box, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useHeader from './use-header';
import Logo from './header-components/Logo';
import NavLinks from './header-components/NavLinks';
import LanguageSelector from './header-components/LanguageSelector';
import UserMenu from './header-components/UserMenu';
import DrawerMenu from './header-components/DrawerMenu';
import ThemeToggle from './header-components/ThemeToggle';
import './header.css';

const Header = () => {
    const {
        state: { user, anchorEl, open, show, isMobile, mobileOpen, navItems },
        actions: { handleMenuOpen, handleMenuClose, handleLogout, handleLogin, handleNavigate, handleLogoClick, handleDrawerToggle }
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
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
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
                        <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ThemeToggle />
                            <LanguageSelector />
                            <UserMenu
                                user={user}
                                anchorEl={anchorEl}
                                open={open}
                                handleMenuOpen={handleMenuOpen}
                                handleMenuClose={handleMenuClose}
                                handleLogin={handleLogin}
                                handleLogout={handleLogout}
                            />
                        </Box>
                    )}
                    <DrawerMenu
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        navItems={navItems}
                        user={user}
                        handleNavigate={handleNavigate}
                        handleLogin={handleLogin}
                        handleLogout={handleLogout}
                    />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
