import { useAuthStatus } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";
import LoadingIcon from "./LoadingIcon";

function AuthRouteLayout() {
    const location = useLocation();
    const { isLoading, isError, userRole } = useAuthStatus();

    const from = location.state?.from?.pathname || "/";

    if (isLoading) {
        return <LoadingIcon />;
    }

    if (!isError && userRole) {
        return <Navigate to={from} replace />;
    }

    return <Outlet />;
}

export default AuthRouteLayout;
