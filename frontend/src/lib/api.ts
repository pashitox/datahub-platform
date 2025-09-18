import { csrfProtection } from './csrf';

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  private setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private async refreshAuthToken(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // Obtener nuevo token CSRF primero
      await csrfProtection.initialize();
      const csrfToken = csrfProtection.getToken();

      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Refresh token failed');
      }

      const data = await response.json();
      this.setAccessToken(data.accessToken);
      if (data.refreshToken) {
        this.setRefreshToken(data.refreshToken);
      }
      return data.accessToken;
    } catch (error) {
      console.error('Refresh token failed:', error);
      this.clearTokens();
      window.location.href = '/login';
      return null;
    }
  }

  async request(endpoint: string, options: RequestInit = {}, isRetry = false): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Asegurar que tenemos token CSRF
    if (!csrfProtection.getToken()) {
      await csrfProtection.initialize();
    }
    
    const csrfToken = csrfProtection.getToken();

    const config: RequestInit = {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        ...options.headers,
      },
    };

    // Solo agregar Authorization para endpoints que no sean de auth
    const accessToken = this.getAccessToken();
    if (accessToken && !endpoint.includes('/auth/')) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${accessToken}`,
      };
    }

    try {
      const response = await fetch(url, config);

      // Manejar 401 - Token expirado
      if (response.status === 401 && accessToken && !isRetry) {
        const newAccessToken = await this.refreshAuthToken();
        if (newAccessToken) {
          // Reintentar una sola vez
          return this.request(endpoint, {
            ...options,
            headers: {
              ...options.headers,
              'Authorization': `Bearer ${newAccessToken}`,
            },
          }, true);
        }
        return null;
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