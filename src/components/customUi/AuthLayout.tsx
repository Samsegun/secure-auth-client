import { useAuthStatus } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";
import LoadingIcon from "./LoadingIcon";

function AuthRouteLayout() {
    const location = useLocation();
    const { isLoading, isError } = useAuthStatus();

    if (isLoading) {
        return <LoadingIcon />;
    }

    if (!isError) {
        return <Navigate to={"/"} replace state={{ from: location }} />;
    }

    return <Outlet />;
}

export default AuthRouteLayout;
