import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/user-context/user-context';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getRouteFromNavItem } from './header-utils';

const useHeader = () => {
    const { user, refreshUser } = useUser();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [show, setShow] = useState(true);
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;
            setShow(!(currentY > lastY && currentY > 100));
            setLastY(currentY);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [lastY]);

    const isMobile = useMediaQuery('(max-width:1000px)');
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const navItems = ["home", "contact"];

    const handleLaunchApp = () => {
        if (user) {
            navigate('/app');
        } else {
            navigate('/login');
        }
    };

    const handleNavigate = (navItem: string) => {
        const targetRoute = getRouteFromNavItem(navItem);
        if (pathname !== targetRoute) {
            navigate(targetRoute, { replace: false });
        }
    };

    const handleLogoClick = () => {
        if (pathname !== '/') {
            navigate('/', { replace: false });
        }
    };

    return {
        state: {
            show,
            isMobile,
            mobileOpen,
            navItems,
        },
        actions: {
            handleNavigate,
            handleLogoClick,
            handleDrawerToggle,
            handleLaunchApp,
        }
    };
};

export default useHeader;
