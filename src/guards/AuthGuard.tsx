import { Navigate, Outlet } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

export const AuthGuard = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
