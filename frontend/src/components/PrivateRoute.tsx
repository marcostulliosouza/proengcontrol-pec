import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ReactElement;
    redirectTo: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, redirectTo }) => {
    const token = sessionStorage.getItem('token'); // Use sessionStorage ou localStorage conforme necessário

    // Se o token não estiver presente, redirecione para a página de login
    return token ? element : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
