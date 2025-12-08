import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/authService";

interface Props{
    allowedRoles: string[];
}

const user = authService.getUser();

export const ProtectedRoute = ({ allowedRoles }: Props) =>{
    if(!authService.isAuthenticated()){
        return <Navigate to='/login' replace />;
    }

    if(!allowedRoles.includes(user.role)){
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
}