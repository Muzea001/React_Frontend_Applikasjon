import React, { useContext } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const UserOrAdminProtectedRoute = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
       
        if (!user || (user.role !== 'Admin' && user.role !== 'User')) {
            navigate('/Innlogging/LoggInn', { replace: true, state: { from: location } });
        }
    }, [user, navigate, location]);

    return (user && (user.role === 'Admin' || user.role === 'User')) ? <Outlet /> : null;
};

export default UserOrAdminProtectedRoute;
