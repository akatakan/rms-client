import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

interface Props{
    allowedRoles: string[];
}


export const ProtectedRoute = ({ allowedRoles }: Props) =>{
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Yükleniyor...</div>;
    }
    
    if(!isAuthenticated || !user){
        return <Navigate to='/login' replace />;
    }

    if(!allowedRoles.includes(user.role)){
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
}