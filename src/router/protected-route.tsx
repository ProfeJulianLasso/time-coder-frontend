import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores";

const ProtectedRoute = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      setIsChecking(true);
      const isValid = await checkAuth();
      setIsValid(isValid);

      if (!isValid) {
        navigate("/signin", { replace: true });
      }

      setIsChecking(false);
    };

    verifyAuth();
  }, [checkAuth, navigate]);

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si no está autenticado o no es válido, redirigir a la página de login
  if (!isAuthenticated || !isValid) {
    return <Navigate to="/signin" replace />;
  }

  // Si está autenticado y es válido, renderizar las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;
