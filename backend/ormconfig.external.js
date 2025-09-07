const { DataSource } = require('typeorm');
require('dotenv').config();

module.exports = new DataSource({
  type: 'postgres',
  host: 'localhost', // ← Usar localhost para fuera de Docker
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'admin',
  password: process.env.DATABASE_PASSWORD || 'changemeinprod',
  database: process.env.DATABASE_NAME || 'datahub',
  entities: ['src/**/*.entity{.js}'],
  migrations: ['src/migrations/*{.js}'],
  synchronize: false,
});
