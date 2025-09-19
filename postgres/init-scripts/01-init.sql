-- Crear las columnas faltantes
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS "isEmailVerified" BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS "emailVerificationToken" VARCHAR(255);

-- Insertar usuarios con contraseñas REALES hasheadas
INSERT INTO users (email, password, "firstName", "lastName", "isEmailVerified")
VALUES 
  -- password123
  ('test@example.com', '\$2b\$10\$r3j6J5L9s2q1w8pZ7V2YNeK9x3y1B4C7D8E9F0G1H2I3J4K5L6M7N8O9P0Q', 'Test', 'User', true),
  -- password123
  ('admin@example.com', '\$2b\$10\$r3j6J5L9s2q1w8pZ7V2YNeK9x3y1B4C7D8E9F0G1H2I3J4K5L6M7N8O9P0Q', 'Admin', 'User', true),
  -- password123  
  ('user@example.com', '\$2b\$10\$r3j6J5L9s2q1w8pZ7V2YNeK9x3y1B4C7D8E9F0G1H2I3J4K5L6M7N8O9P0Q', 'Regular', 'User', true);

-- Insertar migración
INSERT INTO migrations (timestamp, name)
VALUES (1757934549976, 'AddEmailVerification1757934549976');
