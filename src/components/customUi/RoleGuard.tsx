import { useAuthStatus } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";
import LoadingIcon from "./LoadingIcon";

type AllowedRoles = "USER" | "MODERATOR" | "ADMIN" | "SUPER_ADMIN";

interface RoleGuardProps {
    allowedRoles: AllowedRoles[];
}

function RoleGuard({ allowedRoles }: RoleGuardProps) {
    const { isLoading, userRole } = useAuthStatus();

    if (isLoading) return <LoadingIcon />;

    const hasRequiredRole = allowedRoles.includes(userRole as AllowedRoles);

    if (!hasRequiredRole) return <Navigate to='/unauthorized' replace />;

    return <Outlet />;
}

export default RoleGuard;
