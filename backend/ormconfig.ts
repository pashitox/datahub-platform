// backend/ormconfig.js
const { DataSource } = require('typeorm');
const path = require('path');

module.exports = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'changemeinprod',
  database: process.env.DB_NAME || 'datahub',
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, 'dist/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'dist/migrations/*{.ts,.js}')],
  migrationsRun: true,
});