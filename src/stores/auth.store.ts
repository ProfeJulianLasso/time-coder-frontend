import { TokenResponse } from "@react-oauth/google";
import { create } from "zustand";
import {
  getStoredToken,
  getStoredUser,
  handleGoogleLogin,
  logout,
  verifyTokenWithBackend,
} from "../services/auth.service";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
  apiKey?: string; // Agregamos el campo apiKey
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginWithGoogle: (response: TokenResponse) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  loginWithGoogle: async (response: TokenResponse) => {
    set({ isLoading: true, error: null });
    try {
      const user = await handleGoogleLogin(response);
      set({
        user,
        token: response.access_token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: unknown) {
      set({
        error:
          "Error al iniciar sesión con Google. " + (error as Error).message,
        isLoading: false,
      });
    }
  },

  logout: () => {
    logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  checkAuth: async () => {
    const token = getStoredToken();
    const user = getStoredUser();

    if (token && user) {
      // Verificar el token con el backend
      const verificationResult = await verifyTokenWithBackend(token);

      if (verificationResult.isValid) {
        // Actualizar el apiKey si ha cambiado
        if (
          verificationResult.apiKey &&
          user.apiKey !== verificationResult.apiKey
        ) {
          user.apiKey = verificationResult.apiKey;
          localStorage.setItem("user_data", JSON.stringify(user));
        }

        set({
          user,
          token,
          isAuthenticated: true,
        });
        return true;
      } else {
        // Si el token no es válido, hacer logout
        logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        return false;
      }
    }
    return false;
  },
}));

export default useAuthStore;
