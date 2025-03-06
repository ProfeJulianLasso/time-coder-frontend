import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { SignInTemplate } from "../../../components/templates/signin";
import "./signin.style.css";

// Obtener clientId de las variables de entorno o usar un valor por defecto para desarrollo
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

const SignInPage = () => {
  useEffect(() => {
    document.title = "Iniciar Sesión | TimeCoder";
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="signin-page">
        <SignInTemplate />
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignInPage;
