import { Box, Button, Menu, MenuItem, IconButton, Divider } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';

const UserMenu = ({ user, anchorEl, open, handleMenuOpen, handleMenuClose, handleLogin, handleLogout }) => {
    const { t } = useTranslation();

    return (
        <Box className="header-right-box">
            {user ? (
                <>
                    <IconButton
                        onClick={handleMenuOpen}
                        color="inherit"
                        className="header-user-button"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        slotProps={{ paper: { className: 'header-menu-paper' } }}
                    >
                        <MenuItem disabled>{user.email}</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>{t('header.logout')}</MenuItem>
                    </Menu>
                </>
            ) : (
                <Button startIcon={<AccountCircle />} onClick={handleLogin} color="inherit" className="header-user-button">
                    {t('header.login')}
                </Button>
            )}
        </Box>
    );
};

export default UserMenu;