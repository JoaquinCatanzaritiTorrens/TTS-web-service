import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import AppSidebar from '../side-bar/app-sidebar';
import '../app-page.css';

export interface AppLayoutContext {
    sidebarOpen: boolean;
}

const AppLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <Box className="app-page" sx={{ minHeight: '100vh', overflow: 'hidden' }}>
            <AppSidebar onToggle={setSidebarOpen} />
            <Outlet context={{ sidebarOpen } satisfies AppLayoutContext} />
        </Box>
    );
};

export default AppLayout;
