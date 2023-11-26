import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const logout = async (setUser) => {
    try {
        await axios.post('http://localhost:11569/api/Bruker/logout');
        localStorage.removeItem('userToken');
        setUser({ isAuthenticated: false });
        // Redirect to login or home page
        
    } catch (error) {
        console.error('Logout failed:', error);
        // Optionally handle error (e.g., show a message to the user)
    }
};
