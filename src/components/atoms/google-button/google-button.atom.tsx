import { GoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "../../../shared/stores";
import "./google-button.style.css";

const GoogleButtonAtom = () => {
  const { loginWithGoogle } = useAuthStore();

  return (
    <div className="google-button-container">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          // Adaptar la respuesta de credencial al formato esperado por loginWithGoogle
          const tokenResponse = {
            ...credentialResponse,
            access_token: credentialResponse.credential ?? "",
            expires_in: 0,
            prompt: "",
            token_type: "",
            scope: "",
          };
          loginWithGoogle(tokenResponse);
        }}
        onError={() => console.error("Error al iniciar sesión con Google")}
        useOneTap
        theme="filled_blue"
        text="signin_with"
        shape="rectangular"
        locale="es"
        width="300px"
      />
    </div>
  );
};

export default GoogleButtonAtom;
