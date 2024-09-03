// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    redirectTo: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectTo }) => {
    const isAuthenticated = sessionStorage.getItem("token") !== null;

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;