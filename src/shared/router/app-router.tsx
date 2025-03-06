import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../../modules/dashboard";
import { HomePage } from "../../modules/home";
import { SignInPage } from "../../modules/security/signin";
import { useAuthStore } from "../stores/auth.store";
import { ProtectedRoute } from "./protected-route";

export const AppRouter = () => {
  const { checkAuth } = useAuthStore();

  // Verificar si hay un usuario autenticado al cargar
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      {/* Ruta raíz que redirige a /signin */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* Ruta pública de inicio de sesión */}
      <Route path="/signin" element={<SignInPage />} />

      {/* Rutas protegidas que requieren autenticación */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Aquí se pueden agregar más rutas protegidas */}
      </Route>

      {/* Ruta de fallback para URLs no definidas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
