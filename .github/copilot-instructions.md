# Lineamientos de Desarrollo - React con TypeScript

## Principios Generales

### Librerías Obligatorias

1. **React v19**:
   - Usar siempre componentes funcionales
   - Aprovechar las nuevas características de React 19

2. **@preact/signals-react**:
   - Prioridad para la gestión de estado reactivo

3. **react-router-dom v7**:
   - Obligatorio para toda implementación de rutas y navegación
   - Usar siempre para gestionar la navegación entre páginas
   - Implementar usando hooks como `useNavigate`, `useParams` y `useLocation`

4. **react-icons**:
   - Obligatorio para todos los iconos de la aplicación
   - No usar otras librerías de iconos ni SVGs personalizados
   - Importar solo los iconos específicos que se necesitan

5. **React Hook Form**:
   - Obligatorio para todo manejo de formularios
   - No implementar formularios con useState o formularios no controlados

6. **TanStack Query v5**:
   - Obligatorio para fetching de datos
   - Usar junto con fetch API (no axios)
   - Implementar para manejo de caché, revalidación y estados de carga

7. **Socket.IO**:
   - Usar para toda comunicación en tiempo real vía WebSockets
   - Implementar cuando sea necesario para funcionalidades en tiempo real

### Gestión de Estado

1. **Signals (@preact/signals)**:
   - Usar Signals como mecanismo principal para la gestión de estado reactivo
   - Priorizar Signals sobre useState para estados locales y compartidos
   - Beneficios: mejor rendimiento, menos re-renderizados, API más simple
   - Usar Signals para estado compartido entre componentes cercanos

2. **Zustand**:
   - Usar para estado global de la aplicación y lógica de negocio compleja
   - Combinar con Signals para optimizar rendimiento

3. **useState**:
   - Usar solo para estados muy simples y temporales
   - Preferir Signals en la mayoría de casos

### Principios de Diseño Fundamentales

1. **KISS (Keep It Simple, Stupid)**:
   - Mantener soluciones simples y directas
   - Evitar complejidad innecesaria
   - Preferir aproximaciones intuitivas
   - Código legible por humanos, no solo por máquinas

