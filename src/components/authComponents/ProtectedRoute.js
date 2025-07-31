import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoute() {
    const { isAuthenticated, initialized } = useSelector((state) => state.auth);
    
    if (!initialized) {
        return null; 
    }
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default ProtectedRoute;