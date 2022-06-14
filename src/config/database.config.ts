import dotenv from 'dotenv';

dotenv.config();

const ENV = process.env.ENV ?? 'dev';

const DB_NAME = process.env[ENV === 'test' ? 'TEST_DB_NAME' : 'DEV_DB_NAME'] ?? process.env['DB_NAME'];;

const dbConfig= {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  port: Number(process.env.DB_PORT) as number || 5432
};

export default dbConfig;
