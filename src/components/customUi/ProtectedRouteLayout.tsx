import { useAuthStatus } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";
import ErrorFallback from "./ErrorFallback";
import LoadingIcon from "./LoadingIcon";
import Navbar from "./Navbar";

function ProtectedRouteLayout() {
    const location = useLocation();

    const { isLoading, isError, error } = useAuthStatus();

    if (isLoading) {
        return <LoadingIcon />;
    }

    if (isError) {
        if ((error as any)?.response?.status >= 500) {
            return (
                <ErrorFallback
                    error={
                        new Error(
                            "The server is currently unavailable. Please try again later."
                        )
                    }
                    resetErrorBoundary={() => window.location.reload()}
                />
            );
        }

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
