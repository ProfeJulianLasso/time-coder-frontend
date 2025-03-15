# Ejemplo de Estructura de Proyecto

```text
// Estructura básica del proyecto
src/
├── assets/
│   ├── images/
│   │   └── logo.svg
│   └── styles/
│       └── variables.css
├── components/
│   ├── atoms/
│   │   ├── button/
│   │   │   ├── button.atom.tsx       # Archivo en minúsculas
│   │   │   ├── button.interface.ts   # Interfaz separada
│   │   │   ├── button.style.css
│   │   │   └── use.button.hook.ts
│   │   └── input/
│   │       ├── input.atom.tsx
│   │       ├── input.interface.ts
│   │       └── input.style.css
│   ├── molecules/
│   │   └── form-field/
│   │       ├── form-field.molecule.tsx
│   │       ├── form-field.interface.ts
│   │       └── form-field.style.css
│   ├── organisms/
│   │   └── login-form/
│   │       ├── login-form.organism.tsx
│   │       ├── login-form.interface.ts
│   │       └── login-form.style.css
│   └── templates/
│       └── auth-layout/
│           ├── auth-layout.template.tsx
│           ├── auth-layout.interface.ts
│           └── auth-layout.style.css
├── hooks/
│   └── use.form.hook.ts
├── pages/
│   ├── dashboard/
│   │   ├── dashboard.page.tsx
│   │   ├── dashboard.style.css
│   │   ├── use.dashboard.hook.interface.ts
│   │   └── use.dashboard.hook.ts
│   └── login/
│       ├── login.page.tsx
│       ├── login.style.css
│       ├── use.login.hook.interface.ts
│       └── use.login.hook.ts
├── services/
│   ├── api.service.interface.ts
│   └── api.service.ts
├── signals/
│   ├── auth.signal.ts
│   ├── theme.signal.ts
│   └── counter.signal.ts
├── stores/
│   ├── auth.store.interface.ts
│   ├── auth.store.ts
│   ├── theme.store.interface.ts
│   └── theme.store.ts
├── interfaces/
│   ├── api.interfaces.ts
│   └── user.interface.ts
└── utils/
    ├── date.utils.ts
    └── validation.utils.ts
```
