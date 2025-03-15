# Configuración de React Router

```typescript
// routes/app.routes.interface.ts
import { ReactNode } from 'react';

export interface RouteConfig {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
  index?: boolean;
}

// routes/app.routes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { isUserLoggedIn } from '../signals/auth.signal';
import ProtectedRoute from './protected.route';
import HomePage from '../pages/home/home.page';
import LoginPage from '../pages/login/login.page';
import SignupPage from '../pages/signup/signup.page';
import DashboardPage from '../pages/dashboard/dashboard.page';
import ProductsPage from '../pages/products/products.page';
import ProductDetailPage from '../pages/product-detail/product-detail.page';
import NotFoundPage from '../pages/not-found/not-found.page';
import SettingsPage from '../pages/settings/settings.page';
import ProfilePage from '../pages/profile/profile.page';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={
        isUserLoggedIn.value 
          ? <Navigate to="/dashboard" replace /> 
          : <LoginPage />
      } />
      <Route path="/signup" element={
        isUserLoggedIn.value 
          ? <Navigate to="/dashboard" replace /> 
          : <SignupPage />
      } />
      
      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/settings" element={<SettingsPage />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route index element={<Navigate to="/settings/profile" replace />} />
        </Route>
      </Route>
      
      {/* Ruta 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

// routes/protected.route.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isUserLoggedIn } from '../signals/auth.signal';

const ProtectedRoute: React.FC = () => {
  // Si el usuario no está autenticado, redirigir al login
  if (!isUserLoggedIn.value) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderizar las rutas hijo
  return <Outlet />;
};

export default ProtectedRoute;

// pages/product-detail/product-detail.page.tsx
// Ejemplo de uso de parámetros de ruta
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { fetchProductById } from '../../services/product.service';
import { currentProduct } from '../../signals/product.signal';
import './product-detail.style.css';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadProduct = async (): Promise<void> => {
      try {
        if (productId) {
          const product = await fetchProductById(productId);
          currentProduct.value = product;
        }
      } catch (error) {
        console.error('Error al cargar el producto:', error);
        navigate('/products', { replace: true });
      }
    };
    
    loadProduct();
  }, [productId, navigate]);
  
  const handleGoBack = (): void => {
    navigate(-1); // Volver a la página anterior
  };
  
  if (!currentProduct.value) {
    return <div className="loading">Cargando producto...</div>;
  }
  
  return (
    <div className="product-detail">
      <button className="back-button" onClick={handleGoBack}>
        <FiArrowLeft /> Volver
      </button>
      
      <h1 className="product-title">{currentProduct.value.name}</h1>
      
      <div className="product-info">
        {/* Contenido del producto */}
      </div>
      
      <button className="cart-button">
        <FiShoppingCart /> Añadir al carrito
      </button>
    </div>
  );
};

export default ProductDetailPage;
```
