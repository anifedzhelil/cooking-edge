import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogalStorage } from "../hooks/useLocalStorage";
import { authServiceFactory } from '../services/authService';


export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLogalStorage('auth', {});
    const [errorMessage, setErrorMessage] = useState('');

    const authService = authServiceFactory(auth.accessToken);

    const navigate = useNavigate();

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);
            setAuth(result);
            setErrorMessage("");
            navigate('/catalog');
        } catch (error) {
            setErrorMessage("Грешен имайл адрес или парола.");
        }
    }

    const onLogout = async () => {
        setErrorMessage("");
        await authService.logout();
        setAuth({});
        localStorage.clear();
    };

    const onRegisterSubmit = async (values) => {
        const { confirmPassword, ...registerData } = values;
        if (confirmPassword !== registerData.password) {
            setErrorMessage("Паролата не съвпада");
            return;
        }
        try {
            const result = await authService.register(registerData);
            setAuth(result);
            setErrorMessage("");
            navigate('/catalog');
        } catch (error) {
            console.log('There is a problem');
            setErrorMessage("Съществува акаунт с посочения имейл");

            return;
        }
    }

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        username: auth.username,
        isAuthenticated: !!auth.accessToken,
        errorMessage,
    };

    return <>
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    </>
}

export const useAuthContex = () => {
    const context = useContext(AuthContext);
    return context;
}