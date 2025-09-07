#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Crear extensiones necesarias
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    -- Verificar y crear tablas si no existen
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'users') THEN
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                "firstName" VARCHAR(100),
                "lastName" VARCHAR(100),
                "isActive" BOOLEAN DEFAULT true,
                roles TEXT[] DEFAULT '{user}',
                "createdAt" TIMESTAMP DEFAULT NOW(),
                "updatedAt" TIMESTAMP DEFAULT NOW()
            );
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'refresh_tokens') THEN
            CREATE TABLE refresh_tokens (
                id SERIAL PRIMARY KEY,
                token TEXT NOT NULL UNIQUE,
                user_id INTEGER NOT NULL,
                is_active BOOLEAN DEFAULT true,
                device_info TEXT,
                ip_address VARCHAR(45),
                created_at TIMESTAMP DEFAULT NOW(),
                expires_at TIMESTAMP NOT NULL,
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            );
            
            CREATE INDEX idx_refresh_tokens_token_user ON refresh_tokens (token, user_id);
            CREATE INDEX idx_refresh_tokens_user ON refresh_tokens (user_id);
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'migrations') THEN
            CREATE TABLE migrations (
                id SERIAL PRIMARY KEY,
                "timestamp" BIGINT NOT NULL,
                "name" VARCHAR(255) NOT NULL
            );
            
            -- Insertar migraciones existentes
            INSERT INTO migrations ("timestamp", "name") VALUES
            (1725619200000, 'CreateUsersTable1725619200000'),
            (1725620000000, 'SyncExistingSchema1725620000000'), 
            (1725621000000, 'CreateRefreshTokensTable1725621000000');
        END IF;
    END
    \$\$;
EOSQL
