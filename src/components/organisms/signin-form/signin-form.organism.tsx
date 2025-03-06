import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../shared/stores";
import GoogleButtonAtom from "../../atoms/google-button/google-button.atom";
import "./signin-form.style.css";

const SignInFormOrganism = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Redireccionar si ya está autenticado usando react-router
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Usuario autenticado, redirigiendo al dashboard...");
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="signin-container">
      <div className="signin-header">
        <h1 className="signin-title">Bienvenido a TimeCoder</h1>
        <p className="signin-description">
          Inicia sesión con tu cuenta corporativa para continuar
        </p>
      </div>

      <div className="mt-6 w-full">
        <GoogleButtonAtom />
      </div>

      <div className="signin-divider">
        <div className="signin-divider-line"></div>
        <span className="signin-divider-text">
          Sistema de registro de horas de desarrollo
        </span>
        <div className="signin-divider-line"></div>
      </div>
    </div>
  );
};

export default SignInFormOrganism;
