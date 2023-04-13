import { useAuthContex } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const RouteGuard = ({ children }) => {
    const { isAuthenticated } = useAuthContex();
   
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    return children? children: <Outlet />;
}