# Ejemplo de uso de Signals

```typescript
// Ejemplo 1: Uso básico de Signals en un componente

// components/counter/counter.interface.ts
export interface CounterProps {
  initialValue?: number;
}

// components/counter/counter.atom.tsx
import React from 'react';
import { signal } from '@preact/signals-react';
import { CounterProps } from './counter.interface';
import './counter.style.css';

const CounterAtom: React.FC<CounterProps> = ({ initialValue = 0 }) => {
  // Signal para estado local en lugar de useState
  const count = signal(initialValue);
  
  const increment = (): void => {
    count.value++;
  };
  
  const decrement = (): void => {
    count.value--;
  };
  
  return (
    <div className="counter">
      <button className="counter-button" onClick={decrement}>-</button>
      <span className="counter-value">{count.value}</span>
      <button className="counter-button" onClick={increment}>+</button>
    </div>
  );
};

export default CounterAtom;

// Ejemplo 2: Signals para estado compartido entre componentes

// shared/signals/theme.signal.ts
import { signal, computed } from '@preact/signals-react';

export const themeMode = signal<'light' | 'dark'>('light');

export const isDarkMode = computed(() => themeMode.value === 'dark');

export const toggleTheme = (): void => {
  themeMode.value = themeMode.value === 'light' ? 'dark' : 'light';
};

// components/theme-toggle/theme-toggle.atom.tsx
import React from 'react';
import { themeMode, toggleTheme } from '../../shared/signals/theme.signal';
import './theme-toggle.style.css';

const ThemeToggleAtom: React.FC = () => {
  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
    >
      Current theme: {themeMode.value}
    </button>
  );
};

export default ThemeToggleAtom;

// Ejemplo 3: Combining Signals con useComputed para valores derivados

// components/todo-list/todo-list.interface.ts
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// shared/signals/todos.signal.ts
import { signal, computed } from '@preact/signals-react';
import { Todo } from '../../components/todo-list/todo-list.interface';

export const todos = signal<Todo[]>([]);

export const completedTodos = computed(() =>
  todos.value.filter(todo => todo.completed)
);

export const incompleteTodos = computed(() =>
  todos.value.filter(todo => !todo.completed)
);

export const todosCount = computed(() => ({
  total: todos.value.length,
  completed: completedTodos.value.length,
  incomplete: incompleteTodos.value.length
}));

export const addTodo = (text: string): void => {
  todos.value = [
    ...todos.value,
    {
      id: Date.now(),
      text,
      completed: false
    }
  ];
};

export const toggleTodo = (id: number): void => {
  todos.value = todos.value.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  );
};

export const removeTodo = (id: number): void => {
  todos.value = todos.value.filter(todo => todo.id !== id);
};

// Ejemplo 4: Signal en hook personalizado

// hooks/use.resize.hook.interface.ts
export interface WindowSize {
  width: number;
  height: number;
}

// hooks/use.resize.hook.ts
import { signal, computed } from '@preact/signals-react';
import { useEffect } from 'react';
import { WindowSize } from './use.resize.hook.interface';

// Signal definida fuera del hook para estado compartido
const windowWidth = signal(window.innerWidth);
const windowHeight = signal(window.innerHeight);

const windowSize = computed<WindowSize>(() => ({
  width: windowWidth.value,
  height: windowHeight.value
}));

const useResize = (): WindowSize => {
  useEffect(() => {
    const handleResize = (): void => {
      windowWidth.value = window.innerWidth;
      windowHeight.value = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize.value;
};

export default useResize;
```
