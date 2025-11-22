// src/server/logger.js
// Centralized Winston logger for StockMaster backend

import winston from 'winston';

// Log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return stack
      ? `[${timestamp}] ${level.toUpperCase()}: ${message}\n${stack}`
      : `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);

// Logger instance
const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    // Console logs for dev & prototype
    new winston.transports.Console(),

    // File logs (optional, but useful)
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Helper methods
export const logInfo = (msg) => logger.info(msg);
export const logError = (msg, error) => {
  logger.error(msg, error ? { stack: error.stack } : {});
};
export const logWarn = (msg) => logger.warn(msg);

export default logger;
