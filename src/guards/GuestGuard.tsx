import { Navigate, Outlet } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import { getRedirectPathByRole } from "../features/auth/utils/auth-redirect";

export const GuestGuard = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;

  if (isAuthenticated && user) {
    return <Navigate to={getRedirectPathByRole(user.role)} replace />;
  }

  return <Outlet />;
};
