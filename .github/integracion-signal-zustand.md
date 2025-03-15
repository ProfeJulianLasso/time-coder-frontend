# Integración de Signals con Zustand

```typescript
// signals/user.signal.ts
import { signal, computed } from '@preact/signals-react';
import type { User } from '../interfaces/user.interface';

// Signals para estado local UI y UX de usuario
export const currentUser = signal<User | null>(null);
export const isUserLoggedIn = computed(() => currentUser.value !== null);
export const userName = computed(() => currentUser.value?.name || 'Guest');

export const updateCurrentUser = (user: User | null): void => {
  currentUser.value = user;
};

// stores/auth.store.interface.ts
import type { User } from '../interfaces/user.interface';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// stores/auth.store.ts
import { create } from 'zustand';
import api from '../services/api.service';
import { updateCurrentUser } from '../signals/user.signal';
import type { AuthState, LoginCredentials } from './auth.store.interface';
import type { User } from '../interfaces/user.interface';

// Zustand para lógica de negocio compleja (autenticación)
const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,
  
  // Lógica de login con API y actualización de signals
  login: async (credentials: LoginCredentials): Promise<void> => {
    try {
      set({ isLoading: true, error: null });

      // Llamada API y procesamiento de respuesta
      const user = await api.post<User, LoginCredentials>('/api/auth/login', credentials);
      
      // Actualizar signal
      updateCurrentUser(user);
      
      set({ isLoading: false });
    } catch (error: unknown) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error de autenticación'
      });
    }
  },
  
  // Logout con actualización de signal
  logout: async (): Promise<void> => {
    try {
      set({ isLoading: true });
      await api.post<null, null>('/api/auth/logout', null);

      // Actualizar signal
      updateCurrentUser(null);
      
      set({ isLoading: false, error: null });
    } catch (error: unknown) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al cerrar sesión'
      });
    }
  },
  
  clearError: (): void => {
    set({ error: null });
  }
}));

export default useAuthStore;

// components/login/login.page.tsx
import React, { FormEvent } from 'react';
import { currentUser } from '../../signals/user.signal';
import useAuthStore from '../../stores/auth.store';
import './login.style.css';

const LoginPage: React.FC = () => {
  const { login, isLoading, error } = useAuthStore();
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    await login({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    });
  };
  
  // Redirigir si el usuario ya está autenticado
  if (currentUser.value) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
```
