import React from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../loader';
import { useUser } from '../../context/user-context/user-context';

interface PrivateRouteProps {
    element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { user, loading } = useUser();

    if (loading) return <Loader />;
    if (!user) return <Navigate to="/" replace />;

    return element;
};

export default PrivateRoute;