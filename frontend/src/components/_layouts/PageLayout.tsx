import { Box, Container } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { usePageTitle } from 'src/_helpers/use-page-title';
import { AppLayoutContext } from '../../pages/app/layout/app-layout';

interface PageLayoutProps {
    titleKey: string;
    children: React.ReactNode;
}

const PageLayout = ({ titleKey, children }: PageLayoutProps) => {
    const { sidebarOpen } = useOutletContext<AppLayoutContext>();
    usePageTitle(titleKey);
    return (
        <Box sx={{
            ml: { xs: 0, md: sidebarOpen ? '280px' : '0px' },
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            pt: 6,
            pb: 4,
            transition: 'margin-left 0.3s ease',
        }}>
            <Container maxWidth="lg" sx={{ width: '100%' }}>
                {children}
            </Container>
        </Box>
    );
};

export default PageLayout;
