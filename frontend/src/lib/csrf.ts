class CSRFProtection {
  private csrfToken: string | null = null;

  async initialize() {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/auth/csrf-token`, {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        this.csrfToken = data.csrfToken;
        console.log("🛡️ CSRF Token obtenido");
      }
    } catch (error) {
      console.warn("⚠️ CSRF token initialization failed:", error);
    }
  }

  getToken(): string | null {
    return this.csrfToken;
  }

  validateResponse(response: Response): boolean {
    const receivedToken = response.headers.get('X-CSRF-Token');
    // Solo validar si el response incluye un token CSRF
    return !receivedToken || receivedToken === this.csrfToken;
  }
}

export const csrfProtection = new CSRFProtection();