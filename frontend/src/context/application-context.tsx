import { createContext, useContext } from 'react';
import { UserProvider } from './user-context/user-context';
import { ThemeProvider } from './theme-context/theme-context';

const ApplicationContext = createContext({});

export const ApplicationProvider = ({ children }) => {
    return (
        <ThemeProvider>
            <UserProvider>{children}</UserProvider>
        </ThemeProvider>
    );
};

export const useApplicationProvider = () => useContext(ApplicationContext);