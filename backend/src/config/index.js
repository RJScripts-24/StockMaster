// src/config/index.js
// Centralized configuration loader for StockMaster backend

import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Helper to enforce required environment variables
function required(key) {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
  return process.env[key];
}

// Application configuration object
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,

  app: {
    name: 'StockMaster Backend',
    version: '1.0.0',
  },

  // Database (PostgreSQL)
  db: {
    url: required('DATABASE_URL'),
    prismaLog: process.env.PRISMA_LOG === 'true',
  },

  // JWT settings
  jwt: {
    secret: required('JWT_SECRET'),
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // OTP settings
  otp: {
    expiryMinutes: Number(process.env.OTP_EXPIRY_MINUTES || 10),
  },

  // Email service (if needed later)
  mail: {
    from: process.env.MAIL_FROM || '',
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || 587,
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
  },

  // Logging
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  // Pagination defaults
  pagination: {
    perPage: Number(process.env.PER_PAGE_DEFAULT || 20),
  },
};

export default config;
