// PublicRoute.js
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
    const { isAuthenticated, initialized } = useSelector((state) => state.auth);
    
    if (!initialized) {
        return null; // or a loading spinner
    }
    
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default PublicRoute;