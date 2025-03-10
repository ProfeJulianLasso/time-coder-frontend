import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useAuthStore } from "../../../stores";
import "./google-button.style.css";

const GoogleButtonAtom = () => {
  const { loginWithGoogle } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="google-button-container">
      {isLoading && (
        <div className="google-button-loading">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 mr-2"></div>
          <span>Verificando...</span>
        </div>
      )}

      {!isLoading && (
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            setIsLoading(true);
            try {
              // Adaptar la respuesta de credencial al formato esperado por loginWithGoogle
              const tokenResponse = {
                ...credentialResponse,
                access_token: credentialResponse.credential ?? "",
                credential: credentialResponse.credential, // Aseguramos que se envíe credential también
                expires_in: 0,
                prompt: "",
                token_type: "",
                scope: "",
              };
              await loginWithGoogle(tokenResponse);
            } catch (error) {
              console.error("Error al iniciar sesión con Google", error);
            } finally {
              setIsLoading(false);
            }
          }}
          onError={() => {
            console.error("Error al iniciar sesión con Google");
            setIsLoading(false);
          }}
          useOneTap
          theme="filled_blue"
          text="signin_with"
          shape="rectangular"
          locale="es"
          width="300px"
        />
      )}
    </div>
  );
};

export default GoogleButtonAtom;
