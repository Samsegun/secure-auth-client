import { useAuthStatus } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

type AllowedRoles = "USER" | "MODERATOR" | "ADMIN" | "SUPER_ADMIN";

interface RoleGuardProps {
    allowedRoles: AllowedRoles[];
}

function RoleGuard({ allowedRoles }: RoleGuardProps) {
    const { isLoading, user } = useAuthStatus();

    if (isLoading) return null;

    const hasRequiredRole = allowedRoles.includes(user?.role as AllowedRoles);

    if (!hasRequiredRole) return <Navigate to='/unauthorized' replace />;

    return <Outlet />;
}

export default RoleGuard;
