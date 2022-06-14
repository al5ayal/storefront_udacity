import dotenv from 'dotenv';

dotenv.config();

const app = {
  ENV: process.env.ENV || 'dev',
  AppHost: process.env.APP_HOST || 'localhost',
  port: process.env.PORT || 3000,
  bcryptRound: Number(process.env.BCRYPT_ROUNDS) || 10,
  bcryptPepper: process.env.BCRYPT_PEPPER || 'jwtSecret',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiry: process.env.JWT_EXPIRY || '1d'
};

export default app;
