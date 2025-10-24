import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { isNavItemActive } from '../header-utils';

const NavLinks = ({ navItems, onNavigate }) => {
    const { t } = useTranslation();
    const { pathname } = useLocation();

    return (
        <Box className="header-nav">
            {navItems.map((id: string, idx: number) => (
                <Button
                    key={idx}
                    color="inherit"
                    onClick={() => onNavigate(id)}
                    className={`header-nav-button ${isNavItemActive(id, pathname) ? 'active' : ''}`}
                >
                    {t(`nav.${id}`)}
                </Button>
            ))}
        </Box>
    );
};

export default NavLinks;
