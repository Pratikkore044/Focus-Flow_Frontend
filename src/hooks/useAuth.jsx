import { useSelector, useDispatch } from 'react-redux';
import { updateAuth, clearAuth } from '../store//slices/authSlice'; 

const useAuth = () => {
    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth);

    const login = (token, email, fullName) => {
        dispatch(updateAuth({ token, email, fullName }));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        dispatch(clearAuth());
        localStorage.removeItem('token');
    };

    return {
        isAuthenticated: !!authData.authToken,
        authToken: authData.authToken,
        email: authData.email,
        fullName: authData.fullName,
        login,
        logout,
    };
};

export default useAuth;