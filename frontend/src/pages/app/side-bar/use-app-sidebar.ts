import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../../context/user-context/user-context';

export interface UseAppSidebarProps {
    onToggle?: (isOpen: boolean) => void;
}

export const useAppSidebar = ({ onToggle }: UseAppSidebarProps = {}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useUser();
    const [isOpen, setIsOpen] = useState(true);

    const currentPath = location.pathname;

    const handleLogoClick = () => {
        navigate('/');
    };

    const navigateTo = (path: string) => {
        navigate(path);
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/users/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            setUser(null);
            navigate('/');
        }
    };

    const toggleSidebar = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (onToggle) {
            onToggle(newState);
        }
    };

    return {
        isOpen,
        handleLogoClick,
        handleLogout,
        toggleSidebar,
        navigateTo,
        currentPath,
    };
};