# Ejemplo de implementación con TanStack Query

```typescript
// interfaces/product.interface.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  stock: number;
}

export interface ProductsResponse {
  products: Product[];
  totalCount: number;
  page: number;
  totalPages: number;
}

export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest';
  search?: string;
}

// services/product.service.ts
import { ProductsQueryParams, ProductsResponse, Product } from '../interfaces/product.interface';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async (params: ProductsQueryParams): Promise<ProductsResponse> => {
  // Construir query string a partir de parámetros
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.category) queryParams.append('category', params.category);
  if (params.sort) queryParams.append('sort', params.sort);
  if (params.search) queryParams.append('search', params.search);
  
  const response = await fetch(`${API_URL}/products?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching products: ${response.status}`);
  }
  
  return await response.json();
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching product: ${response.status}`);
  }
  
  return await response.json();
};

// hooks/use.products.hook.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, fetchProductById } from '../services/product.service';
import type { ProductsQueryParams, Product } from '../interfaces/product.interface';

// Hook para obtener lista de productos con TanStack Query
export const useProducts = (params: ProductsQueryParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 *60* 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
};

// Hook para obtener un producto específico
export const useProduct = (id: string) => {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    staleTime: 10 *60* 1000, // 10 minutos
    initialData: () => {
      // Intentar obtener el producto de la caché de la lista
      const cachedProducts = queryClient.getQueryData<{ products: Product[] }>(['products']);
      if (!cachedProducts) return undefined;

      return cachedProducts.products.find(product => product.id === id);
    },
  });
};

// pages/products/products.page.tsx
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/use.products.hook';
import { FiFilter, FiSearch, FiLoader } from 'react-icons/fi';
import './products.style.css';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  
  // Extraer parámetros de la URL
  const currentPage = Number(searchParams.get('page') || '1');
  const category = searchParams.get('category') || undefined;
  const sort = searchParams.get('sort') as 'price_asc' | 'price_desc' | 'newest' | undefined;
  
  // Usar TanStack Query para obtener productos
  const { data, isLoading, isError, error } = useProducts({
    page: currentPage,
    limit: 12,
    category,
    sort,
    search: searchParams.get('search') || undefined,
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Actualizar URL con el término de búsqueda
    const newSearchParams = new URLSearchParams(searchParams);
    if (searchTerm) {
      newSearchParams.set('search', searchTerm);
    } else {
      newSearchParams.delete('search');
    }
    newSearchParams.set('page', '1'); // Resetear a primera página
    setSearchParams(newSearchParams);
  };
  
  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };
  
  // Estados de carga y error
  if (isLoading) {
    return (
      <div className="loading-container">
        <FiLoader className="loading-icon" />
        <p>Cargando productos...</p>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="error-container">
        <p>Error al cargar los productos: {error instanceof Error ? error.message : 'Error desconocido'}</p>
        <button onClick={() => window.location.reload()}>Intentar nuevamente</button>
      </div>
    );
  }
  
  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Nuestros Productos</h1>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FiSearch />
          </button>
        </form>
        
        <div className="filters">
          <FiFilter />
          <select
            value={sort || ''}
            onChange={(e) => {
              const newSearchParams = new URLSearchParams(searchParams);
              if (e.target.value) {
                newSearchParams.set('sort', e.target.value);
              } else {
                newSearchParams.delete('sort');
              }
              setSearchParams(newSearchParams);
            }}
            className="sort-select"
          >
            <option value="">Ordenar por</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
            <option value="newest">Más Recientes</option>
          </select>
        </div>
      </div>
      
      {data && data.products.length > 0 ? (
        <>
          <div className="products-grid">
            {data.products.map((product) => (
              <div key={product.id} className="product-card">
                {/* Contenido del producto */}
              </div>
            ))}
          </div>
          
          <div className="pagination">
            <button
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="pagination-button"
            >
              Anterior
            </button>
            
            <span className="pagination-info">
              Página {currentPage} de {data.totalPages}
            </span>
            
            <button
              disabled={currentPage >= data.totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="pagination-button"
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <div className="no-results">
          <p>No se encontraron productos que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
```
