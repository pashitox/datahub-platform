// frontend/src/lib/api.ts
import { csrfProtection } from './csrf'; // Asegúrate de tener este módulo implementado

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const csrfToken = csrfProtection.getToken();

    const isStateChanging = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(
      options.method?.toUpperCase() || ''
    );

    const config: RequestInit = {
      ...options,
      credentials: 'include', // Incluye cookies automáticamente
      headers: {
        'Content-Type': 'application/json',
        ...(isStateChanging && csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Manejar 401/403 (token expirado)
      if (response.status === 401 || response.status === 403) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          return this.request(endpoint, options); // Reintentar
        } else {
          window.location.href = '/login'; // Redirigir
          throw new Error('Authentication required');
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      console.error('Refresh token failed:', error);
      return false;
    }
  }

  // Métodos helpers
  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();