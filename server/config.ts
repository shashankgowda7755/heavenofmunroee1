import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export configuration for use in other files
export const config = {
  databaseUrl: process.env.DATABASE_URL,
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  sessionSecret: process.env.SESSION_SECRET || 'dev-secret',
};