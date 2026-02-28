import React from 'react';
import Header from '../Header/header';
import FooterSkeleton from '../Footer/footer-skeleton';
import LazyOnView from 'src/_helpers/LazyOnView';
import { usePageTitle } from 'src/_helpers/use-page-title';

interface LandingPageLayoutProps {
    titleKey: string;
    children: React.ReactNode;
}

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ titleKey, children }) => {
    usePageTitle(titleKey);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <LazyOnView
                importFn={() => import('../../components/Footer/footer')}
                skeleton={<FooterSkeleton />}
            />
        </div>
    );
};

export default LandingPageLayout;
