import { createContext, useContext, ReactNode } from 'react';
import { useUserProvider } from './use-user-provider';

interface User {
    id: string;
    email: string;
}

interface UserContextProps {
    user: User | null;
    setUser: (u: User | null) => void;
    loading: boolean;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const ctx = useUserProvider();
    return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUser must be inside UserProvider');
    return ctx;
};
