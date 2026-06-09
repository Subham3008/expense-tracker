import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const num = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: num(process.env.PORT, 5000),
  CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:5173',
  MONGO_URI: process.env.MONGO_URI,
};