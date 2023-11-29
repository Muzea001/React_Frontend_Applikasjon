import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user || user.role !== 'Admin') {
            navigate('/Innlogging/LoggInn', { replace: true, state: { from: location } });
        }
    }, [user, navigate, location]);

    return user && user.role === 'Admin' ? <Outlet /> : null;
};

export default ProtectedRoute;
