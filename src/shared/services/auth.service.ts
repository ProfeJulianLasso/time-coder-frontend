import { TokenResponse } from "@react-oauth/google";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export const handleGoogleLogin = async (
  response: TokenResponse
): Promise<AuthUser> => {
  try {
    // Decodificar token JWT (en una implementación real, esto se haría en el servidor)
    const tokenData = parseJwt(response.access_token);

    if (!tokenData) {
      throw new Error("No se pudo decodificar el token");
    }

    // Extraer información del usuario del token
    const user: AuthUser = {
      id: tokenData.sub,
      name: tokenData.name ?? "",
      email: tokenData.email ?? "",
      picture: tokenData.picture,
    };

    // Guardar token en localStorage (en una app real, considerar opciones más seguras)
    localStorage.setItem("auth_token", response.access_token);
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
