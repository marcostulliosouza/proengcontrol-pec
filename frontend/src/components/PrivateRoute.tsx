// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: JSX.Element;
    redirectTo: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, redirectTo }) => {
    const isAuthenticated = !!sessionStorage.getItem('token'); // Ajuste a lógica conforme necessário

    return isAuthenticated ? element : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
