import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  // Si no está autenticado, redirigir a la página de login
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Si está autenticado, renderizar las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;
