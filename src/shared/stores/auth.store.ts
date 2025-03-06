import { TokenResponse } from "@react-oauth/google";
import { create } from "zustand";
import {
  getStoredToken,
  getStoredUser,
  handleGoogleLogin,
  logout,
} from "../services/auth.service";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginWithGoogle: (response: TokenResponse) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
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

  checkAuth: () => {
    const token = getStoredToken();
    const user = getStoredUser();

    if (token && user) {
      set({
        user,
        token,
        isAuthenticated: true,
      });
    }
  },
}));

export default useAuthStore;
