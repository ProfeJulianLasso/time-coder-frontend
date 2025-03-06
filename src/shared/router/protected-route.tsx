import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  // Si no está autenticado, redirigir a la página de login
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Si está autenticado, renderizar las rutas hijas
  return <Outlet />;
};
