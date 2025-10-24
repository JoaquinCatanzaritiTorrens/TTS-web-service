import { useState, useEffect, useCallback } from 'react';

interface User {
    id: string;
    email: string;
}

export const useUserProvider = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchUser = useCallback(async () => {
        try {
            const res = await fetch(`/api/users/profile`, { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user ?? data);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const logout = async () => {
        try {
            const res = await fetch(`/api/users/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            if (res.ok) {
                setUser(null);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return {
        user,
        setUser,
        loading,
        logout,
        refreshUser: fetchUser,
    };
};
