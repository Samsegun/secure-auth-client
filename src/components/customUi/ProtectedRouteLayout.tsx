import { useAuthStatus } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";
import LoadingIcon from "./LoadingIcon";
import Navbar from "./Navbar";

function ProtectedRouteLayout() {
    const location = useLocation();

    const { isLoading, isError } = useAuthStatus();

    if (isLoading) {
        return <LoadingIcon />;
    }

    if (isError) {
        // redirect back to previous page after successful login
        return <Navigate to='/signin' replace state={{ from: location }} />;
    }

    return (
        <div>
            <Navbar />

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default ProtectedRouteLayout;
