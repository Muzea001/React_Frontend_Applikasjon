import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const UserProtectedRoute = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user || user.role !== 'User') {
            navigate('/Innlogging/LoggInn', { replace: true, state: { from: location } });
        }
    }, [user, navigate, location]);

    return user && user.role === 'User' ? <Outlet /> : null;
};

export default UserProtectedRoute;
