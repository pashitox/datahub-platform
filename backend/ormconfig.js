const { DataSource } = require('typeorm');
require('dotenv').config();

module.exports = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'postgres',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'admin',
  password: process.env.DATABASE_PASSWORD || 'changemeinprod',
  database: process.env.DATABASE_NAME || 'datahub',
  entities: ['src/**/*.entity{.js}'], // Solo .js para CLI
  migrations: ['src/migrations/*{.js}'], // Solo .js para CLI
  synchronize: false,
});
