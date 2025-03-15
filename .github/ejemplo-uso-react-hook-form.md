# Ejemplo de uso de React Hook Form

```typescript
// components/login-form/login-form.interface.ts
export interface LoginFormProps {
  onSuccess: (data: LoginFormData) => void;
  onError?: (error: unknown) => void;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// components/login-form/login-form.organism.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { LoginFormProps, LoginFormData } from './login-form.interface';
import './login-form.style.css';

const LoginFormOrganism: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      // Aquí iría la lógica de envío de formulario o autenticación
      // Por ejemplo, una llamada a una API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación de API
      onSuccess(data);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          <FiMail className="form-icon" />
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          className={`form-input ${errors.email ? 'form-input-error' : ''}`}
          {...register('email', {
            required: 'El correo es obligatorio',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Dirección de correo inválida'
            }
          })}
        />
        {errors.email && (
          <p className="form-error">
            <FiAlertCircle className="error-icon" />
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          <FiLock className="form-icon" />
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className={`form-input ${errors.password ? 'form-input-error' : ''}`}
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres'
            }
          })}
        />
        {errors.password && (
          <p className="form-error">
            <FiAlertCircle className="error-icon" />
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="form-checkbox">
        <input
          id="rememberMe"
          type="checkbox"
          {...register('rememberMe')}
        />
        <label htmlFor="rememberMe">Recordarme</label>
      </div>

      <button 
        type="submit" 
        className="form-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  );
};

export default LoginFormOrganism;
```

```css
// login-form.style.css
@import "tailwind";

.login-form {
  @apply flex flex-col gap-4 w-full max-w-md mx-auto p-6 rounded-lg shadow-md bg-white;
}

.form-group {
  @apply flex flex-col gap-2;
}

.form-label {
  @apply flex items-center gap-2 text-gray-700 font-medium;
}

.form-icon {
  @apply text-blue-500;
}

.form-input {
  @apply px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.form-input-error {
  @apply border-red-500 focus:ring-red-500;
}

.form-error {
  @apply flex items-center gap-1 text-sm text-red-500;
}

.error-icon {
  @apply text-red-500;
}

.form-checkbox {
  @apply flex items-center gap-2;
}

.form-button {
  @apply mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
}
```
