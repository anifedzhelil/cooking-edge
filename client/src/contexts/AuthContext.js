import { createContext, useContext} from "react";
import { useNavigate } from "react-router-dom";

import { useLogalStorage } from "../hooks/useLocalStorage";
import  {authServiceFactory } from  '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLogalStorage('auth', {});
    const authService = authServiceFactory(auth.accessToken);
    
    const navigate = useNavigate();
    
    const onLoginSubmit = async (data) => {
        const result = await authService.login(data);
        try {
            setAuth(result);
            navigate('/catalog');
        } catch (error) {
            console.log('There is a problem');
        }
    }
                  
    const onLogout = async () => {
        await authService.logout();
        setAuth({});
        localStorage.clear(); 
    };

    const onRegisterSubmit = async (values) => {
        const { confirmPassword, ...registerData } = values;
        if (confirmPassword !== registerData.password) {
            return;
        }
        try {
            const result = await authService.register(registerData);
            setAuth(result);
            navigate('/catalog');
        } catch (error) {
            console.log('There is a problem');
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
    };
    
    return <>
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    </>
}

export const useAuthContex= () =>{
    const context  = useContext(AuthContext);
    return context;
}