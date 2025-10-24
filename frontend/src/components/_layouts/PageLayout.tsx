import React from 'react';
import Header from '../Header/header';
import FooterSkeleton from '../Footer/footer-skeleton';
import LazyOnView from 'src/_helpers/LazyOnView';

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
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

export default PageLayout;
