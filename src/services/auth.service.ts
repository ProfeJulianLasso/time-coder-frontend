import { TokenResponse } from "@react-oauth/google";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
  apiKey?: string; // Nuevo campo para almacenar el apiKey
}

// Obtener la URL base del API desde las variables de entorno
const API_URL = import.meta.env.VITE_API_URL as string;

// Función para verificar el token con el backend
export const verifyTokenWithBackend = async (
  token: string
): Promise<{ isValid: boolean; apiKey?: string }> => {
  try {
    // Usar la URL completa del backend con la ruta /auth/login
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success === false) {
      return { isValid: false };
    }

    // Si success contiene el apiKey
    return {
      isValid: true,
      apiKey: data.success,
    };
  } catch (error) {
    console.error("Error al verificar el token con el backend:", error);
    return { isValid: false };
  }
};

export const handleGoogleLogin = async (
  response: TokenResponse
): Promise<AuthUser> => {
  try {
    // Verificar el token con el backend primero usando el credential (que es el JWT)
    const tokenToVerify = response.access_token;
    const verificationResult = await verifyTokenWithBackend(tokenToVerify);

    if (!verificationResult.isValid) {
      throw new Error("El token no fue validado por el servidor");
    }

    // Continuar con el proceso normal si el token es válido
    const tokenData = parseJwt(tokenToVerify);

    if (!tokenData) {
      throw new Error("No se pudo decodificar el token");
    }

    // Extraer información del usuario del token
    const user: AuthUser = {
      id: tokenData.sub,
      name: tokenData.name ?? "",
      email: tokenData.email ?? "",
      picture: tokenData.picture,
      apiKey: verificationResult.apiKey, // Asignar el apiKey recibido
    };

    // Guardar token y datos del usuario en localStorage
    localStorage.setItem("auth_token", tokenToVerify);
    localStorage.setItem("user_data", JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Error al procesar el login de Google:", error);
    throw new Error("Error al autenticar con Google");
  }
};

export const logout = (): void => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_data");
};

export const getStoredUser = (): AuthUser | null => {
  const userData = localStorage.getItem("user_data");
  return userData ? JSON.parse(userData) : null;
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

export const isAuthenticated = (): boolean => {
  return !!getStoredToken();
};

// Definición del tipo para el payload del token JWT
interface JwtPayload {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
  [key: string]: unknown;
}

// Función auxiliar para decodificar el token JWT
const parseJwt = (token: string): JwtPayload | null => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error: unknown) {
    console.error("Error al decodificar el token JWT:", error);
    return null;
  }
};
