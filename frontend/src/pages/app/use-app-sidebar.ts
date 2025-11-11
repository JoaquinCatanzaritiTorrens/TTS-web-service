import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user-context/user-context';

export interface UseAppSidebarProps {
    onToggle?: (isOpen: boolean) => void;
}

export const useAppSidebar = ({ onToggle }: UseAppSidebarProps = {}) => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [isOpen, setIsOpen] = useState(true);

    const handleLogoClick = () => {
        navigate('/');
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
    };
};