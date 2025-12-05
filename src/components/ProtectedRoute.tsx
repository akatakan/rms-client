import { Navigate, Outlet } from "react-router-dom";

interface Props{
    allowedRoles: string[];
}

const user = {name:"dummy", role:"ADMIN"}

export const ProtectedRoute = ({ allowedRoles }: Props) =>{
    if(!user){
        return <Navigate to='/login' replace />;
    }

    if(!allowedRoles.includes(user.role)){
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
}