# Guía de Uso de Signals (@preact/signals)

## Introducción

Signals de @preact/signals-react es la solución prioritaria para gestión de estado en nuestra aplicación. Ofrece un modelo declarativo y eficiente con actualización granular de componentes.

## Cuándo usar cada solución de estado

| Tipo de Estado | Solución Recomendada | Alternativa |
|----------------|----------------------|-------------|
| Estado local de componente | Signals | useState (casos simples) |
| Estado compartido entre componentes | Signals (en archivos dedicados) | Context API |
| Estado global de aplicación | Signals + Zustand | Zustand solo |
| Valores derivados/calculados | computed signals | useMemo, selectores |

## Estructura y Organización

1. **Estado Local**:

   ```typescript
   // En el componente
   const count = signal(0);
   ```

2. **Estado Compartido Limitado**:

   ```typescript
   // shared/signals/moduleA.signal.ts
   export const stateA = signal(initialValue);
   export const updateStateA = (newValue) => { stateA.value = newValue; };
   ```

3. **Estado Global de Aplicación**:

   ```typescript
   // stores/myStore.signal.ts
   export const globalState = signal(initialValue);
   export const derivedState = computed(() => transform(globalState.value));
   
   // Acciones
   export const updateState = (newValue) => { 
     // Lógica compleja aquí
     globalState.value = processedValue;
   };
   ```

## Ventajas de Signals (por qué es prioritario)

1. **Rendimiento**: Actualizaciones granulares; solo re-renderiza lo necesario
2. **Simplicidad**: API directa sin necesidad de selectors/dispatch complejos  
3. **Debugging**: Flujo de datos transparente y fácil de seguir
4. **Integración**: Funciona bien con herramientas existentes

## Reglas y Mejores Prácticas

1. **Preferir signals sobre useState**:

   ```typescript
   // ✅ Preferido
   const count = signal(0);
   
   // ❌ Evitar para casos reactivos
   const [count, setCount] = useState(0);
   ```

2. **Usar computed para valores derivados**:

   ```typescript
   // ✅ Buena práctica
   const count = signal(0);
   const doubleCount = computed(() => count.value * 2);
   
   // ❌ Anti-patrón
   const count = signal(0);
   // Cálculo manual en cada render, no reactivo
   const doubleCount = count.value * 2;
   ```

3. **Extraer lógica compleja a funciones auxiliares**:

   ```typescript
   // ✅ Recomendado
   export const todos = signal([]);
   export const addTodo = (text) => {
     todos.value = [...todos.value, { id: Date.now(), text, completed: false }];
   };
   
   // ❌ Evitar manipulación directa en componentes
   const TodoComponent = () => {
     // Manipulación directa en evento
     const handleAdd = () => {
       todos.value = [...todos.value, { /* ... */ }];
     };
   };
   ```

4. **Combinar con Zustand para aplicaciones complejas**:

   ```typescript
   // stores/advanced.store.ts
   import { create } from 'zustand';
   import { todoSignal } from '../signals/todo.signal';
   
   interface AdvancedStore {
     // Estado complejo
     processTodos: () => void;
   }
   
   const useAdvancedStore = create<AdvancedStore>((set) => ({
     processTodos: () => {
       // Lógica compleja que afecta a signals
       todoSignal.value = procesamiento(todoSignal.value);
     }
   }));
   ```

## Integración con Atomic Design

- Cada nivel de Atomic Design puede consumir signals
- Extraer signals compartidos a archivos separados:
  - `shared/signals/` para signals de uso general
  - Signals específicos de un componente pueden estar junto al componente

## Testing Signals

```typescript
// signals/counter.signal.ts
import { signal } from '@preact/signals-react';

export const count = signal(0);
export const increment = () => { count.value++; };

// signals/counter.signal.test.ts
import { count, increment } from './counter.signal';

describe('Counter signal', () => {
  beforeEach(() => {
    count.value = 0; // Reset state
  });
  
  test('increment increases count by 1', () => {
    // Arrange
    expect(count.value).toBe(0);
    
    // Act
    increment();
    
    // Assert
    expect(count.value).toBe(1);
  });
});
```
