import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router';
import Loader from './components/loader';
import PrivateRoute from './components/PrivateRoute/private-route';
import Home from './pages/home/home';

const LoadComponent = (ComponentToLoad: React.ComponentType<any>) => (props: any) => (
    <Suspense fallback={<Loader />}>
        <ComponentToLoad {...props} />
    </Suspense>
);

const Login = LoadComponent(lazy(() => import('./pages/login/login')));
const Register = LoadComponent(lazy(() => import('./pages/register/register')))
const TermsOfService = LoadComponent(lazy(() => import('./pages/_legal/terms-of-service')));
const PrivacyPolicy = LoadComponent(lazy(() => import('./pages/_legal/privacy-policy')));
const CookiesPolicy = LoadComponent(lazy(() => import('./pages/_legal/cookies-policy')));
const Contact = LoadComponent(lazy(() => import('./pages/contact-page/contact-page')));
const AppLayout = LoadComponent(lazy(() => import('./pages/app/layout/app-layout')));
const AppPage = LoadComponent(lazy(() => import('./pages/app/app-page')));
const KeysPage = LoadComponent(lazy(() => import('./pages/app/keys/keys-page')));
const ApiDocsPage = LoadComponent(lazy(() => import('./pages/app/api-docs/api-docs-page')));

const routes: RouteObject[] = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/privacy-policy', element: <PrivacyPolicy /> },
    { path: '/terms-of-service', element: <TermsOfService /> },
    { path: '/cookies-policy', element: <CookiesPolicy /> },
    { path: '/contact', element: <Contact /> },
    {
        path: '/app',
        element: <AppLayout />,
        children: [
            { index: true, element: <AppPage /> },
            { path: 'keys', element: <KeysPage /> },
            { path: 'api-docs', element: <ApiDocsPage /> },
        ],
    },
    { path: '/', element: <Home /> },
];

export default routes;