2. **DRY (Don't Repeat Yourself)**:
   - Evitar duplicación de código y lógica
   - Abstraer funcionalidades comunes en hooks o utilidades
   - Reutilizar componentes siempre que sea posible
   - Mantener definiciones únicas para cada concepto

3. **YAGNI (You Ain't Gonna Need It)**:
   - No implementar funcionalidades hasta que sean realmente necesarias
   - Evitar código especulativo "por si acaso"
   - Enfocarse en los requisitos actuales, no en posibles necesidades futuras
   - Eliminar código no utilizado

4. **SOLID en Programación Funcional**:
   - S (Responsabilidad Única): Cada función tiene un solo propósito
   - O (Abierto/Cerrado): Extender mediante composición, no modificación
   - L (Sustitución de Liskov): Funciones con interfaces consistentes
   - I (Segregación de Interfaces): Interfaces pequeñas y específicas
   - D (Inversión de Dependencias): Inyectar dependencias como parámetros

### Estilos CSS y Tailwind

1. **Importación obligatoria**: Todo archivo CSS debe comenzar con `@import "tailwind";`
2. **Separación de responsabilidades**:
   - En archivos TSX: Solo usar nombres de clases CSS
   - En archivos CSS: Contener todas las definiciones de estilos basadas en Tailwind
3. **Uso de Tailwind**: Todo el CSS debe estar en relación a Tailwind
4. **Consistencia**: Mantener coherencia en la nomenclatura de clases

### Tipado TypeScript

1. **Usar interfaces en lugar de tipos**: Siempre definir interfaces para modelar estructuras de datos.
2. **Evitar `any`**: Usar `unknown` cuando no se conozca el tipo exacto.
3. **Priorizar tipos específicos**: Siempre definir tipos concretos antes de recurrir a `unknown`.
4. **Tipos explícitos**: Declarar el tipo de retorno en todas las funciones.

### Programación Funcional y SOLID

1. **Responsabilidad Única (S)**: Cada función debe tener un solo propósito y razón para cambiar.
2. **Abierto/Cerrado (O)**: Extender funcionalidad mediante composición de funciones, no modificación.
3. **Sustitución de Liskov (L)**: Las funciones que comparten propósito deben tener interfaces consistentes.
4. **Segregación de Interfaces (I)**: Preferir interfaces pequeñas y específicas.
5. **Inversión de Dependencias (D)**: Inyectar dependencias como parámetros a las funciones.

### Clean Code

1. **Nombres descriptivos**: Utilizar nombres que revelen intención.
2. **Funciones pequeñas**: Limitar funciones a 20 líneas o menos.
3. **Argumentos limitados**: No más de 3 parámetros por función.
4. **DRY (Don't Repeat Yourself)**: Evitar duplicación de código.
5. **Comentarios significativos**: Solo cuando sean necesarios para explicar el "por qué".

### Testing

1. **Frameworks**: Utilizar Jest y Testing Library para pruebas unitarias.
2. **Cuándo escribir tests**: Las pruebas unitarias se escribirán SOLO cuando se soliciten explícitamente.
3. **Patrón AAA**: Todas las pruebas deben seguir el patrón Arrange-Act-Assert:
   - **Arrange**: Preparar los datos y condiciones para la prueba
   - **Act**: Ejecutar la funcionalidad a probar
   - **Assert**: Verificar los resultados esperados

## Estructura de Directorios

```
src/
├── assets/                  # Recursos estáticos (imágenes, fuentes, etc.)
├── components/              # Componentes según Atomic Design
│   ├── atoms/               # Componentes básicos indivisibles
│   ├── molecules/           # Grupos de átomos funcionando juntos
│   ├── organisms/           # Grupos de moléculas/átomos formando secciones
│   └── templates/           # Estructuras de página sin datos específicos
├── hooks/                   # Custom hooks compartidos
├── pages/                   # Páginas de la aplicación
├── routes/                  # Configuración de rutas
│   ├── app.routes.tsx
│   ├── app.routes.interface.ts
│   ├── protected.route.tsx
│   └── public.routes.tsx
├── services/                # Servicios para la lógica de negocio
├── stores/                  # Stores de Zustand
├── signals/                 # Signals compartidos entre componentes
│   ├── auth.signal.ts       # Signals para autenticación
│   ├── theme.signal.ts      # Signals para tema de la aplicación
│   └── ...
├── interfaces/              # Definiciones de interfaces compartidas
├── utils/                   # Utilidades y helpers
├── config/                  # Configuraciones y constantes de la aplicación
│   └── env.config.ts        # Variables de entorno tipadas
└── tests/                   # Pruebas (solo si se solicitan)
```

## Convenciones de Nomenclatura

### Archivos

- Archivos de componentes: Mantener en minúsculas con sufijo de tipo
  - Ejemplo: `button.atom.tsx`, `search-bar.molecule.tsx`
- Archivos de interfaces:
  - Si solo hay una interfaz: `nombre.interface.ts`
  - Si hay múltiples interfaces: `nombre.interfaces.ts`
- Archivos de hooks: `use.nombre.hook.ts`
- Archivos de página: `nombre.page.tsx`
- Archivos de estilos: `nombre.style.css`

### Nombres de Componentes

- Usar PascalCase con sufijo de Atomic Design
  - Ejemplo: `ButtonAtom`, `SearchBarMolecule`, `LoginFormOrganism`

### Estructura Atomic Design

```
components/
├── atoms/
│   ├── button/
│   │   ├── button.atom.tsx          # Archivo en minúsculas
│   │   ├── button.interface.ts      # Interfaz separada
│   │   ├── button.style.css
│   │   └── use.button.hook.ts (opcional)
```

## Ejemplos de Implementación

### Implementación de CSS con Tailwind

```css
/* components/atoms/button/button.style.css */
@import "tailwind";

.button {
  @apply rounded px-4 py-2 text-sm font-medium cursor-pointer border-none;
  @apply transition-colors transition-opacity;
}

.button:disabled {
  @apply cursor-not-allowed opacity-60;
}

.button.primary {
  @apply bg-blue-600 text-white;
}

.button.secondary {
  @apply bg-gray-100 text-gray-800 border border-gray-300;
}
```

```typescript
// Uso en componente TSX (no incluir estilos directamente)
const ButtonComponent = () => {
  return (
    <button className="button primary">
      Click me
    </button>
  );
};
```

### Componente con Signals

```typescript
// signals/counter.signal.ts
import { signal, computed } from '@preact/signals-react';

export const count = signal(0);
export const doubleCount = computed(() => count.value * 2);

export const increment = (): void => {
  count.value++;
};

export const decrement = (): void => {
  count.value--;
};

export const reset = (): void => {
  count.value = 0;
};
```

```typescript
// components/counter/counter.atom.tsx
import React from 'react';
import { count, increment, decrement, doubleCount } from '../../signals/counter.signal';
import './counter.style.css';

const CounterAtom: React.FC = () => {
  return (
    <div className="counter">
      <h2>Counter: {count.value}</h2>
      <p>Double: {doubleCount.value}</p>
      <div className="counter-controls">
        <button onClick={decrement} className="counter-button">-</button>
        <button onClick={increment} className="counter-button">+</button>
      </div>
    </div>
  );
};

export default CounterAtom;
```

### Signals en Hooks Personalizados

```typescript
// signals/window-size.signal.ts
import { signal, computed } from '@preact/signals-react';
import type { WindowSize } from '../interfaces/window.interface';

export const windowWidth = signal(window.innerWidth);
export const windowHeight = signal(window.innerHeight);

export const windowSize = computed<WindowSize>(() => ({
  width: windowWidth.value,
  height: windowHeight.value
}));

export const updateWindowSize = (): void => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
};
```

```typescript
// hooks/use.window-size.hook.ts
import { useEffect } from 'react';
import { windowSize, updateWindowSize } from '../signals/window-size.signal';
import type { WindowSize } from '../interfaces/window.interface';

const useWindowSize = (): WindowSize => {
  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  return windowSize.value;
};

export default useWindowSize;
```

### Servicio de API con Principios SOLID

```typescript
// services/api.service.interface.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  code: string;
}

export interface FetchOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
}
```

```typescript
// services/api.service.ts
import { ApiError, FetchOptions } from './api.service.interface';

// Responsabilidad única: solo gestiona peticiones HTTP
const createRequest = async <T>(
  url: string, 
  options: FetchOptions
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    
    if (!response.ok) {
      const errorData = await response.json() as ApiError;
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    return await response.json() as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error desconocido en la petición');
  }
};

// Composición de funciones para diferentes métodos HTTP
const api = {
  get: <T>(url: string, headers?: Record<string, string>): Promise<T> => 
    createRequest<T>(url, { method: 'GET', headers }),
    
  post: <T, U>(url: string, data: U, headers?: Record<string, string>): Promise<T> => 
    createRequest<T>(url, { method: 'POST', body: data, headers }),
    
  put: <T, U>(url: string, data: U, headers?: Record<string, string>): Promise<T> => 
    createRequest<T>(url, { method: 'PUT', body: data, headers }),
    
  delete: <T>(url: string, headers?: Record<string, string>): Promise<T> => 
    createRequest<T>(url, { method: 'DELETE', headers }),
};

export default api;
```

### Store con Zustand (Siguiendo Principios Funcionales)

```typescript
// stores/auth.store.interface.ts
export interface User {
  id: string;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}
```

```typescript
// stores/auth.store.ts
import { create } from 'zustand';
import api from '../services/api.service';
import { AuthState, LoginCredentials, User } from './auth.store.interface';

// Definición del estado siguiendo principios funcionales
const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  error: null,
  
  // Función pura con un solo propósito
  login: async (credentials: LoginCredentials): Promise<void> => {
    try {
      const user = await api.post<User, LoginCredentials>(
        '/api/auth/login', 
        credentials
      );
      
      set({
        isAuthenticated: true,
        user,
        error: null,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: 'Error desconocido durante el login' });
      }
    }
  },
  
  // Función pura con un solo propósito
  logout: (): void => {
    set({
      isAuthenticated: false,
      user: null,
      error: null,
    });
  },
  
  // Función pura con un solo propósito
  clearError: (): void => {
    set({ error: null });
  },
}));

export default useAuthStore;
```

### Hook Personalizado (Clean Code y Principios Funcionales)

```typescript
// pages/dashboard/use.dashboard.hook.interface.ts
export interface DashboardStats {
  users: number;
  sales: number;
  revenue: number;
}

export interface DashboardData {
  stats: DashboardStats;
  lastUpdated: string;
}

export interface UseDashboardResult {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}
```

```typescript
// pages/dashboard/use.dashboard.hook.ts
import { useState, useEffect, useCallback } from 'react';
import api from '../../services/api.service';
import { DashboardData, UseDashboardResult } from './use.dashboard.hook.interface';

// Responsabilidad única: gestionar estado y datos del dashboard
const useDashboard = (): UseDashboardResult => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función pura extraída para mantener SRP
  const fetchData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const dashboardData = await api.get<DashboardData>('/api/dashboard');
      setData(dashboardData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error desconocido al cargar los datos');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Efecto con dependencias explícitas
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { 
    data, 
    loading, 
    error, 
    refreshData: fetchData 
  };
};

export default useDashboard;
```

### Componente Atómico (Función de Flecha)

```typescript
// components/atoms/button/button.interface.ts
export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  testId?: string;
}
```

```typescript
// components/atoms/button/button.atom.tsx
import React from 'react';
import { ButtonProps } from './button.interface';
import './button.style.css';

// Componente con una sola responsabilidad (SRP)
const ButtonAtom: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  testId,
}) => {
  const handleClick = (): void => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button 
      className={`button ${variant}`} 
      onClick={handleClick}
      disabled={disabled}
      data-testid={testId}
    >
      {label}
    </button>
  );
};

export default ButtonAtom;
```

## Pruebas Unitarias

Las pruebas unitarias deben escribirse solo cuando se solicitan explícitamente, utilizando Jest y React Testing Library.

### Patrón AAA (Arrange-Act-Assert)

Todas las pruebas deben seguir estrictamente el patrón AAA:

1. **Arrange**: Configurar todos los datos y variables necesarios.
2. **Act**: Ejecutar la acción que se está probando.
3. **Assert**: Verificar el resultado esperado.

### Buenas Prácticas para Testing

1. **Separación de variables**:
   - Las variables de comparación en la sección Assert deben definirse en la sección Arrange
   - Las variables esperadas no deben usarse en la sección Act

2. **Cobertura de escenarios**:
   - Probar siempre el "happy path" (escenario donde todo funciona correctamente)
   - Probar siempre el "unhappy path" (escenarios de error o excepción)
   - Validar casos borde (Edge Cases): situaciones en los límites del funcionamiento normal
   - Validar casos esquina (Corner Cases): situaciones extremas poco comunes

3. **Descripción de pruebas**:
   - Cada caso de prueba debe describir claramente qué verifica
   - Usar nombres descriptivos para los bloques `describe` y `test`/`it`

### Ejemplo de Test Unitario (Patrón AAA)

```typescript
// tests/components/atoms/button/button.atom.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonAtom from '../../../../components/atoms/button/button.atom';

describe('ButtonAtom component', () => {
  // Happy Path
  test('renders with correct label', () => {
    // Arrange
    const label = 'Click me';
    const handleClick = jest.fn();
    const expectedText = label;
    
    // Act
    render(<ButtonAtom label={label} onClick={handleClick} />);
    
    // Assert
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', () => {
    // Arrange
    const handleClick = jest.fn();
    const expectedCallCount = 1;
    
    // Act
    render(<ButtonAtom label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(expectedCallCount);
  });
  
  // Unhappy Path
  test('does not call onClick when disabled', () => {
    // Arrange
    const handleClick = jest.fn();
    const isDisabled = true;
    
    // Act
    render(<ButtonAtom label="Click me" onClick={handleClick} disabled={isDisabled} />);
    fireEvent.click(screen.getByText('Click me'));
    
    // Assert
    expect(handleClick).not.toHaveBeenCalled();
  });
  
  // Edge Case
  test('handles empty label correctly', () => {
    // Arrange
    const label = '';
    const handleClick = jest.fn();
    
    // Act
    render(<ButtonAtom label={label} onClick={handleClick} />);
    
    // Assert
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('');
  });
  
  // Corner Case
  test('handles very long label without breaking UI', () => {
    // Arrange
    const veryLongLabel = 'A'.repeat(100); // Label extremadamente largo
    const handleClick = jest.fn();
    
    // Act
    render(<ButtonAtom label={veryLongLabel} onClick={handleClick} />);
    const button = screen.getByRole('button');
    
    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(veryLongLabel);
  });
});
```

## Patrones de Diseño Funcionales Recomendados

1. **Composición de funciones**: Combinar funciones pequeñas para crear comportamientos complejos.
2. **Currying**: Transformar funciones con múltiples argumentos en secuencias de funciones de un solo argumento.
3. **Memoización**: Cachear resultados de funciones puras para optimizar rendimiento.
4. **Middleware**: Componer funciones que procesan datos en un pipeline.
5. **Selector Pattern**: Extraer y derivar datos del estado de manera eficiente.

## Aplicación de Principios en la Práctica

### Cómo Aplicar KISS

- Usar soluciones estándar y bien conocidas
- Evitar optimizaciones prematuras
- Limitar el número de abstracciones
- Preferir código explícito sobre "magia" implícita
- Ejemplo:

  ```typescript
  // ✅ KISS: Simple y directo
  const getTotalPrice = (items: CartItem[]): number => 
    items.reduce((total, item) => total + item.price * item.quantity, 0);
    
  // ❌ Demasiado complejo para la tarea
  const getTotalPriceComplex = (items: CartItem[]): number => {
    const itemsMap = new Map();
    items.forEach(item => {
      const existingItem = itemsMap.get(item.id);
      if (existingItem) {
        itemsMap.set(item.id, { ...existingItem, quantity: existingItem.quantity + item.quantity });
      } else {
        itemsMap.set(item.id, { ...item });
      }
    });
    return Array.from(itemsMap.values())
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };
  ```

### Cómo Aplicar DRY

- Extraer lógica repetida en hooks o funciones utilitarias
- Usar componentes genéricos reutilizables
- Centralizar configuraciones comunes
- Ejemplo:

  ```typescript
  // ❌ Repetitivo
  const UserProfile = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState(null);
    
    useEffect(() => {
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);
    
    // Resto del componente
  };
  
  // ✅ DRY: Lógica de fetch extraída a un hook reutilizable
  const useFetch = <T>(url: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);
    
    useEffect(() => {
      // Implementación de fetch
    }, [url]);
    
    return { loading, error, data };
  };
  
  const UserProfile = () => {
    const { loading, error, data } = useFetch('/api/profile');
    // Resto del componente
  };
  ```

### Cómo Aplicar YAGNI

- Implementar solo lo requerido explícitamente
- Eliminar código "por si acaso"
- Evitar parámetros opcionales que no se usan actualmente
- Ejemplo:

  ```typescript
  // ❌ YAGNI: Implementación excesiva
  interface ButtonProps {
    label: string;
    onClick: () => void;
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link';
    withAnimation?: boolean;
    customIcon?: React.ReactNode;
    fullWidth?: boolean;
    rounded?: boolean;
    // ...muchas más opciones que no se usan actualmente
  }
  
  // ✅ YAGNI: Solo lo necesario
  interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary';
    disabled?: boolean;
  }
  ```

## Prácticas a Evitar

1. **Programación orientada a objetos**: No usar clases ni herencia.
2. **Mutación de estado directa**: Usar patrones inmutables.
3. **Efectos secundarios no controlados**: Aislar side-effects.
4. **Tipo `any`**: Usar tipos específicos o `unknown` cuando sea necesario.
5. **Tipos en lugar de interfaces**: Siempre usar interfaces para modelar estructuras de datos.
6. **Funciones extensas**: Mantener funciones concisas y enfocadas.
7. **Abstracción prematura**: No crear patrones de abstracción hasta que exista una necesidad clara.
8. **Optimización prematura**: No optimizar antes de tener evidencia de problemas de rendimiento.
9. **Código "por si acaso"**: No escribir funcionalidades especulativas (viola YAGNI).
