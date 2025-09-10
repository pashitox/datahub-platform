export const corsConfig = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,  // ← Esto es CRÍTICO
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "X-CSRF-Token", 
    "x-csrf-token",
    "X-Requested-With"
  ],
  exposedHeaders: ["Authorization", "Set-Cookie"]
};
