# Estándar de Nomenclatura de URLs

Al trabajar con rutas y URLs en aplicaciones React con react-router-dom, seguiremos un estándar consistente que mejora la legibilidad, facilita la navegación y ayuda con el SEO.

## Principios Generales para URLs

1. **Usar minúsculas**

   ```text
   ✅ /users/profile
   ❌ /Users/Profile
   ```

2. **Usar guiones (-) en lugar de guiones bajos (_) o camelCase**

   ```text
   ✅ /user-settings
   ❌ /user_settings
   ❌ /userSettings
   ```

3. **Mantener URLs simples, descriptivas y semánticas**

   ```text
   ✅ /blog/how-to-use-react-hooks
   ❌ /blog/p123456
   ```

4. **Evitar extensiones de archivo**

   ```text
   ✅ /documents/annual-report
   ❌ /documents/annual-report.pdf
   ```

5. **Usar sustantivos en plural para colecciones**

   ```text
   ✅ /products
   ❌ /product
   ```

6. **Usar sustantivos singulares para recursos específicos**

   ```text
   ✅ /products/1234
   ✅ /user/settings
   ```

## Estructura Jerárquica

Para recursos anidados, la URL debe reflejar la jerarquía:

```text
/categories
/categories/technology
/categories/technology/smartphones
```

## Parámetros de URL

### Parámetros de Ruta

Ideal para identificadores principales:

```text
/users/:userId
/products/:productId/reviews
```

### Parámetros de Consulta

Mejor para filtros, ordenamiento o paginación:

```text
/products?category=electronics&sort=price-asc&page=2
```

## Ejemplos Prácticos

```text
/                       # Página principal
/login                  # Inicio de sesión
/signup                 # Registro
/users                  # Lista de usuarios
/users/:id              # Perfil de usuario específico
/users/:id/edit         # Editar perfil de usuario
/products               # Catálogo de productos
/products/:id           # Detalle de producto
/products/new           # Crear nuevo producto
/cart                   # Carrito de compras
/checkout               # Proceso de pago
/search?q=keyword       # Búsqueda
/blog                   # Lista de artículos
/blog/:slug             # Artículo específico
/settings/account       # Configuración de cuenta
/404                    # Página no encontrada
```

## Implementación en React Router

```tsx
import { Routes, Route } from 'react-router-dom';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/users" element={<UsersList />} />
      <Route path="/users/:userId" element={<UserProfile />} />
      <Route path="/users/:userId/edit" element={<EditUserProfile />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/products/new" element={<NewProduct />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:articleSlug" element={<BlogArticle />} />
      <Route path="/settings/account" element={<AccountSettings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
```

## Organización de Archivos de Rutas

Siguiendo nuestra estructura de proyecto, organizamos las rutas de la siguiente manera:

```text
src/
├── routes/
│   ├── app.routes.tsx       # Definición principal de rutas
│   ├── app.routes.interface.ts   # Interfaces para rutas
│   ├── protected.routes.tsx      # Rutas protegidas por autenticación
│   └── public.routes.tsx         # Rutas públicas
```

## Navegación Programática

Usar siempre los hooks de react-router-dom para navegación:

```tsx
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const SomeComponent: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const handleClick = (): void => {
    navigate(`/products/${id}/edit`);
  };

  return (
    <button onClick={handleClick}>
      Editar Producto
    </button>
  );
};
```
