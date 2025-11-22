// Source/Spec: /mnt/data/StockMaster.pdf
// shared/middlewares/requestLogger.js
// Simple request logging middleware for Express
// Logs method, URL, status, and response time

export function requestLogger(req, res, next) {
  const start = Date.now();
  const { method, originalUrl } = req;

  // Capture completion
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    // Basic log output (replace with pino/winston for production systems)
    console.log(
      `[REQ] ${new Date().toISOString()} ${method} ${originalUrl} -> ${status} (${duration}ms)`
    );
  });

  next();
}