// frontend/src/lib/csrf.ts
class CSRFProtection {
  private csrfToken: string | null = null;

  async initialize() {
    // Obtener token del backend al cargar la app
    try {
      const response = await fetch('http://localhost:3001/auth/csrf-token', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        this.csrfToken = data.csrfToken;
      }
    } catch (error) {
      console.warn('CSRF token initialization failed:', error);
    }
  }

  getToken(): string | null {
    return this.csrfToken;
  }

  // Verificar token en responses (opcional)
  validateResponse(response: Response): boolean {
    const receivedToken = response.headers.get('X-CSRF-Token');
    return !receivedToken || receivedToken === this.csrfToken;
  }
}

export const csrfProtection = new CSRFProtection();

// Llamar esta función en _app.tsx