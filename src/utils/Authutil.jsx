import React from "react";
import AuthService from "../service/auth-service";
import { Navigate, useLocation } from "react-router-dom";


export default function RequireAuth({ children }) {
    const { location } = useLocation();
    const user = AuthService.getCurrentUser();
    if (user?.authorities?.includes('admin')) {
        return children
    }
    else {
        return (<Navigate to="/notfound" state={{ from: location }} replace />)
    }

}