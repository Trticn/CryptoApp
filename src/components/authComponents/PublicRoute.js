// PublicRoute.js
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
    const { isAuthenticated, initialized } = useSelector((state) => state.auth);
    
    if (!initialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Učitavanje...</p>
                </div>
            </div>
        );
    }
    
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default PublicRoute;