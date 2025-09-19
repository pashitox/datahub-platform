import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { RefreshToken } from './auth/entities/refresh-token.entity';
import { CreateUsersTable1725619200000 } from './migrations/1725619200000-CreateUsersTable';
import { CreateRefreshTokensTable1725621000000 } from './migrations/1725621000000-CreateRefreshTokensTable';
import { AddEmailVerification1757934549976 } from './migrations/1757934549976-AddEmailVerification';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'changemeinprod',
  database: process.env.DB_NAME || 'datahub',
  synchronize: false,
  logging: true,
  entities: [User, RefreshToken], // ✅ AGREGAR ENTIDADES AQUÍ
  migrations: [
    CreateUsersTable1725619200000,
    CreateRefreshTokensTable1725621000000,
    AddEmailVerification1757934549976
  ],
  migrationsRun: true, // ✅ EJECUTAR MIGRACIONES AUTOMÁTICAMENTE
});