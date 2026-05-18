import { Navigate, Outlet } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import type { UserRole } from "../features/auth/types/auth.types";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

export const RoleGuard = ({ allowedRoles, fallbackPath = "/" }: RoleGuardProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};
