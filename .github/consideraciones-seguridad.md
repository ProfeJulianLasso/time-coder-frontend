# Consideraciones de Seguridad

La seguridad es un aspecto fundamental en el desarrollo de aplicaciones web modernas. Estas consideraciones deben aplicarse consistentemente en todo el proyecto.

## Principios Generales

1. **No hardcodear credenciales**:
   - Nunca incluir contraseñas, tokens, claves API o cualquier credencial directamente en el código
   - Usar siempre variables de entorno o sistemas de gestión de secretos

2. **Variables de entorno**:
   - Usar para toda configuración sensible o específica del entorno
   - Implementar un archivo `.env.example` como plantilla sin valores reales
   - No incluir archivos `.env` con valores reales en el control de versiones

3. **Gestión de datos sensibles**:
   - No almacenar datos sensibles en localStorage o sessionStorage sin cifrar
   - Utilizar httpOnly cookies para tokens de autenticación cuando sea posible
   - Considerar el uso de cifrado del lado del cliente para datos sensibles

## Manejo de Autenticación

1. **Tokens JWT**:
   - Implementar tiempos de expiración razonables
   - Usar refresh tokens según corresponda
   - Validar tokens en cada petición que requiera autenticación

2. **Protección de rutas**:
   - Implementar mecanismos de protección para rutas privadas
   - Verificar autenticación y autorización antes de mostrar contenido sensible

3. **Logout efectivo**:
   - Implementar mecanismo para invalidar tokens
   - Limpiar datos de sesión del almacenamiento local

## Prevención de Vulnerabilidades Comunes

1. **Cross-Site Scripting (XSS)**:
   - No insertar HTML directamente desde fuentes no confiables
   - Usar React correctamente (evitar `dangerouslySetInnerHTML`)
   - Sanear y validar input de usuario

2. **Cross-Site Request Forgery (CSRF)**:
   - Implementar tokens CSRF en formularios cuando corresponda
   - Usar SameSite cookies

3. **Inyección de dependencias**:
   - Mantener dependencias actualizadas
   - Revisar periódicamente con herramientas como npm audit

## Implementación en Código

### Variables de Entorno

```typescript
// utils/config.utils.ts
export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  socketUrl: import.meta.env.VITE_SOCKET_URL,
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
};

// Uso
import { config } from '../utils/config.utils';

const apiClient = createApiClient(config.apiUrl);
```

### Manejo Seguro de Tokens

```typescript
// services/auth.service.ts
import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    
    // Comprobar si ha expirado (con un margen de 10 segundos)
    return decoded.exp * 1000 < Date.now() + 10000;
  } catch {
    return true;
  }
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('auth_token');
  
  if (!token || isTokenExpired(token)) {
    // Manejar token expirado (redirigir a login o refrescar)
    return {};
  }
  
  return {
    Authorization: `Bearer ${token}`,
  };
};
```

### Protección de Rutas

```tsx
// routes/protected.route.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isUserLoggedIn } from '../signals/auth.signal';

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  
  if (!isUserLoggedIn.value) {
    // Redirigir a login pero preservar la URL original para redirigir después
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
```

## Lista de Verificación de Seguridad

Antes de desplegar a producción, verificar:

- [ ] No hay credenciales hardcodeadas
- [ ] Se usan variables de entorno para configuraciones sensibles
- [ ] Las rutas privadas están protegidas adecuadamente
- [ ] Los tokens de autenticación se manejan de forma segura
- [ ] Se implementan límites de tiempo de sesión adecuados
- [ ] Se validan y sanean todos los inputs de usuario
- [ ] Las dependencias están actualizadas y sin vulnerabilidades conocidas
